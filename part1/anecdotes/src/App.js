import { useState } from 'react'

const Header = (props) => <h1>{props.text}</h1> 

const AnecdoteVotes = (props) => (
  <>
    <p>{props.anecdote}</p>
    <p>has {props.votes} votes</p>
  </>
)

const Button = (props) => <button onClick={props.handleClick}>{props.text}</button>

const getRandomInt = (max) => Math.floor(Math.random() * max);

const LargestIndex = (points) => {
  const index = points.findIndex((v) => v === Math.max(...points))
  return (index)
  }

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState(Array(8).fill(0))

  const Vote = (points, selected) => {
    const copy = [...points]
    copy[selected] += 1
    setPoints(copy)
  }

  console.log(points)
  return (
    <div>
      <Header text={"Anecdote of the day"}/>
      <AnecdoteVotes anecdote={anecdotes[selected]} votes={points[selected]}/>
      <Button handleClick={() => Vote(points, selected)} text="vote"/>
      <Button handleClick={() => setSelected(getRandomInt(8))} text="next anecdote"/>
      <Header text={"Anecdote with more votes"}/>
      <AnecdoteVotes anecdote={anecdotes[LargestIndex(points)]} votes={Math.max(...points)}/>
    </div>
  )
}

export default App
