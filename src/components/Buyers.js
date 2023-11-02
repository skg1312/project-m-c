import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Buyers() {
  const [buyers, setBuyers] = useState([]);
  const [selectedBuyer, setSelectedBuyer] = useState(null);
  const [newBuyer, setNewBuyer] = useState({
    companyName: '',
    companyAddress: '',
    companyGSTNo: '',
    stateName: '',
    stateCode: '',
  });
  const [updatedBuyerData, setUpdatedBuyerData] = useState({
    companyName: '',
    companyAddress: '',
    companyGSTNo: '',
    stateName: '',
    stateCode: '',
  });

  useEffect(() => {
    // Fetch buyer data from your Express API
    axios.get('http://localhost:5000/buyers/list')
      .then((response) => {
        setBuyers(response.data);
      })
      .catch((error) => {
        console.error('Error fetching buyer data:', error);
      });
  }, []);

  const handleCreateBuyer = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/buyers/add', newBuyer);
      setBuyers([...buyers, response.data]);
      setNewBuyer({
        companyName: '',
        companyAddress: '',
        companyGSTNo: '',
        stateName: '',
        stateCode: '',
      });
    } catch (error) {
      console.error('Error creating buyer:', error);
    }
  };

  const handleBuyerUpdate = (updatedBuyer) => {
    const updatedBuyers = buyers.map((buyer) =>
      buyer._id === updatedBuyer._id ? updatedBuyer : buyer
    );
    setBuyers(updatedBuyers);
    setSelectedBuyer(null);
  };

  const handleBuyerDelete = (buyerId) => {
    axios.delete(`http://localhost:5000/buyers/delete/${buyerId}`)
      .then(() => {
        const updatedBuyers = buyers.filter((buyer) => buyer._id !== buyerId);
        setBuyers(updatedBuyers);
        setSelectedBuyer(null);
      })
      .catch((error) => {
        console.error('Error deleting buyer:', error);
      });
  };

  return (
    <div className="Buyers">
      <h2>Create Buyer</h2>
      <form onSubmit={handleCreateBuyer}>
        <input
          type="text"
          placeholder="Company Name"
          value={newBuyer.companyName}
          onChange={(e) => setNewBuyer({ ...newBuyer, companyName: e.target.value })}
        />
        <input
          type="text"
          placeholder="Company Address"
          value={newBuyer.companyAddress}
          onChange={(e) => setNewBuyer({ ...newBuyer, companyAddress: e.target.value })}
        />
        <input
          type="text"
          placeholder="Company GST No"
          value={newBuyer.companyGSTNo}
          onChange={(e) => setNewBuyer({ ...newBuyer, companyGSTNo: e.target.value })}
        />
        <input
          type="text"
          placeholder="State Name"
          value={newBuyer.stateName}
          onChange={(e) => setNewBuyer({ ...newBuyer, stateName: e.target.value })}
        />
        <input
          type="text"
          placeholder="State Code"
          value={newBuyer.stateCode}
          onChange={(e) => setNewBuyer({ ...newBuyer, stateCode: e.target.value })}
        />
        <button type="submit">Create Buyer</button>
      </form>

      <h2>Buyers</h2>
      <ul>
        {buyers.map((buyer) => (
          <li key={buyer._id}>
            <p>Company Name: {buyer.companyName}</p>
            <p>Company Address: {buyer.companyAddress}</p>
            <p>Company GST No: {buyer.companyGSTNo}</p>
            <p>State Name: {buyer.stateName}</p>
            <p>State Code: {buyer.stateCode}</p>
            <button onClick={() => setSelectedBuyer(buyer)}>Update</button>
            <button onClick={() => handleBuyerDelete(buyer._id)}>Delete</button>
          </li>
        ))}
      </ul>

      {selectedBuyer && (
        <div>
          <h2>Update Buyer</h2>
          <BuyerUpdate
            buyer={selectedBuyer}
            onUpdate={handleBuyerUpdate}
            updatedBuyerData={updatedBuyerData}
            setUpdatedBuyerData={setUpdatedBuyerData}
          />
        </div>
      )}
    </div>
  );
}

function BuyerUpdate({ buyer, onUpdate, updatedBuyerData, setUpdatedBuyerData }) {
  const handleUpdate = async () => {
    try {
      const response = await axios.put(`http://localhost:5000/buyers/update/${buyer._id}`, updatedBuyerData);
      onUpdate(response.data);
      setUpdatedBuyerData({
        companyName: '',
        companyAddress: '',
        companyGSTNo: '',
        stateName: '',
        stateCode: '',
      });
    } catch (error) {
      console.error('Error updating buyer:', error);
    }
  }

  return (
    <div>
      <input
        type="text"
        placeholder="Company Name"
        value={updatedBuyerData.companyName}
        onChange={(e) => setUpdatedBuyerData({ ...updatedBuyerData, companyName: e.target.value })}
      />
      <input
        type="text"
        placeholder="Company Address"
        value={updatedBuyerData.companyAddress}
        onChange={(e) => setUpdatedBuyerData({ ...updatedBuyerData, companyAddress: e.target.value })}
      />
      <input
        type="text"
        placeholder="Company GST No"
        value={updatedBuyerData.companyGSTNo}
        onChange={(e) => setUpdatedBuyerData({ ...updatedBuyerData, companyGSTNo: e.target.value })}
      />
      <input
        type="text"
        placeholder="State Name"
        value={updatedBuyerData.stateName}
        onChange={(e) => setUpdatedBuyerData({ ...updatedBuyerData, stateName: e.target.value })}
      />
      <input
        type="text"
        placeholder="State Code"
        value={updatedBuyerData.stateCode}
        onChange={(e) => setUpdatedBuyerData({ ...updatedBuyerData, stateCode: e.target.value })}
      />
      <button onClick={handleUpdate}>Update</button>
    </div>
  );
}

export default Buyers;
