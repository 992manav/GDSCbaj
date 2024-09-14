import { Link } from "react-router-dom"

export function Dashboard(){
    return(
        <div>
            <h2>Dashboard</h2>
            <div className="flex">
                <Link to="/dashboard/create">Create a new post</Link>
                <Link to="/dashboard/projects">View Projects</Link>
                <Link to='/signin'>Sign-out</Link>
            </div>
        </div>
    )   
}