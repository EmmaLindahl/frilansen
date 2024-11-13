import React, { useState, useEffect } from 'react';
import './Search.css';

const Search = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchParams, setSearchParams] = useState({
    firstname: '',
    lastname: '',
    professionalrole: '',
    area: '',
    company: ''
  });

  useEffect(() => {
    fetch('/api')
      .then(response => response.json())
      .then((data) => {
        setData(data);
        setFilteredData(data); 
        console.log("Fetched data:", data);
      });
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSearchParams(prevParams => ({ ...prevParams, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const results = data.filter(item =>
      (!searchParams.firstname || item.firstname.toLowerCase().includes(searchParams.firstname.toLowerCase())) &&
      (!searchParams.lastname || item.lastname.toLowerCase().includes(searchParams.lastname.toLowerCase())) &&
      (!searchParams.professionalrole || item.professionalrole.toLowerCase().includes(searchParams.professionalrole.toLowerCase())) &&
      (!searchParams.area || item.area.toLowerCase().includes(searchParams.area.toLowerCase())) &&
      (!searchParams.company || item.company.toLowerCase().includes(searchParams.company.toLowerCase()))
    );
    setFilteredData(results);
  };

  return (
    <>
      <h1>Snickare Nära Dig</h1>
      <div className="card">
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <p>Lista över Snickare</p>
          <input
            type="text"
            name="firstname"
            placeholder="Sök efter firstname"
            className="search-input"
            value={searchParams.firstname}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="lastname"
            placeholder="Sök efter lastname"
            className="search-input"
            value={searchParams.lastname}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="professionalrole"
            placeholder="Sök efter professionalrole"
            className="search-input"
            value={searchParams.professionalrole}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="area"
            placeholder="Sök efter area"
            className="search-input"
            value={searchParams.area}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="company"
            placeholder="Sök efter company"
            className="search-input"
            value={searchParams.company}
            onChange={handleInputChange}
          />
          <button type="submit">Search</button>
        </form>
        
        {filteredData && filteredData.length > 0 ? (
          filteredData.map((item, index) => (
            <div key={index} className="User">
              <p>
                namn: { item.firstname }<br/>
                efternamn: { item.lastname }<br/>
                professionalrole: { item.professionalrole }<br/>
                area: { item.area }<br/>
                företag: { item.company }
              </p>
            </div>
          ))
        ) : (
          <p>Inga resultat matchade din sökning...</p>
        )}
      </div>
    </>
  );
};

export default Search;