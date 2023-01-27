import { useState } from 'react'

const Header = ({text}) => <h1>{text}</h1>

const Button = (props) => <button onClick={props.handleClick}>{props.feedback}</button>

const Statistics = ({feedback, counter}) => {
  if (counter[3] === 0) {return ("No feedback given")}
  return (
    <div>
      <p>{feedback[0]} {counter[0]}</p>
      <p>{feedback[1]} {counter[1]}</p>
      <p>{feedback[2]} {counter[2]}</p>
      <p>{feedback[3]} {counter[3]}</p>
      <p>{feedback[4]} {counter[4]}</p>
      <p>{feedback[5]} {counter[5]}</p>

    </div>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const all = good + bad + neutral
  const average = (good - bad)/all
  const positive = (good / (bad + neutral + good))*100 + " %"

  return (
    <div>
      <Header text={"give feedback"}/>
      <Button handleClick={() => setGood(good + 1)} feedback={"good"}/>
      <Button handleClick={() => setNeutral(neutral + 1)} feedback={"neutral"}/>
      <Button handleClick={() => setBad(bad + 1)} feedback={"bad"}/>
      <Header text={"statistics"}/>
      <Statistics 
      feedback={["good","neutral","bad","all","average","positive"]} 
      counter={[good, neutral, bad,all,average,positive]}
      />
    </div>
  )
}

export default App