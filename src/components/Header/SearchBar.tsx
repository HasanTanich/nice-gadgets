import {useRef, useEffect} from 'react';
import debounce from 'lodash.debounce';
import './SearchBar.scss';

import { useSearchParams } from 'react-router-dom';
import { Search } from '../../assets/icons';

const SearchBar = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if(searchRef.current){
      const queryParams = searchParams.get('query');
      if(queryParams){
        searchRef.current.value = queryParams;
      }else {
        searchRef.current.value = '';
      }
    }
  }, [searchParams.get('query')]);
  
  const onChangeHandle = debounce((event : React.ChangeEvent<HTMLInputElement>) => {
    const inputText = event.target.value;

    if(inputText.length === 0){
      searchParams.delete('query');
      setSearchParams(searchParams);
    }else {
      searchParams.set('query', inputText);
      setSearchParams(searchParams, {replace: true});
    }
  }, 350);

  return (
    <div className="searchBarBox">
      <input
        type="search"
        name="search"
        id="search"
        className="searchBarBox-searchBar"
        placeholder='Search...'
        ref={searchRef}
        onChange={onChangeHandle}
      />
      <img src={Search} alt="search icon" className="searchBarBox-icon"/>
    </div>
  );
};

export default SearchBar;