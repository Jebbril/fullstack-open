import { useState } from 'react'

const Heading = (props) => {
	return (
		<>
			<h1>{props.headingText}</h1>
		</>
	)
}

const StatisticLine = (props) => {
	return (
		<>
			<tr>
				<td>{props.text}</td>
				<td>{props.value}</td>
			</tr>
		</>
	)
}

const Average = (props) => {
	let average = 0

	if (props.all != 0)
		average = (props.good * 1 + props.neutral * 0 + props.bad * -1) / props.all

	return (
		<>
			<tr>
				<td>average</td>
				<td>{average}</td>
			</tr>
		</>
	)
}

const Positive = (props) => {
	let positive = 0
	if (props.all != 0)
		positive = props.good * 100 / props.all
	return (
		<>
			<tr>
				<td>positive</td>
				<td>{positive} %</td>
			</tr>
		</>
	)
}

const Button = (props) => {
	return (
		<>
			<button onClick={props.handleClick}>{props.text}</button>
		</>
	)
}

const Statistics = (props) => {
	let all = props.bad + props.good + props.neutral
	if (!all){
		return (
			<>
				<p>No feedback given</p>
			</>
		)
	}
		
	return (
		<>
			<Heading headingText='statistics' />
			<table>
				<tbody>
					<StatisticLine text='good' value={props.good} />
					<StatisticLine text='neutral' value={props.neutral} />
					<StatisticLine text='bad' value={props.bad} />
					<StatisticLine text='all' value={all} />

					<Average good={props.good} neutral={props.neutral} bad={props.bad} all={all} />
					<Positive good={props.good} all={all} />
				</tbody>
			</table>
		</>
	)
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

	const handleGood = () => {
		setGood(good + 1)
	}

	const handleNeutral = () => {
		setNeutral(neutral + 1)
	}

	const handleBad = () => {
		setBad(bad + 1)
	}

  return (
    <div>
      <Heading headingText='give feedback' />
			<Button text='good' handleClick={handleGood} />
			<Button text='neutral' handleClick={handleNeutral} />
			<Button text='bad' handleClick={handleBad} />

      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App