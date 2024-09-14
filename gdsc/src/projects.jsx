import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export function Project(){
    const [project,setProject] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3000/dashboard/projects')
        .then(response => response.json())
        .then(data => {
            console.log(data);
            setProject(data)
        })
        .catch(err=>{
            console.log(err);
        })
    }, []);
    
    
    const deleteit = (id) => {
        fetch(`http://localhost:3000/dashboard/projects/${id}`, {
            method: 'DELETE'
            })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setProject(project.filter(project => project.name !== id))
                })
            .catch(err => {
                console.log(err);
        })
    }

    return (
        <div>
            <h1>Projects</h1>
            <div className='lists'>
                {
                project.map((pr,index)=>{
                    return (
                        <div key={index} className='innerlist'>
                            <div>{pr.name}</div>
                            <div>{pr.link}</div>
                            <div>{pr.photo}</div>
                            <button type="button" onClick={()=>deleteit(pr.name)}>delete</button>
                        </div>
                    )
                })
                }
            </div>
            <Link to="/dashboard">Go to Dashboard</Link>
        </div>
    )
}
