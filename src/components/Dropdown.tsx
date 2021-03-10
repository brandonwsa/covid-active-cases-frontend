import React from 'react';
import { useState, useContext } from 'react';
import {State} from "../interfaces/state";
import {stateContext} from '../contexts/stateContext'



const Dropdown: React.FC = () => {

    const {state, abbr, setState} = useContext(stateContext);

    //all the states.
    const [states] = useState([
        {state: "Alabama", abbr: "AL"},
        {state: "Alaska", abbr: "AK"},
        {state: "Arizona", abbr: "AZ"},
        {state: "Arkansas", abbr: "AR"},
        {state: "California", abbr: "CA"},
        {state: "Colorado", abbr: "CO"},
        {state: "Connecticut", abbr: "CT"},
        {state: "Delaware", abbr: "DE"},
        {state: "District of Columbia", abbr: "DC"},
        {state: "Florida", abbr: "FL"},
        {state: "Georgia", abbr: "GA"},
        {state: "Hawaii", abbr: "HI"},
        {state: "Idaho", abbr: "ID"},
        {state: "Illinois", abbr: "IL"},
        {state: "Indiana", abbr: "IN"},
        {state: "Iowa", abbr: "IA"},
        {state: "Kansas", abbr: "KS"},
        {state: "Kentucky", abbr: "KY"},
        {state: "Louisiana", abbr: "LA"},
        {state: "Maine", abbr: "ME"},
        {state: "Maryland", abbr: "MD"},
        {state: "Massachusetts", abbr: "MA"},
        {state: "Michigan", abbr: "MI"},
        {state: "Minnesota", abbr: "MN"},
        {state: "Mississippi", abbr: "MS"},
        {state: "Missouri", abbr: "MO"},
        {state: "Montana", abbr: "MT"},
        {state: "Nebraska", abbr: "NE"},
        {state: "Nevada", abbr: "NV"},
        {state: "New Hampshire", abbr: "NH"},
        {state: "New Jersey", abbr: "NJ"},
        {state: "New Mexico", abbr: "NM"},
        {state: "New York", abbr: "NY"},
        {state: "North Carolina", abbr: "NC"},
        {state: "North Dakota", abbr: "ND"},
        {state: "Ohio", abbr: "OH"},
        {state: "Oklahoma", abbr: "OK"},
        {state: "Oregon", abbr: "OR"},
        {state: "Pennsylvania", abbr: "PA"},
        {state: "Rhode Island", abbr: "RI"},
        {state: "South Carolina", abbr: "SC"},
        {state: "South Dakota", abbr: "SD"},
        {state: "Tennessee", abbr: "TN"},
        {state: "Texas", abbr: "TX"},
        {state: "Utah", abbr: "UT"},
        {state: "Vermont", abbr: "VT"},
        {state: "Virginia", abbr: "VA"},
        {state: "Washington", abbr: "WA"},
        {state: "West Virginia", abbr: "WV"},
        {state: "Wisconsin", abbr: "WI"},
        {state: "Wyoming", abbr: "WY"},
    ])



    return(
        <div>
            {state === "" ? (
                <h2>Select a state to see new Positive Case Increases per day from the last two weeks for that state.</h2>
            ) : (
                <h2>New Positive Case Increases per day from the last two weeks in {state}: </h2>
            )}
            
            <p>All data is based off of CDC's API. The numbers from the API also include propable cases as well and so does this application.</p>
            <p>Population data is from: https://www.infoplease.com/us/states/state-population-by-rank</p>
            <select className="float-right btn btn-sm btn-outline-dark dropdown-toggle"
                    value={abbr}
                    onChange={(e) => setState({
                        state: e.target.options[e.target.selectedIndex].text,
                        abbr: e.currentTarget.value,
                        setState: (): void => {}
                    })}
            >
                <option defaultValue=""></option>
                {states.map(
                    (s: State) =>{
                        return(
                            <option key={s.state} value={s.abbr}>{s.state}</option>
                        );
                    }
                )}
                
            </select> 
            <h4 className="float-right">Select State: &nbsp;</h4>
            
        </div>
    );
}

export default Dropdown;