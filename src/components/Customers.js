import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Customers() {
  const [customers, setCustomers] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [newCustomer, setNewCustomer] = useState({
    name: '',
    address: '',
    number: '',
    email: '',
    contact: '',
  });
  const [updatedCustomerData, setUpdatedCustomerData] = useState({
    name: '',
    address: '',
    number: '',
    email: '',
    contact: '',
  });

  useEffect(() => {
    // Fetch customer data from your Express API
    axios.get('http://localhost:5000/customers/list')
      .then((response) => {
        setCustomers(response.data);
      })
      .catch((error) => {
        console.error('Error fetching customer data:', error);
      });
  }, []);

  const handleCreateCustomer = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/customers/add', newCustomer);
      setCustomers([...customers, response.data]);
      setNewCustomer({
        name: '',
        address: '',
        number: '',
        email: '',
        contact: '',
      });
    } catch (error) {
      console.error('Error creating customer:', error);
    }
  };

  const handleCustomerUpdate = (updatedCustomer) => {
    const updatedCustomers = customers.map((customer) =>
      customer._id === updatedCustomer._id ? updatedCustomer : customer
    );
    setCustomers(updatedCustomers);
    setSelectedCustomer(null);
  };

  const handleCustomerDelete = (customerId) => {
    axios.delete(`http://localhost:5000/customers/delete/${customerId}`)
      .then(() => {
        const updatedCustomers = customers.filter((customer) => customer._id !== customerId);
        setCustomers(updatedCustomers);
        setSelectedCustomer(null);
      })
      .catch((error) => {
        console.error('Error deleting customer:', error);
      });
  };

  return (
    <div className="Customers">
      <h2>Create Customer</h2>
      <form onSubmit={handleCreateCustomer}>
        <input
          type="text"
          placeholder="Name"
          value={newCustomer.name}
          onChange={(e) => setNewCustomer({ ...newCustomer, name: e.target.value })}
        />
        <input
          type="text"
          placeholder="Address"
          value={newCustomer.address}
          onChange={(e) => setNewCustomer({ ...newCustomer, address: e.target.value })}
        />
        <input
          type="text"
          placeholder="Number"
          value={newCustomer.number}
          onChange={(e) => setNewCustomer({ ...newCustomer, number: e.target.value })}
        />
        <input
          type="text"
          placeholder="Email"
          value={newCustomer.email}
          onChange={(e) => setNewCustomer({ ...newCustomer, email: e.target.value })}
        />
        <input
          type="text"
          placeholder="Contact"
          value={newCustomer.contact}
          onChange={(e) => setNewCustomer({ ...newCustomer, contact: e.target.value })}
        />
        <button type="submit">Create Customer</button>
      </form>

      <h2>Customers</h2>
      <ul>
        {customers.map((customer) => (
          <li key={customer._id}>
            <p>Name: {customer.name}</p>
            <p>Address: {customer.address}</p>
            <p>Number: {customer.number}</p>
            <p>Email: {customer.email}</p>
            <p>Contact: {customer.contact}</p>
            <button onClick={() => setSelectedCustomer(customer)}>Update</button>
            <button onClick={() => handleCustomerDelete(customer._id)}>Delete</button>
          </li>
        ))}
      </ul>

      {selectedCustomer && (
        <div>
          <h2>Update Customer</h2>
          <CustomerUpdate
            customer={selectedCustomer}
            onUpdate={handleCustomerUpdate}
            updatedCustomerData={updatedCustomerData}
            setUpdatedCustomerData={setUpdatedCustomerData}
          />
        </div>
      )}
    </div>
  );
}

function CustomerUpdate({ customer, onUpdate, updatedCustomerData, setUpdatedCustomerData }) {
  const handleUpdate = async () => {
    try {
      const response = await axios.put(`http://localhost:5000/customers/update/${customer._id}`, updatedCustomerData);
      onUpdate(response.data);
      setUpdatedCustomerData({
        name: '',
        address: '',
        number: '',
        email: '',
        contact: '',
      });
    } catch (error) {
      console.error('Error updating customer:', error);
    }
  }

  return (
    <div>
      <input
        type="text"
        placeholder="Name"
        value={updatedCustomerData.name}
        onChange={(e) => setUpdatedCustomerData({ ...updatedCustomerData, name: e.target.value })}
      />
      <input
        type="text"
        placeholder="Address"
        value={updatedCustomerData.address}
        onChange={(e) => setUpdatedCustomerData({ ...updatedCustomerData, address: e.target.value })}
      />
      <input
        type="text"
        placeholder="Number"
        value={updatedCustomerData.number}
        onChange={(e) => setUpdatedCustomerData({ ...updatedCustomerData, number: e.target.value })}
      />
      <input
        type="text"
        placeholder="Email"
        value={updatedCustomerData.email}
        onChange={(e) => setUpdatedCustomerData({ ...updatedCustomerData, email: e.target.value })}
      />
      <input
        type="text"
        placeholder="Contact"
        value={updatedCustomerData.contact}
        onChange={(e) => setUpdatedCustomerData({ ...updatedCustomerData, contact: e.target.value })}
      />
      <button onClick={handleUpdate}>Update</button>
    </div>
  );
}

export default Customers;
