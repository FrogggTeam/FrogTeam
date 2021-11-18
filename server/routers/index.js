const express = require("express");
const path = require("path");
const axios = require("axios");

const router = express.Router();

router.route("/").get(async (req, res, next) => {
  try {
    res.sendFile(path.join(__dirname, "../../build/index.html"));
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.route("/session").get(async (req, res, next) => {
  try {
    res.sendFile(path.join(__dirname, "../../build/index.html"));
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.get("/news", async (req, res) => {
  try {
    const options = {
      method: "GET",
      url: "https://bing-news-search1.p.rapidapi.com/news/search",
      params: {
        q: "코인",
        count: "50",
        textDecorations: "false",
        setLang: "ko",
        cc: "KR",
        freshness: "Day",
        textFormat: "Raw",
        safeSearch: "Off",
      },
      headers: {
        "x-bingapis-sdk": "true",
        "x-rapidapi-host": "bing-news-search1.p.rapidapi.com",
        "x-rapidapi-key": "a8477602eemshb89caea08d5cf54p189324jsna4545adac29d",
      },
    };
    const news = await axios(options);
    console.log(news.data.value);
    res.json(news.data.value);
  } catch {
    console.log("에러");
  }
});

router.post("/news", async (req, res) => {
  try {
    console.log(req.body);
    const options = {
      method: "GET",
      url: "https://bing-news-search1.p.rapidapi.com/news/search",
      params: {
        q: req.body.keyword,
        count: "50",
        textDecorations: "false",
        setLang: "ko",
        cc: "KR",
        freshness: "Day",
        textFormat: "Raw",
        safeSearch: "Off",
      },
      headers: {
        "x-bingapis-sdk": "true",
        "x-rapidapi-host": "bing-news-search1.p.rapidapi.com",
        "x-rapidapi-key": "a8477602eemshb89caea08d5cf54p189324jsna4545adac29d",
      },
    };
    const news = await axios(options);
    console.log(news.data.value);
    res.json(news.data.value);
  } catch {
    console.log("에러");
  }
});

router.get("/new", async (req, res) => {
  try {
    const options = {
      method: "GET",
      url: "https://coinranking1.p.rapidapi.com/coins",
      headers: {
        "x-rapidapi-host": "coinranking1.p.rapidapi.com",
        "x-rapidapi-key": "a8477602eemshb89caea08d5cf54p189324jsna4545adac29d",
      },
    };
    const news = await axios(options);
    console.log(news.data.data.coins[60].name);
    res.json(news.data.data.coins);
  } catch {
    console.log("에러");
  }
});

module.exports = router;
