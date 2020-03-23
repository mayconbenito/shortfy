const mongoose = require("../config/mongodb");

const RedirectSchema = new mongoose.Schema(
  {
    url: { type: String, required: true },
    code: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Redirect", RedirectSchema);
