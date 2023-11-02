import React, { useState, useEffect } from 'react';
import axios from 'axios';

function BoardingDetailsManagement() {
  const [boardingDetails, setBoardingDetails] = useState([]);
  const [selectedBoardingDetail, setSelectedBoardingDetail] = useState(null);
  const [newBoardingDetail, setNewBoardingDetail] = useState({
    weight: '',
    transportationCost: '',
    date: '',
    time: '',
    driverName: '',
    driverNumber: '',
    driverAddress: '',
    watermark: '',
    whatsapp: '',
  });

  useEffect(() => {
    // Fetch boarding details from your Express API
    axios.get('http://localhost:5000/boardingdetails/list')
      .then((response) => {
        setBoardingDetails(response.data);
      })
      .catch((error) => {
        console.error('Error fetching boarding details:', error);
      });
  }, []);

  const handleCreateBoardingDetail = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/boardingdetails/add', newBoardingDetail);
      setBoardingDetails([...boardingDetails, response.data]);
      setNewBoardingDetail({
        weight: '',
        transportationCost: '',
        date: '',
        time: '',
        driverName: '',
        driverNumber: '',
        driverAddress: '',
        watermark: '',
        whatsapp: '',
      });
    } catch (error) {
      console.error('Error creating boarding detail:', error);
    }
  }

  const handleBoardingDetailUpdate = (updatedBoardingDetail) => {
    const updatedBoardingDetailsList = boardingDetails.map((detail) =>
      detail._id === updatedBoardingDetail._id ? updatedBoardingDetail : detail
    );
    setBoardingDetails(updatedBoardingDetailsList);
    setSelectedBoardingDetail(null);
  }

  const handleBoardingDetailDelete = (boardingDetailId) => {
    axios.delete(`http://localhost:5000/boardingdetails/delete/${boardingDetailId}`)
      .then(() => {
        const updatedBoardingDetailsList = boardingDetails.filter((detail) => detail._id !== boardingDetailId);
        setBoardingDetails(updatedBoardingDetailsList);
        setSelectedBoardingDetail(null);
      })
      .catch((error) => {
        console.error('Error deleting boarding detail:', error);
      });
  }

  const handleUpdateBoardingDetail = async () => {
    try {
      const response = await axios.put(`http://localhost:5000/boardingdetails/update/${selectedBoardingDetail._id}`, selectedBoardingDetail);
      handleBoardingDetailUpdate(response.data);
    } catch (error) {
      console.error('Error updating boarding detail:', error);
    }
  }

  const handleViewBoardingDetail = (boardingDetail) => {
    setSelectedBoardingDetail(boardingDetail);
  }

  return (
    <div className="BoardingDetailsManagement">
      <h2>Create Boarding Detail</h2>
      <form onSubmit={handleCreateBoardingDetail}>
        <input
          type="text"
          placeholder="Weight"
          value={newBoardingDetail.weight}
          onChange={(e) => setNewBoardingDetail({ ...newBoardingDetail, weight: e.target.value })}
        />
        <input
          type="text"
          placeholder="Transportation Cost"
          value={newBoardingDetail.transportationCost}
          onChange={(e) => setNewBoardingDetail({ ...newBoardingDetail, transportationCost: e.target.value })}
        />
        <input
          type="text"
          placeholder="Date"
          value={newBoardingDetail.date}
          onChange={(e) => setNewBoardingDetail({ ...newBoardingDetail, date: e.target.value })}
        />
        <input
          type="text"
          placeholder="Time"
          value={newBoardingDetail.time}
          onChange={(e) => setNewBoardingDetail({ ...newBoardingDetail, time: e.target.value })}
        />
        <input
          type="text"
          placeholder="Driver Name"
          value={newBoardingDetail.driverName}
          onChange={(e) => setNewBoardingDetail({ ...newBoardingDetail, driverName: e.target.value })}
        />
        <input
          type="text"
          placeholder="Driver Number"
          value={newBoardingDetail.driverNumber}
          onChange={(e) => setNewBoardingDetail({ ...newBoardingDetail, driverNumber: e.target.value })}
        />
        <input
          type="text"
          placeholder="Driver Address"
          value={newBoardingDetail.driverAddress}
          onChange={(e) => setNewBoardingDetail({ ...newBoardingDetail, driverAddress: e.target.value })}
        />
        <input
          type="text"
          placeholder="Watermark"
          value={newBoardingDetail.watermark}
          onChange={(e) => setNewBoardingDetail({ ...newBoardingDetail, watermark: e.target.value })}
        />
        <input
          type="text"
          placeholder="Whatsapp"
          value={newBoardingDetail.whatsapp}
          onChange={(e) => setNewBoardingDetail({ ...newBoardingDetail, whatsapp: e.target.value })}
        />
        <button>Create Boarding Detail</button>
      </form>

      <h2>Boarding Details</h2>
      <ul>
        {boardingDetails.map((detail) => (
          <li key={detail._id}>
            <button onClick={() => handleViewBoardingDetail(detail)}>View</button>
            <button onClick={() => handleBoardingDetailUpdate(detail)}>Update</button>
            <button onClick={() => handleBoardingDetailDelete(detail._id)}>Delete</button>
          </li>
        ))}
      </ul>

      {selectedBoardingDetail && (
        <div>
          <h2>View/Update Boarding Detail</h2>
          <div>
            <strong>Weight:</strong>
            <input
              type="text"
              value={selectedBoardingDetail.weight}
              onChange={(e) => setSelectedBoardingDetail({ ...selectedBoardingDetail, weight: e.target.value })}
            />
          </div>
          <div>
            <strong>Transportation Cost:</strong>
            <input
              type="text"
              value={selectedBoardingDetail.transportationCost}
              onChange={(e) => setSelectedBoardingDetail({ ...selectedBoardingDetail, transportationCost: e.target.value })}
            />
          </div>
          <div>
            <strong>Date:</strong>
            <input
              type="text"
              value={selectedBoardingDetail.date}
              onChange={(e) => setSelectedBoardingDetail({ ...selectedBoardingDetail, date: e.target.value })}
            />
          </div>
          <div>
            <strong>Time:</strong>
            <input
              type="text"
              value={selectedBoardingDetail.time}
              onChange={(e) => setSelectedBoardingDetail({ ...selectedBoardingDetail, time: e.target.value })}
            />
          </div>
          <div>
            <strong>Driver Name:</strong>
            <input
              type="text"
              value={selectedBoardingDetail.driverName}
              onChange={(e) => setSelectedBoardingDetail({ ...selectedBoardingDetail, driverName: e.target.value })}
            />
          </div>
          <div>
            <strong>Driver Number:</strong>
            <input
              type="text"
              value={selectedBoardingDetail.driverNumber}
              onChange={(e) => setSelectedBoardingDetail({ ...selectedBoardingDetail, driverNumber: e.target.value })}
            />
          </div>
          <div>
            <strong>Driver Address:</strong>
            <input
              type="text"
              value={selectedBoardingDetail.driverAddress}
              onChange={(e) => setSelectedBoardingDetail({ ...selectedBoardingDetail, driverAddress: e.target.value })}
            />
          </div>
          <div>
            <strong>Watermark:</strong>
            <input
              type="text"
              value={selectedBoardingDetail.watermark}
              onChange={(e) => setSelectedBoardingDetail({ ...selectedBoardingDetail, watermark: e.target.value })}
            />
          </div>
          <div>
            <strong>Whatsapp:</strong>
            <input
              type="text"
              value={selectedBoardingDetail.whatsapp}
              onChange={(e) => setSelectedBoardingDetail({ ...selectedBoardingDetail, whatsapp: e.target.value })}
            />
          </div>
          <button onClick={handleUpdateBoardingDetail}>Update</button>
        </div>
      )}
    </div>
  );
}

export default BoardingDetailsManagement;
