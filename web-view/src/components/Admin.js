import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";
import UserService from "../services/user.service";

const StatusOrder = (props) => {
  if (props.status === 0) {
    return <span className="alert alert-warning p-1">Waiting Confirm</span>;
  } else if (props.status === 1) {
    return <span className="alert alert-success p-1">Confirmed</span>;
  } else {
    return <span className="alert alert-danger p-1">Canceled</span>;
  }
};
const Admin = () => {
  const [content, setContent] = useState([]);
  const socket = io(`ws://localhost:3000`);
  useEffect(() => {
    socket.on("ORDER_UPDATE_STATUS", (data) => {
      if (data) {
        UserService.getListOrders().then(
          (response) => {
            setContent(response.data.data);
          },
          (error) => {
            const _content =
              (error.response && error.response.data) ||
              error.message ||
              error.toString();
            alert(_content.message);
          }
        );
      }
    });
  }, [socket]);

  useEffect(() => {
    UserService.getListOrders().then(
      (response) => {
        setContent(response.data.data);
      },
      (error) => {
        const _content =
          (error.response && error.response.data) ||
          error.message ||
          error.toString();
        alert(_content.message);
      }
    );
  }, []);

  return (
    <>
      <h1>Admin Page</h1>
      <table className="table">
        <thead>
          <tr>
            <th>STT</th>
            <th>Order Code</th>
            <th>UserId</th>
            <th>Price Total</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {content.map((data, index) => {
            return (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{data.id}</td>
                <td>{data.user_id}</td>
                <td>{data.price_total}</td>
                <td>
                  <StatusOrder status={data.status} />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

export default Admin;
