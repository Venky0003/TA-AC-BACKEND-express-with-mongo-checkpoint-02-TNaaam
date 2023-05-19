let mongoose = require('mongoose');
let Schema = mongoose.Schema;
const Category = require('./category');

let eventSchema = new Schema(
  {
    title: { type: String, required: true },
    summary: String,
    host: String,
    start_date: Date,
    end_date: Date,
    categories: [{ type: Schema.Types.ObjectId, ref: 'Category' }],
    location: String,
    likes: { type: Number},
    remarks: [{ type: Schema.Types.ObjectId, ref: 'Remark' }],
  },
  { timestamps: true }
);

let Event = mongoose.model('Event', eventSchema);

module.exports = Event;
