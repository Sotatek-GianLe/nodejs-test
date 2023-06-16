import React, { useState, useEffect } from "react";

import UserService from "../services/user.service";
import { Modal, Button, Form } from "react-bootstrap";

const StatusOrder = (props) => {
  if (props.status === 0) {
    return <span className="alert alert-warning p-1">Waiting Payment</span>;
  } else if (props.status === 1) {
    return <span className="alert alert-success p-1">Done</span>;
  } else {
    return <span className="alert alert-danger p-1">Canceled</span>;
  }
};

const CreateOrder = ({ onSubmit }) => {
  const [price, setPrice] = useState(0);
  return (
    <Form onSubmit={onSubmit}>
      <Form.Group controlId="formBasicPrice">
        <Form.Label>Total Price</Form.Label>
        <Form.Control
          name="price_total"
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
      </Form.Group>
      <Button className="mt-5" variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
};

const Order = () => {
  const [listOrder, setListOrder] = useState([]);
  const [statusPaymentOrder, setStatePaymentOrder] = useState(false);
  useEffect(() => {
    UserService.getListOrders().then(
      (response) => {
        setListOrder(response.data.data);
      },
      (error) => {
        const _content =
          (error.response && error.response.data) ||
          error.message ||
          error.toString();
        alert(_content.message);
      }
    );
  }, [statusPaymentOrder]);

  const handlePayment = (event, id) => {
    UserService.paymentOrder(id).then(
      (response) => {
        setStatePaymentOrder(!statusPaymentOrder);
      },
      (error) => {
        setStatePaymentOrder(false);
      }
    );
  };

  const handleOrderCancel = (event, id) => {
    UserService.cancelOrder(id).then(
      (response) => {
        setStatePaymentOrder(!statusPaymentOrder);
      },
      (error) => {
        setStatePaymentOrder(false);
      }
    );
  };

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const onCreateOrderSubmit = (e, obj) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const price = formData.get("price_total");
    UserService.createOrder(price).then(
      (response) => {
        setStatePaymentOrder(!statusPaymentOrder);
      },
      (error) => {
        setStatePaymentOrder(false);
      }
    );
    handleClose();
  };

  return (
    <>
      <h1>Order Page</h1>
      <div
        className="d-flex align-items-center justify-content-center"
        style={{ float: "right" }}
      >
        <Button variant="primary" onClick={handleShow}>
          Create Order
        </Button>
      </div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Create Order Form</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <CreateOrder onSubmit={onCreateOrderSubmit} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      <div className="container main-content">
        <table className="table">
          <thead>
            <tr>
              <th>STT</th>
              <th>OrderId</th>
              <th>Price Total</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {listOrder.map((data, index) => {
              return (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{data.id}</td>
                  <td>{data.price_total}</td>
                  <td>
                    <StatusOrder status={data.status} />
                  </td>
                  <td>
                    {data.status === 0 && (
                      <>
                        <button
                          onClick={(event) => handlePayment(event, data.id)}
                        >
                          Payment
                        </button>
                        <button
                          onClick={(event) => handleOrderCancel(event, data.id)}
                        >
                          Cancel
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Order;
