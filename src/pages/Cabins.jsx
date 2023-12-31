import AddCabin from "../features/cabins/AddCabin";
import CabinTable from "../features/cabins/CabinTable copy";

import Heading from "../ui/Heading";
import Row from "../ui/Row";

function Cabins() {
  return (
    <Row type='vertical'>
      <Heading as='h1'>All cabins</Heading>
      <CabinTable />
      <AddCabin />
    </Row>
  );
}

export default Cabins;
