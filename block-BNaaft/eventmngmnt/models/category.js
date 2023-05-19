let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let categorySchema = new Schema(
  {
    types: [{ type: String, required: true }],
    eventId: [{ type: Schema.Types.ObjectId, ref: 'Event' }],
  },
  { timestamps: true }
);

let Category = mongoose.model('Category', categorySchema);

module.exports = Category;
