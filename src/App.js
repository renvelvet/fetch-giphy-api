import React, { useState, useEffect } from "react";

// import styled from "styled-components";

function App() {
  const [pageTitle, setpageTitle] = useState("Trending");
  const [query, setquery] = useState("trending");
  const [gifs, setgifs] = useState({});

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      let key = event.target.value;
      setquery(key);
      key = key.charAt(0).toUpperCase() + key.substr(1).toLowerCase();
      setpageTitle(key);
    }
  };

  const fetchGif = async () => {
    const url = `https://api.giphy.com/v1/gifs/${query}?api_key=kO2U7MdfKPoZQ1fRhjpZz3HptPqo9FRp&limit=5&rating=g`;
    const response = await fetch(url);
    const results = await response.json();

    setgifs(results.data[0]);
  };

  useEffect(() => {
    fetchGif();
    [gifs].forEach((element) => {
      console.log(element.images);

      return <img src={element.images.original.url} alt="gif" />;
    });
    // eslint-disable-next-line
  }, [gifs]);

  return (
    <div className="App">
      <input
        type="text"
        name="keyword"
        id="keyword"
        onKeyPress={handleKeyPress}
      />
      <h1>{pageTitle} GIFs</h1>
    </div>
  );
}

export default App;
