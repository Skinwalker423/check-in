import { useState } from "react";
import Button from "../../ui/Button";
import Modal from "../../ui/Modal";
import CreateCabinForm from "./CreateCabinForm";

const AddCabin = () => {
  const [showForm, setShowForm] = useState(false);

  const toggleShowForm = () => {
    setShowForm((prevState) => !prevState);
  };
  return (
    <>
      <Button type='button' onClick={toggleShowForm}>
        {showForm ? "Hide Form" : "Add New Cabin"}
      </Button>
      {showForm && <CreateCabinForm />}
      <Modal />
    </>
  );
};

export default AddCabin;
