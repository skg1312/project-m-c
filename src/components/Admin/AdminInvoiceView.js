import React, { useState, useEffect } from 'react';
import axios from 'axios';
import jsPDF from 'jspdf';

function InvoiceApp() {
  const [invoices, setInvoices] = useState([]);
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [invoiceNumber, setInvoiceNumber] = useState(''); // Add a state for the invoice number filter

  useEffect(() => {
    // Fetch the invoice data from the API
    axios.get('http://localhost:5000/invoice')
      .then(response => {
        setInvoices(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const handleSelectChange = (event) => {
    const selectedId = event.target.value;
    const selected = invoices.find(invoice => invoice._id === selectedId);
    setSelectedInvoice(selected);
  };

  const downloadInvoiceAsPDF = () => {
    if (!selectedInvoice) return;

    const pdf = new jsPDF();
    pdf.text(10, 10, `Invoice No: ${selectedInvoice.invoicedetails.invoiceno}`);
    pdf.text(10, 20, `Company Name: ${selectedInvoice.companydetails.companyname}`);
    pdf.text(10, 30, `Seller Company Name: ${selectedInvoice.sellerdetails.sellercompanyname}`);
    pdf.text(10, 40, `Buyer Company Name: ${selectedInvoice.buyerdetails.buyercompanyname}`);

    // Add item details from consignmentdetails
    if (selectedInvoice.consignmentdetails && selectedInvoice.consignmentdetails.itemdetails) {
      const itemDetails = selectedInvoice.consignmentdetails.itemdetails;
      let y = 50; // Starting Y position for item details
      itemDetails.forEach(item => {
        pdf.text(10, y, `Item Name: ${item.itemname}`);
        pdf.text(10, y + 10, `Quantity: ${item.itemquantity}`);
        pdf.text(10, y + 20, `HSN: ${item.itemhsn}`);
        pdf.text(10, y + 30, `Price: ${item.itemprice}`);
        pdf.text(10, y + 40, `Tax Rate: ${item.itemtaxrate}`);
        y += 50; // Increase Y position for the next item
      });
    }

    pdf.save('invoice.pdf');
  };

  // Add a function to filter invoices based on the invoice number
  const filterInvoices = () => {
    if (!invoiceNumber) {
      return invoices;
    }
    return invoices.filter(invoice => invoice.invoicedetails.invoiceno === invoiceNumber);
  };

  return (
    <div>
      <h1>Invoice App</h1>
      <input
        type="text"
        placeholder="Filter by Invoice Number"
        value={invoiceNumber}
        onChange={(e) => setInvoiceNumber(e.target.value)}
      />
      <select onChange={handleSelectChange}>
        <option value="">Select an Invoice</option>
        {filterInvoices().map(invoice => (
          <option key={invoice._id} value={invoice._id}>
            {invoice.invoicedetails.invoiceno}
          </option>
        ))}
      </select>
      {selectedInvoice && (
        <div>
          <h2>Selected Invoice</h2>
          <p>Invoice No: {selectedInvoice.invoicedetails.invoiceno}</p>
          <p>Company Name: {selectedInvoice.companydetails.companyname}</p>
          <p>Seller Company Name: {selectedInvoice.sellerdetails.sellercompanyname}</p>
          <p>Buyer Company Name: {selectedInvoice.buyerdetails.buyercompanyname}</p>
          {/* Display item details here */}
          <div>
            <h3>Item Details</h3>
            {selectedInvoice.consignmentdetails &&
              selectedInvoice.consignmentdetails.itemdetails &&
              selectedInvoice.consignmentdetails.itemdetails.map((item, index) => (
                <div key={index}>
                  <p>Item Name: {item.itemname}</p>
                  <p>Quantity: {item.itemquantity}</p>
                  <p>HSN: {item.itemhsn}</p>
                  <p>Price: {item.itemprice}</p>
                  <p>Tax Rate: {item.itemtaxrate}</p>
                </div>
              ))}
          </div>
          <button onClick={downloadInvoiceAsPDF}>Download as PDF</button>
        </div>
      )}
    </div>
  );
}

export default InvoiceApp;
