import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

//components
import { PokemonCard } from "../card/PokemonCard";

//services
import { api } from "../../Service/axios";

//styles
import { makeStyles } from "@material-ui/core/styles";

//context
import { Grid, Typography } from "@material-ui/core";

export function PreviewPokemons({ pokemonType }) {
  const [isLoading, setIsLoading] = useState(true);
  const [searchedPokemons, setSearchedPokemons] = useState([]);
  const [pokemons, setPokemons] = useState([]);

  const classes = useStyles();
  const { t } = useTranslation(["common"]);

  useEffect(() => {
    try {
      async function fethPokemons() {
        const { data } = await api.get(`type/${pokemonType}`);
        const allPokemons = data.pokemon;
        const pokemonData = allPokemons.map((pokemon) => {
          const pokemonUrl = pokemon.pokemon.url.split("/");
          const pokemonId = Number(pokemonUrl[6]);
          return {
            ...pokemon,
            id: pokemonId,
            name: pokemon.pokemon.name,
            price: pokemonId * 5,
            img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png`,
          };
        });
        setIsLoading(false);
        setPokemons(pokemonData);
        setSearchedPokemons(pokemonData);
      }

      fethPokemons();
    } catch (err) {
      console.log(err);
    }
  }, []);

  return (
    <Grid container className={classes.mainContainer}>
      {isLoading ? (
        <Typography>Loading</Typography>
      ) : (
        <Grid container>
          {searchedPokemons.slice(0, 6).map((pokemon, idx) => {
            return (
              <Grid item xs={12} sm={6} md={4} lg={3} key={idx}>
                <PokemonCard key={pokemon.id} pokemon={pokemon} />
              </Grid>
            );
          })}
        </Grid>
      )}
    </Grid>
  );
}

const useStyles = makeStyles({
  mainContainer: {
    padding: "20px",
  },
});
