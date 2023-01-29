import { useState } from 'react'

const Header = ({text}) => <h1>{text}</h1>

const Button = (props) => <button onClick={props.handleClick}>{props.feedback}</button>

const Statistics = (props) => {
  const good = props.feedback[0]
  const neutral = props.feedback[1]
  const bad = props.feedback[2]
  const all = good + bad + neutral
  const average = (good - bad)/all
  const positive = (good / (bad + neutral + good))*100 + " %"

  if (all === 0) {return ("No feedback given")}
  return (
    <table>
      <tbody>
        < StatisticLine text="good" value={good}/>
        < StatisticLine text="neutral" value={neutral}/>
        < StatisticLine text="bad" value={bad}/>
        < StatisticLine text="all" value={all}/>
        < StatisticLine text="average" value={average}/>
        < StatisticLine text="positive" value={positive}/>
      </tbody>
    </table>
  )
}

const StatisticLine = (props) => (
<tr>
  <td>{props.text}</td>
  <td>{props.value}</td>
</tr>
)

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  return (
    <div>
      <Header text={"give feedback"}/>
      <Button handleClick={() => setGood(good + 1)} feedback={"good"}/>
      <Button handleClick={() => setNeutral(neutral + 1)} feedback={"neutral"}/>
      <Button handleClick={() => setBad(bad + 1)} feedback={"bad"}/>
      <Header text={"statistics"}/>
      <Statistics feedback={[good,neutral,bad]}/>
    </div>
  )
}

export default App