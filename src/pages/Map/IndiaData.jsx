// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const IndiaData = () => {
//     const [stateName, setStateName] = useState('');  // State for the input field
//     const [populationData, setPopulationData] = useState(null);  // State for population data
//     const [error, setError] = useState(null);  // State for error handling
  
//     const API_KEY = 'your_api_key';  // Replace with your actual Data.gov.in API key
  
//     const fetchPopulationData = async () => {
//       try {
//         const response = await axios.get(`https://data.gov.in/resource/population-india-state-wise-district-wise-2011/api`, {
//           params: {
//             'state_name': stateName,
//             'api-key': API_KEY
//           }
//         });
//         setPopulationData(response.data);  // Set the fetched data to state
//         setError(null);  // Clear any previous errors
//       } catch (err) {
//         setError('Error fetching population data.');  // Handle error
//         setPopulationData(null);  // Clear previous data
//       }
//     };
  
//     return (
//       <div>
//         <h1>Population Data</h1>
//         <input
//           type="text"
//           placeholder="Enter state name"
//           value={stateName}
//           onChange={(e) => setStateName(e.target.value)}  // Set the state name entered by user
//         />
//         <button onClick={fetchPopulationData}>Fetch Data</button>
  
//         {error && <p>{error}</p>}  {/* Display error message if any */}
  
//         {populationData && (
//           <div>
//             <h2>State: {populationData.state}</h2>  {/* Display state name */}
//             <ul>
//               {populationData.districts.map((district) => (
//                 <li key={district.district_name}>
//                   {district.district_name}: {district.population}  {/* Display each district's population */}
//                 </li>
//               ))}
//             </ul>
//           </div>
//         )}
//       </div>
//     );
//   };
  

// export default IndiaData;
