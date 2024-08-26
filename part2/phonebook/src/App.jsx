import { useState } from 'react'

const Numbers = ({persons}) => {
	return (
		persons.map(person => <p key={person.name}>{person.name} {person.number}</p> )
	)
}

const App = () => {
  const [persons, setPersons] = useState([
    { 
			name: 'Arto Hellas',
			number: '040-1234567'
		}
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

	const handleNameChange = (event) => {
		setNewName(event.target.value)
	}

	const handleNumberChange = (event) => {
		setNewNumber(event.target.value)
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
		}
		setPersons(persons.concat(personObject))
		setNewName('')
	}

  return (
    <div>
      <h2>Phonebook</h2>
      <form>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
				<div>
          number: <input value={newNumber} onChange={handleNumberChange} />
        </div>
        <div>
          <button onClick={handleAddPerson}>add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <Numbers persons={persons} />
    </div>
  )
}

export default App
