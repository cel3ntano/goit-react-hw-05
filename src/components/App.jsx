import { useEffect, useState, useRef } from "react";
import "./App.css";
import Navigation from "./Navigation/Navigation";
import MovieList from "./MovieList/MovieList";

export default function App() {
  return (
    <>
      <Navigation />
      <MovieList />
    </>
  );
}
