const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const listingSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  image: {
    url: {
      type: String,
      default: "https://images.pexels.com/photos/2476632/pexels-photo-2476632.jpeg",
      set: (v) => v === ""
        ? "https://images.pexels.com/photos/2476632/pexels-photo-2476632.jpeg"
        : v,
    },
    filename: {
      type: String,
      default: "filename"
    },
  },
  price: Number,
  location: String,
  country: String,
  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: "Review",
    },
  ]
});

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;