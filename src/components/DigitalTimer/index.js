// Write your code here
import {Component} from 'react'

import './index.css'

// const playButton = 'https://assets.ccbp.in/frontend/react-js/play-icon-img.png'
// const pauseButton = 'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png'

class DigitalTimer extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isRunning: false,
      timeLimitInMinute: 25,
      timeElapsedInSeconds: 0,
    }
  }

  componentWillUnmount() {
    this.clearTimerInterval()
  }

  clearTimerInterval = () => clearInterval(this.intervalId)

  onClickToChangePlayRPause = () => {
    this.clearTimerInterval()
    this.setState(prevState => ({isRunning: !prevState.isRunning}))
  }

  onDecrementButton = () => {
    const {timeLimitInMinute} = this.state
    if (timeLimitInMinute >= 1) {
      this.setState(prevState => ({
        timeLimitInMinute: prevState.timeLimitInMinute - 1,
      }))
    }
  }

  onIncrementButton = () => {
    this.setState(prevState => ({
      timeLimitInMinute: prevState.timeLimitInMinute + 1,
    }))
  }

  onClickRestButton = () => {
    clearInterval(this.intervalId)
    this.setState({
      isRunning: false,
      timeLimitInMinute: 25,
      timeElapsedInSeconds: 0,
    })
  }

  incrementTimeElapsedInSeconds = () => {
    const {timeLimitInMinute, timeElapsedInSeconds} = this.state
    const timeCompleted = timeElapsedInSeconds === timeLimitInMinute * 60

    if (timeCompleted) {
      this.clearTimerInterval()
      this.setState({isRunning: false})
    } else {
      this.setState(prevState => ({
        timeElapsedInSeconds: prevState.timeElapsedInSeconds + 1,
      }))
    }
  }

  onClickToChangePlayRPause = () => {
    const {isRunning, timeLimitInMinute, timeElapsedInSeconds} = this.state

    const isTimerCompleted = timeElapsedInSeconds === timeLimitInMinute * 60

    if (isTimerCompleted) {
      this.setState({timeElapsedInSeconds: 0})
    }
    if (isRunning) {
      this.clearTimerInterval()
    } else {
      this.intervalId = setInterval(this.incrementTimeElapsedInSeconds, 1000)
    }
    this.setState(prevState => ({isRunning: !prevState.isRunning}))
  }

  getElapsedSecondsInTimeFormat = () => {
    const {timeLimitInMinute, timeElapsedInSeconds} = this.state
    const totalRemainingSeconds = timeLimitInMinute * 60 - timeElapsedInSeconds

    const minutes = Math.floor(totalRemainingSeconds / 60)
    const seconds = Math.floor(totalRemainingSeconds % 60)
    const stringifiedMinutes = minutes > 9 ? minutes : `0${minutes}`
    const stringifiedSeconds = seconds > 9 ? seconds : `0${seconds}`

    return `${stringifiedMinutes}:${stringifiedSeconds}`
  }

  render() {
    const {isRunning, timeElapsedInSeconds} = this.state

    const isButtonsDisabled = timeElapsedInSeconds > 0

    return (
      <div className="timer-bg-container">
        <h1>Digital Timer</h1>
        <div className="timer-card-container">
          <div className="bg-timer-container">
            <div className="time-container">
              <h1>{this.getElapsedSecondsInTimeFormat()}</h1>
              <p>{isRunning ? 'Running' : 'paused'}</p>
            </div>
          </div>
          <div className="btn-container">
            <div className="btn-card-container">
              <button
                className="play-button"
                type="button"
                onClick={this.onClickToChangePlayRPause}
              >
                <img
                  src={
                    isRunning
                      ? 'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png'
                      : 'https://assets.ccbp.in/frontend/react-js/play-icon-img.png'
                  }
                  alt={isRunning ? 'pause icon' : 'play icon'}
                  className="button-logo"
                />
                {isRunning ? 'pause' : 'Start'}
              </button>
              <button
                type="button"
                className="restart-btn"
                onClick={this.onClickRestButton}
              >
                <img
                  src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
                  alt="reset icon"
                  className="restart-logo"
                />
                Reset
              </button>
            </div>
            <p>Set Timer limit</p>
            <div className="increment-card">
              <button
                className="btn"
                disabled={isButtonsDisabled}
                type="button"
                onClick={this.onDecrementButton}
              >
                -
              </button>
              <div className="number-container">
                <p>25</p>
              </div>
              <button
                type="button"
                className="btn"
                disabled={isButtonsDisabled}
                onClick={this.onIncrementButton}
              >
                +
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default DigitalTimer
