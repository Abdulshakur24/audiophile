import React from "react";
import Skeleton from "@mui/material/Skeleton";

function HistoryPreloader() {
  return (
    <div className="loader">
      <div className="loader-header">
        <div className="left">
          <Skeleton className="id" />
          <Skeleton className="date" />
        </div>
        <div className="right">
          <Skeleton className="payment" />
          <Skeleton className="status" />
        </div>
      </div>
      <div className="loader-body">
        <div className="loader-cart">
          <div className="flex-left">
            <Skeleton className="loader-image" />
            <div className="loader-info">
              <Skeleton className="loader-name" />
              <Skeleton className="loader-price" />
            </div>
          </div>
          <div className="flex-right">
            <Skeleton className="loader-quantity" />
          </div>
        </div>
        <div className="loader-cart">
          <div className="flex-left">
            <Skeleton className="loader-image" />
            <div className="loader-info">
              <Skeleton className="loader-name" />
              <Skeleton className="loader-price" />
            </div>
          </div>
          <div className="flex-right">
            <Skeleton className="loader-quantity" />
          </div>
        </div>
        <div className="loader-cart">
          <div className="flex-left">
            <Skeleton className="loader-image" />
            <div className="loader-info">
              <Skeleton className="loader-name" />
              <Skeleton className="loader-price" />
            </div>
          </div>
          <div className="flex-right">
            <Skeleton className="loader-quantity" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default HistoryPreloader;
