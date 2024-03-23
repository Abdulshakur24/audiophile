import React from "react";
import { useNavigate } from "react-router-dom";

function Detail({ id, image, title, heading, description, path, grid }) {
  const navigator = useNavigate();
  return (
    <div id="detail" className={`detail`}>
      <div className={`left ${grid}`}>
        <img src={image} alt="" />
      </div>

      <div className="right">
        {title && <h6>NEW PRODUCT</h6>}
        <h4>{heading}</h4>
        <p>{description}</p>
        <button onClick={() => navigator(path)}>SEE PRODUCT</button>
      </div>
    </div>
  );
}

export default Detail;
