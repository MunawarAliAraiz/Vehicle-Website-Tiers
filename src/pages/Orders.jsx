// Orders.js
import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';

const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/orders/list');
        const fetchedOrders = response.data.orders;

        const uniqueOrders = [];
        const uniqueOrderDates = new Set();
        fetchedOrders.forEach(order => {
          const truncatedOrderDate = new Date(order.orderDate).toLocaleString();
          if (!uniqueOrderDates.has(truncatedOrderDate)) {
            uniqueOrderDates.add(truncatedOrderDate);
            uniqueOrders.push(order);
          }
        });

        setOrders(uniqueOrders);
      } catch (error) {
        console.error('Error fetching order:', error);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="bg-gradient-to-r from-blue-500 to-purple-500 mx-auto p-4 min-h-[100vh]">
      <div className="bg-white p-6 rounded-md shadow-md">
        <h2 className="text-4xl font-bold mb-4 text-center">Orders</h2>
        <table className="w-full table-auto border-collapse border border-white">
          <thead>
            <tr className="bg-white text-gray-800">
              <th className="p-2 border w-5">Order ID</th>
              <th className="p-2 border">Customer Name</th>
              <th className="p-2 border">Email</th>
              <th className="p-2 border">Car Name</th>
              <th className="p-2 border">Order Date</th>
              <th className="p-2 border">Payment Method</th>
              <th className="p-2 border">Quantity</th>
              <th className="p-2 border">Price</th>
              <th className="p-2 border">Total Price</th>
              <th className="p-2 border">Status</th>
              {/* <th className="p-2 border">Created At</th>
              <th className="p-2 border">Updated At</th> */}
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id} className="bg-white text-gray-800">
                <td className="p-2 border w-5 overflow-hidden">{order._id}</td>
                <td className="p-2 border">{order.customerName}</td>
                <td className="p-2 border">{order.email}</td>
                <td className="p-2 border">{order.carName}</td>
                <td className="p-2 border">{new Date(order.orderDate).toLocaleString()}</td>
                <td className="p-2 border">{order.paymentMethod}</td>
                <td className="p-2 border">{order.quantity}</td>
                <td className="p-2 border">{order.price}</td>
                <td className="p-2 border">${order.totalPrice}</td>
                <td className="p-2 border">{order.status}</td>
                {/* <td className="p-2 border">{new Date(order.createdAt).toLocaleString()}</td>
                <td className="p-2 border">{new Date(order.updatedAt).toLocaleString()}</td> */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Orders;
