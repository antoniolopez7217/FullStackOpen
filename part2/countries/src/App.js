import { useState, useEffect } from 'react'
import axios from 'axios'

const CountryForm = (props) => (
  <form onSubmit={props.onSearch}>
    find countries: <input value={props.value} onChange={props.handleChange}/>
  </form>
)


const App = () => {
  const [value, setValue] = useState('')
  const [country, setCountry] = useState(null) 
  const [information, setInformation] = useState(null)

  useEffect(() => {
      axios
        .get(`https://restcountries.com/v3.1/all`)
        .then(response => {
          setInformation(response.name)
        })
  }, [])


  if(value){
    // setCountry(() => information.filter(x => x.name.common.toLowerCase().includes(value.toLocaleLowerCase())))
    console.log("Hola")
  }

  const handleChange = (event) => {
    setValue(event.target.value)
  }
  
  const onSearch = (event) => {
    event.preventDefault()
    setCountry(value)
  }
  
  return(
    <div>
      < CountryForm 
        onSearch={onSearch}
        value={value}
        handleChange={handleChange}
        />
      <p>{country}</p>  
    </div>
  )


}

export default App;
