import { useRef, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import ReCAPTCHA from "react-google-recaptcha";

export function Signup() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confpassword, setConfPassword] = useState("");
    const [name, setName] = useState("");
    const [value, setValue] = useState("student");
    const [secret, setSecret] = useState("");
    const [captcha, setCaptcha] = useState("");

    const captchaRef = useRef();
    const navigate = useNavigate();
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        captchaRef.current.reset();

        if (!email || !password || !name) {
            alert("Please fill all the details.");
            return;
        }
        
        if (value === "admin" && secret !== "Secret") {
            alert("Please enter the correct Secret.");
            return;
        }
        
        if (password !== confpassword) {
            alert("Password and confirmation password do not match.");
            return;
        }
        
        try {
            const res = await fetch('http://localhost:3000/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, password, confpassword, value, captcha })
            });
            const result = await res.text();
            if (result === "user already exists") {
                alert("User already exists. Go to the login page.");
                navigate('/signin');
            } else if (result === "invalid email or password") {
                alert("Email or password is incorrect.");
            } else if (result === "captcha verification failed" || result === "invalid captcha") {
                alert("Captcha verification failed.");
            } else {
                alert("Signup successful.");
                navigate('/signin');
            }
        } catch (err) {
            console.error("Signup error:", err);
            alert("Signup error. Please try again.");
        }
    };

    const handleCaptchaChange = (value) => {
        setCaptcha(value);
    };

    return (
        <div className="container">
            <h2>Sign-Up with Your Credentials</h2>
            <form onSubmit={handleSubmit}>  
                <div className="square">
                    <div className="dropdown">
                        <select value={value} onChange={(e) => setValue(e.target.value)}>
                            <option value="student">Student</option>
                            <option value="admin">Admin</option>
                        </select>
                    </div>
                    
                    {value === "admin" && (
                        <input
                            type="text"
                            placeholder="Enter Secret"
                            value={secret}
                            onChange={(e) => setSecret(e.target.value)}
                        />
                    )}

                    <div className="i">
                        <label htmlFor="name">Name</label>
                        <input
                            id="name"
                            type="text"
                            placeholder="Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>

                    <div className="i">
                        <label htmlFor="email">Email</label>
                        <input
                            id="email"
                            type="text"
                            placeholder="Email ending with `@lnmiit.ac.in`"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div className="i">
                        <label htmlFor="password">Password</label>
                        <span className="small">(*Must contain an uppercase, lowercase, number, special character)</span>
                        <input
                            id="password"
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <div className="i">
                        <label htmlFor="confpassword">Confirm Password</label>
                        <input
                            id="confpassword"
                            type="password"
                            placeholder="Confirm Password"
                            value={confpassword}
                            onChange={(e) => setConfPassword(e.target.value)}
                        />
                    </div>
                    
                    <ReCAPTCHA
                        sitekey="6LeKUkMqAAAAAM9P9CtdCT_Xg18Q_tylR01p8yzg"
                        onChange={handleCaptchaChange}
                        ref={captchaRef}
                    />
                    
                    <button type="submit">Sign Up</button>
                    
                    <div className="bottom">
                        Already have an account? 
                        <button><Link to="/signin">Sign In</Link></button>
                    </div>
                </div>
            </form>
        </div>
    );
}
