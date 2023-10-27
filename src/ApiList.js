import React, { useState, useEffect } from 'react';

const ApiList = () => {
  // State variables for managing data and filters
  const [apis, setApis] = useState([]); // To store the API data
  const [filteredApis, setFilteredApis] = useState([]); // To store filtered APIs
  const [searchTerm, setSearchTerm] = useState(''); // To store the search term
  const [animalFilter, setAnimalFilter] = useState(false); // To toggle the 'Animals' filter

  // Effect to fetch data from the API when the component mounts
  useEffect(() => {
    // Fetch data from the API
    fetch('https://api.publicapis.org/entries')
      .then((response) => response.json())
      .then((data) => setApis(data.entries)) // Set the fetched data in the 'apis' state
      .catch((error) => console.error(error)); // Log any errors
  }, []);

  // Effect to filter and update the 'filteredApis' state when search or filter criteria change
  useEffect(() => {
    // Filter APIs based on the search term and animal filter
    const filtered = apis.filter((api) => {
      return (
        (!searchTerm || api.API.toLowerCase().includes(searchTerm.toLowerCase())) && // Check if API name contains the search term
        (!animalFilter || api.Category === 'Animals') // Check if the 'Animals' filter is active
      );
    });
    setFilteredApis(filtered); // Update the 'filteredApis' state with the filtered results
  }, [searchTerm, animalFilter, apis]);

  return (
    <div>
      <div>
        {/* Search input and label for 'Animals' filter */}
        <input
          type="text"
          placeholder="Search APIs by name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)} // Update 'searchTerm' state on input change
        />
        <label>
          <input
            type="checkbox"
            checked={animalFilter}
            onChange={() => setAnimalFilter(!animalFilter)} // Toggle the 'Animals' filter
          />
          Animals
        </label>
      </div>
      <ul>
        {filteredApis.map((api, index) => (
          <li key={index} className="api-item"> {/* List item for each API */}
            <h3>{api.API}</h3> {/* API name */}
            <p>{api.Description}</p> {/* API description */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ApiList;
