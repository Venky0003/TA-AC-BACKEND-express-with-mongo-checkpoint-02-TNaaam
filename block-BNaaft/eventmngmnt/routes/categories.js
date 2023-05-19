var express = require('express');
var router = express.Router();
var Event = require('../models/event');
var Category = require('../models/category');

// to list all the categorys
router.get('/', (req, res, next) => {
  Category.find({})
    .then((categories) => {
    //   console.log(categories);
      res.render('category', { categories: categories });
    })
    .catch((err) => {
      console.log(err);
    });
});

// to add a new category
router.get('/new', (req, res) => {
  res.render('addCategory');
});

// Adding a new category
router.post('/', (req, res, next) => {
  Category.create(req.body)
    .then((category) => {
      res.redirect('/categories');
    })
    .catch((err) => {
      console.log(err);
      if (err) return next(err);
    });
});

module.exports = router;
