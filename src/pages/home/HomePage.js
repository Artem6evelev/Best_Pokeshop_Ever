import React from "react";
import { useTranslation } from "react-i18next";

//styles

//material components
import { Grid } from "@material-ui/core";

//assets
import waterBall from "../../assets/images/waterBall.svg";
import fireBall from "../../assets/images/fireBall.svg";
import grassBall from "../../assets/images/grassBall.svg";
import rockBall from "../../assets/images/rockBall.svg";

//components
import { TypeSection } from "../../components/typeSection/TypeSection";
import { PreviewPokemons } from "../../components/preview_pokemons/PreviewPokemons";
import Hero from "../../components/hero/Hero";

export function HomePage() {
  const { t } = useTranslation(["common"]);

  return (
    <Grid container>
      <Hero />

      <TypeSection
        pokemonList={<PreviewPokemons pokemonType={"water"} />}
        pokeball={waterBall}
        pokemonType={t("pokemons_type.waterPokemons")}
        linkToStore={"/stores/water"}
      />

      <TypeSection
        pokemonList={<PreviewPokemons pokemonType={"fire"} />}
        pokeball={fireBall}
        pokemonType={t("pokemons_type.firePokemons")}
        linkToStore={"/stores/fire"}
      />

      <TypeSection
        pokemonList={<PreviewPokemons pokemonType={"grass"} />}
        pokeball={grassBall}
        pokemonType={t("pokemons_type.grassPokemons")}
        linkToStore={"/stores/grass"}
      />

      <TypeSection
        pokemonList={<PreviewPokemons pokemonType={"rock"} />}
        pokeball={rockBall}
        pokemonType={t("pokemons_type.rockPokemons")}
        linkToStore={"/stores/rock"}
      />

      {/* //! IMPORTANT
      //You can add more sections just changing props 
      // Example: */}
      {/* <TypeSection
        pokemonList={<PreviewPokemons pokemonType={"bug"} />} // change type, it will automatically create page in store with all bug pokemons
        pokeball={"add Picture here"} // add picture
        pokemonType={"Grass Pokemons"}
        linkToStore={"/stores/bug"} // link to all pokemods depends on type
      /> */}
    </Grid>
  );
}

export default HomePage;
