import React from "react";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import swal from "sweetalert";
import { useTranslation } from "react-i18next";

//material components
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";

//utils
import { formatPrice } from "../../utils/formatedPrice";

//styles
import styles from "./styles.module.scss";

//context
import { Basket } from "../../context/basket-context";

export function BasketPage() {
  const { t } = useTranslation(["common"]);

  const { basket, store, basketRemoveItem, addRemoveQty, cleanBasket } =
    Basket();

  const total = basket.reduce((pokemonTotal, pokemonBasket) => {
    return (pokemonTotal += pokemonBasket.price * pokemonBasket.qty);
  }, 0);

  function handleAddQntChange(pokemon) {
    addRemoveQty({
      ...pokemon,
      qty: (pokemon.qty += 1),
    });
  }

  function handleRemoveQntChange(pokemon) {
    addRemoveQty({
      ...pokemon,
      qty: (pokemon.qty -= 1),
    });
  }

  function handleCheckout() {
    swal({
      title: "Your payment has been completed",
      text: `Total: ${formatPrice(total)}`,
      icon: "success",
    });
    localStorage.removeItem(`@Pokemon-Store: ${store}`);
    cleanBasket();
  }

  //! TO SHOW HTML SKILLS
  // I decided to Use Html and CSS instead of material UI,
  // I think in this case I can show my skills with HTML AND CSS by building simple tablelo
  return (
    <div className={styles.basketDisplay}>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

      <div className={styles.tableDisplay}>
        <table>
          <thead>
            <tr>
              <th></th>
              <th>{t("basket_page.name")}</th>
              <th>{t("basket_page.qty")}</th>
              <th>{t("basket_page.price")}</th>
              <th>{t("basket_page.delete")}</th>
            </tr>
          </thead>

          <tbody>
            {basket.map((pokemon) => {
              return (
                <tr key={pokemon.name}>
                  <td>
                    <img src={pokemon.img} alt={pokemon.id} />
                  </td>
                  <td>{pokemon.name}</td>

                  <td className={styles.qtyButtons}>
                    <button
                      onClick={() =>
                        pokemon.qty === 0
                          ? null
                          : handleRemoveQntChange(pokemon)
                      }
                    >
                      <RemoveIcon />
                    </button>

                    <span>{pokemon.qty}</span>
                    <button onClick={() => handleAddQntChange(pokemon)}>
                      <AddIcon />
                    </button>
                  </td>

                  <td>{formatPrice(pokemon.price * pokemon.qty)}</td>
                  <td>
                    <button
                      className="fas fa-trash-alt"
                      onClick={() => basketRemoveItem(pokemon)}
                    >
                      <DeleteForeverIcon />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className={styles.footDisplay}>
        <button onClick={() => handleCheckout()}>
          {t("basket_page.shopNow")}
        </button>
        <strong>
          {t("basket_page.total")}: {formatPrice(total)}
        </strong>
      </div>
    </div>
  );
}
