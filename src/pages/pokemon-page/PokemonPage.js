import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

//!IMPORTANT
// use Different styles techniques to show my skills with SASS and inline styles:
//styles
import { makeStyles } from "@material-ui/core/styles";
import styles from "./styles.module.scss";

//material components
import { Button, Grid, Typography } from "@material-ui/core";
import AddCircleIcon from "@material-ui/icons/AddCircle";

//utils
import { formatPrice } from "../../utils/formatedPrice";

//service
import { api } from "../../Service/axios";

//context
import { Basket } from "../../context/basket-context";

export function PokemonPage() {
  const [pokemon, setPokemon] = useState([]);
  const { basketAddItem, store } = Basket();

  const { id } = useParams();
  const classes = useStyles();
  const { t } = useTranslation(["common"]);

  useEffect(() => {
    api.get(`/pokemon/${id}`).then((response) => {
      setPokemon({
        ...response.data,
        name: response.data.name,
        price: response.data.id * 5,
        img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${response.data.id}.png`,
        type: store,
      });
    });
  }, [id, store]);

  function handdleAddPokemonToBasket(pokemonId, pokemonType) {
    basketAddItem(pokemonId, pokemonType);
  }

  return (
    <Grid container className={styles.pokemonPage}>
      <Grid
        justifyContent="center"
        container
        item
        style={{ marginTop: "100px" }}
      >
        <Grid>
          <Typography variant="h3">{t("pokemon_page.title")}</Typography>
        </Grid>
      </Grid>
      <Grid className={styles.pokemonCard}>
        <Grid>
          <img src={pokemon.img} alt={pokemon.name} />
        </Grid>

        <Grid>
          <Grid className={styles.pokemonDetails}>
            <Typography variant="h4">
              {t("pokemon_card.name")}: {pokemon.name}
            </Typography>
            <Typography variant="h6">
              {t("pokemon_card.exp")}: {pokemon.base_experience}
            </Typography>
            <Typography variant="h6">
              {t("pokemon_card.weight")}: {pokemon.weight}kg
            </Typography>
            <Typography variant="h6">
              {t("pokemon_card.price")}: {formatPrice(pokemon.price)}
            </Typography>

            <Button
              className={`fas fa-shopping-cart ${styles.basket}`}
              onClick={() =>
                handdleAddPokemonToBasket(pokemon.id, pokemon.type)
              }
            >
              <AddCircleIcon className={classes.addIcon} />
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

const useStyles = makeStyles({
  addIcon: {
    width: "50px",
    height: "50px",
    color: "#fff",
  },
});
