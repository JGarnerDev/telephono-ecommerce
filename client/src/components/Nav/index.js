import React from "react";
import { Link } from "react-router-dom";

import { isAuth, logOut } from "../../auth";

import {
  Button,
  SwipeableDrawer,
  List,
  ListItem,
  ListItemIcon,
} from "@material-ui/core";

import {
  MenuRounded,
  Home,
  PersonAdd,
  ExitToApp,
  MeetingRoom,
  Storefront,
} from "@material-ui/icons";

import "./Nav.scss";

const Nav = React.memo(() => {
  const [openNav, setOpenNav] = React.useState(false);

  let links;

  isAuth()
    ? (links = [
        [<Home />, "/", "Home"],
        [<MeetingRoom />, "/", "Log out"],
      ])
    : (links = [
        [<Home />, "/", "Home"],
        [<PersonAdd />, "/signup", "Sign up"],
        [<ExitToApp />, "/login", "Log in"],
      ]);

  const renderList = () =>
    links.map((linkData, i) => {
      return linkData[2] !== "Log out" ? (
        <ListItem
          key={i}
          onClick={() => {
            setOpenNav(!openNav);
          }}
        >
          <ListItemIcon>{linkData[0]}</ListItemIcon>
          <Link to={linkData[1]}>{linkData[2]}</Link>
        </ListItem>
      ) : (
        <ListItem
          key={i}
          onClick={() => {
            setOpenNav(!openNav);
            logOut();
          }}
        >
          <ListItemIcon>{linkData[0]}</ListItemIcon>
          <Link to={linkData[1]}>{linkData[2]}</Link>
        </ListItem>
      );
    });

  return (
    <nav id="Nav">
      <Link to="/products">Products</Link>
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
