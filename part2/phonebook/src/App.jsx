import { useEffect, useState } from 'react'
import axios from 'axios'

const Persons = ({persons, filterValue}) => {
	return (
		persons.map(person => 
			person.name.toLowerCase().includes(filterValue.toLowerCase())
			? <p key={person.id}>{person.name} {person.number}</p>
			: false )
	)
}

const Filter = ({filterValue, handlefilterChange}) =>
	<input value={filterValue} onChange={handlefilterChange} />

const PersonForm = (props) => {
	return (
		<form>
			<div>
				name: <input value={props.newName} onChange={props.handleNameChange} />
			</div>
			<div>
				number: <input value={props.newNumber} onChange={props.handleNumberChange} />
			</div>
			<div>
				<button onClick={props.handleAddPerson}>add</button>
			</div>
		</form>
	)
}

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterValue, setFilterValue] = useState('')

	useEffect(() => {
		console.log('effect')

		axios.get("http://localhost:3001/persons")
		.then(response => {
			console.log('done')
			setPersons(response.data)
			// console.log(persons)
		})
		.catch(error => {
      console.error('Error fetching data:', error)
    })
	},[])

	const handleNameChange = (event) => {
		setNewName(event.target.value)
	}

	const handleNumberChange = (event) => {
		setNewNumber(event.target.value)
	}

	const handlefilterChange = (event) => {
		setFilterValue(event.target.value)
	}

	const handleAddPerson = (event) => {
		event.preventDefault()

		if (newName === "" || newNumber === "")
			return

		const sameName = persons.find(person => person.name === newName)
		const sameNumber = persons.find(person => person.number === newNumber)

		if (sameName){
			alert(`${newName}is already added to phonebook`)
			return
		} else if(sameNumber) {
			alert(`${newNumber} is already added to phonebook`)
			return
		}

		const personObject = {
			name: newName,
			number: newNumber,
			id: persons.length + 1,
		}
		setPersons(persons.concat(personObject))
		setNewName('')
		setNewNumber('')
	}

  return (
    <div>
      <h2>Phonebook</h2>
			<Filter filterValue={filterValue} handlefilterChange={handlefilterChange} />
			<h3>Add a new</h3>
      <PersonForm newName={newName} newNumber={newNumber} handleAddPerson={handleAddPerson}
			handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} />
      <h3>Numbers</h3>
      <Persons persons={persons} filterValue={filterValue} />
    </div>
  )
}

export default App
