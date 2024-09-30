import React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import io from 'socket.io-client';

// const socket = io("http://localhost:5000");

const Home = () => {
    const navigate = useNavigate();
    const [cookies, removeCookie] = useCookies(['token']);
    // const [username, setUsername] = useState("");
    // const [message, setMessage] = useState("");
    // const [messages, setMessages] = useState([]);

    const [inputValue, setIntputValue] = useState({
        name : "",
        message : ""
    })

    useEffect(() => {
        const verifyCookie = async () => {
            if(!(cookies).token){
                navigate("/login")
            }
    
            const {data} = await axios.post("http://localhost:5000", {}, {withCredentials: true});
            
            const {status, user} = data;
            // setUsername(user);
            
            return status ? 
                toast(`Hello ${user}`, {
                    position : "top-right"
                })
                : 
                (removeCookie("token", { path : '/'}));
        };
        verifyCookie();
    }, [cookies, navigate, removeCookie]);

    const handleOnChange = (e: any) : void => {
        const { name, value } = e.target;
        setIntputValue({
            ...inputValue,
            [name] : value
        })

        // console.log(inputValue);
    }


    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if(inputValue.name && inputValue.message){
            
            // socket.emit('sendMessage', {inputValue});
            setIntputValue({
                ...inputValue,
                name : "",
                message : ""
            })
        }
    }
    
    return(
        <>
            <form onSubmit={handleSubmit}>
                <input type="text" name="name" placeholder="Your name" onChange={handleOnChange} />
                <input type="text" name="message" placeholder="Your message" onChange={handleOnChange} />
                <button type="submit">Send</button>
            </form>
            <ul>
                {/* {messages.map((message, index) => (
                <li key={index}>
                    {message.name}: {message.message}
                </li>
                ))} */}
            </ul>
            <ToastContainer />
        </>
    );
}

export default Home;