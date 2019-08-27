import React, {useState, useEffect} from "react";
import ReactDOM from "react-dom";
import { usePortal } from "../../entities";

import "./portal.scss";


export default function Portal(props) {
    const [ portal, { closePortal }] = usePortal();

    const [portalElement, openPortal] = useState(null);

    useEffect(() => {
        openPortal(
            portal.showPortal ?
            ReactDOM.createPortal(portalContent, document.body) :
            null
        )
    }, [portal.showPortal]);


    const portalContent = 
        <div className="background">
            <div className="portal">
                <span className="title">{portal.portalTitle}</span>
                <div className="body">{portal.portalContent}</div>
                <button 
                    type="button" 
                    className="close-button btn btn-primary" 
                    onClick={closePortal}>CLOSE
                </button>
            </div>
        </div>;

    return portalElement;
}