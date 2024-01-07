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
    </Modal>
  );
};

export default AddCabin;
