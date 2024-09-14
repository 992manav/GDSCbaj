import { useState } from "react";
import { useNavigate,Link } from "react-router-dom"


export function Signin(){

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [value,setValue] = useState("student");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(!email || !password){
            alert("please fill all the details")
        }
        try{
            const res = await fetch("http://localhost:3000/signin", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                    body: JSON.stringify({email,password,value}),
            })
            const result = await res.text();
                if(result === "okay"){
                    alert('signedin succesfuly')
                    navigate("/dashboard")
                }
                else{
                    console.log(result);
                    alert('email or password is incorrect')
                }
            }
        catch(err){
            console.error("error",err);
            alert("error occured");
        }
    }

    return(
        <div>
            <h2>SIGN-IN to your account</h2>
            <form onSubmit={handleSubmit}>
                <div className="squaresign">

                   <div key="value" className="dropdown">
                        <select value = {value} onChange={(e)=>{setValue(e.target.value)}}>
                            <option value="student">Student</option>
                            <option value="admin">Admin</option>
                        </select>
                    </div>

                    <div key="email" className="i">
                        <span>email</span>
                        <input type="text" placeholder="email" onChange={(e)=>{
                            setEmail(e.target.value);
                        }}/>
                    </div>

                    <div key="password" className="i">
                        <span>password</span>
                        <input type="password" placeholder="password" onChange={(e)=>{
                            setPassword(e.target.value);
                        }}/>
                    </div>
                    
                    <button type="submit">Sign-in</button>
                    <br />
                    <div className="button">
                        DONT have an account ?
                        <button><Link to="/signup">Signup</Link></button>
                        
                    </div>
                </div>
            </form>
        </div>
    )
}