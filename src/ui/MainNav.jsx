import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { HiMiniHome } from "react-icons/hi2";
import { HiCalendarDays } from "react-icons/hi2";
import { HiMiniUsers } from "react-icons/hi2";
import { HiCog8Tooth } from "react-icons/hi2";
import { HiHomeModern } from "react-icons/hi2";

const navConfig = [
  {
    path: "/dashboard",
    label: "Home",
    icon: <HiMiniHome />,
  },
  {
    path: "/bookings",
    label: "Bookings",
    icon: <HiCalendarDays />,
  },

  {
    path: "/settings",
    label: "Settings",
    icon: <HiCog8Tooth />,
  },
  {
    path: "/cabins",
    label: "Cabins",
    icon: <HiHomeModern />,
  },
  {
    path: "/users",
    label: "Users",
    icon: <HiMiniUsers />,
  },
];

const NavList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`;

const StyledNavLink = styled(NavLink)`
  &:link,
  &:visited {
    display: flex;
    align-items: center;
    gap: 1.2rem;

    color: var(--color-grey-600);
    font-size: 1.6rem;
    font-weight: 500;
    padding: 1.2rem 2.4rem;
    transition: all 0.3s;
  }

  /* This works because react-router places the active class on the active NavLink */
  &:hover,
  &:active,
  &.active:link,
  &.active:visited {
    color: var(--color-grey-800);
    background-color: var(--color-grey-50);
    border-radius: var(--border-radius-sm);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-400);
    transition: all 0.3s;
  }

  &:hover svg,
  &:active svg,
  &.active:link svg,
  &.active:visited svg {
    color: var(--color-brand-600);
  }
`;

export default function MainNav() {
  return (
    <nav>
      <NavList>
        {navConfig.map(({ path, label, icon }) => (
          <li key={label}>
            <StyledNavLink to={path}>
              {icon}
              <span>{label}</span>
            </StyledNavLink>
          </li>
        ))}
      </NavList>
    </nav>
  );
}
