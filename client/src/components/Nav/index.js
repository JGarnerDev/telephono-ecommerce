import React from "react";
import { Link, withRouter, useHistory } from "react-router-dom";

import {
  Button,
  SwipeableDrawer,
  List,
  ListItem,
  ListItemIcon,
} from "@material-ui/core";

import { MenuRounded, Home, PersonAdd, ExitToApp } from "@material-ui/icons";

import "./Nav.scss";

const Nav = React.memo(() => {
  const [openNav, setOpenNav] = React.useState(false);
  let history = useHistory();



  const renderList = () =>
  // Icon, linkref, link text
    [
      [<Home />, "/", "Home"],
      [<PersonAdd />, "/signup", "Sign up"],
      [<ExitToApp />, "/login", "Log in"],
    ].map((linkData, i) => {
      return (
        <ListItem
          key={i}
          onClick={() => {
            setOpenNav(!openNav);
          }}
        >
          <ListItemIcon>{linkData[0]}</ListItemIcon>
          <Link to={linkData[1]}>{linkData[2]}</Link>
        </ListItem>
      );
    });

  return (
    <nav id="Nav">
      <Button
        onClick={() => {
          setOpenNav(!openNav);
        }}
      >
        <MenuRounded />
      </Button>
      <SwipeableDrawer
        anchor={"right"}
        open={openNav}
        onOpen={() => setOpenNav(true)}
        onClose={() => setOpenNav(false)}
      >
        <List>{renderList()}</List>
      </SwipeableDrawer>
    </nav>
  );
});

export default Nav;
