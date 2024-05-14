import React, {useEffect, useState} from 'react';
import '../styles/creditcardform.css';
import axios from "axios";

const CreditCardForm = ({data, onDeleteCard}) => {

    const sessionEmail = sessionStorage.getItem("email");

    const creditActions = sessionStorage.getItem("credit-card-actions");

    const[isCreditActionNeed, setIsCreditActionNeed]=  useState(true)



    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`/v1/customers/${sessionEmail}/billing-info/has-credit-card`);


                sessionStorage.setItem("banKNameSession", JSON.stringify(response.data.bankName));


            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);



    const handleDelete = async () => {


        try {
            const response = await axios.delete(`/v1/customers/${sessionEmail}/credit-card`);

            onDeleteCard();


        }catch (error){


            console.log(error.response.data)
        }


    };


    return (
        <div className="credit-card">
            <div className="credit-card__number">{data.cardNumber}</div>
            <div className="credit-card__info">
                <div className="credit-card__expiry">{data.expiryDate}</div>
                <div className="credit-card__bank">{data.bankName}</div>
                <div className="credit-card__cvv">{data.cvv}</div>
            </div>
            <div className="credit-card__name">{data.cardHolderName}</div>
            {isCreditActionNeed &&
                <div className="credit-card__actions">
                    <a href="/billing" className="credit-card__delete" onClick={handleDelete}>Delete</a>
                </div>
            }
        </div>
    );
};

export default CreditCardForm;