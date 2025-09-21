import Nav from '../components/Nav.js';
import Footer from '../components/Footer.js';
import schema from './schema.json';
import JSONTable from '../components/JSONTable.js';

const DBInfo = () => {
    return (
        <div className="App">

            <h1>Text to SQL</h1>
            
            <Nav />
            <br />
            <h2>Employee Table</h2>
            <JSONTable data={schema.employees}/>
            <h2>Department Table</h2>
            <JSONTable data={schema.departments}/>
            <h2>Manager Table</h2>
            <JSONTable data={schema.managers}/>
            <br />

            <Footer />

        </div>
    );
}

export default DBInfo;