import React from "react";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import History from "./History";
import Header from "../products/Headphones/sub-components/Header";
import Footer from "../home/sub-components/Footer";

function Histories() {
  const userState = useSelector((state) => state.user.user);

  return (
    <div className="histories">
      <Header />
      <History />
      <Footer />
      <Redirect to={userState ? "/history" : "/"} />
    </div>
  );
}

export default Histories;
