import React, { useState, useEffect } from "react";
import { Container, Input, Card, CardBody, CardLink } from "reactstrap";
import "./App.css";

function App() {
  const [pageTitle, setpageTitle] = useState("Trending");
  const [gifs, setgifs] = useState([]);
  const [input, setinput] = useState(null);
  const [endpoint, setendpoint] = useState("trending");

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      let key = event.target.value;
      setinput(key);
      key = key.charAt(0).toUpperCase() + key.substr(1).toLowerCase();
      setpageTitle(key);
      setendpoint("search");
    }
  };

  const fetchGif = async () => {
    const url = `https://api.giphy.com/v1/gifs/${endpoint}?api_key=kO2U7MdfKPoZQ1fRhjpZz3HptPqo9FRp&q=${input}&limit=50&rating=g`;
    const response = await fetch(url);
    const results = await response.json();

    setgifs(results.data);
  };

  useEffect(() => {
    fetchGif();
    // eslint-disable-next-line
  }, [input]);

  return (
    <Container>
      <div className="header">
        <h1>{pageTitle} GIFs</h1>
        <Input
          type="text"
          name="keyword"
          id="keyword"
          placeholder="Search GIF here"
          onKeyPress={handleKeyPress}
          style={{ width: "50%" }}
        />
      </div>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          flexDirection: "row",
          justifyContent: "space-around",
        }}
      >
        {gifs.map((element) => {
          return (
            <Card
              style={{ width: "300px", height: "300px", margin: "1em" }}
              key={element.id}
            >
              <CardBody>
                <CardLink href={element.url}>{element.title}</CardLink>
              </CardBody>
              <img
                style={{ objectFit: "cover", margin: "1em" }}
                src={element.images.fixed_height.url}
                alt="gif"
              />
            </Card>
          );
        })}
      </div>
    </Container>
  );
}

export default App;
