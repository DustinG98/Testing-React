import React, { useState, useEffect } from "react";
import Loader from "react-loader-spinner";

import { getData } from "../api";
import "./star-wars-characters.css";

export default function StarWarsCharacters() {
  const [query, setQuery] = useState("people")
  const [url, setUrl] = useState(`https://swapi.co/api/people`);
  const [previous, setPrevious] = useState();
  const [next, setNext] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [characters, setCharacters] = useState([]);


  useEffect(() => {
    setIsLoading(true);
    setUrl("https://swapi.co/api/" + query)
    const getCharacters = async () => {
      const characters = await getData(url);
      setNext(characters.next);
      setPrevious(characters.previous);
      setCharacters(characters.results);
      setIsLoading(false);
    };
    getCharacters();
  }, [url, query]);

  const goToNext = e => {
    e.preventDefault();
    setUrl(next);
  };

  const goToPrevious = e => {
    e.preventDefault();
    setUrl(previous);
  };

  const handleQueryChange = e => {
    setQuery(e.target.value)
  }

  return (
    <div>
      <select data-testid="select" value={query} onChange={e => handleQueryChange(e)}>
        <option value="people">People</option>
        <option value="planets">Planets</option>
        <option value="starships">Starships</option>
        <option value="vehicles">Vehicles</option>
        <option value="species">Species</option>
      </select>
      {isLoading ? (
        <Loader
          type="ThreeDots"
          color="#FFC402"
          height={30}
          width={100}
          timeout={3000} //3 secs
        />
      ) : (
        <>
          {characters.map(character => (
            <div data-testid="character" key={character.url}>{character.name}</div>
          ))}
        </>
      )}
      <div className="buttons">
        <button onClick={goToPrevious} disabled={!previous}>
          Previous
        </button>
        <button onClick={goToNext} disabled={!next}>
          Next
        </button>
      </div>
    </div>
  );
}
