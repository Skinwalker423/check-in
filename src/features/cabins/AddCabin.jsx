import Button from "../../ui/Button";
import Modal from "../../ui/Modal";
import CreateCabinForm from "./CreateCabinForm";

const AddCabin = () => {
  return (
    <Modal>
      <Modal.Open>
        <Button>Add New Cabin</Button>
      </Modal.Open>
      <Modal.Content>
        <CreateCabinForm />
      </Modal.Content>
    </Modal>
  );
};

export default AddCabin;
