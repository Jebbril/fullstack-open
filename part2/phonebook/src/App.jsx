import { useState } from 'react'

const Numbers = ({persons}) => {
	return (
		persons.map(person => <p key={person.name}>{person.name}</p> )
	)
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')

	const handleNameChange = (event) => {
		setNewName(event.target.value)
	}

	const handleAddPerson = (event) => {
		event.preventDefault()

		if (newName === "")
			return

		const personObject = {
			name: newName,
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
          <button onClick={handleAddPerson}>add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <Numbers persons={persons} />
			<div>debug: {newName}</div>
    </div>
  )
}

export default App
