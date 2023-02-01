
const Course = ({course})=> {

  const Header = ({name}) => <h1>{name}</h1>

  const Content = ({parts}) => parts.map((part) => <Part key={part.id} part={part}/>)

  const Part = ({part}) => <p>{part.name} {part.exercises}</p>
  
  const Total = () => <p ><strong>total of {SumExercises} exercises</strong></p>
  
  const SumExercises = course.parts.reduce((sum, part) => sum + part.exercises, 0)

  return (
    <div>
      <Header name={course.name} />
      <Content parts={course.parts} />
      <Total />
    </div>
  )

}

const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      },
      {
        name: 'Redux',
        exercises: 11,
        id: 4
      }
    ]
  }

  return <Course course={course} />
}

export default App