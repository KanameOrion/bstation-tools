import { Link } from "react-router-dom";

const Navbar = () => {
    return <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm">
        <div className="container">
            <Link to="/" className="navbar-brand">Bstation Tools</Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li className="nav-item">
                        <Link to="/" className="nav-link">Livechat Customize</Link>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
}

export default Navbar;