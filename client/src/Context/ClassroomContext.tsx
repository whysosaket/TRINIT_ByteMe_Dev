import {createContext, useState} from "react";
const ClassroomContext= createContext<any>({});
import { toast } from "react-toastify";
let url = import.meta.env.VITE_URL;

const ClassroomState = (props: any) => {

    // const [isAuthenticated, setIsAuthenticated] = useState(false);


    const toastMessage = (message: string, type: string) => {
        if (type === "success") toast.success(message);
        else if (type === "error") toast.error(message);
        else if (type === "warning") toast.warning(message);
        else toast.info(message);
    };

    const createClassroom = async (title: string, description: string, language: string, price: string[], duration: string[]) => {
        try {
            const response = await fetch(`${url}/api/class/create`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": localStorage.getItem("auth-token") as string
                },
                body: JSON.stringify({ title, description, language, price, duration }),
            });

            const data = await response.json();
            if (data.success) {
                toastMessage("Classroom Created Successfully", "success");
                return true;
            } else {
                toastMessage(data.error, "error");
                return false;
            }
        } catch (error) {
            console.log(error);
            toastMessage("Something went wrong!", "error");
        }
    };

    const getMyClasses = async () => {
        try {
            const response = await fetch(`${url}/api/class/getmyclasses`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": localStorage.getItem("auth-token") as string
                }
            });

            const data = await response.json();
            if (data.success) {
                return data.classes;
            } else {
                toastMessage(data.error, "error");
                return [];
            }
        } catch (error) {
            console.log(error);
            toastMessage("Something went wrong!", "error");
            return [];
        }
    }

    const getStudentSchedule = async () => {
        try{
            const response = await fetch(`${url}/api/schedule/getstudentschedule`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": localStorage.getItem("auth-token") as string
                }
            });

            const data = await response.json();
            if(data.success){
                return data.schedules;
            }else{
                toastMessage(data.error, "error");
                return [];
            }

        }   catch (error) {
            console.log(error);
            toastMessage("Something went wrong!", "error");
            return [];
        }
    }

    const getTeachersSchedule = async () => {
        try{
            const response = await fetch(`${url}/api/schedule/getteacherschedules`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": localStorage.getItem("auth-token") as string
                }
            });

            const data = await response.json();
            if(data.success){
                return data.schedules;
            }else{
                toastMessage(data.error, "error");
                return [];
            }

        }   catch (error) {
            console.log(error);
            toastMessage("Something went wrong!", "error");
            return [];
        }
    }


    return (
        <ClassroomContext.Provider value={{toastMessage, createClassroom, getMyClasses, getStudentSchedule, getTeachersSchedule}}>
        {props.children}
        </ClassroomContext.Provider>
    )
}

export default ClassroomContext;
export {ClassroomState};