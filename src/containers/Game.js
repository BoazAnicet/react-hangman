import React, { Component } from 'react'
import Keyboard from '../components/Keyboard'
import words from '../words.json'
import '../sass/main.scss'

class Game extends Component {
  state = {
    word: '',
    clicked: [],
    correct: [],
    incorrect: 0,
    gameOver: false
  }

  componentDidMount = () => {
    this.newGame()
  }

  newGame = () => {
    this.setState({
      word: words[Math.floor(Math.random() * words.length)],
      clicked: [],
      correct: [],
      incorrect: 0,
      gameOver: false
    })
  }

  renderWord = () => {
    let word = this.state.word.split('').map((char, index) => {
      if(this.state.correct.includes(index)) {
        return <div className='character' key={index}>{char.toUpperCase()}</div>
      } else if(this.state.gameOver) {
        return <div className='character character--opaque'>{char.toUpperCase()}</div>
      }
      return <div className='character' key={index}></div>
    })
    return word
  }

  onClick = async key => {
    this.setState({ clicked: [...this.state.clicked, key].sort() })

    if(this.state.word.indexOf(key) >= 0){
      let index = this.state.word.indexOf(key)
      let indexes = []
  
      while (index >= 0) {
        console.log(index)
        indexes.push(index)
        index = this.state.word.indexOf(key, index + 1)
      }
      await this.setState({ correct: [...this.state.correct, ...indexes].sort()})    
    } else {
      await this.setState({ incorrect: this.state.incorrect + 1})
    }
    await this.endGame()
  }

  endGame = () => {
    const { incorrect, correct, word } = this.state
    if(incorrect >= 6 || correct.length === word.length) {
      this.setState({ gameOver: true })
    }
  }

  renderKeyboard = () => {
    if(!this.state.gameOver) {
      return (
        <Keyboard
          onClick={this.onClick}
          clicked={this.state.clicked}
        />
      )
    }
    return <div>Game over!</div>
  }

  render() {
    return (
      <div className='game'>
        <div className='turns'>
          <div>Turns: {6 - this.state.incorrect}</div>
          <button className="btn" onClick={() => this.newGame()}>New Game</button>
        </div>
        <div className='word'>
          {this.renderWord()}
        </div>
        <div className='container'>
          {this.renderKeyboard()}
        </div>
      </div>
    )
  }
}

export default Game
