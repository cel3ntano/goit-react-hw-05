// import { useEffect, useState, useRef } from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Navigation from "./Navigation/Navigation";
import HomePage from "../pages/HomePage/HomePage";
import MoviesPage from "../pages/MoviesPage/MoviesPage";
import NotFoundPage from "../pages/NotFoundPage/NotFoundPage";
import MovieDetailsPage from "../pages/MovieDetailsPage/MovieDetailsPage";

export default function App() {
  return (
    <>
      <Navigation />
      <Routes>
        <Route path='/' element={<HomePage />}></Route>
        <Route path='/movies' element={<MoviesPage />}></Route>
        <Route path='/movies/:movieId' element={<MovieDetailsPage />}></Route>
        <Route path='*' element={<NotFoundPage />}></Route>
      </Routes>
    </>
  );
}
