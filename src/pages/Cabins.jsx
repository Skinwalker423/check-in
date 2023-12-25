"use client";

import CabinTable from "../features/cabins/CabinTable";
import Heading from "../ui/Heading";
import Row from "../ui/Row";

function Cabins() {
  return (
    <Row type='vertical'>
      <Heading as='h1'>All cabins</Heading>
      <CabinTable />
    </Row>
  );
}

export default Cabins;
