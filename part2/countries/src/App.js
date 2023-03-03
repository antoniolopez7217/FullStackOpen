import { useState, useEffect } from 'react'
import axios from 'axios'

const Country = ({country}) => (<p key={country.name}>{country.name.common}</p>)

const CountryFullInfo = ({country}) => {
  const languages = Object.values(country.languages)
  
    return(
      <div>
        <h1>{country.name.common}</h1>
        <p>capital {country.capital}</p>
        <p>area {country.area}</p>
        <p><strong>languages:</strong></p>
        <ul>
          {languages.map(x => <li key={x}>{x}</li>)}
        </ul>
        <img src={country.flags.png} alt={"flag of " + country.name.common} style={{width: '100px',}}/>
      </div>
    )
}


const FilterCountries = ({countries}) =>{
  if(countries.length>10){
    return(<p>Too many matches, specify another filter</p>)
  }else if(countries.length===1){
    return(countries.map(country => <CountryFullInfo country={country}/>))
  }else{
    return(countries.map(country => <Country country={country}/>))}
}

const App = () => {
  const [value, setValue] = useState('')
  const [countries, setCountries] = useState([]) 

  useEffect(() => {
    if(value){
      axios
        .get(`https://restcountries.com/v3.1/name/${value}`)
        .then(response => {
          setCountries(response.data)
        })
      }else{
        setCountries([])
      }
  }, [value])

  const handleChange = (event) => {setValue(event.target.value)}

  return(
    <div>
      find countries: <input value={value} onChange={handleChange}/>
      
      <FilterCountries countries={countries} value={value}/>
    </div>
  )
}

export default App;
