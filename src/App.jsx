import { useEffect, useState } from "react";

import "./App.css";

export default function HokeyPokey() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch("https://pokeapi.co/api/v2/pokemon/?limit=20&offset=0")
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
    console.log(items);
    return (
      <div className="App">
        {items?.results?.map((item) => {
          console.log(item.name);
          return (
            <div key={item.name}>
              <Pokemon name={item.name} />
            </div>
          );
        })}
      </div>
    );
  }
}

function Pokemon({ name }) {
  return (
    <>
      <div className="player">Pokemon: {name}</div>
    </>
  );
}
