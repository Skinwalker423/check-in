import styled from "styled-components";
import useUserSession from "./useUserSession";
import defaultUser from "../../../public/img/default-user.jpg";

const StyledUserAvatar = styled.div`
  display: flex;
  gap: 1.2rem;
  align-items: center;
  font-weight: 500;
  font-size: 1.4rem;
  color: var(--color-grey-600);
`;

const Avatar = styled.img`
  display: block;
  width: 4rem;
  width: 3.6rem;
  aspect-ratio: 1;
  object-fit: cover;
  object-position: center;
  border-radius: 50%;
  outline: 2px solid var(--color-grey-100);
`;

const UserAvatar = () => {
  const { user } = useUserSession();

  const { avatar, fullName } = user.user_metadata;

  return (
    <StyledUserAvatar>
      <Avatar
        src={avatar || defaultUser}
        alt={`avatar of ${fullName}`}
      />
      {fullName}
    </StyledUserAvatar>
  );
};

export default UserAvatar;
