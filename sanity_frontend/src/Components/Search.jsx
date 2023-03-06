import React,{useState, useEffect} from 'react'
import MasonryLayout from "./MasonryLayout"
import { client } from '../Client'
import { feedQuery, searchQuery } from '../utils/data'
import { Spinner } from './Spinner'
const Search = ({searchTerm}) => {
 const [pins, setPins] = useState(null)
 const [loading, setLoading] = useState(false)
  
useEffect(() => {
  if(searchTerm){
    setLoading(true)
    const query = searchQuery(searchTerm.toLowerCase())
    client.fetch(query)
    .then((data) => {
      setPins(data)
      setLoading(false)
    },[searchTerm])
  }

  else{
    client.fetch(feedQuery)
    .then((data) => {
      setPins(data)
      setLoading(false)
    })
  }
}, [searchTerm])

console.log(pins)

  return (
    <div>
    {loading && <Spinner message={"Searching for spins "}/>}
    
    {pins?.length ? <MasonryLayout pins={pins}/> : ''}
    {pins?.length === 0 && searchTerm !== '' && !loading  &&
      <div className='mt-10 text-center text-xl'>
        No Pins Found
      </div>
    }
    </div>
  )
}

export default Search