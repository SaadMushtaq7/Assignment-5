const mongoose = require("mongoose");

const itenaryScheduleSchema = mongoose.Schema({
  facilities: [{ type: String, required: true }],
});
const itenaryScheduleModel = mongoose.model(
  "itenarySchedule",
  itenaryScheduleSchema
);

module.exports = itenaryScheduleModel;
