import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class About extends Component {
    render() {
        return (
            <div>
                <article>
                    <h1>MSN - MTVDB</h1>
                    <p>
                        Welcome to our web-app! This is a platform where you would be able to search for movies and tv shows that you have in mind, keep track of what you have watched and what you want to watch, 
                        submit your own ratings for each title, and most importantly, you'll be able to know on which platform you can watch it without jumping through all the hoops that is the search engine!
                        We hope you like this app!
                    </p><br></br>

                    <p>
                        If you would like to try out app out, please go to our <Link to='/search'>Search Page</Link>. Clicking on any of the search results will take you to a detail page of that result.
                        You'll find more info about the title and where you can watch it.
                    </p><br></br>

                    <p>
                        If you would like to register in order to enjoy the full function of our application, please register <Link to='/register'>Here</Link>
                    </p><br></br>


                    <h2>Technologies used for this project</h2>
                    <ul>
                        <li><span role="img" aria-label="tech">Express JS</span></li>
                        <li><span role="img" aria-label="tech">React</span></li>
                        <li><span role="img" aria-label="tech">PSQL</span></li>
                        <li><span role="img" aria-label="tech">CSS</span></li>
                        <li><span role="img" aria-label="tech">🖥️</span></li>
                    </ul>
                    <p>

                    </p>
                    <h2>Team</h2>
                    <h3><span role="img" aria-label="dream">💭</span> Dream team <span role="img" aria-label="dream">💭</span></h3>
                    <ul>
                        <li><span role="img" aria-label="fire">💥</span> Matthew</li>
                        <li><span role="img" aria-label="fire">💥</span> Sophia</li>
                        <li><span role="img" aria-label="fire">💥</span> Niso</li>
                    </ul>
                </article>
            </div>
        )
    }
}