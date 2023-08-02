import React, { useEffect, useState } from "react";
import useSWR from "swr";
import { fetcher } from "../../config";
import { SwiperSlide, Swiper } from "swiper/react"; //vd209:lướt trang
import Button from "../button/Button";
import { useNavigate } from "react-router-dom";
import { Navigate } from "react-router-dom";
const Banner = () => {
  const { data, error } = useSWR(
    `https://api.themoviedb.org/3/movie/upcoming?api_key=5a1549eca98425d82d3d4bedb789e02b`,
    fetcher
  );
  const movies = data?.results || [];
  // console.log("banner", movies);
  console.log(data);
  return (
    <section className="banner h-[600px] page-container mb-20 overflow-hidden">
      <Swiper grabCursor={true} slidesPerView={"auto"}>
        {movies.length > 0 &&
          movies.map((item) => (
            <SwiperSlide key={item.id}>
              <BannerItem item={item}></BannerItem>
            </SwiperSlide>
          ))}
      </Swiper>
    </section>
  );
};

function BannerItem({item}) {
    const navigate = useNavigate();
    const { title, vote_average, release_date, poster_path,popularity, id} = item;
  return (
    <div className="w-full h-full rounded-lg relative">
      <div
        className="overlay absolute inset-0 bg-gradient-to-t from-[rgba(0,0,0,0.5)]
          to-[rgba(0,0,0,0.5)] rounded-lg "
      ></div>
      <img
       src={`https://image.tmdb.org/t/p/original/${poster_path}`}
        alt=""
        className="w-full h-full object-cover rounded-lg "
      />
      <div className="absolute left-5 bottom-5 w-full text-white">
        <h2 className="font-bold text-3xl mb-5">{title}</h2>
        <div className="flex items-center gap-x-3 mb-8">
          <span className="p-4 border border-white rounded-md">{release_date}</span>
          <span className="p-4 border border-white rounded-md">{vote_average}</span>
          <span className="p-4 border border-white rounded-md">{popularity}</span>
        </div>
        <Button  onClick={()=> navigate(`/movie/${id}`)} bgColor="secondary" className=" w-auto ">watch now</Button>
        {/* <button onClick={()=>Navigate(`/movie/${id}`)} className="py-3 px-6 rounded-lg text-white font-medium" >
          Watch Now
        </button> */}
      </div>
    </div>
  );
}

export default Banner;
