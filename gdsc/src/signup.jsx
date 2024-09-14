import { useRef, useState } from "react"
import { useNavigate,Link } from "react-router-dom"
import ReCAPTCHA from "react-google-recaptcha";

export function Signup(){
    
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confpassword, setconfPassword] = useState("");
    const [name, setName] = useState("");
    const [value,setValue] = useState("student");
    const [secret,setSecret] = useState("Secret");
    const [captcha , setcaptcha] = useState("");

    const captcharef = useRef();
    const navigate = useNavigate();
    
    const Secret = "Secret";
    
    const handleSubmit= async (e)=>{
        e.preventDefault();

        captcharef.current.reset();

        if(!email || !password || !name){
            alert("please fill all the deatils")
        }
        else if(secret !== Secret){
            alert("please enter the correct Secret");
        }
        else{
            try{
                const res = await fetch('http://localhost:3000/signup',{
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ name,email,password,confpassword,value,captcha})
                })
                const result = await res.text();
                console.log(result)
                if(result === "user allready exist"){
                    alert("user allready exist, Go to login page")
                    navigate('/signin')
                }
                else if(result === "invalid email or password"){
                    alert("email or password is wrong");
                }
                else if(result === "password and confirmpassword does not match"){
                    alert("password and confirmpassword does not match")
                }
                else if(result === "captcha verification failed" || result === "invalid captcha"){
                    alert("captcha verification failed")
                }
                else{
                    alert("Signup successfull")
                    navigate('/signin')
                }   
            }    
            catch(err){
                console.error("error singup",err);
                alert("error signup")
            }
        }
    }

    const onchange = value=>{
        setcaptcha(value);
    }
    return(
        <div className="container">
            <h2>SIGN-UP with your credentials</h2>
            <form onSubmit={handleSubmit}>  
                <div className="square">
                    
                    <div key="value" className="dropdown">
                        <select value = {value} onChange={(e)=>{setValue(e.target.value)}}>
                            <option value="student">Student</option>
                            <option value="admin">Admin</option>
                        </select>
                    </div>
                    
                    {value === "admin" ? <input type="text" placeholder="enter Secret" onChange={(e)=>{
                        setSecret(e.target.value);
                    }}></input> : null}
    
                    <div key="name" className="i">
                        <span>Name</span>
                        <input type="text" placeholder="name" onChange={(e)=>{
                            setName(e.target.value)}}/>
                    </div>

                    <div key="email" className="i">
                        <span>Email</span>
                        <input type="text" placeholder="email ending with `@lnmiit.ac.in`" onChange={(e)=>{
                            setEmail(e.target.value);
                        }}/>
                    </div>

                    <div key="password" className="i">
                        <span>Password</span>
                        <span className="small">(*must contain an uppercase,lowercase,number,special character)</span>
                        <input type="password" placeholder="password" onChange={(e)=>{
                            setPassword(e.target.value);
                        }}/>
                    </div>

                    <div key="confpassword" className="i">
                        <span>Confirm Password</span>
                        <input type="password" placeholder="confirm password" onChange={(e)=>{
                            setconfPassword(e.target.value);
                        }}/>
                    </div>
                    <div>
                        <ReCAPTCHA
                            //6LcfCBoqAAAAAKIt5e3aAPzK7L0BBEZ95FxSv7aH
                            sitekey="6Ld2hR0qAAAAAA4TsIo89ZVsyyEsLDRfReG47U6T"
                            onChange={onchange}
                            ref={captcharef}
                        />
                    </div>
                    <button type="submit">Sign-up</button>
                    
                    <div className="bottom">
                        allready have an account ? 
                        <button><Link to="/signin">Sing-in</Link></button>
                    </div>
                </div>
            </form>
        </div>
    )   
}