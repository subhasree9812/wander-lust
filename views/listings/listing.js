const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./review.js");

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

listingSchema
.post("findOneAndDelete", async(listing) =>{
  if(listing) {
    await Review.deleteMany({_id : {$in:listing.reviews}})
  }
})
const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;