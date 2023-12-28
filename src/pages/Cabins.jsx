import { useState } from "react";
import CabinTable from "../features/cabins/CabinTable";
import Button from "../ui/Button";
import Heading from "../ui/Heading";
import Row from "../ui/Row";
import CreateCabinForm from "../features/cabins/CreateCabinForm";

function Cabins() {
  const [showForm, setShowForm] = useState(false);
  return (
    <Row type='vertical'>
      <Heading as='h1'>All cabins</Heading>
      <CabinTable />
      <Button
        type='button'
        onClick={() => setShowForm((prev) => !prev)}
      >
        {showForm ? "Hide Form" : "Add New Cabin"}
      </Button>
      {showForm && <CreateCabinForm />}
    </Row>
  );
}

export default Cabins;
