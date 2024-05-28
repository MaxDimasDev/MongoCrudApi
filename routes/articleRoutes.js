import express from "express";
import ArticleModel from "../models/article.js";

const router = express.Router();

router.get("/articles", async (req, res) => {
  try {
    const articles = await ArticleModel.find();
    res.json(articles);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/articles", async (req, res) => {
  const article = new ArticleModel(req.body);
  try {
    await article.save();
    res.status(201).send(article);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.put("/articles/:id", async (req, res) => {
  try {
    const updatedArticle = await ArticleModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedArticle);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.patch("/articles/:id", async (req, res) => {
  try {
    const updatedArticle = await ArticleModel.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
    res.json(updatedArticle);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.delete("/articles/:id", async (req, res) => {
  try {
    await ArticleModel.findByIdAndDelete(req.params.id);
    res.json({ message: 'Artículo eliminado' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;