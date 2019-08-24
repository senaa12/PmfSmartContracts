import React, {useState, useEffect} from "react";
import ReactDOM from "react-dom";

import "./portal.scss";


export default function Portal(props) {
    const [portal, openPortal] = useState(null);

    useEffect(() => {
        openPortal(
            props.isOpen ?
            ReactDOM.createPortal(portalContent, document.body) :
            null
        )
    }, [props.isOpen]);

    const calculateTitle = () => {
        return typeof(props.content) === "string" ? "test" : "Your transaction is processed!";
    }

    const portalContent = 
        <div className="background">
            <div className="portal">
                <span className="title">{calculateTitle()}</span>
                <div className="body">{props.content}</div>
                <button 
                    type="button" 
                    className="close-button btn btn-primary" 
                    onClick={()=>props.closePortal(false)}>CLOSE
                </button>
            </div>
        </div>;

    return portal;
}