import { useState } from 'react'

const Button = (props) => {
	return (
		<>
			<button onClick={props.handleClick}>{props.text}</button>
		</>
	)
}

const Anecdote = (props) => {
	return (
		<div>
			<h1>{props.heading}</h1>
			<div>
				{props.anecdote}
			</div>
			<div>
				has {props.points} {props.points == 1 ? 'vote' : 'votes'}
			</div>
		</div>
	)
}

const MostVoted = (props) => {
	if (!props.pointsArr.every(value => value === 0)){
		const maxVotes = Math.max(...props.pointsArr)

		return (
			<Anecdote heading='Anecdote of the day' anecdote={props.anecdote} points={props.points} />
		)
	}
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  const [selected, setSelected] = useState(0)
	const [points, setPoints] = useState([0, 0, 0, 0, 0, 0, 0, 0])

	const getRandomNum = () => {
		setSelected(Math.floor(Math.random() * anecdotes.length - 1 + 1)) // -1 is for getting the last index and +1 is for using the random func
	}

	const incrementVote = () => {
		const copy = [...points]
		copy[selected] += 1
		setPoints(copy)
	}

	let maxVotes = Math.max(...points)

  return (
    <div>
			<Anecdote heading='Anecdote of the day' anecdote={anecdotes[selected]} points={points[selected]} />
      <Button text='vote' handleClick={incrementVote} />
      <Button text='next anecdote' handleClick={getRandomNum} />

			{/* <MostVoted heading='Anecdote with most votes' anecdotes={anecdotes} points={points} /> */}
			<MostVoted heading='Anecdote of the day' anecdote={anecdotes[points.indexOf(maxVotes)]} points={maxVotes} pointsArr={points} />
    </div>
  )
}

export default App
