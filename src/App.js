import { Fragment, lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import "swiper/scss";
import Banner from "./components/banner/Banner";
import Main from "./components/layout/Main";
import "../src/index.scss";
// import HomePage from "./pages/HomePage";
// import MovieDetailsPage from "./pages/MovieDetailsPage";
// import MoviePage from "./pages/MoviePage";

//dynamic import
const HomePage = lazy(() => import("./pages/HomePage.js"));
const MovieDetailsPage = lazy(() => import("./pages/MovieDetailsPage.js"));
const MoviePage = lazy(() => import("./pages/MoviePage.js"));
const MoviePageV2 = lazy(() => import("./pages/MoviePageV2.js"));

function App() {
  return (
    <Fragment>
      <Suspense fallback={<></>}>
        <Routes>
          <Route element={<Main></Main>}>
            <Route
              path="/"
              element={
                <>
                  <Banner></Banner>
                  <HomePage></HomePage>
                </>
              }
            ></Route>
            <Route path="/movie" element={<MoviePageV2></MoviePageV2>}></Route>
            <Route
              path="/movie/:movieId"
              element={<MovieDetailsPage></MovieDetailsPage>}
            ></Route>
            <Route path="*" element={<>error 404</>}></Route>
          </Route>
        </Routes>
      </Suspense>
    </Fragment>
  );
}

export default App;
