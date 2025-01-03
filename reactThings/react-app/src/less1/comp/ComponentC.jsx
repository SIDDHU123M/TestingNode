import React from "react";
import { useContext } from "react";
import { Data, Lang } from "../../App.jsx";

const ComponentC = () => {
  const Language = useContext(Lang);
  return (
    <>
      <h1>{Language}</h1>
      {/* <Data.Consumer>
        {(name) => {
          return <h1>{name}</h1>;
        }}
      </Data.Consumer>

      <Lang.Consumer>
            {(name) => <h1>{name}</h1>}
      </Lang.Consumer> */}
    </>
  );
};

export default ComponentC;
