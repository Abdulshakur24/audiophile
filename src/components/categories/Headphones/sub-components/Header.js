import React from "react";
import { ReactComponent as CartIcon } from "../../../../assets/cartLogo.svg";
import {
  openOrCloseCart,
  openOrCloseMenu,
} from "../../../../app-redux/features/Dialogs";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Header({ title }) {
  const isMenuOpen = useSelector((state) => state.dialogs.isMenuOpen);
  const isCartOpen = useSelector((state) => state.dialogs.isCartOpen);
  const navigator = useNavigate();

  const dispatch = useDispatch();

  return (
    <div className="headphones-header">
      <div className="container">
        <div className={`contents`}>
          <div className="left">
            <ul
              className="hide-for-desktop"
              onClick={() => dispatch(openOrCloseMenu(!isMenuOpen))}
            >
              <li></li>
              <li></li>
              <li></li>
            </ul>
            <h1 onClick={() => navigator("/")}>audiophile</h1>
          </div>
          <div className="middle hide-for-tablet">
            <ul>
              <li onClick={() => navigator("/")}>HOME</li>
              <li onClick={() => navigator("/categories/headphones")}>
                HEADPHONES
              </li>
              <li onClick={() => navigator("/categories/speakers")}>
                SPEAKERS
              </li>
              <li onClick={() => navigator("/categories/earphones")}>
                EARPHONES
              </li>
            </ul>
          </div>
          <div
            onClick={() => dispatch(openOrCloseCart(!isCartOpen))}
            className="right"
          >
            <CartIcon className="icon" />
          </div>
        </div>
        <div className="title">
          <h1>{title}</h1>
        </div>
      </div>
    </div>
  );
}

export default Header;
