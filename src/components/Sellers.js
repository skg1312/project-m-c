import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Sellers() {
  const [sellers, setSellers] = useState([]);
  const [selectedSeller, setSelectedSeller] = useState(null);
  const [newSeller, setNewSeller] = useState({
    companyName: '',
    companyAddress: '',
    companyGSTNo: '',
    stateName: '',
    stateCode: '',
  });
  const [updatedSellerData, setUpdatedSellerData] = useState({
    companyName: '',
    companyAddress: '',
    companyGSTNo: '',
    stateName: '',
    stateCode: '',
  });

  useEffect(() => {
    // Fetch seller data from your Express API
    axios.get('http://localhost:5000/sellers/list')
      .then((response) => {
        setSellers(response.data);
      })
      .catch((error) => {
        console.error('Error fetching seller data:', error);
      });
  }, []);

  const handleCreateSeller = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/sellers/add', newSeller);
      setSellers([...sellers, response.data]);
      setNewSeller({
        companyName: '',
        companyAddress: '',
        companyGSTNo: '',
        stateName: '',
        stateCode: '',
      });
    } catch (error) {
      console.error('Error creating seller:', error);
    }
  };

  const handleSellerUpdate = (updatedSeller) => {
    const updatedSellers = sellers.map((seller) =>
      seller._id === updatedSeller._id ? updatedSeller : seller
    );
    setSellers(updatedSellers);
    setSelectedSeller(null);
  };

  const handleSellerDelete = (sellerId) => {
    axios.delete(`http://localhost:5000/sellers/delete/${sellerId}`)
      .then(() => {
        const updatedSellers = sellers.filter((seller) => seller._id !== sellerId);
        setSellers(updatedSellers);
        setSelectedSeller(null);
      })
      .catch((error) => {
        console.error('Error deleting seller:', error);
      });
  };

  return (
    <div className="Sellers">
      <h2>Create Seller</h2>
      <form onSubmit={handleCreateSeller}>
        <input
          type="text"
          placeholder="Company Name"
          value={newSeller.companyName}
          onChange={(e) => setNewSeller({ ...newSeller, companyName: e.target.value })}
        />
        <input
          type="text"
          placeholder="Company Address"
          value={newSeller.companyAddress}
          onChange={(e) => setNewSeller({ ...newSeller, companyAddress: e.target.value })}
        />
        <input
          type="text"
          placeholder="Company GST No"
          value={newSeller.companyGSTNo}
          onChange={(e) => setNewSeller({ ...newSeller, companyGSTNo: e.target.value })}
        />
        <input
          type="text"
          placeholder="State Name"
          value={newSeller.stateName}
          onChange={(e) => setNewSeller({ ...newSeller, stateName: e.target.value })}
        />
        <input
          type="text"
          placeholder="State Code"
          value={newSeller.stateCode}
          onChange={(e) => setNewSeller({ ...newSeller, stateCode: e.target.value })}
        />
        <button type="submit">Create Seller</button>
      </form>

      <h2>Sellers</h2>
      <ul>
        {sellers.map((seller) => (
          <li key={seller._id}>
            <p>Company Name: {seller.companyName}</p>
            <p>Company Address: {seller.companyAddress}</p>
            <p>Company GST No: {seller.companyGSTNo}</p>
            <p>State Name: {seller.stateName}</p>
            <p>State Code: {seller.stateCode}</p>
            <button onClick={() => setSelectedSeller(seller)}>Update</button>
            <button onClick={() => handleSellerDelete(seller._id)}>Delete</button>
          </li>
        ))}
      </ul>

      {selectedSeller && (
        <div>
          <h2>Update Seller</h2>
          <SellerUpdate
            seller={selectedSeller}
            onUpdate={handleSellerUpdate}
            updatedSellerData={updatedSellerData}
            setUpdatedSellerData={setUpdatedSellerData}
          />
        </div>
      )}
    </div>
  );
}

function SellerUpdate({ seller, onUpdate, updatedSellerData, setUpdatedSellerData }) {
  const handleUpdate = async () => {
    try {
      const response = await axios.put(`http://localhost:5000/sellers/update/${seller._id}`, updatedSellerData);
      onUpdate(response.data);
      setUpdatedSellerData({
        companyName: '',
        companyAddress: '',
        companyGSTNo: '',
        stateName: '',
        stateCode: '',
      });
    } catch (error) {
      console.error('Error updating seller:', error);
    }
  }

  return (
    <div>
      <input
        type="text"
        placeholder="Company Name"
        value={updatedSellerData.companyName}
        onChange={(e) => setUpdatedSellerData({ ...updatedSellerData, companyName: e.target.value })}
      />
      <input
        type="text"
        placeholder="Company Address"
        value={updatedSellerData.companyAddress}
        onChange={(e) => setUpdatedSellerData({ ...updatedSellerData, companyAddress: e.target.value })}
      />
      <input
        type="text"
        placeholder="Company GST No"
        value={updatedSellerData.companyGSTNo}
        onChange={(e) => setUpdatedSellerData({ ...updatedSellerData, companyGSTNo: e.target.value })}
      />
      <input
        type="text"
        placeholder="State Name"
        value={updatedSellerData.stateName}
        onChange={(e) => setUpdatedSellerData({ ...updatedSellerData, stateName: e.target.value })}
      />
      <input
        type="text"
        placeholder="State Code"
        value={updatedSellerData.stateCode}
        onChange={(e) => setUpdatedSellerData({ ...updatedSellerData, stateCode: e.target.value })}
      />
      <button onClick={handleUpdate}>Update</button>
    </div>
  );
}

export default Sellers;
