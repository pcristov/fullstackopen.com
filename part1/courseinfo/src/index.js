import React from 'react'
import ReactDOM from 'react-dom'

const Header = ({name}) => <h1>{name}</h1>

const Content = ({parts}) => {
  return (
    <div>
      {parts.map((item, index) =><Part part={item.name} exercises={item.exercises} key={index} />)}
    </div>
  )
}

const Part = ({part, exercises}) => <p>{part} {exercises}</p>

const Total = ({parts}) => <p>Number of exercises {parts.reduce((total, part) => total + part.exercises, 0)}</p>

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header name={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))