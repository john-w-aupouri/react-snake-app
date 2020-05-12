import React, { Component } from 'react'
import Snake from "./components/Snake"
import Food from "./components/Food"
import './App.css'

const randomizeFoodLocation = () => {
  let min = 1;
  let max = 90;
  // floor and random make no decimal places
  let x = Math.floor((Math.random()*(max-min+1)+min)/2)*2;
  let y = Math.floor((Math.random()*(max-min+1)+min)/2)*2;
  return [x, y]
}

const initialState = {
  food: randomizeFoodLocation(),
  speed: 200,
  direction: "RIGHT",
  snakeDots: [
    [0, 0],
    [2, 0],
  ]
}

class App extends Component {

  state = initialState

  componentDidMount() {
    
    // document.onkeydown = this.onKeyDown
    // setInterval(this.moveSnake, this.state.speed)
    // document.onkeydown = this.onKeyDown
  }

  componentDidUpdate() {
    this.checkIfOutOfBorder()
    this.checkIfEat()
    this.checkIfCollapsed()
  }

  startGame = () => {
    document.onkeydown = this.onKeyDown
    setInterval(this.moveSnake, this.state.speed)
    document.onkeydown = this.onKeyDown
  }

  onKeyDown = (e) => {
  e = e || window.event
  switch (e.keyCode) {
    case 38:
      this.setState({direction: 'UP'})
      break
    case 40:
      this.setState({direction: 'DOWN'})
      break
    case 37:
      this.setState({direction: 'LEFT'})
      break
    case 39:
      this.setState({direction: 'RIGHT'})
      break
      default:
      break
    }
  }

  moveSnake = () => {
  let dots = [...this.state.snakeDots]
  let head = dots[dots.length -1]

  switch (this.state.direction) {
    case 'RIGHT':
      head = [head[0] + 2, head[1]]
      break
    case 'LEFT':
      head = [head[0] - 2, head[1]]
      break
    case 'DOWN':
      head = [head[0], head[1] +2]
      break
    case 'UP':
      head = [head[0], head[1] -2]
      break
      default:
      break
    }
    // Add dot to snakes head while removing one from it's tail when changing direction
    dots.push(head)
    dots.shift()
    this.setState({
      snakeDots: dots
    })
  }

  // Can find head by finding the last item of the snakeDots array 
  checkIfOutOfBorder() {
    let head = this.state.snakeDots[this.state.snakeDots.length -1]
    // If x & y coordinates are more or equal to 100 or less than 0 the game is over becoz the borders have been crossed
    if (head[0] >= 100 || head[1] >= 100 || head[0] < 0 || head[1] < 0) {
      this.onGameOver()
    }
  }

  // If head is equal to food then enlarge the snake
  checkIfEat() {
    let head = this.state.snakeDots[this.state.snakeDots.length - 1];
    let food = this.state.food;
    if (head[0] === food[0] && head[1] === food[1]) {
      this.setState({
        food: randomizeFoodLocation()
      })
      this.setState({
        food: randomizeFoodLocation()
      })
      this.enlargeSnake();
      this.increaseSpeed();
    }
  }
  
  // Get current position of snake, store head in seperate varaible and check wheather the head coordinates equals some of the bodies coordinates if so game over
  checkIfCollapsed() {
    let snake = [...this.state.snakeDots]
    let head = snake[snake.length - 1]
    // Use pop to remove head from snake (comparing head to head should always equal true)
    snake.pop()
    snake.forEach(dot => {
      if (head[0] === dot[0] && head[1] === dot[1]) {
        this.onGameOver()
      }
    })
  }

  // If head hits food then add another dot to snakeDots array then save to state
  enlargeSnake() {
    let newSnake = [...this.state.snakeDots];
    newSnake.unshift([])
    this.setState({
      snakeDots: newSnake
    })
  }

  // Increase speed if food is eaten
  increaseSpeed() {
    if (this.state.speed > 10) {
      this.setState({
        speed: this.state.speed + 1
      })
    }
  }

  onGameOver() {
    alert(`Game Over. Snake length is ${this.state.snakeDots.length}`)
    this.setState(initialState)
  }

  render() {
    return (
      <div className="App"> 
        <button
          style={{width: "10rem", height: "5rem", marginTop: "2rem"}}
          onClick={this.startGame}
          type="button" 
          className="btn btn-outline-success"
          >
          Start
        </button>
        <div className="gameBox" onClick={this.startGame}>
          <Snake snakeDots={this.state.snakeDots} />
          <Food dot={this.state.food} />
        </div>
      </div>
    )
  }
}
 
export default App
