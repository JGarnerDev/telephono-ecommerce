import React from "react";
import { Link } from "react-router-dom";

import { isAuth, isAdmin, logOut } from "../../auth";

import {
  SIGNUP_URL,
  LOGIN_URL,
  CLIENT_CART_URL,
  CLIENT_ACCOUNT_URL,
  ADMIN_ACCOUNT_URL,
  ADMIN_VIEW_ORDERS_URL,
  CLIENT_ORDER_HISTORY_URL,
} from "../../config";

import { countProductsInCart } from "../../views/Cart/utils";

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
  AccountCircle,
  ShoppingBasket,
  ViewCarousel,
  Build,
  LocalShipping,
} from "@material-ui/icons";

import "./Nav.scss";

const Nav = React.memo(() => {
  const [openNav, setOpenNav] = React.useState(false);

  let links;

  isAuth()
    ? isAdmin()
      ? (links = [
          [<Home />, "/", "Home"],
          [<Build />, ADMIN_ACCOUNT_URL, "My account (Admin)"],
          [<LocalShipping />, ADMIN_VIEW_ORDERS_URL, "All orders"],
          [<LocalShipping />, CLIENT_ORDER_HISTORY_URL, "My orders"],
          [<MeetingRoom />, "/", "Log out"],
        ])
      : (links = [
          [<Home />, "/", "Home"],
          [<AccountCircle />, CLIENT_ACCOUNT_URL, "My account"],
          [<MeetingRoom />, "/", "Log out"],
        ])
    : (links = [
        [<Home />, "/", "Home"],
        [<PersonAdd />, SIGNUP_URL, "Sign up"],
        [<ExitToApp />, LOGIN_URL, "Log in"],
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
          <Link to={linkData[1]}>
            <ListItemIcon>{linkData[0]}</ListItemIcon>
            {linkData[2]}
          </Link>
        </ListItem>
      ) : (
        <ListItem
          key={i}
          onClick={() => {
            setOpenNav(!openNav);
            logOut();
          }}
        >
          <Link to={linkData[1]}>
            <ListItemIcon>{linkData[0]}</ListItemIcon>
            {linkData[2]}
          </Link>
        </ListItem>
      );
    });

  return (
    <nav id="Nav">
      <Link to="/shop">Products</Link>

      <Link to={CLIENT_CART_URL}>
        <p>My cart</p>
      </Link>
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
        <List id="Nav__list">{renderList()}</List>
      </SwipeableDrawer>
    </nav>
  );
});

export default Nav;
