const mongoose = require("mongoose");

const notesSchema = new mongoose.Schema(
  {
    userid: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      default: () => new Date().toJSON().slice(0, 10),
      required: true,
    },
  },
  { timestamps: true }
);

const notesModel = mongoose.model("notes", notesSchema);

module.exports = notesModel;