import React, { useState, useEffect } from 'react';
import './Search.css'

const Search = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('/api')
      .then(response => response.json())
      .then((data) => {
        setData(data);
        console.log("Fetch from search:", data);
      });
  }, []);

  return (
    <>
      <h1>Snickare Nära Dig</h1>
      <div className="card">
        <p>Lista över Snickare</p>
        <input
          type="text"
          placeholder="Sök efter en snickare..."
          className="search-input"
        />
        {data && data.length > 0 ? (
          data.map((item, index) => (
            <div key={index} className="User">
              <p>
                username: { item.username }
                phone number: { item.phonenumber }
                work role: { item.professionalrole }
                webbaddress: { item.webbaddress }
              </p>
            </div>
          ))
        ) : (
          <p>Laddar data...</p>
        )}
      </div>
    </>
  );
};

export default Search;