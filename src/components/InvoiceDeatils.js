import React, { useState, useEffect } from 'react';
import axios from 'axios';

function InvoiceDetails() {
  const [invoiceDetails, setInvoiceDetails] = useState([]);
  const [selectedInvoiceDetails, setSelectedInvoiceDetails] = useState(null);
  const [newInvoiceDetails, setNewInvoiceDetails] = useState({
    invoiceNo: '',
    eWayNo: '',
    invoiceDated: '',
    deliveryNote: '',
    paymentTerms: '',  // Ensure it has an initial value
    supplierRef: '',
    otherReferences: '',
    buyersOrderNo: '',
    orderedDated: '',
    dispatchedDocumentNo: '',
    deliveryNoteDate: '',
    dispatchedThrough: '',
    destination: '',
    billOfLadingNo: '',  // Match the state key
    motorVehicleNumber: '',  // Ensure it has an initial value
    termsOfDelivery: '',
  });

  const [updatedInvoiceDetailsData, setUpdatedInvoiceDetailsData] = useState({
    invoiceNo: '',
    eWayNo: '',
    invoiceDated: '',
    deliveryNote: '',
    paymentTerms: '',
    supplierRef: '',
    otherReferences: '',
    buyersOrderNo: '',
    orderedDated: '',
    dispatchedDocumentNo: '',
    deliveryNoteDate: '',
    dispatchedThrough: '',
    destination: '',
    billOfLadingNo: '',
    motorVehicleNumber: '',
    termsOfDelivery: '',
  });

  useEffect(() => {
    // Fetch invoice details from your Express API
    axios.get('http://localhost:5000/invoicedetails/list')
      .then((response) => {
        setInvoiceDetails(response.data);
      })
      .catch((error) => {
        console.error('Error fetching invoice details:', error);
      });
  }, []);

  const handleCreateInvoiceDetails = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/invoicedetails/add', newInvoiceDetails);
      setInvoiceDetails([...invoiceDetails, response.data]);
      setNewInvoiceDetails({
        invoiceNo: '',
        eWayNo: '',
        invoiceDated: '',
        deliveryNote: '',
        paymentTerms: '',
        supplierRef: '',
        otherReferences: '',
        buyersOrderNo: '',
        orderedDated: '',
        dispatchedDocumentNo: '',
        deliveryNoteDate: '',
        dispatchedThrough: '',
        destination: '',
        billOfLadingNo: '',
        motorVehicleNumber: '',
        termsOfDelivery: '',
      });
    } catch (error) {
      console.error('Error creating invoice details:', error);
    }
  };

  const handleInvoiceDetailsUpdate = (updatedInvoiceDetails) => {
    const updatedInvoiceDetailsList = invoiceDetails.map((details) =>
      details._id === updatedInvoiceDetails._id ? updatedInvoiceDetails : details
    );
    setInvoiceDetails(updatedInvoiceDetailsList);
    setSelectedInvoiceDetails(null);
  };

  const handleInvoiceDetailsDelete = (invoiceDetailsId) => {
    axios.delete(`http://localhost:5000/invoicedetails/delete/${invoiceDetailsId}`)
      .then(() => {
        const updatedInvoiceDetailsList = invoiceDetails.filter((details) => details._id !== invoiceDetailsId);
        setInvoiceDetails(updatedInvoiceDetailsList);
        setSelectedInvoiceDetails(null);
      })
      .catch((error) => {
        console.error('Error deleting invoice details:', error);
      });
  };

  return (
    <div className="InvoiceDetails">
      <h2>Create Invoice Details</h2>
      <form onSubmit={handleCreateInvoiceDetails}>
      <div>
  <input
    type="text"
    placeholder="Invoice Number"
    value={newInvoiceDetails.invoiceNo}
    onChange={(e) => setNewInvoiceDetails({ ...newInvoiceDetails, invoiceNo: e.target.value })}
  />
  <input
    type="text"
    placeholder="E-way Number"
    value={newInvoiceDetails.eWayNo}
    onChange={(e) => setNewInvoiceDetails({ ...newInvoiceDetails, eWayNo: e.target.value })}
  />
  <input
    type="date"
    placeholder="Invoice Dated"
    value={newInvoiceDetails.invoiceDated}
    onChange={(e) => setNewInvoiceDetails({ ...newInvoiceDetails, invoiceDated: e.target.value })}
  />
  <input
    type="text"
    placeholder="Delivery Note"
    value={newInvoiceDetails.deliveryNote}
    onChange={(e) => setNewInvoiceDetails({ ...newInvoiceDetails, deliveryNote: e.target.value })}
  />
  <input
    type="text"
    placeholder="Payment Terms"
    value={newInvoiceDetails.paymentTerms}
    onChange={(e) => setNewInvoiceDetails({ ...newInvoiceDetails, paymentTerms: e.target.value })}
  />
  <input
    type="text"
    placeholder="Supplier's Ref"
    value={newInvoiceDetails.supplierRef}
    onChange={(e) => setNewInvoiceDetails({ ...newInvoiceDetails, supplierRef: e.target.value })}
  />
  <input
    type="text"
    placeholder="Other References"
    value={newInvoiceDetails.otherReferences}
    onChange={(e) => setNewInvoiceDetails({ ...newInvoiceDetails, otherReferences: e.target.value })}
  />
  <input
    type="text"
    placeholder="Buyers's Order no"
    value={newInvoiceDetails.buyersOrderNo}
    onChange={(e) => setNewInvoiceDetails({ ...newInvoiceDetails, buyersOrderNo: e.target.value })}
  />
  <input
    type="date"
    placeholder="Ordered Dated"
    value={newInvoiceDetails.orderedDated}
    onChange={(e) => setNewInvoiceDetails({ ...newInvoiceDetails, orderedDated: e.target.value })}
  />
  <input
    type="text"
    placeholder="Dispatched Document no"
    value={newInvoiceDetails.dispatchedDocumentNo}
    onChange={(e) => setNewInvoiceDetails({ ...newInvoiceDetails, dispatchedDocumentNo: e.target.value })}
  />
  <input
    type="date"
    placeholder="Delivery Note Date"
    value={newInvoiceDetails.deliveryNoteDate}
    onChange={(e) => setNewInvoiceDetails({ ...newInvoiceDetails, deliveryNoteDate: e.target.value })}
  />
  <input
    type="text"
    placeholder="Dispatched through"
    value={newInvoiceDetails.dispatchedThrough}
    onChange={(e) => setNewInvoiceDetails({ ...newInvoiceDetails, dispatchedThrough: e.target.value })}
  />
  <input
    type="text"
    placeholder="Destination"
    value={newInvoiceDetails.destination}
    onChange={(e) => setNewInvoiceDetails({ ...newInvoiceDetails, destination: e.target.value })}
  />
  <input
    type="text"
    placeholder="Bill of Landing/LR-RR no"
    value={newInvoiceDetails.billOfLadingNo}
    onChange={(e) => setNewInvoiceDetails({ ...newInvoiceDetails, billOfLadingNo: e.target.value })}
  />
  <input
    type="text"
    placeholder="Motor Vehicle Number"
    value={newInvoiceDetails.motorVehicleNumber}
    onChange={(e) => setNewInvoiceDetails({ ...newInvoiceDetails, motorVehicleNumber: e.target.value })}
  />
  <input
    type="text"
    placeholder="Terms of Delivery"
    value={newInvoiceDetails.termsOfDelivery}
    onChange={(e) => setNewInvoiceDetails({ ...newInvoiceDetails, termsOfDelivery: e.target.value })}
  />
  <button onClick={handleCreateInvoiceDetails}>Create Invoice</button>
</div>
</form>

<h2>Invoice Details</h2>
<ul>
  {invoiceDetails.map((details) => (
    <li key={details._id}>
      {/* Display invoice details */}
      <button onClick={() => setSelectedInvoiceDetails(details)}>Update</button>
      <button onClick={() => handleInvoiceDetailsDelete(details._id)}>Delete</button>
      <div>
        <strong>Invoice Number:</strong> {details.invoiceNo}
      </div>
      <div>
        <strong>E-way Number:</strong> {details.eWayNo}
      </div>
      <div>
        <strong>Invoice Dated:</strong> {details.invoiceDated}
      </div>
      <div>
        <strong>Delivery Note:</strong> {details.deliveryNote}
      </div>
      <div>
        <strong>Payment Terms:</strong> {details.paymentTerms}
      </div>
      <div>
        <strong>Supplier's Ref:</strong> {details.supplierRef}
      </div>
      <div>
        <strong>Other References:</strong> {details.otherReferences}
      </div>
      <div>
        <strong>Buyers's Order no:</strong> {details.buyersOrderNo}
      </div>
      <div>
        <strong>Ordered Dated:</strong> {details.orderedDated}
      </div>
      <div>
        <strong>Dispatched Document no:</strong> {details.dispatchedDocumentNo}
      </div>
      <div>
        <strong>Delivery Note Date:</strong> {details.deliveryNoteDate}
      </div>
      <div>
        <strong>Dispatched through:</strong> {details.dispatchedThrough}
      </div>
      <div>
        <strong>Destination:</strong> {details.destination}
      </div>
      <div>
        <strong>Bill of Landing/LR-RR no:</strong> {details.billOfLadingNo}
      </div>
      <div>
        <strong>Motor Vehicle Number:</strong> {details.motorVehicleNumber}
      </div>
      <div>
        <strong>Terms of Delivery:</strong> {details.termsOfDelivery}
      </div>
    </li>
  ))}
</ul>


    {selectedInvoiceDetails && (
      <div>
        <h2>Update Invoice Details</h2>
        <InvoiceDetailsUpdate
          invoiceDetails={selectedInvoiceDetails}
          onUpdate={handleInvoiceDetailsUpdate}
          updatedInvoiceDetailsData={updatedInvoiceDetailsData}
          setUpdatedInvoiceDetailsData={setUpdatedInvoiceDetailsData}
        />
      </div>
    )}
  </div>
);
}

function InvoiceDetailsUpdate({ invoiceDetails, onUpdate, updatedInvoiceDetailsData, setUpdatedInvoiceDetailsData }) {
  const handleUpdate = async () => {
    try {
      const response = await axios.put(`http://localhost:5000/invoicedetails/update/${invoiceDetails._id}`, updatedInvoiceDetailsData);
      onUpdate(response.data);
      setUpdatedInvoiceDetailsData({});
    } catch (error) {
      console.error('Error updating invoice details:', error);
    }
  }

  return (
    <div>
  {/* Input fields to update invoice details */}
  <input
    type="text"
    placeholder="Invoice Number"
    value={updatedInvoiceDetailsData.invoiceNo}
    onChange={(e) => setUpdatedInvoiceDetailsData({ ...updatedInvoiceDetailsData, invoiceNo: e.target.value })}
  />
  <input
    type="text"
    placeholder="E-way Number"
    value={updatedInvoiceDetailsData.eWayNo}
    onChange={(e) => setUpdatedInvoiceDetailsData({ ...updatedInvoiceDetailsData, eWayNo: e.target.value })}
  />
  <input
    type="date"
    placeholder="Invoice Dated"
    value={updatedInvoiceDetailsData.invoiceDated}
    onChange={(e) => setUpdatedInvoiceDetailsData({ ...updatedInvoiceDetailsData, invoiceDated: e.target.value })}
  />
  <input
    type="text"
    placeholder="Delivery Note"
    value={updatedInvoiceDetailsData.deliveryNote}
    onChange={(e) => setUpdatedInvoiceDetailsData({ ...updatedInvoiceDetailsData, deliveryNote: e.target.value })}
  />
  <input
    type="text"
    placeholder="Payment Terms"
    value={updatedInvoiceDetailsData.paymentTerms}
    onChange={(e) => setUpdatedInvoiceDetailsData({ ...updatedInvoiceDetailsData, paymentTerms: e.target.value })}
  />
  <input
    type="text"
    placeholder="Supplier's Ref"
    value={updatedInvoiceDetailsData.supplierRef}
    onChange={(e) => setUpdatedInvoiceDetailsData({ ...updatedInvoiceDetailsData, supplierRef: e.target.value })}
  />
  <input
    type="text"
    placeholder="Other References"
    value={updatedInvoiceDetailsData.otherReferences}
    onChange={(e) => setUpdatedInvoiceDetailsData({ ...updatedInvoiceDetailsData, otherReferences: e.target.value })}
  />
  <input
    type="text"
    placeholder="Buyers's Order no"
    value={updatedInvoiceDetailsData.buyersOrderNo}
    onChange={(e) => setUpdatedInvoiceDetailsData({ ...updatedInvoiceDetailsData, buyersOrderNo: e.target.value })}
  />
  <input
    type="date"
    placeholder="Ordered Dated"
    value={updatedInvoiceDetailsData.orderedDated}
    onChange={(e) => setUpdatedInvoiceDetailsData({ ...updatedInvoiceDetailsData, orderedDated: e.target.value })}
  />
  <input
    type="text"
    placeholder="Dispatched Document no"
    value={updatedInvoiceDetailsData.dispatchedDocumentNo}
    onChange={(e) => setUpdatedInvoiceDetailsData({ ...updatedInvoiceDetailsData, dispatchedDocumentNo: e.target.value })}
  />
  <input
    type="date"
    placeholder="Delivery Note Date"
    value={updatedInvoiceDetailsData.deliveryNoteDate}
    onChange={(e) => setUpdatedInvoiceDetailsData({ ...updatedInvoiceDetailsData, deliveryNoteDate: e.target.value })}
  />
  <input
    type="text"
    placeholder="Dispatched through"
    value={updatedInvoiceDetailsData.dispatchedThrough}
    onChange={(e) => setUpdatedInvoiceDetailsData({ ...updatedInvoiceDetailsData, dispatchedThrough: e.target.value })}
  />
  <input
    type="text"
    placeholder="Destination"
    value={updatedInvoiceDetailsData.destination}
    onChange={(e) => setUpdatedInvoiceDetailsData({ ...updatedInvoiceDetailsData, destination: e.target.value })}
  />
  <input
    type="text"
    placeholder="Bill of Landing/LR-RR no"
    value={updatedInvoiceDetailsData.billOfLadingNo}
    onChange={(e) => setUpdatedInvoiceDetailsData({ ...updatedInvoiceDetailsData, billOfLadingNo: e.target.value })}
  />
  <input
    type="text"
    placeholder="Motor Vehicle Number"
    value={updatedInvoiceDetailsData.motorVehicleNumber}
    onChange={(e) => setUpdatedInvoiceDetailsData({ ...updatedInvoiceDetailsData, motorVehicleNumber: e.target.value })}
  />
  <input
    type="text"
    placeholder="Terms of Delivery"
    value={updatedInvoiceDetailsData.termsOfDelivery}
    onChange={(e) => setUpdatedInvoiceDetailsData({ ...updatedInvoiceDetailsData, termsOfDelivery: e.target.value })}
  />
  <button onClick={handleUpdate}>Update</button>
</div>

  );
}

export default InvoiceDetails;
