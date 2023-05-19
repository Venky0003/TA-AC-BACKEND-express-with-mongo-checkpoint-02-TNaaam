var express = require('express');
var router = express.Router();
let Event = require('../models/event');
let Remark = require('../models/remark');
let Category = require('../models/category');

// use to list all events on single page
router.get('/', (req, res, next) => {
  Category.find({})
    .then((categories) => {
      Event.find({})
        .then((events) => {
          res.render('events', { events, categories });
        })
        .catch((error) => {
          console.log(error);
          if (error) return next(error);
        });
    })
    .catch((error) => {
      console.log(error);
      if (error) return next(error);
    });
});

router.get('/new', (req, res) => {
  Category.find({})
    .then((categories) => {
      // console.log(author);
      // console.log(categories);
      res.render('addEvents', { categories });
    })
    .catch((err) => {
      console.log(err);
    });
});

// post the details of events created on events.ejs
router.post('/', (req, res, next) => {
  Event.create(req.body)
    .then((evnet) => {
      res.redirect('/events');
    })
    .catch((error) => {
      console.log(error);
      if (error) return next(error);
    })
    .catch((error) => {
      console.log(error);
      if (error) return next(error);
    });
});


router.get('/:id', (req, res, next) => {
  let id = req.params.id;
  Event.findById(id)
    .populate('remarks')
    .populate('categories')
    .then((event) => {
      // console.log(event);
      res.render('eventDetails', { event });
    })
    .catch((error) => {
      console.log(error);
      if (error) return next(error);
    });
});


// to edit the the events form
router.get('/:id/edit', (req, res, next) => {
  let id = req.params.id;
  Event.findByIdAndUpdate(id)
    .then((event) => {
      res.render('editFormEvent', { event });
    })
    .catch((error) => {
      console.log(error);
      // if (error) return next(error);
    });
});

// to update the edited
router.post('/:id', (req, res, next) => {
  let id = req.params.id;
  Event.findByIdAndUpdate(id, req.body)
    .then((event) => {
      res.redirect('/events/' + id);
    })
    .catch((error) => {
      console.log(error);
      if (error) return next(error);
    });
});

//to delete the event
router.get('/:id/delete', (req, res, next) => {
  let id = req.params.id;
  Event.findByIdAndDelete(id)
    .then((event) => {
      return Remark.deleteMany({ eventId: event.id })
        .then((event) => {
          res.redirect('/events');
        })
        .catch((err) => {
          if (err) return next(err);
        });
    })
    .catch((err) => {
      if (err) return next(err);
    });
});

// for likes on the article
router.get('/:id/likes', (req, res, next) => {
  let id = req.params.id;
  Event.findByIdAndUpdate(id, { $inc: { likes: 1 } }).then((event) => {
    res.redirect('/events/' + id);
  });
});

// to add remarks
router.post('/:id/remarks', (req, res, next) => {
  let id = req.params.id;
  req.body.eventId = id;
  Remark.create(req.body)
    .then((remark) => {
      Event.findByIdAndUpdate(id, { $push: { remarks: remark._id } }).then(
        (result) => {
          res.redirect('/events/' + id);
        }
      );
    })
    .catch((err) => {
      console.log(err);
      if (err) return next(err);
    });
});

router.get('/category/:categoryId', (req, res, next) => {
  const categoryId = req.params.categoryId;

  // Find events by category ID
  Event.find({ categories: categoryId })
    .populate('categories')
    .then((events) => {
      res.render('eventListByCategory', { events, categoryId });
    })
    .catch((error) => {
      console.log(error);
      next(error);
    });
});

module.exports = router;
