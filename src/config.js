export const fetcher = (...args) => fetch(...args).then(res => res.json());
export const apiKey = "5a1549eca98425d82d3d4bedb789e02b";
const tmdbEndpoint = " https://api.themoviedb.org/3/movie"
const tmdbEndpointSearch = " https://api.themoviedb.org/3/search/movie"
export const tmdbAPI = {
    //Moviepage
    //movieList 
    getMovieList:(type, page = 1) =>`${tmdbEndpoint}/${type}?api_key=${apiKey}&page=${page}`,
    //movieDetailPage
    getMovieDetails: (movieId) => `${tmdbEndpoint}/${movieId}?api_key=${apiKey}`,//moviedetails
    getMovieMeta:(movieId, type) => `${tmdbEndpoint}/${movieId}/${type}?api_key=${apiKey}`, //moviecredits - video
    getMovieSearch:(query, page)=>
        `${tmdbEndpointSearch}?api_key=${apiKey}&query=${query}&page=${page}`

    ,
    imageOriginal:(url) => `https://image.tmdb.org/t/p/original/${url}`,
    //movieCard
    image500:(url) => `https://image.tmdb.org/t/p/w500/${url}`
}