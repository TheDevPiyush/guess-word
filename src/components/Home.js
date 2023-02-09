import React, { Component } from 'react'
import { Link } from 'react-router-dom'

let firstLetter = "";
let FourthLetter = "";
let SixthLetter = "";
let EighthLetter = "";
let lastLetter = ""


export default class Home extends Component {



    constructor(props) {
        super(props)
        this.state = {
            word: "",
            definition: "",
            width: "0%",
            inputValue: '',
            score: 0,
            qno: -1
        }
    }

    async componentDidMount() {
        await this.giveDefinition();
    }

    giveDefinition = async () => {
        this.setState({ width: "5%" })
        let randomWord = await fetch("https://random-word-api.herokuapp.com/word");
        let data = await (randomWord.json())
        this.setState({ word: data[0] })
        this.setState({ width: "20%" })

        setTimeout(async () => {
            try {
                this.setState({ qno: this.state.qno + 1 })
                let definition1 = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${this.state.word}`)
                let definitionData = await (definition1.json())
                this.setState({ definition: definitionData['0'].meanings[0].definitions[0].definition })
                const str = this.state.word

                if (str.length < 5) {
                    firstLetter = str.charAt(0)
                    lastLetter = str.charAt(str.length - 1)
                }
                else if (str.length >= 5 && str.length <= 9) {
                    firstLetter = str.charAt(0)
                    FourthLetter = str.charAt(3)
                    lastLetter = str.charAt(str.length - 1)
                }
                else if (str.length >= 10) {
                    firstLetter = str.charAt(0)
                    FourthLetter = str.charAt(3)
                    SixthLetter = str.charAt(5)
                    EighthLetter = str.charAt(7)
                    lastLetter = str.charAt(str.length - 1)
                }
                this.setState({ width: "100%" })
            }
            catch {
                console.log("EXTREME APOLOGIES FOR THIS. I'M using a free API service.")
                this.setState({ definition: "***Hint is not available for this word. Click 'Next Word' Again. Reload the page in case of repeated message. \n My Apologies.***" })
                this.setState({ width: "100%" })
            }
        }, 2200);
    }


    onChangeValue = (event) => {
        let value = event.target.value
        console.log("You have typed : ", value)
        this.setState({ inputValue: value })

    }

    checkValueOnButton = () => {
        if (this.state.word === this.state.inputValue.toLowerCase().replace(/ /g, '')) {
            if (window.confirm("Good Job!! Correct Answer.\nGo To Next Question?")) {
                this.setState({ score: this.state.score + 1 })
                document.getElementById("exampleInputEmail1").value = '';
                this.giveDefinition()
            }
        }
        else {
            alert("Oopss!! Wrong Answer. Try Again.")
        }

    }

    seeAnswer = () => {
        alert(`The word is : ${this.state.word}`)
        this.setState({ score: this.state.score - 1 })
        console.log("The Answer is :", this.state.word)
    }


    render() {
        return (
            <>
                <div className="progress fixed-top">
                    <div className="progress-bar" role="progressbar" aria-label="Example with label" style={{ "width": this.state.width, "height": "12px" }} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
                </div>

                <div className="main">

                    <div className="jumbotron container border border-5 border-black">
                        <h1 className="display-4 my-2 fw-bold">Hello!! Welcome to Wordy :)</h1>
                        <hr className="my-4" />
                        <p className='my-2 fs-5 fw-bold'>Q{this.state.qno}: {this.state.definition}</p>

                        <div className="d-flex justify-content-between">
                            <p className="lead align-self-start">
                                <Link className="btn btn-warning fw-bold btn-lg my-2" to="/" onClick={this.giveDefinition} role="button">Next Word</Link>
                            </p>
                            <p className="lead align-self-end ">
                                <Link className="btn btn-primary fw-bold btn-lg my-2 " to="/" onClick={this.seeAnswer} role="button">See Answer</Link>
                            </p>
                        </div>
                    </div>

                    <div className="container my-5 border border-5 border-black ">
                        <div className="d-flex justify-content-between">
                            <div className="align-self-start">
                                <label htmlFor="exampleInputEmail1 col" className="form-label fw-bold fs-5"><u>Guess Your Word : </u></label>
                            </div>

                            <div className="align-self-end">
                                <label htmlFor="exampleInputEmail1 col" className="form-label fw-bold fs-5"><u>Score : {this.state.score} </u></label>
                            </div>
                        </div>

                        <div className="container my-3 d-flex justify-content-between">
                            <input type="text" style={{ "textAlign": "center", "height": "80px" }} placeholder='Enter your answer' onChange={this.onChangeValue} className="form-control border-5 border-danger mx-2 fw-bold fs-4" id="exampleInputEmail1" aria-describedby="emailHelp"></input>
                            <button type="button" onClick={this.checkValueOnButton} className="btn mx-2 fw-bold fs-3 align-self-end my-3 btn-info">Enter</button>
                        </div>

                        <p className="">Available Letters For You :</p>
                        <p className="fw-bold text-muted">First Letter = {firstLetter}</p>
                        <p className="fw-bold text-muted">Fourth Letter = {FourthLetter}</p>
                        <p className="fw-bold text-muted">Sixth Letter = {SixthLetter}</p>
                        <p className="fw-bold text-muted">Eighth Letter = {EighthLetter}</p>
                        <p className="fw-bold text-muted">Last Letter = {lastLetter}</p>

                    </div>
                </div>
            </>
        )
    }
}
