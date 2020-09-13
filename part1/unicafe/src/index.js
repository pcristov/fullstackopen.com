import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'

const Button = ({handleClick, text}) => (
    <button onClick={handleClick}>
      {text}
    </button>
)

const Statistic = (props) => (
  <tr>
    <td>{props.text}</td><td>{props.value} {props.percentage}</td>
  </tr>
)

const Statistics = (props) => {
  if(props.total===0) {
    return <div>No feedback given</div>
  }    

  return(
    <table>
      <tbody>
        <Statistic text="good" value={props.good} />
        <Statistic text="neutral" value={props.neutral} />
        <Statistic text="bad" value={props.bad} />
        <Statistic text="total" value={props.total} />
        <Statistic text="average" value={props.average} />
        <Statistic text="positive" value={props.positive} percentage="%" />
      </tbody>
    </table>
  )
}

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [total, setTotal] = useState(0)
  const [average, setAverage] = useState(0)
  const [positive, setPositive] = useState(0)

  useEffect(
    () => {
      setTotal(good+neutral+bad)

      if(total !== 0) {
        setAverage((good-bad)/total)
        setPositive((good/total)*100)
      }
    },
    [good, neutral, bad, total],
  )

  return (
    <div>
      <h2>give feedback</h2>
      <Button handleClick={() => setGood(good+1)} text="good" />
      <Button handleClick={() => setNeutral(neutral+1)} text="neutral" />
      <Button handleClick={() => setBad(bad+1)} text="bad" />
      <h2>statistics</h2>
      <Statistics good={good} neutral={neutral} bad={bad} total={total} average={average} positive={positive} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))