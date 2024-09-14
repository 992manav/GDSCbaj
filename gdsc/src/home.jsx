import { Link } from "react-router-dom"
import { useState } from "react"

export function Home(){

    return(
        <div>
            <h1>HOME-PAGE</h1>
            <Link to='/signup'>Click here to Sign-up</Link>
            <br />
            <br />
            <Link to='/signin'>Click here to Sign-in</Link>
        </div>
    )
}
