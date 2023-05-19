var express = require('express');
var router = express.Router();
var Event = require('../models/event');
var Remark = require('../models/remark');

// to edit the remarks finding it and renedering it to the edit page
router.get('/:id/edit', (req, res, next) => {
  let id = req.params.id;
  Remark.findById(id)
    .then((remark) => {
      res.render('editRemarks', { remark });
    })
    .catch((err) => {
      if (err) return next(err);
    });
});

// uodating the edited form
router.post('/:id', (req, res, next) => {
  let id = req.params.id;

  Remark.findByIdAndUpdate(id, req.body)
    .then((remark) => {
      res.redirect('/events/' + remark.eventId);
    })
    .catch((error) => {
      console.log(error);
      if (error) return next(error);
    });
});

// to delete remarks by using id
router.get('/:id/delete', (req, res, next) => {
  let remarkId = req.params.id;
  Remark.findByIdAndDelete(remarkId)
    .then((remark) => {
      Event.findByIdAndUpdate(remark.eventId, {
        $pull: { remarks: remark._id },
      })
        .then((event) => {
          res.redirect('/events/' + remark.eventId);
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

// likes on the remarks
router.get('/:id/likes', (req, res, next) => {
  let remarkId = req.params.id;
  Remark.findByIdAndUpdate(remarkId, { $inc: { likes: 1 } })
    .then((remark) => {
      res.redirect('/events/' + remark.eventId);
    })
    .catch((err) => {
      console.log(err);
      next(err);
    });
});

module.exports = router;
