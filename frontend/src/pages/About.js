import Nav from '../components/Nav.js';
import Footer from '../components/Footer.js';

const About = () => {
  return (
    <div className="App">
      <h1>Text to SQL</h1>
      
      <Nav />

      <div className="about">
        <h2>About T2S</h2>
        <p>
          This project helps users access SQL databases using plain English. A model was fine-tuned to take a natural language query along with the table's create command, and generate the correct SQL query automatically.
        </p>
        <p>
          You can do two things on this website:
        </p>
        <ol>
          <li>
            Under <b>Main</b>, you can query one of three predefined tables and access its content (only <code>SELECT</code> commands are allowed). You can view the structure of the tables under DBInfo.
          </li>
          <li>
            Under <b>Test</b>, you can provide your own context (a simple <code>CREATE TABLE</code> command), and get the corresponding SQL query.
          </li>
        </ol>
        <p>
          Example of a context:
          <br />
          <code>CREATE TABLE table1 ( var1 type NOT NULL PRIMARY KEY, .... varN type );</code>
        </p>
        <p>
          <b>Model card:</b> <a href="https://huggingface.co/16pramodh/t2s_model" target="_blank" rel="noreferrer">Hugging Face</a>
          <br />
          <b>GitHub repository:</b> <a href="https://github.com/16pramodh/t2s-model" target="_blank" rel="noreferrer">GitHub</a>
        </p>
      </div>

      <Footer />
    </div>
  );
}

export default About;
