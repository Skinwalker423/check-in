import styled from "styled-components";
import { formatCurrency } from "../../utils/helpers";

import useDeleteCabin from "./useDeleteCabin";
import useCreateCabin from "./useCreateCabin";
import EditCabinForm from "./EditCabinForm";
import { HiPencil } from "react-icons/hi2";
import { HiSquare2Stack } from "react-icons/hi2";
import { HiMiniTrash } from "react-icons/hi2";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";

const StyledActions = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-end;
  flex-direction: column;
`;

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
        <StyledActions id={id}>
          <Modal>
            <Menus.Menu>
              <Menus.Toggle id={id} />
              <Menus.List id={id}>
                <Menus.Button
                  onClick={handleCopyCabin}
                  icon={<HiSquare2Stack />}
                  disabled={isDeleting || isCreating}
                >
                  Duplicate
                </Menus.Button>
                <Modal.Open opens={"edit"}>
                  <Menus.Button icon={<HiPencil />}>
                    Edit
                  </Menus.Button>
                </Modal.Open>
                <Modal.Open opens={"delete"}>
                  <Menus.Button
                    disabled={isDeleting || isCreating}
                    icon={<HiMiniTrash />}
                  >
                    Delete
                  </Menus.Button>
                </Modal.Open>
              </Menus.List>
              <Modal.Content name={"edit"}>
                <EditCabinForm cabinToEdit={cabin} />
              </Modal.Content>

              <Modal.Content name={"delete"}>
                <ConfirmDelete
                  onConfirm={() => deleteCabin(id)}
                  resourceName={name}
                  disabled={isDeleting || isCreating}
                />
              </Modal.Content>
            </Menus.Menu>
          </Modal>
        </StyledActions>
      </Table.Row>
    </>
  );
};

export default CabinRow;
