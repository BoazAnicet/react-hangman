import React, { Component } from 'react'

class Keyboard extends Component {
  state = {
    rowOne: 'qwertyuiop'.split(''),
    rowTwo: 'asdfghjkl'.split(''),
    rowThree: 'zxcvbnm'.split('')
  }

  renderKeys = row => {
    return row.map((key, index) => {
      if(this.props.clicked.includes(key)) {
        return (
          <div key={index} className='key key--disabled'>
            {key.toUpperCase()}
          </div>
          )
      } else {
        return (
          <div key={index} className='key' onClick={() => this.props.onClick(key)}>
            {key.toUpperCase()}
          </div>
        )
      }
    })
  }

  render() {
    return (
      <div className='keyboard'>
        <div className='row'>
          {this.renderKeys(this.state.rowOne)}
        </div>
        <div className='row'>
          {this.renderKeys(this.state.rowTwo)}
        </div>
        <div className='row'>
          {this.renderKeys(this.state.rowThree)}
        </div>
      </div>
    )
  }
}

export default Keyboard