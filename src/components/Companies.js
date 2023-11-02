import React, { useState, useEffect } from 'react';
import axios from 'axios';

function CompanyManagement() {
  const [companies, setCompanies] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [newCompany, setNewCompany] = useState({
    particular: '',
    country: '',
    State: '',
    'Registration type': '',
    'party type': '',
    'GST No': '',
    contact: '',
    'office address': '',
    pincode: '',
  });
  const [updatedCompanyData, setUpdatedCompanyData] = useState({
    particular: '',
    country: '',
    State: '',
    'Registration type': '',
    'party type': '',
    'GST No': '',
    contact: '',
    'office address': '',
    pincode: '',
  });

  useEffect(() => {
    // Fetch company data from your Express API
    axios.get('http://localhost:5000/companies/list')
      .then((response) => {
        setCompanies(response.data);
      })
      .catch((error) => {
        console.error('Error fetching company data:', error);
      });
  }, []);

  const handleCreateCompany = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/companies/add', newCompany);
      setCompanies([...companies, response.data]);
      setNewCompany({
        particular: '',
        country: '',
        State: '',
        'Registration type': '',
        'party type': '',
        'GST No': '',
        contact: '',
        'office address': '',
        pincode: '',
      });
    } catch (error) {
      console.error('Error creating company:', error);
    }
  };

  const handleCompanyUpdate = (updatedCompany) => {
    const updatedCompanies = companies.map((company) =>
      company._id === updatedCompany._id ? updatedCompany : company
    );
    setCompanies(updatedCompanies);
    setSelectedCompany(null);
  };

  const handleCompanyDelete = (companyId) => {
    axios.delete(`http://localhost:5000/companies/delete/${companyId}`)
      .then(() => {
        const updatedCompanies = companies.filter((company) => company._id !== companyId);
        setCompanies(updatedCompanies);
        setSelectedCompany(null);
      })
      .catch((error) => {
        console.error('Error deleting company:', error);
      });
  };

  return (
    <div className="CompanyManagement">
      <h2>Create Company</h2>
      <form onSubmit={handleCreateCompany}>
        <input
          type="text"
          placeholder="Particular"
          value={newCompany.particular}
          onChange={(e) => setNewCompany({ ...newCompany, particular: e.target.value })}
        />
        <input
          type="text"
          placeholder="Country"
          value={newCompany.country}
          onChange={(e) => setNewCompany({ ...newCompany, country: e.target.value })}
        />
        <input
          type="text"
          placeholder="State"
          value={newCompany.State}
          onChange={(e) => setNewCompany({ ...newCompany, State: e.target.value })}
        />
        <input
          type="text"
          placeholder="Registration type"
          value={newCompany['Registration type']}
          onChange={(e) => setNewCompany({ ...newCompany, 'Registration type': e.target.value })}
        />
        <input
          type="text"
          placeholder="Party type"
          value={newCompany['party type']}
          onChange={(e) => setNewCompany({ ...newCompany, 'party type': e.target.value })}
        />
        <input
          type="text"
          placeholder="GST No"
          value={newCompany['GST No']}
          onChange={(e) => setNewCompany({ ...newCompany, 'GST No': e.target.value })}
        />
        <input
          type="text"
          placeholder="Contact"
          value={newCompany.contact}
          onChange={(e) => setNewCompany({ ...newCompany, contact: e.target.value })}
        />
        <input
          type="text"
          placeholder="Office Address"
          value={newCompany['office address']}
          onChange={(e) => setNewCompany({ ...newCompany, 'office address': e.target.value })}
        />
        <input
          type="text"
          placeholder="Pincode"
          value={newCompany.pincode}
          onChange={(e) => setNewCompany({ ...newCompany, pincode: e.target.value })}
        />
        <button type="submit">Create Company</button>
      </form>

      <h2>Companies</h2>
      <ul>
        {companies.map((company) => (
          <li key={company._id}>
            <p>Particular: {company.particular}</p>
            <p>Country: {company.country}</p>
            <p>State: {company.State}</p>
            <p>Registration type: {company['Registration type']}</p>
            <p>Party type: {company['party type']}</p>
            <p>GST No: {company['GST No']}</p>
            <p>Contact: {company.contact}</p>
            <p>Office Address: {company['office address']}</p>
            <p>Pincode: {company.pincode}</p>
            <button onClick={() => setSelectedCompany(company)}>Update</button>
            <button onClick={() => handleCompanyDelete(company._id)}>Delete</button>
          </li>
        ))}
      </ul>

      {selectedCompany && (
        <div>
          <h2>Update Company</h2>
          <CompanyUpdate
            company={selectedCompany}
            onUpdate={handleCompanyUpdate}
            updatedCompanyData={updatedCompanyData}
            setUpdatedCompanyData={setUpdatedCompanyData}
          />
        </div>
      )}
    </div>
  );
}

function CompanyUpdate({ company, onUpdate, updatedCompanyData, setUpdatedCompanyData }) {
  const handleUpdate = async () => {
    try {
      const response = await axios.put(`http://localhost:5000/companies/update/${company._id}`, updatedCompanyData);
      onUpdate(response.data);
      setUpdatedCompanyData({
        particular: '',
        country: '',
        State: '',
        'Registration type': '',
        'party type': '',
        'GST No': '',
        contact: '',
        'office address': '',
        pincode: '',
      });
    } catch (error) {
      console.error('Error updating company:', error);
    }
  }

  return (
    <div>
      <input
        type="text"
        placeholder="Particular"
        value={updatedCompanyData.particular}
        onChange={(e) => setUpdatedCompanyData({ ...updatedCompanyData, particular: e.target.value })}
      />
      <input
        type="text"
        placeholder="Country"
        value={updatedCompanyData.country}
        onChange={(e) => setUpdatedCompanyData({ ...updatedCompanyData, country: e.target.value })}
      />
      <input
        type="text"
        placeholder="State"
        value={updatedCompanyData.State}
        onChange={(e) => setUpdatedCompanyData({ ...updatedCompanyData, State: e.target.value })}
      />
      <input
        type="text"
        placeholder="Registration type"
        value={updatedCompanyData['Registration type']}
        onChange={(e) => setUpdatedCompanyData({ ...updatedCompanyData, 'Registration type': e.target.value })}
      />
      <input
        type="text"
        placeholder="Party type"
        value={updatedCompanyData['party type']}
        onChange={(e) => setUpdatedCompanyData({ ...updatedCompanyData, 'party type': e.target.value })}
      />
      <input
        type="text"
        placeholder="GST No"
        value={updatedCompanyData['GST No']}
        onChange={(e) => setUpdatedCompanyData({ ...updatedCompanyData, 'GST No': e.target.value })}
      />
      <input
        type="text"
        placeholder="Contact"
        value={updatedCompanyData.contact}
        onChange={(e) => setUpdatedCompanyData({ ...updatedCompanyData, contact: e.target.value })}
      />
      <input
        type="text"
        placeholder="Office Address"
        value={updatedCompanyData['office address']}
        onChange={(e) => setUpdatedCompanyData({ ...updatedCompanyData, 'office address': e.target.value })}
      />
      <input
        type="text"
        placeholder="Pincode"
        value={updatedCompanyData.pincode}
        onChange={(e) => setUpdatedCompanyData({ ...updatedCompanyData, pincode: e.target.value })}
      />
      <button onClick={handleUpdate}>Update</button>
    </div>
  );
}

export default CompanyManagement;
