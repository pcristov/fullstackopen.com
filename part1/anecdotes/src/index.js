import React, {useState} from 'react'
import ReactDOM from 'react-dom'

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const App = (props) => {
  const numAnecdotes = props.anecdotes.length
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(new Array(numAnecdotes).fill(0))
  const [mostVotes, setMostVotes] = useState(0)

  const random = (max) => {
    return Math.floor(Math.random() * Math.floor(max))
  }

  const next = () => {
    setSelected(random(numAnecdotes))
  }

  const vote = () => {
    const copy = [...votes]
    copy[selected] += 1
    setMostVotes(copy.indexOf(Math.max(...copy)))
    setVotes([...copy])
  }

  return (
    <div>
      <h2>Anecdote of the day</h2>
      <div>{props.anecdotes[selected]}</div>
      <div>has {votes[selected]} votes</div>
      <button onClick={vote}>vote</button><button onClick={next}>next anecdote</button>
      <h2>Anecdote with most votes</h2>
      <div>{props.anecdotes[mostVotes]}</div>
      <div>has {votes[mostVotes]} votes</div>
    </div>
  )
}

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)