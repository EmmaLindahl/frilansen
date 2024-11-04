import React from 'react';

const Search = () => {
  const zones = Array.from({ length: 5 }, (_, index) => (
    <div key={index} className="zone">
      {index + 1}
    </div>
  ));

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
        {zones}
      </div>
    </>
  );
};

export default Search;