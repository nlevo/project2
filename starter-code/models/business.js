const mongoose = require("mongoose");
const Schema   = mongoose.Schema;

const businessSchema = new Schema({
  name:  String,
  description:  String,
  phone: Number,
  website: String,
  language: {
    type: String,
    enum : ['English', 'Russian', 'Spanish', 'German', "Mandarin", 'Pilipino'],
    default: "English"
    },
  _owner: { type: Schema.Types.ObjectId, ref: 'User' }, 
  loc: { type: { type: String }, coordinates: [] },
  hours: {
    mon: {open: String, close: String, isClosed: Boolean},
    tue: {open: String, close: String, isClosed: Boolean},
    wed: {open: String, close: String, isClosed: Boolean},
    thu: {open: String, close: String, isClosed: Boolean},
    fri: {open: String, close: String, isClosed: Boolean},
    sat: {open: String, close: String, isClosed: Boolean},
    sun: {open: String, close: String, isClosed: Boolean}
  },
  address: {
    full_address: String,
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
businessSchema.index({ loc: '2dsphere' });
module.exports = Business;

