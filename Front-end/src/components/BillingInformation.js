import React, { useState } from 'react';
import {Modal, Button, Card, Row, Col, Container} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import cc from '../assests/credit_card.png'
import '../styles/billingInformation.css'

function BillingInformation() {

    const [showForm, setShowForm] = useState(false);
    const [showApplePay, setShowApplePay] = useState(false);
    const [showPaypal, setShowPaypal] = useState(false);


    const handleCreditCardClick = () => {
        setShowForm(true);
    };
    const handleApplePay = () => {
        setShowForm(false);
        setShowApplePay(true);
    };

    const handlePaypal = () => {
        setShowForm(false);
        setShowApplePay(false);
        setShowPaypal(true);
    };


    return (
        <>

            <div className="container-billing">
                <div className="payment-method">
                    <p>Payment Method</p>
                </div>
                <div className="payment-options">
                    <div className="credit-card-cc" onClick={handleCreditCardClick}>
                        <p>Credit Card</p>
                        {/* Add your credit card content here */}
                    </div>
                    <div className="credit-card-apple" onClick={handleApplePay}>
                        <p>Apple Pay</p>
                        {/* Add your Apple Pay content here */}
                    </div>
                </div>
                {showForm && (
                    <div className="credit-card-form">
                        {/* Add your credit card form here */}
                        Form will be displayed here...
                    </div>
                )}
                {showApplePay && (
                    <div className="apple-form">
                        {/* Add your credit card form here */}
                        <p>You need to have a safari browser</p>
                    </div>
                )}
            </div>

            {/*<div className="container-billing">*/}

            {/*    <div className="payment-method">*/}
            {/*        <p>Payment Method</p>*/}
            {/*    </div>*/}
            {/*    <br/>*/}
            {/*    <div className="credit-card-cc">*/}

            {/*        <p>credit card</p>*/}
            {/*        <br/>*/}
            {/*    </div>*/}
            {/*    <div className="credit-card-apple">*/}

            {/*        <p>Apple Pay</p>*/}
            {/*        <br/>*/}
            {/*    </div>*/}

            {/*</div>*/}
            <br/>
        </>
    );
}

export default BillingInformation;



