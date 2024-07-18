import PropTypes from "prop-types";
import UserApi from "../api/user";
import { useState } from "react";
import Spinner from "./Spinner";
import { useNavigate } from "react-router-dom";

const CardHistory = ({
  id,
  img,
  title,
  url,
  genre,
  setTrailer,
  trailer,
  tahun,
  status,
  score,
  setAnime,
  setBtnHistoryDisable,
  setSearchDisable,
  setErrorMessage,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const redirect = useNavigate();

  const sensorImg = (genre) => {
    const sensorGenre = ["Hentai", "Ecchi"];

    return genre.find((v) => {
      return sensorGenre.includes(v);
    });
  };

  const delAnime = async () => {
    try {
      if (!isLoading) {
        setBtnHistoryDisable(true);
        setSearchDisable(true);
        setIsLoading(true);
        await UserApi.del(id);

        setAnime((prev) => prev.filter((v) => v.history._id != id));
        setIsLoading(false);
        setBtnHistoryDisable(false);
        setSearchDisable(false);
      }
    } catch (err) {
      console.log(err);
      setIsLoading(false);
      if (err.response.status === 403 || err.response.status >= 500) {
        redirect("/");
      } else {
        setErrorMessage(err.message);
      }
    }
  };

  return (
    <section className=" max-w-72 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 relative">
      <section>
        <section
          className="p-1 rounded-md bg-white absolute top-1 right-1 flex justify-center items-center cursor-pointer"
          onClick={delAnime}
        >
          {isLoading ? (
            <Spinner />
          ) : (
            <i className="fa-solid fa-minus  text-2xl"></i>
          )}
        </section>
        <img
          className="rounded-t-lg m-auto"
          src={sensorImg(genre) ? "/img/sensor.jpg" : img}
          alt=""
        />
      </section>
      <section className="p-5">
        <a href={url} target="_blank">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {title}
          </h5>
        </a>
        <p className="mb-1 font-normal text-sm text-gray-700 dark:text-gray-400">
          {genre.join(" ")}
        </p>
        {status ? (
          <p className="mb-1 font-normal text-sm text-gray-700 dark:text-gray-400">
            {status}
          </p>
        ) : (
          ""
        )}
        {score ? (
          <p className="mb-1 font-normal text-sm text-gray-700 dark:text-gray-400">
            {score}
          </p>
        ) : (
          ""
        )}
        {tahun ? (
          <p className="mb-1 font-normal text-sm text-gray-700 dark:text-gray-400">
            {tahun}
          </p>
        ) : (
          ""
        )}
        {trailer ? (
          <button
            type="button"
            disabled={isLoading}
            className="mt-2 inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800"
            onClick={() => setTrailer(trailer)}
          >
            Tonton Trailer
          </button>
        ) : (
          ""
        )}
      </section>
    </section>
  );
};

export default CardHistory;

CardHistory.propTypes = {
  id: PropTypes.string,
  img: PropTypes.string,
  title: PropTypes.string,
  url: PropTypes.string,
  genre: PropTypes.array,
  setTrailer: PropTypes.func,
  trailer: PropTypes.string,
  tahun: PropTypes.number,
  status: PropTypes.string,
  score: PropTypes.number,
  setAnime: PropTypes.func,
  setBtnHistoryDisable: PropTypes.func,
  setSearchDisable: PropTypes.func,
  setErrorMessage: PropTypes.func,
};
