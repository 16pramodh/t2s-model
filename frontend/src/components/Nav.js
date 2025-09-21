import {Link} from "react-router-dom";

const Nav = () => {
    return (
        <nav>
        <Link to="/">Main</Link>
        <Link to="/DBInfo">DB info</Link>
        <Link to="/Test">Test</Link>
        <Link to="/About">About</Link>
        </nav>
    );
}

export default Nav;