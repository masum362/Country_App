import React , {useState , useEffect} from 'react';
import Countries from './component/Countries';
// import { FaYoutube } from 'react-icons/fa';
import './App.css'
import Search from './component/Search';

const App = () => {
    const [isLoading , setIsLoading] = useState(true);
    const [error , setError] = useState(null)
    const [countries , setCountries] = useState([])
    const [fliteredCountries , setFliteredCountries] = useState(countries)

    const url = "https://restcountries.com/v3.1/all";

    const fetchData = async (url) => {
       setIsLoading(true);

      try {
       const response = await fetch(url);
       const data = await response.json();
    //    console.log(data)
       setFliteredCountries(data)
       setIsLoading(false)
       setError(null)
       console.log(countries)
      } catch(error){
        setIsLoading(false)
       setError(error)
      }

      }


      
    useEffect(() => {
        fetchData(url)
     
    }, [2000])
        const handleRemoveCountry = (name) =>{
        const filter = fliteredCountries.filter((country) =>
            country.name.common !== name)
        setFliteredCountries(filter)
    }
        const handleSearch = (search) => {
            console.log(search)
            let value = search.toLowerCase();
            const newCountries = fliteredCountries.filter((country) => {
                const countryName = country.name.common.toLowerCase();
                return countryName.startsWith(value);
            })
            setFliteredCountries(newCountries)
        }

    return (
        <>
        <h1>Country App</h1>
        <Search  onHandleSearch={handleSearch}/>
        {isLoading && <p>Loading...</p>}
        {error && <p>{error.message}</p>}
        <Countries countries={fliteredCountries} onRemoveCountry={handleRemoveCountry}/>
        </>
    );
};
export default App;