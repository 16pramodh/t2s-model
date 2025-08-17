from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from sqlalchemy import create_engine, text
from dotenv import load_dotenv
import os
import requests

# Load environment variables
load_dotenv()
db_url = os.getenv("DATABASE_URL")
HF_SPACE_URL = os.getenv("HF_SPACE_URL")

# Create SQLAlchemy engine
engine = create_engine(db_url)

# Initialize FastAPI app
app = FastAPI()

# Context definitions
context1 = '''CREATE TABLE employees (
    emp_id INT PRIMARY KEY,
    name VARCHAR(100),
    dept_id INT,
    manager_id INT,
    salary DECIMAL(10, 2),
    FOREIGN KEY (dept_id) REFERENCES departments(dept_id),
    FOREIGN KEY (manager_id) REFERENCES managers(manager_id)
);

INSERT INTO employees (emp_id, name, dept_id, manager_id, salary) VALUES
(201, 'David Green', 1, 101, 75000.00),
(202, 'Eva Brown', 2, 102, 62000.00),
(203, 'Frank Black', 1, 108, 71000.00),
(204, 'Grace Lee', 3, 103, 58000.00),
(205, 'Hank Moody', 4, 104, 82000.00),
(206, 'Iris West', 5, 105, 63000.00),
(207, 'Jake Long', 6, 106, 76000.00);'''

context2 = '''CREATE TABLE departments (
    dept_id INT PRIMARY KEY,
    dept_name VARCHAR(100)
);

INSERT INTO departments (dept_id, dept_name) VALUES
(1, 'Engineering'),
(2, 'Marketing');'''

context3 = '''CREATE TABLE managers (
    manager_id INT PRIMARY KEY,
    name VARCHAR(100),
    dept_id INT,
    FOREIGN KEY (dept_id) REFERENCES departments(dept_id)
);

INSERT INTO managers (manager_id, name, dept_id) VALUES
(101, 'Alice Johnson', 1),
(102, 'Bob Smith', 2),
(103, 'Carol White', 3);'''

context_all = '''CREATE TABLE departments (
    dept_id INT PRIMARY KEY,
    dept_name VARCHAR(100)
);

CREATE TABLE managers (
    manager_id INT PRIMARY KEY,
    name VARCHAR(100),
    dept_id INT,
    FOREIGN KEY (dept_id) REFERENCES departments(dept_id)
);

CREATE TABLE employees (
    emp_id INT PRIMARY KEY,
    name VARCHAR(100),
    dept_id INT,
    manager_id INT,
    salary DECIMAL(10, 2),
    FOREIGN KEY (dept_id) REFERENCES departments(dept_id),
    FOREIGN KEY (manager_id) REFERENCES managers(manager_id)
);

INSERT INTO departments (dept_id, dept_name) VALUES
(1, 'Engineering'),
(2, 'Marketing');

INSERT INTO managers (manager_id, name, dept_id) VALUES
(101, 'Alice Johnson', 1),
(102, 'Bob Smith', 2),
(103, 'Carol White', 3);

INSERT INTO employees (emp_id, name, dept_id, manager_id, salary) VALUES
(201, 'David Green', 1, 101, 75000.00),
(202, 'Eva Brown', 2, 102, 62000.00),
(203, 'Frank Black', 1, 108, 71000.00),
(204, 'Grace Lee', 3, 103, 58000.00),
(205, 'Hank Moody', 4, 104, 82000.00),
(206, 'Iris West', 5, 105, 63000.00),
(207, 'Jake Long', 6, 106, 76000.00);'''

# Table context map
table_contexts = {
    "1": context1,
    "2": context2,
    "3": context3,
    "all": context_all
}

# Input schema
class Item(BaseModel):
    query: str
    tables: str = "all"

# Function to query Hugging Face API
def query_hf_model(prompt: str):
    payload = {
        "text": prompt
        }
    response = requests.post(HF_SPACE_URL, json=payload)
    if response.status_code != 200:
        raise HTTPException(status_code=500, detail=f"Hugging Face API error: {response.text}")
    return response.json()["sql"]

# Prediction route
@app.post("/predict")
def gen_sql(item: Item):
    context = table_contexts.get(item.tables, context_all)
    input_text = item.query + " [SEP] " + context

    # Generate SQL via Hugging Face API
    sql = query_hf_model(input_text)

    if not sql.strip().lower().startswith("select"):
        raise HTTPException(status_code=400, detail="Only SELECT statements are allowed.")

    try:
        with engine.connect() as conn:
            result = conn.execute(text(sql))
            rows = result.mappings().all()  # ✅ safe for JSON serialization
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

    return {"query": sql, "results": rows}

