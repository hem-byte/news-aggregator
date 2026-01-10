import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [news, setNews] = useState([]);
  const [category, setCategory] = useState("technology");

  useEffect(() => {
    fetch(`http://localhost:5000/api/news/${category}`)
      .then((res) => res.json())
      .then((data) => setNews(data))
      .catch((err) => console.error(err));
  }, [category]);

  return (
    <div className="app">
      <h1>📰 News Aggregator</h1>

      <div className="categories">
        {["technology", "business", "sports", "health", "entertainment"].map(
          (cat) => (
            <button key={cat} onClick={() => setCategory(cat)}>
              {cat.toUpperCase()}
            </button>
          )
        )}
      </div>

      <div className="news-container">
        {news.map((article, index) => (
          <div className="card" key={index}>
            {article.urlToImage && (
              <img src={article.urlToImage} alt="news" />
            )}
            <h3>{article.title}</h3>
            <p>{article.description}</p>
            <a href={article.url} target="_blank" rel="noreferrer">
              Read More
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
