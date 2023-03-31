import { useEffect, useState } from "react";

export function PokeLoader({ count }) {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);
  const [num, setNum] = useState(count);
  useEffect(() => {
    fetch("https://pokeapi.co/api/v2/pokemon/?limit=" + num + "&offset=0")
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
    return <PokeList pokes={items.results}></PokeList>;
  }
}

function PokeList({ pokes }) {
  return pokes?.map((poke, ndx) => {
    //console.log(poke);
    return <Pokemon key={poke.url} name={poke.name} num={ndx + 1} />;
  });
}

function Pokemon({ name, num }) {
  //< img src="img_avatar.png" alt="Avatar" style="width:100%" />
  return (
    <div className="card">
      <div className="cardContainer">
        <h4>
          <b>Pokemon #{num}</b>
        </h4>
        <p>{capitalizeFirstLetter(name)}</p>
      </div>
    </div>
  );

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
}
