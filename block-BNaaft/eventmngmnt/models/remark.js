let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let remarkSchema = new Schema(
  {
    eventId: { type: Schema.Types.ObjectId, ref: 'Event' },
    title: { type: String, required: true },
    username: String,
    likes: { type: Number, default: 0 },
  },
  { timestamps: true }
);

let Remark = mongoose.model('Remark', remarkSchema);

module.exports = Remark;
