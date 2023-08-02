import React, { useEffect, useState } from "react";
import useSWR from "swr";
import MovieCard, { MovieCardSkeleton } from "../components/movies/MovieCard";
import MovieList from "../components/movies/MovieList";
import { fetcher, tmdbAPI } from "../config";
import useDebounce from "../hooks/useDebounce";
import ReactPaginate from "react-paginate";
import { v4 } from "uuid";
import useSWRInfinite from "swr/infinite";
import Button from "../components/button/Button";
// https://api.themoviedb.org/3/search/movie?api_key=<<api_key>>&language=en-US&page=1&include_adult=false
const itemsPerPage = 20; //số lượng  trong trang đó
const MoviePageV2 = () => {
  const [nextPage, setNextPage] = useState(1); //phân trang
  const [filter, setFilter] = useState(""); //search
  const filterDebounce = useDebounce(filter, 1000);
  const [url, setUrl] = useState(
    // `https://api.themoviedb.org/3/movie/popular?api_key=5a1549eca98425d82d3d4bedb789e02b&page=${nextPage}`,
    tmdbAPI.getMovieList("popular", nextPage)
  );
  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };
  const { data, error, size, setSize } = useSWRInfinite(
    (index) => url.replace("page=1", `page=${index + 1}`),
    fetcher
  );
  const movies = data ? data.reduce((a, b) => a.concat(b.results), []) : [];
  console.log(movies);
  const loading = !data && !error;
  const isEmpty = data?.[0]?.results.length === 0;
  const isReachingEnd =
  isEmpty || (data && data[data.length - 1]?.results.length < itemsPerPage); //ktr dữ liệu cuối cùng search
console.log("MoviePage ~ isReachingEnd", isReachingEnd); 
  useEffect(() => {
    if (filterDebounce) {
      setUrl(
        // `https://api.themoviedb.org/3/search/movie?api_key=5a1549eca98425d82d3d4bedb789e02b&query=${filterDebounce}&page=${nextPage}`
        tmdbAPI.getMovieSearch(filterDebounce, nextPage)
      );
    } else {
      setUrl(
        // `https://api.themoviedb.org/3/movie/popular?api_key=5a1549eca98425d82d3d4bedb789e02b&page=${nextPage}`
        tmdbAPI.getMovieList("popular", nextPage)
      );
    }
  }, [filterDebounce, nextPage]);

  //phân trang
  const [itemOffset, setItemOffset] = useState(0); //vi tri dau
  const [pageCount, setPageCount] = useState(0); //số trang
  useEffect(() => {
    if (!data || !data.total_results) return;
    // console.log(data);
    setPageCount(Math.ceil(data.total_results / itemsPerPage)); //setPagecount :chia item xem để biết bn trang
  }, [data, itemOffset]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % data.total_results; //trang htai
    setItemOffset(newOffset);
    setNextPage(event.selected + 1);
  };
  // return null;
  return (
    //search
    <div className="py-10 page-container">
      <div className="flex mb-10">
        <div className="flex-1">
          <input
            type="text"
            className="w-full p-4 bg-slate-800 text-white outline-none"
            placeholder="Type here to search"
            onChange={handleFilterChange}
          />
        </div>
        <button className="p-4 bg-primary text-white">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
            />
          </svg>
        </button>
      </div>
      {/* {loading && (
        <div
          className="w-10 h-10 rounded-full border-4 border-primary border-t-transparent
      border-t-4 mx-auto animate-spin"
        ></div>
      )} */}
      {loading && (
        <div className="grid grid-cols-4 gap-10">
          {new Array(itemsPerPage).fill(0).map(() => (
            <MovieCardSkeleton key={v4()}></MovieCardSkeleton>
          ))}
        </div>
      )}

      <div className="grid grid-cols-4 gap-10">
        {!loading &&
          movies.length > 0 &&
          movies.map((item) => (
            <MovieCard key={item.id} item={item}></MovieCard>
          ))}
      </div>
      <div className="mt-10 text-center">
      <Button
          onClick={() => (isReachingEnd ? {} : setSize(size + 1))}
          disabled={isReachingEnd}
          className={`${isReachingEnd ? "bg-slate-300" : ""} w-auto`}
        >
          Load more
        </Button>
      </div>
      {/* <div className="mt-10">
        <ReactPaginate
          breakLabel="..."
          nextLabel="next >"
          onPageChange={handlePageClick}
          pageRangeDisplayed={5}
          pageCount={pageCount}
          previousLabel="< previous"
          renderOnZeroPageCount={null}
          className="pagination"
        />
      </div> */}
    </div>
  );
};

export default MoviePageV2;
