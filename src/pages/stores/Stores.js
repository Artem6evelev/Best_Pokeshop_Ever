import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

//components
import { PokemonCard } from "../../components/card/PokemonCard";

//material components
import { Grid, Typography, TextField } from "@material-ui/core";

//services
import { api } from "../../Service/axios";

//styles
import { makeStyles } from "@material-ui/core/styles";

//context
import { Basket } from "../../context/basket-context";

export function Stores() {
  const [isLoading, setIsLoading] = useState(true);
  const [searchedPokemons, setSearchedPokemons] = useState([]);
  const [pokemons, setPokemons] = useState([]);

  const { changeStore } = Basket();
  const { type } = useParams();
  const classes = useStyles();
  const { t } = useTranslation(["common"]);

  useEffect(() => {
    try {
      if (type) {
        async function fethPokemons() {
          const { data } = await api.get(`type/${type}`);
          const allPokemons = data.pokemon;
          const pokemonData = allPokemons.map((pokemon) => {
            const pokemonUrl = pokemon.pokemon.url.split("/");
            const pokemonId = Number(pokemonUrl[6]);
            return {
              ...pokemon,
              id: pokemonId,
              name: pokemon.pokemon.name,
              // type: pokemon.pokemon.name,
              price: pokemonId * 5,
              img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png`,
              type: type,
            };
          });
          setIsLoading(false);
          setPokemons(pokemonData);
          setSearchedPokemons(pokemonData);
        }

        fethPokemons();
        changeStore(type);
      }
    } catch (err) {
      console.log(err);
    }
  }, [type]);

  function onSearchChange(event) {
    let value = event.target.value.toLowerCase();
    const filteredPokemons = pokemons.filter((pokemon) =>
      pokemon.name.toLowerCase().includes(value)
    );
    setSearchedPokemons([...filteredPokemons]);
  }

  return (
    <Grid container className={classes.mainContainer}>
      <Grid
        container
        item
        style={{ marginTop: "100px", justifyContent: "center" }}
      >
        <Grid item>
          <TextField
            type="search"
            onChange={(event) => onSearchChange(event)}
            id="outlined-basic"
            label={t("inputs.pokemonName")}
            variant="outlined"
          />
        </Grid>
      </Grid>
      <Grid container item>
        {isLoading ? (
          <Typography>Loading</Typography>
        ) : (
          <Grid container item>
            {searchedPokemons.map((pokemon, idx) => {
              return (
                <Grid item xs={12} sm={6} md={4} lg={4} key={idx}>
                  <PokemonCard key={pokemon.id} pokemon={pokemon} />
                </Grid>
              );
            })}
          </Grid>
        )}
      </Grid>
    </Grid>
  );
}

const useStyles = makeStyles({
  mainContainer: {
    padding: "20px",
  },
});
