## Text to SQL Model

This project helps users access SQL databases using plain English. A model was fine-tuned to take a natural language query along with the table's create command, and generate the correct SQL query automatically.

You can do two things on this website:

Under Main, you can query one of three predefined tables and access its content (only SELECT commands are allowed). You can view the structure of the tables under DBInfo.
Under Test, you can provide your own context (a simple CREATE TABLE command), and get the corresponding SQL query.
Example of a context:
CREATE TABLE table1 ( var1 type NOT NULL PRIMARY KEY, .... varN type );

Model card: https://huggingface.co/16pramodh/t2s_model
Website Link: 
