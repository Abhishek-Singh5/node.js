import express from 'express';
import URL from '../models/url.js';

const staticRouter = express.Router();

staticRouter.get('/', async (req, res) => {
  const urls = await URL.find();
  res.render("home", { urls }); 
});

export default staticRouter;