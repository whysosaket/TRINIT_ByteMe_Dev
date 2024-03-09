import {createContext, useEffect, useState} from "react";
const SearchContext = createContext<any>({});
import { toast } from "react-toastify";
let url = import.meta.env.VITE_URL;

const SearchState = (props: any) => {

    const [search, setSearch] = useState("");
    const [price, setPrice] = useState(700);
    const [duration, setDuration] = useState(0);
    const [classes, setClasses] = useState([] as any);

    useEffect(() => {
        const fetchClasses = async () => {
            const data = await searchClasses();
        };
        fetchClasses();
    }, [search, price, duration]);

    const toastMessage = (message: string, type: string) => {
        if (type === "success") toast.success(message);
        else if (type === "error") toast.error(message);
        else if (type === "warning") toast.warning(message);
        else toast.info(message);
    };

    const searchClasses = async () => {
        try{
            const res = await fetch(`${url}/api/search/getclasses`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({search, price, duration}),
            });
            const data = await res.json();
            if(data.success){
                console.log(data.classes);
                setClasses(data.classes);
            }
            else{
                toastMessage(data.message, "error");
            }
        }catch(err){
            console.log(err);
            toastMessage("Server Error", "error");
        }
    }

    return (
        <SearchContext.Provider value={{toastMessage, searchClasses, setSearch, setDuration, setPrice, price, classes}}>
        {props.children}
        </SearchContext.Provider>
    )
}


export default SearchContext;
export {SearchState};