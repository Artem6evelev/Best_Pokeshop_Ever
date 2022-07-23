import { useTranslation } from "react-i18next";

//styles
import { makeStyles } from "@material-ui/core/styles";

//hooks
import { useIsLargeScreen } from "../../Service/hooks/useIsLargeScreen";

//materail components
import { Grid, Typography } from "@material-ui/core";

//assets
import pokemaster from "../../assets/images/pokemaster.svg";
import ContainedBtn from "../buttons/containedBtn/ContainedBtn";

const Hero = () => {
  const { t } = useTranslation(["common"]);
  const classes = useStyles();
  const isDesktopScreen = useIsLargeScreen("md");

  return (
    <Grid container className={classes.mainContainer}>
      <Grid
        item
        xs={12}
        sm={6}
        md={6}
        lg={5}
        className={classes.pokemasterContainer}
      >
        <img
          src={pokemaster}
          alt="pokemaster"
          className={classes.pokemasterImg}
          style={{
            height: !isDesktopScreen ? "300px" : "500px",
            width: !isDesktopScreen ? "300px" : "500px",
          }}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={6} lg={7}>
        <Typography variant="h3">{t("hero.title")}</Typography>
        <Typography variant="h5">{t("hero.subtitle")}</Typography>
        <ContainedBtn
          text={t("buttons.becomePokemaster")}
          href={"https://artcodesh.com/"}
          style={{
            marginTop: "20px",
            color: "white",
          }}
        />
      </Grid>
    </Grid>
  );
};

export default Hero;

const useStyles = makeStyles({
  mainContainer: {
    marginTop: "50px",
    marginBottom: "20px",
    padding: "0px 20px",
    alignItems: "center",
  },
  pokemasterContainer: {
    textAlign: "center",
  },
});
