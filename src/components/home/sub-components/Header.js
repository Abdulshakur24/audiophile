import React from "react";
import { ReactComponent as CartIcon } from "../../../assets/cartLogo.svg";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import {
  openOrCloseCart,
  openOrCloseMenu,
} from "../../../app-redux/features/Dialogs";
import { useNavigate } from "react-router-dom";
import logo from "../../../assets/audiophile.svg";

function Header() {
  const isMenuOpen = useSelector((state) => state.dialogs.isMenuOpen);
  const isCartOpen = useSelector((state) => state.dialogs.isCartOpen);

  const navigator = useNavigate();
  const dispatch = useDispatch();

  return (
    <header className={`home-header`}>
      <div className="container">
        <div className="bar ">
          <ul
            onClick={() => dispatch(openOrCloseMenu(!isMenuOpen))}
            className="menu-bar hide-for-desktop"
          >
            <li></li>
            <li></li>
            <li></li>
          </ul>

          <div className="title ">
            <img src={logo} onClick={() => navigator("/")} alt="" />
          </div>
        </div>

        <div className="links hide-for-tablet">
          <ul>
            <li>
              <h3 onClick={() => navigator("/")}>HOME</h3>
            </li>
            <li>
              <h3 onClick={() => navigator("/categories/headphones")}>
                HEADPHONES
              </h3>
            </li>
            <li>
              <h3 onClick={() => navigator("/categories/speakers")}>
                SPEAKERS
              </h3>
            </li>
            <li>
              <h3 onClick={() => navigator("/categories/earphones")}>
                EARPHONES
              </h3>
            </li>
          </ul>
        </div>

        <div
          className="trolleyIcon"
          onClick={() => dispatch(openOrCloseCart(!isCartOpen))}
        >
          <CartIcon />
        </div>
      </div>
    </header>
  );
}

export default Header;
