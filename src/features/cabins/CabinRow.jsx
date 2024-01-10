import styled from "styled-components";
import { formatCurrency } from "../../utils/helpers";

import useDeleteCabin from "./useDeleteCabin";
import useCreateCabin from "./useCreateCabin";

import Spinner from "../../ui/Spinner";
import EditCabinForm from "./EditCabinForm";
import { HiPencil } from "react-icons/hi2";
import { HiSquare2Stack } from "react-icons/hi2";
import { HiMiniTrash } from "react-icons/hi2";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";

// const TableRow = styled.div`
//   display: grid;
//   grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
//   column-gap: 2.4rem;
//   align-items: center;
//   padding: 1.4rem 2.4rem;

//   &:not(:last-child) {
//     border-bottom: 1px solid var(--color-grey-100);
//   }
// `;

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Price = styled.div`
  font-family: "Sono";
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: "Sono";
  font-weight: 500;
  color: var(--color-green-700);
`;

// const Wrapper = styled.div`
//   display: flex;
//   gap: 2rem;
// `;

const CabinRow = ({ cabin }) => {
  const {
    name,
    image,
    maxCapacity,
    regularPrice,
    discount,
    id,
  } = cabin;

  const { deleteCabin, isDeleting } = useDeleteCabin();
  const { createCabin, isCreating } = useCreateCabin();

  const handleCopyCabin = () => {
    console.log("copying");
    createCabin({
      name: `${name}-copy`,
      image,
      maxCapacity,
      regularPrice,
      discount,
    });
  };

  return (
    <>
      <Table.Row>
        <Img
          src={image || "/cabins/cabin-008.jpg"}
          alt={name}
        />
        <Cabin>{name}</Cabin>
        <div>Fits up to {maxCapacity}</div>
        <Price>{regularPrice}</Price>
        {discount ? (
          <Discount>{formatCurrency(discount)}</Discount>
        ) : (
          <span>&mdash;</span>
        )}
        <div>
          <button
            onClick={handleCopyCabin}
            disabled={isDeleting || isCreating}
          >
            <HiSquare2Stack />
          </button>
          <Modal>
            <Modal.Open opens={"edit"}>
              <button disabled={isDeleting || isCreating}>
                <HiPencil />
              </button>
            </Modal.Open>
            <Modal.Content name={"edit"}>
              <EditCabinForm cabinToEdit={cabin} />
            </Modal.Content>
          </Modal>

          <Modal>
            <Modal.Open opens={"delete"}>
              <button disabled={isDeleting || isCreating}>
                {isDeleting ? <Spinner /> : <HiMiniTrash />}
              </button>
            </Modal.Open>
            <Modal.Content name={"delete"}>
              <ConfirmDelete
                onConfirm={() => deleteCabin(id)}
                resourceName={name}
                disabled={isDeleting || isCreating}
              />
            </Modal.Content>
          </Modal>

          <Menus.Menu>
            <Menus.Toggle id={id} />
            <Menus.List id={id}>
              <Menus.Button>Duplicate</Menus.Button>
              <Menus.Button>Edit</Menus.Button>
              <Menus.Button>Delete</Menus.Button>
            </Menus.List>
          </Menus.Menu>
        </div>
      </Table.Row>
    </>
  );
};

export default CabinRow;
