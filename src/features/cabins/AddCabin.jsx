import Button from "../../ui/Button";
import Modal from "../../ui/Modal";
import CreateCabinForm from "./CreateCabinForm";

const AddCabin = () => {
  return (
    <Modal>
      <Modal.Open opens='create-cabin'>
        <Button>Add New Cabin</Button>
      </Modal.Open>
      <Modal.Content name='create-cabin'>
        <CreateCabinForm />
      </Modal.Content>
      <Modal.Open opens='table'>
        <Button>Add New Table</Button>
      </Modal.Open>
      <Modal.Content name='table'>
        Some content
      </Modal.Content>
    </Modal>
  );
};

export default AddCabin;
