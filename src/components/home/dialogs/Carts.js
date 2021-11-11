import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { openOrCloseCart } from "../../../app-redux/features/Dialogs";
import Cart from "./Cart";
import { emptyTheCart } from "../../../app-redux/features/Carts";
import { useHistory } from "react-router";

function Carts() {
  const isCartOpen = useSelector((state) => state.dialogs.isCartOpen);
  const cartsArr = useSelector((state) => state.carts.carts);
  const dispatch = useDispatch();
  const history = useHistory();

  const getTotal = () => {
    let total = 0;
    const priceArr = cartsArr.map(({ price, quantity }) => price * quantity);
    total = priceArr.reduce((a, b) => a + b, 0);
    return total;
  };
  const handleActivity = () => {
    history.push("/checkout");
    dispatch(openOrCloseCart(false));
  };
  return (
    <>
      <div
        onClick={() => dispatch(openOrCloseCart(false))}
        className={`cart-fade ${isCartOpen ? "fadeIn" : "fadeOut"}`}
      />
      <div
        onClick={() => dispatch(openOrCloseCart(false))}
        className={`home-carts ${isCartOpen ? "open" : "close"}`}
      >
        <div className="contents">
          <div
            className="container"
            onClick={(event) => event.stopPropagation()}
          >
            <header>
              <h4>CART ({cartsArr.length})</h4>
              <button onClick={() => dispatch(emptyTheCart())}>
                Remove all
              </button>
            </header>

            <div className="carts">
              {cartsArr.length ? (
                cartsArr.map(({ id, image, name, price, quantity }) => (
                  <Cart
                    key={id}
                    id={id}
                    image={image}
                    name={name}
                    price={price.toLocaleString()}
                    quantity={quantity}
                  />
                ))
              ) : (
                <div className="title">
                  <p>Your cart is empty</p>
                </div>
              )}
            </div>

            <div className="totals">
              <p>TOTAL</p>
              <h4>${getTotal().toLocaleString()}</h4>
            </div>

            <div className="checkout">
              <button onClick={handleActivity}>CHECKOUT</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Carts;
