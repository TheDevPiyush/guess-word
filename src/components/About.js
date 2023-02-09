import React, { Component } from 'react'

export default class About extends Component {
    render() {
        return (
            <>
                <div className="container my-3 border border-black border-3">

                    <p className=' fw-bold fs-3  container '>
                        Hello!! This is a simple Game inspired by a poplar browser game <a  href='https://www.nytimes.com/games/wordle/index.html?external=true' target="_blank" rel="noreferrer">Wordle</a><br />
                    </p>
                    <p className='container fs-5 my-5'>
                    Hi <b>I'm Piyush.</b> I have coded this WebApp as a ReactJs project. Hope you like it.
                    </p>

                    <a href='mailto:contactpiyushhere@gmail.com'><button className='btn btn-warning mx-3 my-4'>Contact me regarding coding services.</button></a>
                </div>


            </>
        )
    }
}
