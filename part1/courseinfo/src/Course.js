import React, {Component} from 'react';

const Course = ({course}) => {
return (
    <div>
    <Header name={course.name} />
    <Content parts={course.parts} />
    <Total parts={course.parts} />
    </div>
)
}

const Header = ({name}) => <h2>{name}</h2>

const Content = ({parts}) => {
return (
    <div>
    {parts.map((item, index) =><Part part={item.name} exercises={item.exercises} key={index} />)}
    </div>
)
}

const Part = ({part, exercises}) => <p>{part} {exercises}</p>

const Total = ({parts}) => <p><b>total of {parts.reduce((total, part) => total + part.exercises, 0)} exercises</b></p>

export default Course