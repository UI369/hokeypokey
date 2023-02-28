import { useEffect, useState } from "react";
import { PokeLoader } from './PokeLoader'
import "./App.css";

export default function HokeyPokey() {

  return <div className="App">
    <PokeLoader count="25"></PokeLoader>
  </div>
}