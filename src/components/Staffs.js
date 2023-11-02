import React, { useState, useEffect } from 'react';
import axios from 'axios';

function StaffManagement() {
  const [staffMembers, setStaffMembers] = useState([]);
  const [selectedStaff, setSelectedStaff] = useState(null);
  const [newStaffMember, setNewStaffMember] = useState({
    Name: '',
    Email: '',
    Password: '',
    Access: '',
    IdProof: '',
    OfficeBranch: '',
    Number: '',
    // Add more fields as needed
  });
  const [updatedStaffMemberData, setUpdatedStaffMemberData] = useState({
    Name: '',
    Email: '',
    Password: '',
    Access: '',
    IdProof: '',
    OfficeBranch: '',
    Number: '',
    // Add more fields as needed
  });

  useEffect(() => {
    // Fetch staff member data from your Express API
    axios.get('http://localhost:5000/staff/list')
      .then((response) => {
        setStaffMembers(response.data);
      })
      .catch((error) => {
        console.error('Error fetching staff member data:', error);
      });
  }, []);

  const handleCreateStaffMember = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/staff/add', newStaffMember);
      setStaffMembers([...staffMembers, response.data]);
      setNewStaffMember({
        Name: '',
        Email: '',
        Password: '',
        Access: '',
        IdProof: '',
        OfficeBranch: '',
        Number: '',
      });
    } catch (error) {
      console.error('Error creating staff member:', error);
    }
  };

  const handleStaffMemberUpdate = (updatedStaffMember) => {
    const updatedStaffMembers = staffMembers.map((staffMember) =>
      staffMember._id === updatedStaffMember._id ? updatedStaffMember : staffMember
    );
    setStaffMembers(updatedStaffMembers);
    setSelectedStaff(null);
  };

  const handleStaffMemberDelete = (staffMemberId) => {
    axios.delete(`http://localhost:5000/staff/delete/${staffMemberId}`)
      .then(() => {
        const updatedStaffMembers = staffMembers.filter((staffMember) => staffMember._id !== staffMemberId);
        setStaffMembers(updatedStaffMembers);
        setSelectedStaff(null);
      })
      .catch((error) => {
        console.error('Error deleting staff member:', error);
      });
  };

  return (
    <div className="StaffManagement">
      <h2>Create Staff Member</h2>
      <form onSubmit={handleCreateStaffMember}>
        <input
          type="text"
          placeholder="Name"
          value={newStaffMember.Name}
          onChange={(e) => setNewStaffMember({ ...newStaffMember, Name: e.target.value })}
        />
        <input
          type="email"
          placeholder="Email"
          value={newStaffMember.Email}
          onChange={(e) => setNewStaffMember({ ...newStaffMember, Email: e.target.value })}
        />
        <input
          type="password"
          placeholder="Password"
          value={newStaffMember.Password}
          onChange={(e) => setNewStaffMember({ ...newStaffMember, Password: e.target.value })}
        />
        <input
          type="text"
          placeholder="Access"
          value={newStaffMember.Access}
          onChange={(e) => setNewStaffMember({ ...newStaffMember, Access: e.target.value })}
        />
        <input
          type="text"
          placeholder="IdProof"
          value={newStaffMember.IdProof}
          onChange={(e) => setNewStaffMember({ ...newStaffMember, IdProof: e.target.value })}
        />
        <input
          type="text"
          placeholder="OfficeBranch"
          value={newStaffMember.OfficeBranch}
          onChange={(e) => setNewStaffMember({ ...newStaffMember, OfficeBranch: e.target.value })}
        />
        <input
          type="text"
          placeholder="Number"
          value={newStaffMember.Number}
          onChange={(e) => setNewStaffMember({ ...newStaffMember, Number: e.target.value })}
        />
        {/* Add more input fields as needed */}
        <button type="submit">Create Staff Member</button>
      </form>

      <h2>Staff Members</h2>
      <ul>
        {staffMembers.map((staffMember) => (
          <li key={staffMember._id}>
            <p>Name: {staffMember.Name}</p>
            <p>Email: {staffMember.Email}</p>
            <p>Access: {staffMember.Access}</p>
            <p>IdProof: {staffMember.IdProof}</p>
            <p>OfficeBranch: {staffMember.OfficeBranch}</p>
            <p>Number: {staffMember.Number}</p>
            {/* Add more fields as needed */}
            <button onClick={() => setSelectedStaff(staffMember)}>Update</button>
            <button onClick={() => handleStaffMemberDelete(staffMember._id)}>Delete</button>
          </li>
        ))}
      </ul>

      {selectedStaff && (
        <div>
          <h2>Update Staff Member</h2>
          <StaffMemberUpdate
            staffMember={selectedStaff}
            onUpdate={handleStaffMemberUpdate}
            updatedStaffMemberData={updatedStaffMemberData}
            setUpdatedStaffMemberData={setUpdatedStaffMemberData}
          />
        </div>
      )}
    </div>
  );
}

function StaffMemberUpdate({ staffMember, onUpdate, updatedStaffMemberData, setUpdatedStaffMemberData }) {
  const handleUpdate = async () => {
    try {
      const response = await axios.put(`http://localhost:5000/staff/update/${staffMember._id}`, updatedStaffMemberData);
      onUpdate(response.data);
      setUpdatedStaffMemberData({
        Name: '',
        Email: '',
        Password: '',
        Access: '',
        IdProof: '',
        OfficeBranch: '',
        Number: '',
      });
    } catch (error) {
      console.error('Error updating staff member:', error);
    }
  }

  return (
    <div>
      <input
        type="text"
        placeholder="Name"
        value={updatedStaffMemberData.Name}
        onChange={(e) => setUpdatedStaffMemberData({ ...updatedStaffMemberData, Name: e.target.value })}
      />
      <input
        type="email"
        placeholder="Email"
        value={updatedStaffMemberData.Email}
        onChange={(e) => setUpdatedStaffMemberData({ ...updatedStaffMemberData, Email: e.target.value })}
      />
      <input
        type="password"
        placeholder="Password"
        value={updatedStaffMemberData.Password}
        onChange={(e) => setUpdatedStaffMemberData({ ...updatedStaffMemberData, Password: e.target.value })}
      />
      <input
        type="text"
        placeholder="Access"
        value={updatedStaffMemberData.Access}
        onChange={(e) => setUpdatedStaffMemberData({ ...updatedStaffMemberData, Access: e.target.value })}
      />
      <input
        type="text"
        placeholder="IdProof"
        value={updatedStaffMemberData.IdProof}
        onChange={(e) => setUpdatedStaffMemberData({ ...updatedStaffMemberData, IdProof: e.target.value })}
      />
      <input
        type="text"
        placeholder="OfficeBranch"
        value={updatedStaffMemberData.OfficeBranch}
        onChange={(e) => setUpdatedStaffMemberData({ ...updatedStaffMemberData, OfficeBranch: e.target.value })}
      />
      <input
        type="text"
        placeholder="Number"
        value={updatedStaffMemberData.Number}
        onChange={(e) => setUpdatedStaffMemberData({ ...updatedStaffMemberData, Number: e.target.value })}
      />
      {/* Add more input fields as needed */}
      <button onClick={handleUpdate}>Update</button>
    </div>
  );
}

export default StaffManagement;
