import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "../assets/css/main.style.css";

import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";


const MainLayout = () => {
    return (
        <main className="main-app">
            <Navbar />
            <section className="main-section">
                <div className="container">
                    <Outlet />
                </div>
            </section>
            <Footer />
        </main>
    );
}

export default MainLayout;