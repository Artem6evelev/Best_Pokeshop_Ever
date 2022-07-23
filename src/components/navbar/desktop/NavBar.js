import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import i18next from "i18next";
import { Link } from "react-router-dom";
import { useIsLargeScreen } from "../../../Service/hooks/useIsLargeScreen";

//styles
import { makeStyles } from "@material-ui/core/styles";

//material components
import { AppBar, Toolbar, Tab, Grid } from "@material-ui/core";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";

// components
import { ReactComponent as PockeLogo } from "../../../assets/images/pockeshopLabel.svg";
import { MobileDrawer } from "../mobile/MobileDrawer";
import { navBarLinks } from "../../../Service/constants/navBarLinks";

//context
import { Basket } from "../../../context/basket-context";

const NavBar = () => {
  const isDesktopScreen = useIsLargeScreen("md");
  const { i18n, t } = useTranslation(["common"]);
  const classes = useStyles();

  const { basket } = Basket();

  const totalItensOnBasket = basket.reduce((totalItens, pokemon) => {
    return (totalItens += pokemon.qty);
  }, 0);

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
      <AppBar className={classes.appBar}>
        <Toolbar>
          <Grid container alignItems="center">
            <Link to="/">
              <PockeLogo className={classes.logo} />
            </Link>
          </Grid>
          {!isDesktopScreen ? (
            <>
              <MobileDrawer />
            </>
          ) : (
            <>
              <Grid container className={classes.tabContainer}>
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
                    <Grid item key={idx}>
                      <>
                        <Link to={link.route} className={classes.tab}>
                          {link.title === "Basket" ? (
                            <>
                              <ShoppingCartIcon />
                              <span>{totalItensOnBasket}</span>
                            </>
                          ) : (
                            <Tab label={link.title} className={classes.tab} />
                          )}
                        </Link>
                      </>
                    </Grid>
                  );
                })}
              </Grid>
            </>
          )}
        </Toolbar>
      </AppBar>
    </>
  );
};

export default NavBar;

const useStyles = makeStyles({
  appBar: {
    backgroundColor: "#fff",
    position: "fixed",
  },
  tabContainer: {
    justifyContent: "flex-end",
    alignItems: "center",
    position: "absolute",
    margin: "0px 0px 0px -30px",
  },

  tab: {
    color: "#000",
    fontSize: "12px",
    fontWeight: 600,
    textDecoration: "none",
    minWidth: "80px",
  },
});
