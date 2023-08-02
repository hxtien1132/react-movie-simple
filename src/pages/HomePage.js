import React, { Fragment } from "react";
import Banner from "../components/banner/Banner";
import MovieList from "../components/movies/MovieList";

const HomePage = () => {
  return (
    <Fragment>
      <section className="movies-layout page-container pb-20">
        <h2 className="capitalize text-white mb-5 text-2xl font-bold">
          Now playing
        </h2>
        <MovieList></MovieList>
      </section>
      <section className="movies-layout page-container pb-20">
        <h2 className="capitalize text-white mb-5 text-2xl font-bold">
          Top rates
        </h2>
        <MovieList type="top_rated"></MovieList>
      </section>
      <section className="movies-layout page-container pb-20">
        <h2 className="capitalize text-white mb-5 text-2xl font-bold">
          Trending
        </h2>
        <MovieList type="popular"></MovieList>
      </section>
    </Fragment>
  );
};

export default HomePage;
