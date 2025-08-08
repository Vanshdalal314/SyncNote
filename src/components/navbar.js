import React from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'

const Navbar = (props) => {
    let location = useLocation()
    let navigate = useNavigate()
    const handlelogout = () => {
        localStorage.removeItem('token')
        navigate("/login")
        props.showAlert(" LoggedOut Successfully", "success")
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-light" style={{ backgroundColor: '#e3f2fcff' }}>
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">
                    <img src="/logo512.png" alt="" width="30" height="30" className="d-inline-block align-text-top mx-4" />
                    SyncNote
                </Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className={`nav-link ${location.pathname === "/" ? "active" : ""}`} aria-current="page" to="/">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className={`nav-link ${location.pathname === "/about" ? "active" : ""}`} to="/about">About</Link>
                        </li>
                    </ul>
                    {!localStorage.getItem('token') ? <div className="d-flex justify-content-end align-items-center">
                        <Link className="me-4 d-flex align-items-center text-decoration-none text-dark" to="/login">
                            <i className="fa-solid fa-right-to-bracket me-2"></i><span>LogIn</span>
                        </Link>
                        <Link className="d-flex align-items-center text-decoration-none text-dark" to="/signup">
                            <i className="fa-solid fa-user-plus me-2"></i><span>SignUp</span>
                        </Link>
                    </div> : <div className="d-flex justify-content-end align-items-center"> <Link className="d-flex align-items-center text-decoration-none text-dark" onClick={(e) => {e.preventDefault(); handlelogout();}} to="/">
                        <i className="fa-solid fa-right-from-bracket me-2"></i><span>LogOut</span>
                    </Link></div>}
                </div>
            </div>
        </nav>
    )
}

export default Navbar
