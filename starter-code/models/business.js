const mongoose = require("mongoose");
const Schema   = mongoose.Schema;

const businessSchema = new Schema({
  name:  String,
  description:  String,
  cuisine: [String],
  phone: Number,
  website: String,
  language: [String],
  _owner: { type: Schema.Types.ObjectId, ref: 'User' }, 
  hours: {
    mon: {open: Number, close: Number, isClosed: Boolean},
    tue: {open: Number, close: Number, iClosed: Boolean},
    wed: {open: Number, close: Number, isClosed: Boolean},
    thu: {open: Number, close: Number, isClosed: Boolean},
    fri: {open: Number, close: Number, isClosed: Boolean},
    sat: {open: Number, close: Number, isClosed: Boolean},
    sun: {open: Number, close: Number, isClosed: Boolean}
  },
  address: {
    street_num: Number,
    street_name: String,
    city: String,
    state: String,
    zip: Number
  },
  category: {
    type: String,
    enum : ['Restaurant', 'Lawyer', 'Doctor']
    },
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at"
      }
  }
);

const Business = mongoose.model("Business", businessSchema);

module.exports = Business;

