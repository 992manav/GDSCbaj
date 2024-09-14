import { Link } from "react-router-dom";
import { useState } from "react";

export function Create(){

    const [name , setname] = useState("");
    const [photo, setPhoto] = useState("");
    const [link, setLink] = useState("");

    const handleSubmit = async (e)=>{
        e.preventDefault();
        if(!name || !link){
            alert("Please fill all the fields");
        }
        else{
            try{    
                const res = await fetch('http://localhost:3000/dashboard/create',{
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ name,photo,link })
                })
                alert("created successfully")
            }
            catch(err){
                console.error("error creating",err);
                alert("error creating")
            }
        }
    };
    return(
        <div>
            <h2>Create a new project</h2>
            <form onSubmit={handleSubmit}>
                <label>Project Name:</label>
                <input type="text" name="name" placeholder="Enter project name" onChange={(e)=>{
                    setname(e.target.value);
                }}/>
                <br />
                <label>Upload Photo:</label>
                <input type="text" name="photo" onChange={(e)=>{
                    setPhoto(e.target.value);
                }}/>
                <br />
                <label>Github Link:</label>
                <input type="text" name="link" placeholder="Enter github link" onChange={(e)=>{
                    setLink(e.target.value)
                }}/>
                <br />
                <button type="submit">Submit</button>
            </form>
                <Link to="/dashboard">Go to Dashboard</Link>
        </div>
    )
}