import React from "react";
import { useParams } from "react-router-dom";
import useSWR from "swr"; //fetcherAPI
import { apiKey, fetcher, tmdbAPI } from "../config";
import { SwiperSlide, Swiper } from "swiper/react"; //vd209:lướt qua trang
import MovieCard from "../components/movies/MovieCard";
// https://api.themoviedb.org/3/movie/{movie_id}?api_key=<<api_key>>
const MovieDetailsPage = () => {
  const { movieId } = useParams(); //nhận giá trị ngoài ui
  const { data, error } = useSWR(tmdbAPI.getMovieDetails(movieId), fetcher);
  if (!data) return null;
  const { backdrop_path, poster_path, title, genres, overview } = data;
  return (
    <div className="py-10 px-10">
      <div className="w-full h-[600px] relative">
        <div className="absolute inset-0 bg-black bg-opacity-30"></div>
        <div
          className="w-full h-full bg-cover bg-no-repeat"
          style={{
            backgroundImage: ` url(${tmdbAPI.imageOriginal(backdrop_path)})`,
          }}
        ></div>
      </div>
      <div className="w-full h-[400px] max-w-[800px] mx-auto -mt-[200px] relative z-10">
        <img
          src={tmdbAPI.imageOriginal(poster_path)}
          alt=""
          className="w-full h-full object-cover rounded-2xl"
        />
      </div>
      <h1 className="text-center text-4xl font-bold text-white mb-10 mt-4">
        {title}
      </h1>
      {genres.length > 0 && (
        <div className="flex items-center justify-center gap-x-5 mb-10 ">
          {genres.map((item) => (
            <span
              className="py-2 px-4 border-primary text-primary border"
              key={item.id}
            >
              {item.name}
            </span>
          ))}
        </div>
      )}
      <p className="text-center leading-relaxed max-w-[800px] mx-auto">
        {overview}
      </p>
      <MovieMeta type="credits"></MovieMeta>
      <MovieMeta type="videos"></MovieMeta>
      <MovieMeta type="similar"></MovieMeta>

      {/* <MovieCreadits></MovieCreadits>
      <MovieVideo></MovieVideo>
      <MovieSimilar></MovieSimilar> */}
    </div>
  );
};
function MovieMeta({ type = "videos" }) {
  const { movieId } = useParams();
  const { data } = useSWR(tmdbAPI.getMovieMeta(movieId, type), fetcher);
  if (!data) return null;
  if (type === "credits") {
    const { cast } = data;
    if (!cast || cast.length <= 0) return null;

    return (
      <div className="py-10">
        <h2 className="text-center text-3xl mb-10">Casts</h2>
        <div className="grid grid-cols-4 gap-5">
          {cast.slice(0, 4).map((item) => (
            <div className="cast-item" key={item.id}>
              <img
                src={tmdbAPI.imageOriginal(item.profile_path)}
                className="w-full h-[350px] object-cover rounded-lg mb-3"
                alt=""
              />
              <h3 className="text-xl font-medium">{item.name}</h3>
            </div>
          ))}
        </div>
      </div>
    );
  } else {
    const { results } = data;
    if (!results || results.length <= 0) return null;
    if (type === "videos")
      return (
        <div className="py-10">
          <div className="flex flex-col gap-10">
            {results.slice(0, 2).map((item) => (
              <div className="" key={item.id}>
                <h3 className="mb-5 text-xl font-medium p-3 bg-secondary inline-block">
                  {item.name}
                </h3>
                <div key={item.id} className="w-full aspect-video">
                  <iframe
                    width="864"
                    height="486"
                    src={`https://www.youtube.com/embed/${item.key}`}
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full object-fill"
                  ></iframe>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    if (type === "similar")
      return (
        <div className="py-10">
          <h2 className="text-3xl font-medium mb-10">Similar movies</h2>
          <div className="movie-list">
            <Swiper
              grabCursor={"true"}
              spaceBetween={40}
              slidesPerView={"auto"}
            >
              {results.length > 0 &&
                results.map((item) => (
                  <SwiperSlide key={item.id}>
                    <MovieCard item={item}></MovieCard>
                  </SwiperSlide>
                ))}
            </Swiper>
          </div>
        </div>
      );
  }
  return null;
}

function MovieCreadits() {
  const { movieId } = useParams(); //nhận giá trị ngoài ui
  const { data, error } = useSWR(
    // `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${apiKey}`,
    tmdbAPI.getMovieMeta(movieId, "credits"),
    fetcher
  );
  if (!data) return null;
  const { cast } = data;
  if (!cast || cast.length <= 0) return null;
  return (
    <>
      <h2 className="text-center text-3xl mb-10">Casts</h2>
      <div className=" grid grid-cols-4 gap-5">
        {cast.slice(0, 4).map((item) => (
          <div className="cast-item" key={item.id}>
            <img
              src={tmdbAPI.imageOriginal(item.profile_path)}
              alt=""
              className="w-full h-[350px] object-cover rounded-lg mb-3"
            />
            <h3>{item.name}</h3>
          </div>
        ))}
      </div>
    </>
  );
}
function MovieVideo() {
  const { movieId } = useParams(); //nhận giá trị ngoài ui
  const { data, error } = useSWR(
    // `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${apiKey}`,//video
    tmdbAPI.getMovieMeta(movieId, "videos"),

    fetcher
  );
  if (!data) return null;
  const { results } = data;
  if (!results || results.length <= 0) return null;
  return (
    <div className="py-10">
      <div className="flex flex-col gap-5">
        {results.slice(0, 1).map((item) => (
          <div className="" key={item.id}>
            <h3 className="mb-5 text-xl font-medium p-3 bg-secondary inline-block">
              {item.name}
            </h3>
            <div key={item.id} className="w-full aspect-video">
              <iframe
                width="864"
                height="486"
                src={`https://www.youtube.com/embed/${item.key}`}
                title="Youtube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full object-fill rounded-2xl"
              ></iframe>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
//phim tương tự
function MovieSimilar() {
  const { movieId } = useParams(); //nhận giá trị ngoài ui
  const { data, error } = useSWR(
    // `https://api.themoviedb.org/3/movie/${movieId}/similar?api_key=${apiKey}`,
    tmdbAPI.getMovieMeta(movieId, "similar"),
    fetcher
  );
  if (!data) return null;
  const { results } = data;
  if (!results || results.length <= 0) return null;
  return (
    <div className="py-10">
      <h2 className="text-3xl font-medium mb-10 p-3 bg-secondary inline-block ">
        Similar Movies
      </h2>
      <div className="movie-list">
        <Swiper grabCursor={true} spaceBetween={40} slidesPerView={"auto"}>
          {results.length > 0 &&
            results.map((item) => (
              <SwiperSlide key={item.id}>
                <MovieCard item={item}></MovieCard>
              </SwiperSlide>
            ))}
        </Swiper>
      </div>
    </div>
  );
}

export default MovieDetailsPage;
