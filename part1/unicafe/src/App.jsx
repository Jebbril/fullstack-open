import { useState } from 'react'

const Heading = (props) => {
	return (
		<>
			<h1>{props.headingText}</h1>
		</>
	)
}

const FeedbackCount = (props) => {
	return (
		<>
			<p>{props.text} {props.count}</p>
		</>
	)
}

const Average = (props) => {
	let average = 0

	if (props.all != 0)
		average = (props.good * 1 + props.neutral * 0 + props.bad * -1) / props.all

	return (
		<>
			<p>average {average}</p>
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
			<FeedbackCount text='good' count={props.good} />
			<FeedbackCount text='neutral' count={props.neutral} />
			<FeedbackCount text='bad' count={props.bad} />
			<FeedbackCount text='all' count={props.bad + props.good + props.neutral} />

			<Average good={props.good} neutral={props.neutral} bad={props.bad} all={all} />
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
			<button onClick={handleGood}>good</button>
			<button onClick={handleNeutral}>neutral</button>
			<button onClick={handleBad}>bad</button>

      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App