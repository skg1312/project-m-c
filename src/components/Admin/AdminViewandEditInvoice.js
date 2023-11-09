// import React, { useState } from 'react';
// import { toWords } from 'number-to-words'; // A library to convert numbers to words

// const Invoice = () => {
//   const [items, setItems] = useState([
//     { description: 'Item 1', quantity: 2, price: 10 },
//     { description: 'Item 2', quantity: 3, price: 15 },
//     { description: 'Item 3', quantity: 1, price: 5 },
//   ]);

//   const calculateTotal = () => {
//     return items.reduce((total, item) => total + item.quantity * item.price, 0);
//   };

//   const totalAmountInWords = toWords(calculateTotal());

//   return (
//     <div>
//       <h1>Invoice</h1>
//       <table>
//         <thead>
//           <tr>
//             <th>Description</th>
//             <th>Quantity</th>
//             <th>Price</th>
//             <th>Total</th>
//           </tr>
//         </thead>
//         <tbody>
//           {items.map((item, index) => (
//             <tr key={index}>
//               <td>{item.description}</td>
//               <td>{item.quantity}</td>
//               <td>${item.price}</td>
//               <td>${item.quantity * item.price}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//       <p>Total Amount: ${calculateTotal()}</p>
//       <p>Total Amount in Words: {totalAmountInWords}</p>
//     </div>
//   );
// };

// export default Invoice;
