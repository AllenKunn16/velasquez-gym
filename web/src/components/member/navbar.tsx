import axios from 'axios';
import React, { FC } from 'react';
import { Button, Collapse, DropdownItem, DropdownMenu, DropdownToggle, Nav, Navbar as NavbarBase, NavbarBrand, NavbarText, NavItem, NavLink, UncontrolledDropdown } from 'reactstrap';

const HomeNavbar: FC = () => {

  const onClickLogout = async () => {
    await axios.delete('/api/auth');
    location.reload();
  }


  return (
    <NavbarBase color="light" expand="md" light className="rounded">
      <NavbarBrand>
        Velasquez Gym
      </NavbarBrand>

      <Collapse navbar>
        <Nav
          className="me-auto"
          navbar
        />
          
        <NavbarText tag={Button} onClick={onClickLogout}>
          Logout
        </NavbarText>
      </Collapse>
    </NavbarBase>  
  );
};

export default HomeNavbar;