// Orders.js
import React from 'react';
import { orders } from '../utils/ordersData';

const Orders = () => {
  return (
    <div className="bg-gradient-to-r from-blue-500 to-purple-500 mx-auto p-4 min-h-[100vh]">
      {/* Orders table with styling */}
      <div className="bg-white p-6 rounded-md shadow-md">
        {/* Heading for Orders */}
        <h2 className="text-4xl font-bold mb-4 text-center">Orders</h2>
        <table className="w-full table-auto border-collapse border border-white">
          <thead>
            <tr className="bg-white text-gray-800">
              <th className="p-2 border">Order ID</th>
              <th className="p-2 border">Customer Name</th>
              <th className="p-2 border">Email</th>
              <th className="p-2 border">Phone</th>
              <th className="p-2 border">Order Date</th>
              <th className="p-2 border">Delivery Address</th>
              <th className="p-2 border">Payment Method</th>
              <th className="p-2 border">Total Price</th>
              <th className="p-2 border">Status</th>
              <th className="p-2 border">Created At</th>
              <th className="p-2 border">Updated At</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="bg-white text-gray-800">
                <td className="p-2 border">{order.id}</td>
                <td className="p-2 border">{order.customerName}</td>
                <td className="p-2 border">{order.email}</td>
                <td className="p-2 border">{order.phone}</td>
                <td className="p-2 border">{order.orderDate}</td>
                <td className="p-2 border">{order.deliveryAddress}</td>
                <td className="p-2 border">{order.paymentMethod}</td>
                <td className="p-2 border">${order.totalPrice}</td>
                <td className="p-2 border">{order.status}</td>
                <td className="p-2 border">{order.createdAt}</td>
                <td className="p-2 border">{order.updatedAt}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Orders;
