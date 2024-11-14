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
    company: '',
    webbaddress: '',
    phonenumber: '',
    email: ''
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
        <form onSubmit={handleSubmit} style={{ display: 'flex',  gap: '10px', justifyContent: 'center' }}>  
          <input
            type="text"
            name="firstname"
            placeholder="Förnamn"
            className="search-input"
            value={searchParams.firstname}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="lastname"
            placeholder="Efternamn"
            className="search-input"
            value={searchParams.lastname}
            onChange={handleInputChange}
          />
         <select
    name="professionalrole"
    placeholder="Yrkesgrupp"
    className="search-input"
    value={searchParams.professionalrole}
    onChange={handleInputChange}
    style={{
      color: searchParams.professionalrole === "" ? "grey" : "black" 
  }}
>
    <option style={{color: 'grey'}}value="">Select Yrkesgrupp</option>
    <option style={{color: 'black'}} value="snickare">snickare</option>
    <option style={{color: 'black'}}value="målare">målare</option>
    <option style={{color: 'black'}}value="takläggare">takläggare</option>
    <option style={{color: 'black'}}value="elektriker">elektriker</option>
</select>
          <input
            type="text"
            name="area"
            placeholder="Område"
            className="search-input"
            value={searchParams.area}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="company"
            placeholder="Företag"
            className="search-input"
            value={searchParams.company}
            onChange={handleInputChange}
          />
          <button type="submit" className='searchBtn button'>Sök</button>
        </form>
        <div className='companyCardsWrapper'>
        
        {filteredData && filteredData.length > 0 ? (
          filteredData.map((item, index) => (
            <div key={index} className="companyCard">
               <p>{ item.firstname } { item.lastname } - { item.professionalrole }<br/></p> 
              <p>                
                företag: { item.company}<br/>
                Område: { item.area }<br/>
                webbadress: { item.webbaddress }<br/>
                telefon nummer: { item.phonenumber }<br/>
                email: { item.email }
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