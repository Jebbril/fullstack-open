import { useEffect, useState } from 'react'
import { destroy, getAll, create, update } from './services/phonebook'

const DeleteButton = ({onePerson, setPersons, persons}) => {
	const deletePerson = () => {
		if (!window.confirm(`Delete ${onePerson.name} ?`))
			return
		destroy(onePerson.id)
		.then(response => console.log(response))
		.catch(error => console.error(`Error deleting person: ${error}`))

		setPersons(persons.filter(person => person.id !== onePerson.id))
	}

	return <button onClick={deletePerson}>delete</button>
}

const Persons = ({persons, filterValue, setPersons}) => {
	return (
		persons.map(person => 
			person.name.toLowerCase().includes(filterValue.toLowerCase())
			? <div key={person.id}>
					<p>{person.name} {person.number}</p>
					<DeleteButton onePerson={person} setPersons={setPersons} persons={persons} />
				</div>
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
		// console.log('effect')

		getAll()
		.then(data => {
			// console.log('done')
			setPersons(data)
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
		// console.log(sameName)

		if (sameName && sameNumber){
			alert(`${newName}is already added to phonebook`)
			return
		} else if(sameName) {
			if (window.confirm(`${sameName.name} is already added to phonebook, replace the old number with a new one?`)) {
				const personObject = {...sameName, number: newNumber}
				update(personObject, sameName.id)
				.then(data => {
					// console.log("from update", persons)
					const newPersons = persons.map(person => {
						if (person.id === data.id)
							person.number = data.number
						return person
					})
					// console.log("from update", newPersons)
					setPersons(newPersons)
					setNewName('')
					setNewNumber('')
					
				})
				.catch(error => console.error(`Error updating number: ${error}`))
			}
			return
		}

		const personObject = {
			name: newName,
			number: newNumber,
			id: (parseInt(persons[persons.length -1].id) + 1).toString(),
		}

		create(personObject)
		.then(data => {
			setPersons(persons.concat(data))
			setNewName('')
			setNewNumber('')
		})
		.catch(error => console.error(`Error posting data: ${error}`))
	}


  return (
    <div>
      <h2>Phonebook</h2>
			<Filter filterValue={filterValue} handlefilterChange={handlefilterChange} />
			<h3>Add a new</h3>
      <PersonForm newName={newName} newNumber={newNumber} handleAddPerson={handleAddPerson}
			handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} />
      <h3>Numbers</h3>
      <Persons persons={persons} filterValue={filterValue} setPersons={setPersons} />
    </div>
  )
}

export default App
