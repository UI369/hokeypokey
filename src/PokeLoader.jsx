import { useEffect, useState } from "react";

export function PokeLoader({num}) {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);

    useEffect(() => {
        fetch("https://pokeapi.co/api/v2/pokemon/?limit=num&offset=0")
          .then((res) => res.json())
          .then(
            (result) => {
              setIsLoaded(true);
              setItems(result);
            },
            (error) => {
              setIsLoaded(true);
              setError(error);
            }
          );
      }, []);


      if (error) {
        return <div> Error: {error.message}</div>;
      } else if (!isLoaded) {
        return <div>Loading...</div>;
      } else {
        return  <PokeList pokes={items.results}></PokeList>
      }
}

function PokeList( {pokes} ){
    let ndx = 0;
    return pokes?.map((poke) => {
        ndx++;
        return <span>
            <Pokemon name={poke.name} num={ndx} />
        </span>
    })
}
  
function Pokemon({ name, num }) {
return (
    <div>Pokemon #{num}: {capitalizeFirstLetter(name)}</div>
);


function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

}