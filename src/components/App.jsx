// import { useEffect, useState, useRef } from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";
import Navigation from "./Navigation/Navigation";
import Footer from "./Footer/Footer";

const HomePage = lazy(() => import("../pages/HomePage/HomePage"));
const MovieCast = lazy(() => import("./MovieCast/MovieCast"));
const MovieReviews = lazy(() => import("./MovieReviews/MovieReviews"));
const NotFoundPage = lazy(() => import("../pages/NotFoundPage/NotFoundPage"));
const MoviesPage = lazy(() => import("../pages/MoviesPage/MoviesPage"));
const MovieDetailsPage = lazy(() =>
  import("../pages/MovieDetailsPage/MovieDetailsPage")
);

export default function App() {
  return (
    <>
      <Navigation />
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/movies' element={<MoviesPage />} />
          <Route path='/movies/:movieId' element={<MovieDetailsPage />}>
            <Route path='cast' element={<MovieCast />}></Route>
            <Route path='reviews' element={<MovieReviews />} />
          </Route>
          <Route path='*' element={<NotFoundPage />} />
        </Routes>
      </Suspense>
      <Footer />
    </>
  );
}
