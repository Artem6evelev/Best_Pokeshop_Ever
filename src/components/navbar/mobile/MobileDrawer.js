import React, { useEffect, useState } from "react";

import {
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Tab,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import MenuIcon from "@material-ui/icons/Menu";

import { useTranslation } from "react-i18next";
import i18next from "i18next";

import { Link } from "react-router-dom";
import { navBarLinks } from "../../../Service/constants/navBarLinks";

export const MobileDrawer = () => {
  const { i18n, t } = useTranslation(["common"]);
  const classes = useStyles();

  const [openDrawer, setOpenDrawer] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("i18nextLng")?.length > 2) {
      i18next.changeLanguage("en");
    }
  }, []);

  const handleLanguageChange = (e) => {
    i18n.changeLanguage(e.target.value);
  };

  return (
    <>
      <Drawer
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
        anchor="right"
      >
        <List>
          <select
            className="nav-link  border-0 ml-1 mr-2"
            value={localStorage.getItem("i18nextLng")}
            onChange={handleLanguageChange}
          >
            <option value="en">English</option>
            <option value="he">Hebrew</option>
          </select>
          {navBarLinks(t).map((link, idx) => {
            return (
              <ListItem button key={idx}>
                <ListItemIcon>
                  <Link to={link.route} className={classes.link}>
                    <ListItemText>{link.title}</ListItemText>
                  </Link>
                </ListItemIcon>
              </ListItem>
            );
          })}
        </List>
      </Drawer>

      <IconButton
        onClick={() => setOpenDrawer(!openDrawer)}
        className={classes.drawerBtn}
      >
        <MenuIcon />
      </IconButton>
    </>
  );
};

const useStyles = makeStyles({
  drawerBtn: {
    marginLeft: "auto",
  },
  link: {
    textDecoration: "none",
  },
});
