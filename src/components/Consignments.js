import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Consignment() {
  const [consignments, setConsignments] = useState([]);
  const [selectedConsignment, setSelectedConsignment] = useState(null);
  const [newConsignment, setNewConsignment] = useState({
    itemDetails: '',
    itemQuantity: '',
    itemHSN: '',
    itemQuantityKg: '',
    itemAmount: '',
    itemRate: '',
  });
  const [updatedConsignmentData, setUpdatedConsignmentData] = useState({
    itemDetails: '',
    itemQuantity: '',
    itemHSN: '',
    itemQuantityKg: '',
    itemAmount: '',
    itemRate: '',
  });

  useEffect(() => {
    // Fetch consignment data from your Express API
    axios.get('http://localhost:5000/consignments/list')
      .then((response) => {
        setConsignments(response.data);
      })
      .catch((error) => {
        console.error('Error fetching consignment data:', error);
      });
  }, []);

  const handleCreateConsignment = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/consignments/add', newConsignment);
      setConsignments([...consignments, response.data]);
      setNewConsignment({
        itemDetails: '',
        itemQuantity: '',
        itemHSN: '',
        itemQuantityKg: '',
        itemAmount: '',
        itemRate: '',
      });
    } catch (error) {
      console.error('Error creating consignment:', error);
    }
  };

  const handleConsignmentUpdate = (updatedConsignment) => {
    const updatedConsignments = consignments.map((consignment) =>
      consignment._id === updatedConsignment._id ? updatedConsignment : consignment
    );
    setConsignments(updatedConsignments);
    setSelectedConsignment(null);
  };

  const handleConsignmentDelete = (consignmentId) => {
    axios.delete(`http://localhost:5000/consignments/delete/${consignmentId}`)
      .then(() => {
        const updatedConsignments = consignments.filter((consignment) => consignment._id !== consignmentId);
        setConsignments(updatedConsignments);
        setSelectedConsignment(null);
      })
      .catch((error) => {
        console.error('Error deleting consignment:', error);
      });
  };

  return (
    <div className="Consignment">
      <h2>Create Consignment</h2>
      <form onSubmit={handleCreateConsignment}>
        <input
          type="text"
          placeholder="Item Details"
          value={newConsignment.itemDetails}
          onChange={(e) => setNewConsignment({ ...newConsignment, itemDetails: e.target.value })}
        />
        <input
          type="text"
          placeholder="Item Quantity"
          value={newConsignment.itemQuantity}
          onChange={(e) => setNewConsignment({ ...newConsignment, itemQuantity: e.target.value })}
        />
        <input
          type="text"
          placeholder="Item HSN/SAC"
          value={newConsignment.itemHSN}
          onChange={(e) => setNewConsignment({ ...newConsignment, itemHSN: e.target.value })}
        />
        <input
          type="text"
          placeholder="Item Quantity as per kg"
          value={newConsignment.itemQuantityKg}
          onChange={(e) => setNewConsignment({ ...newConsignment, itemQuantityKg: e.target.value })}
        />
        <input
          type="text"
          placeholder="Item Amount"
          value={newConsignment.itemAmount}
          onChange={(e) => setNewConsignment({ ...newConsignment, itemAmount: e.target.value })}
        />
        <input
          type="text"
          placeholder="Item Rate"
          value={newConsignment.itemRate}
          onChange={(e) => setNewConsignment({ ...newConsignment, itemRate: e.target.value })}
        />
        <button type="submit">Create Consignment</button>
      </form>

      <h2>Consignments</h2>
      <ul>
        {consignments.map((consignment) => (
          <li key={consignment._id}>
            <p>Item Details: {consignment.itemDetails}</p>
            <p>Item Quantity: {consignment.itemQuantity}</p>
            <p>Item HSN/SAC: {consignment.itemHSN}</p>
            <p>Item Quantity as per kg: {consignment.itemQuantityKg}</p>
            <p>Item Amount: {consignment.itemAmount}</p>
            <p>Item Rate: {consignment.itemRate}</p>
            <button onClick={() => setSelectedConsignment(consignment)}>Update</button>
            <button onClick={() => handleConsignmentDelete(consignment._id)}>Delete</button>
          </li>
        ))}
      </ul>

      {selectedConsignment && (
        <div>
          <h2>Update Consignment</h2>
          <ConsignmentUpdate
            consignment={selectedConsignment}
            onUpdate={handleConsignmentUpdate}
            updatedConsignmentData={updatedConsignmentData}
            setUpdatedConsignmentData={setUpdatedConsignmentData}
          />
        </div>
      )}
    </div>
  );
}

function ConsignmentUpdate({ consignment, onUpdate, updatedConsignmentData, setUpdatedConsignmentData }) {
  const handleUpdate = async () => {
    try {
      const response = await axios.put(`http://localhost:5000/consignments/update/${consignment._id}`, updatedConsignmentData);
      onUpdate(response.data);
      setUpdatedConsignmentData({
        itemDetails: '',
        itemQuantity: '',
        itemHSN: '',
        itemQuantityKg: '',
        itemAmount: '',
        itemRate: '',
      });
    } catch (error) {
      console.error('Error updating consignment:', error);
    }
  }

  return (
    <div>
      <input
        type="text"
        placeholder="Item Details"
        value={updatedConsignmentData.itemDetails}
        onChange={(e) => setUpdatedConsignmentData({ ...updatedConsignmentData, itemDetails: e.target.value })}
      />
      <input
        type="text"
        placeholder="Item Quantity"
        value={updatedConsignmentData.itemQuantity}
        onChange={(e) => setUpdatedConsignmentData({ ...updatedConsignmentData, itemQuantity: e.target.value })}
      />
      <input
        type="text"
        placeholder="Item HSN/SAC"
        value={updatedConsignmentData.itemHSN}
        onChange={(e) => setUpdatedConsignmentData({ ...updatedConsignmentData, itemHSN: e.target.value })}
      />
      <input
        type="text"
        placeholder="Item Quantity as per kg"
        value={updatedConsignmentData.itemQuantityKg}
        onChange={(e) => setUpdatedConsignmentData({ ...updatedConsignmentData, itemQuantityKg: e.target.value })}
      />
      <input
        type="text"
        placeholder="Item Amount"
        value={updatedConsignmentData.itemAmount}
        onChange={(e) => setUpdatedConsignmentData({ ...updatedConsignmentData, itemAmount: e.target.value })}
      />
      <input
        type="text"
        placeholder="Item Rate"
        value={updatedConsignmentData.itemRate}
        onChange={(e) => setUpdatedConsignmentData({ ...updatedConsignmentData, itemRate: e.target.value })}
      />
      <button onClick={handleUpdate}>Update</button>
    </div>
  );
}

export default Consignment;
