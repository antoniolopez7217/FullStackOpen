import { useState, useEffect } from 'react'
import axios from 'axios'

const App = () => {
  const [search, setSearch] = useState('')
  const [countries, setCountries] = useState([]) 

  useEffect(() => {
      axios
        .get(`https://restcountries.com/v3.1/all`)
        .then(response => {
          setCountries(response.data)
        })
  }, [])

  const handleChange = (event) => {
    setSearch(event.target.value)
  }

  return(
    <div>
      <form>
        find countries: <input value={search} onChange={handleChange}/>
      </form>
          <p>{countries}</p>  
    </div>
  )
}

export default App;
