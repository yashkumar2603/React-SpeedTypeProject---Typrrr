// App.js
import React, { useRef, useState, useEffect } from 'react'
import './App.css'

const getCloud = () => 'Insert Random Words or think of something else to do that'.split(' ')

function Word(props) {

  const { text, active, correct } = props

  if (correct === true) {
    return <span className="correct">{text} </span>
  }

  if (correct === false) {
    return <span className="incorrect">{text} </span>
  }

  if (active) {
    return <span className="active">{text} </span>
  }

  return <span>{text} </span>
}

Word = React.memo(Word)

function Timer() {
  const [timeElapsed, setTimeElapsed] = useState(0)

  useEffect(() => {
    if (props.startCounting) {
      setInterval(() => {
        //do Something
        setTimeElapsed(oldTime => oldTime + 1)
      }, 1000)
    }
  }, [props.startCounting])
  return <p>Speed: {timeElapsed} </p>
}

function App() {
  const [userInput, setUserInput] = useState('')
  const cloud = useRef(getCloud())

  const [startCounting, setstartCounting] = useState(false)

  const [activeWordIndex, setactiveWordIndex] = useState(0)

  const [correctWordArray, setCorrectWordArray] = useState([])

  function processInput(value) {

    setstartCounting(true)


    if (value.endsWith(' ')) {
      setactiveWordIndex(index => index + 1)
      setUserInput('')


      setCorrectWordArray(data => {
        const word = value.trim()
        const newResult = [...data]
        newResult[activeWordIndex] = word === cloud.current[activeWordIndex]
        return newResult
      })

    } else {
      setUserInput(value)
    }

  }

  return (
    <>
      <div className="bg-black">
        <div>
          <h1>Typing Test</h1>
          <Timer
            startCounting={false}
          />
          {/* <p>{cloud.current.join(' ')}</p> */}
          <p>{cloud.current.map((word, index) => {
            return <Word
              text={word}
              active={index === activeWordIndex}
              correct={correctWordArray[index]}
            />
          })}</p>

          <input
            type="text"
            value={UserInput}
            onChange={(e) => processInput(e.target.value)}
          />
        </div>
      </div>
    </>
  )
}

export default App
