const express = require("express");
const axios = require("axios");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());

// Home route (test)
app.get("/", (req, res) => {
  res.send("Backend is running successfully");
});

// News API route
app.get("/api/news/:category", async (req, res) => {
  const { category } = req.params;

  try {
    const response = await axios.get(
      `https://newsapi.org/v2/top-headlines?language=en&category=${category}&apiKey=${process.env.NEWS_API_KEY}`
    );

    res.json(response.data.articles);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch news",
      error: error.message,
    });
  }
});

// Server start
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
