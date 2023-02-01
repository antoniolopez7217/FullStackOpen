
const Course = ({course})=> {

	const Header = ({name}) => <h2>{name}</h2>
  
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

  export default Course