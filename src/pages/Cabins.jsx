"use client";

import { useEffect, useState } from "react";

import Heading from "../ui/Heading";
import Row from "../ui/Row";
import { getCabins } from "../services/apiCabins";

function Cabins() {
  const [cabins, setCabins] = useState();

  useEffect(() => {
    getCabins().then((data) => {
      if (data) setCabins(data);
    });
  }, []);

  if (!cabins) return null;

  console.log(cabins);

  return (
    <Row type='vertical'>
      <Heading as='h1'>All cabins</Heading>
      <ul>
        {cabins.length > 0 &&
          cabins.map((cabin) => {
            return (
              <li key={cabin.id}>
                <p>Room Number: {cabin.name}</p>
                <p>{cabin.description}</p>
                <img src={cabin.image} alt={cabin.name} />
              </li>
            );
          })}
      </ul>
    </Row>
  );
}

export default Cabins;
