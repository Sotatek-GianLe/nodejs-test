/* eslint-disable import/no-anonymous-default-export */
import axios from "axios";
import authHeader from "./auth-header";

const API_ORDER_SERVICE = process.env.REACT_APP_API_ORDER_SERVICE;
const getListOrders = () => {
  return axios.get(API_ORDER_SERVICE + "orders", { headers: authHeader() });
};

const createOrder = (price_total) => {
  const data = {
    price_total,
  };
  return axios.post(API_ORDER_SERVICE + "orders", data, {
    headers: authHeader(),
  });
};

const paymentOrder = (id) => {
  const data = {
    id,
  };
  return axios.post(API_ORDER_SERVICE + "orders/payOrder", data, {
    headers: authHeader(),
  });
};

const cancelOrder = (id) => {
  const data = {
    id,
  };
  return axios.put(API_ORDER_SERVICE + "orders/cancel", data, {
    headers: authHeader(),
  });
};

export default {
  getListOrders,
  createOrder,
  paymentOrder,
  cancelOrder,
};
