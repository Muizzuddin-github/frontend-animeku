import PropsTypes from "prop-types";

const VideoModal = ({ setTrailer, trailer }) => {
  return (
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
  );
};

export default VideoModal;

VideoModal.propTypes = {
  setTrailer: PropsTypes.func,
  trailer: PropsTypes.string,
};
