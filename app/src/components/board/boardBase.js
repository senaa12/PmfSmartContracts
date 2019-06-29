import React from "react";
import Number from './numberFields/number';

import './boardBase.scss';
import appSettings from "../../utilities/appSettings";

export default function BoardBase(props) {
    const renderFields = (field) => {
        switch(field.id) {
            case 0:
                let className = "numbers-zero board-items " + field.data["background-color"];
                return (<div className={className} key={field.data[0].betID} onClick={() => props.onSelection(field.data[0].betID)}>
                            <div className="numberCircle zero-height-fix">{field.data[0].label}</div>
                        </div>)
            case 1:
                return <div key="numbers" className="numbers">
                        {field.data.map(num => 
                            <Number backgroundColor={num["background-color"]} label={num.label} key={num.betID} onSelection={props.onSelection} number={num.betID}/>)}
                        </div> 
            case 2:
                return <div key="2to1" className="two2one flex-cols">{field.data.map(num => 
                            <div className={"board-items item green"} key={num.betID} onClick={() => props.onSelection(num.betID)}>
                                {num.label}
                            </div>)}
                        </div>
            case 3:
                return <div key="first-row" className="twelfth flex-row">{field.data.map(num => 
                            <div className={"board-items item green"} key={num.betID} onClick={() => props.onSelection(num.betID)}>
                                {num.label}
                            </div>)}
                        </div>
            case 4: 
                return <div key="second-row" className="twelfth flex-row">{field.data.map(num => 
                            <div className={"board-items item-second " + field.data["background-color"]} key={num.betID} onClick={() => props.onSelection(num.betID)}>
                                {num.label}
                            </div>)}
                        </div>          
        }
    } 

    return (
        <div className="col-lg-9 col-md-12 board-base">
            {appSettings._boardModel.map(field => renderFields(field))}
        </div>
    );
}