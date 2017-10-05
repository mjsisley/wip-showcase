import { NavLink } from "react-router-dom";
import styled from "styled-components";

const activeClassName = "nav-item-active";

const HeaderLink = styled(NavLink).attrs({
  activeClassName
})`
  color: white;
  text-decoration: none;
  margin-left: 10px;
  margin-right: 10px;
  padding: 10px;
  :hover {
    text-decoration: underline;
  }
  &.${activeClassName} {
    border: white solid 1px;
    border-radius: 5px;
    text-decoration: none;
  }
`;

export default HeaderLink;
