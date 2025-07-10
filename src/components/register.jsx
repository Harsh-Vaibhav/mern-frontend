import './register.css';
import { useState } from 'react';
import { useRef } from 'react';
import axios from "axios";
export default function Register(){
    const firstName = useRef();
    const lastName = useRef();
    const email = useRef();
    const password = useRef();
    // const handleSubmit=()=>{
    //     const User{

    //     }
    // }
    // const [user, setUser] = useState({});
    // const handleSubmit = () => {
    //     console.log(user);
    // }
    return (
        <div className ="App-Register-Row">
            <div style={{backgroundColor:"white"}}>
            <h2>Registration Form</h2>
            <p>
                <input type="text" onChange={(e) => setUser({ ...user, firstName: e.target.value})} placeholder="Enter first name"/>
            </p>
            <p>
                <input type="text" onChange={(e) => setUser({ ...user, lastName: e.target.value})} placeholder="Enter last name"/>
            </p>
            <p>
                <input type="email" onChange={(e) => setUser({ ...user, email: e.target.value})} placeholder="Enter email"/>
            </p>
            <p>
                <input type="password" onChange={(e) => setUser({ ...user, password: e.target.value})} placeholder="Enter the password"/>
            </p>
            <button onClick={handleSubmit}>Submit</button>
            </div>
        </div>
    );
};