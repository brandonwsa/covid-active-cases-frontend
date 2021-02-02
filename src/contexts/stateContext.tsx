import React, { Dispatch, SetStateAction } from "react";
import { useState } from "react";

/**
 * Allows access to state name and abbreviation from different components.
 * 
 * State Context holds: 
 *  state: string (name of state)
 *  abbr: string (state abbreviation)
 *  setState: Dispatch<SetStateAction<Context>> (setState method)
 */

type Context = {
    state: string;
    abbr: string;
    setState: Dispatch<SetStateAction<Context>>;
}

const initContext = {
    state: "",
    abbr: "",
    setState: (state: SetStateAction<Context>): void => {
        throw new Error('setState function must be overriden'); //incase someone forgets to override the function.
    },
};

//create the context
export const stateContext = React.createContext(initContext)

//create provider
const StateProvider: React.FC = ({children}) => {
    const [state, setState] = useState<Context>(initContext)

    return (
        <stateContext.Provider value={{...state, setState}}>
                {children}
        </stateContext.Provider>
    );
}

export default StateProvider;