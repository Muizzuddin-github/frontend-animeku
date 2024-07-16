import { HelmetProvider, Helmet } from "react-helmet-async";
import Anime from "../api/anime";
import { useState } from "react";
import Card from "../components/Card";
import Spinner from "../components/Spinner";
import { useContext } from "react";
import { UserContext } from "../hooks/ContextProvider";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const [animeSearch, setAnimeSearch] = useState([]);
  const [trailer, setTrailer] = useState("");
  const [searchDisable, setSearchDisable] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [username] = useContext(UserContext);

  const inputCari = async (e) => {
    if (e.key === "Enter") {
      try {
        setIsLoading(true);
        setSearchDisable(true);
        const name = e.target.value;
        e.target.value = "";
        e.target.placeholder = "Tunggu sebentar...";

        const data = await Anime.search(name);

        setTimeout(() => {
          setAnimeSearch(data.data.data);
          e.target.placeholder = "Cari";
          setIsLoading(false);
          setSearchDisable(false);
        }, 1000);
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <HelmetProvider>
      <Helmet>
        <title>Dashboard</title>
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
            Selamat Datang {username}
          </h1>
          <p className="mb-8 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 lg:px-48 dark:text-gray-400">
            Silahkan cari anime yang sudah kami sedikan, dengan daftar anime
            yang didapat dari myanimelist dan kamu bisa menyimpannya sebagai
            history
          </p>

          <Link
            to="/history"
            className="py-2 px-4 bg-green-600 rounded-md text-white"
          >
            History
          </Link>
          <input
            type="search"
            disabled={searchDisable}
            className="mt-10 block w-full max-w-screen-sm m-auto p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 "
            placeholder="Cari"
            required
            onKeyDown={inputCari}
          />
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
              {animeSearch.map((v, i) => (
                <Card
                  key={i}
                  mal_id={v.mal_id}
                  img={v?.images?.webp?.large_image_url}
                  title={v?.title}
                  url={v?.url}
                  genre={v?.genres.map((val) => val.name)}
                  trailer={v?.trailer?.embed_url}
                  tahun={v?.year}
                  status={v?.status}
                  score={v?.score}
                  setTrailer={setTrailer}
                />
              ))}
            </section>
          )}
        </section>
      </main>
    </HelmetProvider>
  );
};

export default Dashboard;
