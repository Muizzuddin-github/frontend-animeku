import Skeleton from "react-loading-skeleton";
import PropTypes from "prop-types";

const CardLoading = ({ count = 1 }) => {
  return new Array(count).fill(0).map((v, i) => (
    <section key={i} className="w-80 bg-gray-100 rounded-lg ">
      <section className="relative -mt-1">
        <Skeleton
          height={400}
          style={{
            borderTopRightRadius: "8px",
            borderTopLeftRadius: "8px",
            borderBottomLeftRadius: "0",
            borderBottomRightRadius: "0",
          }}
        />
        <section className="absolute top-1 right-1">
          <Skeleton
            style={{
              height: "38px",
              width: "30px",
            }}
            baseColor="#adadad"
          />
          <Skeleton
            baseColor="#696969"
            style={{
              height: "3px",
              position: "absolute",
              top: "22px",
              right: "2px",
              left: "2px",
              width: "25px",
            }}
          />
        </section>
      </section>
      <section className="p-5 flex  flex-col gap-2">
        <Skeleton height={20} />
        <Skeleton height={20} width={200} />
        <Skeleton height={20} width={50} />
        <Skeleton height={32} width={120} />
      </section>
    </section>
  ));
};

export default CardLoading;

CardLoading.propTypes = {
  count: PropTypes.number,
};
