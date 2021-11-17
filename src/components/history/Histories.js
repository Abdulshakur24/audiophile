import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import History from "./History";
import Header from "../products/Headphones/sub-components/Header";
import Footer from "../home/sub-components/Footer";
import Carts from "../home/dialogs/Carts";
import axios from "axios";

function Histories() {
  const userState = useSelector((state) => state.user.user);
  const [orderHistory, SetorderHistory] = useState([]);

  useEffect(() => {
    const cancelToken = axios.CancelToken;
    const source = cancelToken.source();
    const fetchOrderHistory = () => {
      const token = sessionStorage.getItem("token");
      axios.defaults.headers.common = {
        ...axios.defaults.headers.common,
        Authorization: `Bearer ${token}`,
      };
      axios
        .get("https://audiophile-e-commerce.herokuapp.com/history/all", {
          method: "GET",
          cancelToken: source.token,
        })
        .then((response) => {
          SetorderHistory(response.data);
        });
    };
    fetchOrderHistory();
    return () => {
      source.cancel();
    };
  }, []);

  return (
    <div className="histories">
      <Header />
      <Carts />

      <div className="histories-container">
        <div className="histories-contents">
          <h1>Order History</h1>
          {orderHistory.map(({ stripe_id, date_purchase, status }, index) => (
            <History
              key={index}
              id={stripe_id}
              date={date_purchase}
              status={status}
            />
          ))}
        </div>
      </div>
      <Footer />
      <Redirect to={userState ? "/history" : "/"} />
    </div>
  );
}

export default Histories;
