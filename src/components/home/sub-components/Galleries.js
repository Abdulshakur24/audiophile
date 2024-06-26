import React from "react";
import { useNavigate } from "react-router-dom";

function Galleries() {
  const navigator = useNavigate();
  return (
    <div className="home-galleries">
      <div className="container">
        <div className="a box">
          <div className="contents">
            <div className="image" />
            <div className="content">
              <h4>ZX9 SPEAKER</h4>
              <p>
                Upgrade to premium speakers that are phenomenally built to
                deliver truly remarkable sound.
              </p>
              <button onClick={() => navigator("/products/speakers/zx9")}>
                SEE PRODUCT
              </button>
            </div>
          </div>
        </div>

        <div className="b box">
          <div className="contents">
            <h4>ZX7 SPEAKER</h4>
            <button onClick={() => navigator("/products/speakers/zx7")}>
              SEE PRODUCT
            </button>
          </div>
        </div>

        <div className="c box">
          <div className="img" />
          <div className="content">
            <h4>YX1 EARPHONES</h4>
            <button onClick={() => navigator("/products/earphones/yx1")}>
              SEE PRODUCT
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Galleries;
