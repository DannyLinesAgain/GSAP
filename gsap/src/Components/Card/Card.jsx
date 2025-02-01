import React from "react";
import './card.css';

const Card = () => {
    return(
        <>
            <div className="card-wrapper">
                <div className="card-title">
                    <span>Card Title</span>
                </div>
                <div className="card-img-wrapper">
                    <div className="card-img" />
                </div>
            </div>
        </>
    )
}

export default Card;