import { HelmetProvider, Helmet } from "react-helmet-async";
import { useEffect, useState } from "react";
import Spinner from "../components/Spinner";
import { useContext } from "react";
import { UserContext } from "../hooks/ContextProvider";
import UserApi from "../api/user";
import CardHistory from "../components/CardHistory";
import { Link } from "react-router-dom";

const History = () => {
  const [anime, setAnime] = useState([]);
  const [trailer, setTrailer] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const [username] = useContext(UserContext);

  useEffect(function () {
    UserApi.getAll().then((res) => {
      setAnime(res.data.data);
      setIsLoading(false);
    });
  }, []);

  return (
    <HelmetProvider>
      <Helmet>
        <title>History</title>
      </Helmet>

      {trailer ? (
        <section className="w-full fixed h-[100vh] flex justify-center items-center layar-hitam z-10">
          <section className="p-14 bg-white rounded-md relative">
            <i
              className="fa-solid fa-xmark text-4xl text-red-500 absolute right-5 top-3 cursor-pointer"
              onClick={() => setTrailer("")}
            ></i>
            <iframe
              width="960"
              height="515"
              src={trailer}
              title="YouTube video player"
              allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; autoplay;"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
              className="rounded-md"
            ></iframe>
          </section>
        </section>
      ) : (
        ""
      )}

      <header className="bg-gray-100">
        <div className="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-20">
          <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl ">
            History {username}
          </h1>
          <p className="mb-8 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 lg:px-48 dark:text-gray-400">
            ini adalah history anime anda
          </p>
          <Link
            to="/dashboard"
            className="py-2 px-4 bg-green-600 rounded-md text-white"
          >
            Dashboard
          </Link>
        </div>
      </header>
      <main>
        <section className="container m-auto ">
          {isLoading ? (
            <section className="w-full flex justify-center items-center pt-56">
              <Spinner />
            </section>
          ) : (
            <section className="flex gap-10 flex-wrap justify-between items-start mt-7">
              {anime.map(({ history }, i) => (
                <CardHistory
                  key={i}
                  id={history._id}
                  img={history.images}
                  title={history.title}
                  url={history.url}
                  genre={history.genres}
                  trailer={history.trailer}
                  tahun={history.year}
                  status={history.status}
                  score={history.score}
                  setTrailer={setTrailer}
                  setAnime={setAnime}
                />
              ))}
            </section>
          )}
        </section>
      </main>
    </HelmetProvider>
  );
};

export default History;
