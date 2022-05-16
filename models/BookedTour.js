const mongoose = require("mongoose");

const myTourSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phoneNo: {
    type: String,
    required: true,
  },
  numOfAdults: {
    type: Number,
    required: true,
  },
  numOfChilds: {
    type: Number,
    required: true,
  },
  paymentMethod: {
    type: String,
    required: true,
  },
  tours: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "tours",
    required: true,
  },
});

const BookedTourModel = mongoose.model("bookedTour", myTourSchema);

module.exports = BookedTourModel;
