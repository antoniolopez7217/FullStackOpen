import { useState, useEffect } from 'react'
import axios from 'axios'

const App = () => {
  const [value, setValue] = useState('')
  const [countries, setCountries] = useState([]) 

  useEffect(() => {
      axios
        .get(`https://restcountries.com/v3.1/all`)
        .then(response => {
          setCountries(response.data.name)
        })
  }, [])

  console.log(countries.map(x => x.common))

  const handleChange = (event) => {
    setValue(event.target.value)
  }
    
  return(
    <div>
      <form>
        find countries: <input value={value} onChange={handleChange}/>
      </form>
          <p>{countries}</p>  
    </div>
  )
}

export default App;
