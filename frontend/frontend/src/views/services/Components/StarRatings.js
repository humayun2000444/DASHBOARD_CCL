import React from "react";

const StarRatings = ({ star }) => {
  const Stars = Array.from({ length: 5 }, (elem, index) => {
    let number = index + 0.5;
    return (
      <span>
        {star >= index + 1 ? (
          <i
            style={{ color: "#164677", fontSize: "15px" }}
            class="fas fa-star"
          ></i>
        ) : star >= number ? (
          <i
            style={{ color: "#164677", fontSize: "15px" }}
            class="fas fa-star-half-alt"
          ></i>
        ) : (
          <i
            style={{ color: "#164677", fontSize: "15px" }}
            class="far fa-star"
          ></i>
        )}
      </span>
    );
  });

  return <div>{Stars}</div>;
};

export default StarRatings;
