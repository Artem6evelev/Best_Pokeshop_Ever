import { Link } from "react-router-dom";
import { colors } from "./pokemon-card-colors.js";
import { useTranslation } from "react-i18next";

//styles
import { makeStyles } from "@material-ui/core/styles";

//material components
import {
  Grid,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
} from "@material-ui/core";
import AddCircleIcon from "@material-ui/icons/AddCircle";

//utils
import { formatPrice } from "../../utils/formatedPrice.js";

//context
import { Basket } from "../../context/basket-context";

export function PokemonCard({ pokemon }) {
  const classes = useStyles();
  const { basketAddItem } = Basket();

  const { t } = useTranslation(["common"]);

  function handdleAddPokemonToBasket(pokemonId, pokemonType) {
    basketAddItem(pokemonId, pokemonType);
  }

  return (
    <Card className={classes.root}>
      <Grid container>
        <Grid item xs={4} sm={4} md={4} lg={5}>
          <Link to={`/stores/pokemon/${pokemon.name}`}>
            <CardMedia
              className={classes.cardMedia}
              image={pokemon.img}
              alt={pokemon.name}
              title="Contemplative Reptile"
            />
          </Link>
        </Grid>
        <Grid item xs={8} sm={8} md={8} lg={7}>
          <CardContent>
            <Typography gutterBottom>
              {t("pokemon_card.name")}: {pokemon.name}
            </Typography>
            {pokemon.type && (
              <Typography variant="body1" color="textSecondary" component="p">
                {t("pokemon_card.type")}: {pokemon.type}
              </Typography>
            )}
            <Typography variant="body2" color="textSecondary" component="p">
              {t("pokemon_card.price")}: {formatPrice(pokemon.price)}
            </Typography>
          </CardContent>
          <CardActions className={classes.cardActions}>
            <Button
              onClick={() =>
                handdleAddPokemonToBasket(pokemon.id, pokemon.type)
              }
              className={classes.addBtn}
            >
              <AddCircleIcon className={classes.addIcon} />
            </Button>
          </CardActions>
        </Grid>
      </Grid>
    </Card>
  );
}

const useStyles = makeStyles({
  root: {
    margin: "10px",
  },
  cardMedia: {
    height: 130,
    width: 130,
  },
  cardActions: {
    justifyContent: "flex-end",
  },
  addIcon: {
    width: "30px",
    height: "30px",
    color: "#008000",
  },
});
