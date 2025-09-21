import Nav from '../components/Nav.js';
import Footer from '../components/Footer.js';
import {useState} from 'react';
import { ReactComponent as Loader } from '../icons/loader.svg'

const hf = process.env.REACT_APP_HF_URL;

const Test = () => {
    const [query1,setQuery1] = useState("");
    const [context,setContext] = useState("");
    const [loading,setLoading] = useState(false);

    const [sql,setSQL] = useState("");

    const handleQuery1 = (event) => {
        setQuery1(event.target.value);
    }

    const handleContext = (event) => {
        setContext(event.target.value);
    }

    const handleSQL = async (event) => {
        event.preventDefault()
        setLoading(true);
        try {
            const response = await fetch(`${hf}/predict`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ "text" : query1 + " [SEP] " + context })
            })
            const json = await response.json()
            setSQL(json['sql'])
            console.log(json)
        } catch (err) {
            console.error(err)
        } finally {
            setLoading(false);
        }
        console.log(hf)
    }

    return (
    <div className="App">

      <h1>Text to SQL</h1>

      <Nav />
      
      <div className="search">
        <input 
        type = "text" 
        id = "query1" 
        placeholder = "Enter your query..."
        value = {query1}
        onChange = {handleQuery1}
        />
      </div>

      <br />

        <div className="search">
          <form onSubmit={handleSQL}>
          <input 
          type = "text" 
          id = "context" 
          placeholder = "Enter query used to create table..."
          value = {context}
          onChange = {handleContext}
          />
          <input
          type = "submit"
          id = "sub"
          value = "Submit"
        />
        </form>
      </div>

      <br />

    <div className="resquery-container">
        {!loading ? (
          < div className="resquery">
                <pre>{sql}</pre>
                <button
                className="copy-btn"
                onClick={() => navigator.clipboard.writeText(sql)}
                title="Copy SQL"
                >
                Copy
              </button>
          </div>
      ) : (
          <Loader className="spinner" />
      )}
    </div>


      <Footer />

    </div>
    );
}

export default Test;