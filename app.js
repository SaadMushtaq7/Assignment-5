const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const TourModel = require("./models/Tour");
const BookedTourModel = require("./models/BookedTour");
const { MONGOURI } = require("./config/keys");

const app = express();

app.use(express.json());
app.use(cors());

mongoose.connect(MONGOURI);

app.get("/getTours", (req, res) => {
  TourModel.find({}).exec((err, result) => {
    if (err) {
      res.json(err);
    } else {
      res.json(result);
    }
  });
});

app.post("/bookMyTour", async (req, res) => {
  const tour = {
    name: req.body.name,
    email: req.body.email,
    phoneNo: req.body.phoneNo,
    numOfAdults: req.body.numOfAdults,
    numOfChilds: req.body.numOfChilds,
    paymentMethod: req.body.paymentMethod,
    tours: req.body.tourId,
  };
  const myTour = new BookedTourModel(tour);
  await myTour.save();
  res.json(tour);
});

app.get("/getMyTours", (req, res) => {
  BookedTourModel.find({})
    .populate("tours")
    .exec((err, result) => {
      if (err) {
        res.json(err);
      } else {
        res.json(result);
      }
    });
});

app.put("/updateTour/:id", (req, res) => {
  const tour = {
    name: req.body.name,
    email: req.body.email,
    phoneNo: req.body.phoneNo,
    numOfAdults: req.body.numOfAdults,
    numOfChilds: req.body.numOfChilds,
    paymentMethod: req.body.paymentMethod,
    tours: req.body.tourId,
  };
  BookedTourModel.findByIdAndUpdate(req.params.id, tour, { new: true }).exec(
    (err, tour) => {
      if (err) {
        res.status(400).send(err);
      } else {
        res.status(200).json(tour);
      }
    }
  );
});

app.delete("/deleteTour/:id", (req, res) => {
  BookedTourModel.findByIdAndDelete(req.params.id).exec((err, tour) => {
    if (err) {
      res.status(400).send(err);
    } else {
      res.status(200).json(tour);
    }
  });
});

if (process.env.NODE_ENV === "production") {
  const path = require("path");
  app.get("/", (req, res) => {
    app.use(express.static(path.resolve(__dirname, "client", "build")));
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

app.listen(process.env.PORT || 3001, () => {
  console.log("Server running on port 3001");
});
