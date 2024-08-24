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

      <Heading headingText='statistics' />
			<FeedbackCount text='good' count={good} />
			<FeedbackCount text='neutral' count={neutral} />
			<FeedbackCount text='bad' count={bad} />
    </div>
  )
}

export default App