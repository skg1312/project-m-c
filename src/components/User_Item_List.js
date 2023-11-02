import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './User_Item_List.css';
import ReactPaginate from 'react-paginate';

function UserItemList() {
  const [consignments, setConsignments] = useState([]);

  const [pageNumber, setPageNumber] = useState(0);
  const itemsPerPage = 10; // Number of items to display per page

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

  const pagesVisited = pageNumber * itemsPerPage;
  const displayedConsignments = consignments.slice(pagesVisited, pagesVisited + itemsPerPage);

  const pageCount = Math.ceil(consignments.length / itemsPerPage);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  const handleConsignmentDelete = (consignmentId) => {
    axios.delete(`http://localhost:5000/consignments/delete/${consignmentId}`)
      .then(() => {
        const updatedConsignments = consignments.filter((consignment) => consignment._id !== consignmentId);
        setConsignments(updatedConsignments);
      })
      .catch((error) => {
        console.error('Error deleting consignment:', error);
      });
  };

  return (
    <div className="user-app">
      <div className='user-navigation'>
            <div className='user-navigation-box'>
              <div className='user-nav-container1'>
                <div className='user-nav-button' onClick={() => window.location.href='/company'}>
                  <button className='user-nav-button-value'>COMPANY</button>
                  </div>
                </div>
                <div className='user-nav-container1'>
                <div className='user-nav-button' onClick={() => window.location.href='/sellers'}>
                  <button className='user-nav-button-value'>SELLER'S</button>
                  </div>
                </div>
                <div className='user-nav-container1'>
                <div className='user-nav-button' onClick={() => window.location.href='/buyers'}>
                  <button className='user-nav-button-value'>BUYER'S</button>
                  </div>
                </div>
                <div className='user-nav-container1'>
                <div className='user-nav-button' onClick={() => window.location.href='/consignment'}>
                  <button className='user-nav-button-value'>CONSIGNMENT</button>
                  </div>
                </div>
                <div className='user-nav-container1'>
                <div className='user-nav-button' onClick={() => window.location.href='/user'}>
                  <button className='user-nav-button-value'>ITEM'S LIST</button>
                  </div>
                </div>
                <div className='user-nav-container1'>
                <div className='user-nav-button' onClick={() => window.location.href='/customer'}>
                  <button className='user-nav-button-value'>CUSTOMER</button>
                  </div>
                </div>
            </div>
      </div>
      <div className="user-item-list-container">
        <h2 className='user-form-head'>CONSIGNMENT ITEMS LIST</h2>
        <table className='user-table'>
          <thead className='user-table-head'>
            <tr className='user-table-row'>
              <th className='user-table-th'>Item Details</th>
              <th className='user-table-th'>Item Quantity</th>
              <th className='user-table-th'>Item HSN/SAC</th>
              <th className='user-table-th'>Item Quantity as per kg</th>
              <th className='user-table-th'>Item Amount</th>
              <th className='user-table-th'>Actions</th>
            </tr>
          </thead>
          <tbody className='user-table-body'>
            {displayedConsignments.map((consignment) => (
              <tr key={consignment._id} className='user-table-row'>
                <td className='user-table-th'>{consignment.itemDetails}</td>
                <td className='user-table-th'>{consignment.itemQuantity}</td>
                <td className='user-table-th'>{consignment.itemHSN}</td>
                <td className='user-table-th'>{consignment.itemQuantityKg}</td>
                <td className='user-table-th'>{consignment.itemAmount}</td>
                <td className='user-table-th'>
                  <button onClick={() => handleConsignmentDelete(consignment._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <ReactPaginate
          previousLabel="Previous"
          nextLabel="Next"
          pageCount={pageCount}
          onPageChange={changePage}
          containerClassName="pagination"
          previousLinkClassName="previous-page"
          nextLinkClassName="next-page"
          disabledClassName="pagination-disabled"
          activeClassName="pagination-active"
        />
      </div>
    </div>
  );
}

export default UserItemList;
