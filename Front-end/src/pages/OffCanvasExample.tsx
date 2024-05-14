import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const OffCanvasExample = () => {
    const [showSidebar, setShowSidebar] = useState(false);

    const toggleSidebar = () => {
        setShowSidebar(!showSidebar);
    };

    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="col">
                        <button className="btn btn-primary" onClick={toggleSidebar}>
                            My Account
                        </button>
                    </div>
                </div>
            </div>
            <div className={`offcanvas offcanvas-start ${showSidebar ? 'show' : ''}`} id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">
                <div className="offcanvas-header">
                    <h5 className="offcanvas-title" id="offcanvasExampleLabel">Events</h5>
                    <button type="button" className="btn-close text-reset" onClick={toggleSidebar}></button>
                </div>
                <div className="offcanvas-body">
                    <ul className="list-group">
                        <li className="list-group-item">Event 1</li>
                        <li className="list-group-item">Event 2</li>
                        <li className="list-group-item">Event 3</li>
                    </ul>
                </div>
            </div>
        </>
    );
};

export default OffCanvasExample;
