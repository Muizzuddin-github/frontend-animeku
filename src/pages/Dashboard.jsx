import { HelmetProvider, Helmet } from "react-helmet-async";
import Anime from "../api/anime";
import { useEffect, useState } from "react";
import Card from "../components/Card";
import { useContext } from "react";
import { UserContext } from "../hooks/ContextProvider";
import VideoModal from "../components/VideoModal";
import UserApi from "../api/user";
import CardHistory from "../components/CardHistory";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import CardLoading from "../components/CardLoading";

const Dashboard = () => {
  const [animeSearch, setAnimeSearch] = useState([]);
  const [anime, setAnime] = useState([]);
  const [trailer, setTrailer] = useState("");
  const [searchDisable, setSearchDisable] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [btnHistoryDisable, setBtnHistoryDisable] = useState(false);

  const [switchResorce, setSwitchResource] = useState(true);
  const [username] = useContext(UserContext);

  const [errorMessage, setErrorMessage] = useState("");
  const redirect = useNavigate();
  const inputSearch = useRef();

  useEffect(() => {
    UserApi.getAll()
      .then((res) => {
        setAnime(res.data.data);
        setIsLoading(false);
      })
      .catch((err) => {
        if (err.response.status === 403 || err.response.status >= 500) {
          redirect("/");
        } else {
          setErrorMessage(err.message);
        }
      });
  }, [redirect]);

  const getAllAnime = async () => {
    try {
      setBtnHistoryDisable(true);
      setIsLoading(true);
      setSearchDisable(true);

      inputSearch.current.placeholder = "Tunggu sebentar...";
      const anim = await UserApi.getAll();
      setTimeout(() => {
        setAnime(anim.data.data);
        setSwitchResource(true);
        setSearchDisable(false);
        setIsLoading(false);
        setBtnHistoryDisable(false);
        inputSearch.current.placeholder = "Cari";
      }, 1000);
    } catch (err) {
      if (err.response.status === 403 || err.response.status >= 500) {
        redirect("/");
      } else {
        setErrorMessage(err.message);
      }
    }
  };

  const inputCari = async (e) => {
    if (e.key === "Enter") {
      try {
        setBtnHistoryDisable(true);
        setIsLoading(true);
        setSearchDisable(true);

        const name = e.target.value;
        inputSearch.current.value = "";
        inputSearch.current.placeholder = "Tunggu sebentar...";

        const data = await Anime.search(name);

        setTimeout(() => {
          setAnimeSearch(data.data.data);
          e.target.placeholder = "Cari";
          setIsLoading(false);
          setSearchDisable(false);
          setBtnHistoryDisable(false);
          setSwitchResource(false);
        }, 1000);
      } catch (err) {
        if (err.response.status === 403 || err.response.status >= 500) {
          redirect("/");
        } else {
          setErrorMessage(err.message);
        }
      }
    }
  };

  return (
    <HelmetProvider>
      <Helmet>
        <title>Dashboard</title>
      </Helmet>

      {trailer ? <VideoModal setTrailer={setTrailer} trailer={trailer} /> : ""}

      {errorMessage ? (
        <section className="bg-white absolute top-0 left-0 bottom-0 right-0 flex justify-center items-center z-10">
          <p className="text-red-400 text-xl font-bold">{errorMessage}</p>
        </section>
      ) : (
        ""
      )}

      <header className="bg-gray-100 ">
        <section className="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-20">
          <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl ">
            Selamat Datang {username[0].toUpperCase() + username.slice(1)}
          </h1>
          <p className="mb-8 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 lg:px-48 dark:text-gray-400">
            Silahkan cari anime yang sudah kami sedikan, dengan daftar anime
            yang didapat dari myanimelist dan anda bisa menyimpannya sebagai
            history
          </p>

          <section className=" mt-10 w-full flex justify-center items-center gap-5">
            <input
              ref={inputSearch}
              type="search"
              disabled={searchDisable}
              className=" block w-1/2 p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 "
              placeholder="Cari"
              required
              onKeyDown={inputCari}
            />

            <button
              className="py-3 px-4 bg-green-600 rounded-lg text-white hover:bg-green-700"
              onClick={getAllAnime}
              disabled={btnHistoryDisable}
            >
              Lihat History
            </button>
          </section>
        </section>
      </header>
      <main>
        <section className="container m-auto ">
          {isLoading ? (
            <section>
              <section className="flex gap-10 flex-wrap justify-between items-start mt-7">
                <CardLoading count={8} />
              </section>
            </section>
          ) : (
            <section>
              {switchResorce ? (
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
                      setBtnHistoryDisable={setBtnHistoryDisable}
                      setSearchDisable={setSearchDisable}
                      setErrorMessage={setErrorMessage}
                    />
                  ))}
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
                      setBtnHistoryDisable={setBtnHistoryDisable}
                      setSearchDisable={setSearchDisable}
                    />
                  ))}
                </section>
              )}
            </section>
          )}
        </section>
      </main>
    </HelmetProvider>
  );
};

export default Dashboard;
