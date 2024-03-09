import {createContext, useState} from "react";
const GlobalContext = createContext<any>({});
import { toast } from "react-toastify";
// let url = import.meta.env.VITE_URL;

const GlobalState = (props: any) => {

    // const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);


    const toastMessage = (message: string, type: string) => {
        if (type === "success") toast.success(message);
        else if (type === "error") toast.error(message);
        else if (type === "warning") toast.warning(message);
        else toast.info(message);
    };





    return (
        <GlobalContext.Provider value={{toastMessage, isMenuOpen, setIsMenuOpen}}>
        {props.children}
        </GlobalContext.Provider>
    )
}

export default GlobalContext;
export {GlobalState};