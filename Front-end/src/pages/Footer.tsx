import React from 'react';
import '../styles/footer.css'
const Footer = () => {
    return (
        <footer className="bg-dark text-white text-center py-3">
            <div className="container">
                <div className="row">
                    <div className="col-lg-6 text-lg-left">
                        <h5>Contact Information</h5>
                        <p>Email: ee@eventexplorer.com</p>
                        <p>Phone: 518-264-7890</p>
                        <p>Address: 1400 Washington Ave, Albany, USA</p>
                    </div>
                    <div className="col-lg-6 text-lg-right">
                        <h5>Follow Us</h5>
                        <a href="#" className="text-white me-2"><i className="fab fa-facebook-f"></i></a>
                        <a href="#" className="text-white me-2"><i className="fab fa-twitter"></i></a>
                        <a href="#" className="text-white me-2"><i className="fab fa-instagram"></i></a>
                        <a href="#" className="text-white me-2"><i className="fab fa-linkedin-in"></i></a>
                    </div>
                </div>
                <hr className="my-2" />
                <p>&copy; 2024 Event Explorer. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
