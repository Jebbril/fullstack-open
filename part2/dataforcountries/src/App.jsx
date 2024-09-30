import { useState, useEffect } from 'react'
import axios from 'axios'

const ListedCountries = ({values, inputValue}) => {
	if (!inputValue)
		return null
	
	if (values.length > 10){
		return (<div>Too many matches, specify another filter</div>)
	}

	if (values.length === 1) {
		console.log("im here", values[0])
		let country = values[0]
		return(
			<>
			<h2>{country.name.common}</h2>
			<br />
			<p>{country.capital}</p>
			<p>area {country.area}</p>
			<br />
			<h4>languages</h4>
			<ul>
				{Object.keys(country.languages).map(lang => <li key={lang}>{country.languages[lang]}</li>)}
			</ul>
			<img src={country.flags.png} alt={country.flags.alt} />
			</>
		)
	}

	return (
			values.map(country => <div key={country.cca2}>{country.name.common}</div>))
	

}

const App = () => {
  const [value, setValue] = useState('')
	const [countries, setCountries] = useState([]);
	const [filteredCountries, setFilteredCountries] = useState([]);

  useEffect(() => {
    console.log('effect run, currency is now')

		axios.get("https://studies.cs.helsinki.fi/restcountries/api/all")
		.then((response) => {
			setCountries(response.data);
		})
  }, [])

	useEffect(() => {
		let newFilteredCountries = countries.filter(country => country.name.common.toLowerCase().includes(value.toLowerCase()))

		setFilteredCountries(newFilteredCountries);
	}, [value, countries])

  const handleChange = (event) => {
    setValue(event.target.value)
		
  }

  return (
    <div>
      <form>
        find countries <input value={value} onChange={handleChange} />
      </form>
      <ListedCountries values={filteredCountries} inputValue={value} />
    </div>
  )
}

export default App