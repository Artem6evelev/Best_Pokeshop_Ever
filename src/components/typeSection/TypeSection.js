import { Link } from "react-router-dom";

//styles
import { makeStyles } from "@material-ui/core";

//materail components
import { Grid, Typography } from "@material-ui/core";

export const TypeSection = ({
  pokeball,
  pokemonList,
  pokemonType,
  linkToStore,
}) => {
  const classes = useStyles();
  return (
    <Grid container className={classes.mainContainer}>
      <Grid container item className={classes.titleContainer}>
        <Grid
          item
          xs={12}
          sm={4}
          md={3}
          lg={2}
          className={classes.imgContainer}
        >
          <Link to={linkToStore}>
            <img src={pokeball} alt="pokeball" className={classes.pokeball} />
            <Typography variant="h6">{pokemonType}</Typography>
          </Link>
        </Grid>
        <Grid item xs={12} sm={8} md={9} lg={10}>
          {pokemonList}
        </Grid>
      </Grid>
    </Grid>
  );
};

const useStyles = makeStyles({
  mainContainer: {
    backgroundColor: "#F6F6FB",
    textAlignLast: "center",
    marginBottom: "50px",
  },
  titleContainer: {
    justifyContent: "center",
  },
  imgContainer: {
    padding: "30px",
    "&:hover": {
      background: "#ffd6d6",
    },
  },
  pokeball: {
    width: "200px",
    height: "200px",
    marginBottom: "0px",
  },
});
