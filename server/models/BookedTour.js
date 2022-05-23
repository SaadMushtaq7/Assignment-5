const mongoose = require("mongoose");

const myTourSchema = mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  phoneNo: {
    type: String,
  },
  numOfAdults: {
    type: String,
  },
  numOfChilds: {
    type: String,
  },
  paymentMethod: {
    type: String,
  },
  tours: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "tours",
    required: true,
  },
});

const BookedTourModel = mongoose.model("bookedTour", myTourSchema);

module.exports = BookedTourModel;
