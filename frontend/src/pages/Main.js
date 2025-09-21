import Nav from '../components/Nav.js';
import Footer from '../components/Footer.js';
import JSONTable from '../components/JSONTable.js';
import EmptyState from '../components/EmptyState.js';
import { useState } from 'react';
import { ReactComponent as Loader } from '../icons/loader.svg'

const api = process.env.REACT_APP_API_URL;

const Main = () => {

    const [query, setQuery] = useState("")
    const [table, setTable] = useState("")
    const [result,setResult] = useState(null)
    const [loading,setLoading] = useState(false)

    const handleQuery = (event) => {
      setQuery(event.target.value);
    }

    const handleTable = (event) => {
        setTable(event.target.value);
        console.log(table);
    }

    const handleSubmit = async (event) => {
      event.preventDefault()
      setLoading(true)
      try {
        const response = await fetch(`${api}/predict`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ "query" : query, "tables" : table })
        })
        const json = await response.json()
        setResult(json)
        setLoading(false)
        console.log(json)
      } catch (err) {
        console.error(err)
      }
    }

    return (
    <div className="App">

      <h1>Text to SQL</h1>

      <Nav />
      
      <div className="search">
        <form onSubmit={handleSubmit}>
        <input 
        type = "text" 
        id = "query" 
        placeholder = "Enter your query..."
        value = {query}
        onChange = {handleQuery}
        />
        <select className="table_no" value={table} onChange={handleTable}>
            <option value="1">Employees</option>
            <option value="2">Departments</option>
            <option value="3">Managers</option>
        </select>
        <input
        type = "submit"
        id = "sub"
        value = "Submit"
        />
        </form>
      </div>

      <br />

      {!loading ? (result && result.results 
      ? <JSONTable data={result.results}/> 
      : <EmptyState />
      ) : <Loader className="spinner" /> }
      
      <Footer />


    </div>
    );
}

export default Main;