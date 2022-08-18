import React, {useState} from 'react'
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
const SearchUser = ({handleSearchSubmit}) => {
  const [search, setSearch] = useState('')
  const handleSearch = (event) => {
    event.preventDefault();
        setSearch(event.target.value);
  }

  const handleSubmit = () => {
    console.log(search, 'this is search Value from searchUser comp');
    handleSearchSubmit(search)

  }

  return (
    <div>      <TextField name='search' value={search} onChange={handleSearch} id="standard-basic" label="search for a user" />
    <IconButton color="primary" aria-label="upload picture" component="span" onClick={handleSubmit}>
          <SearchIcon />
        </IconButton></div>
  )
}

export default SearchUser