const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const listingSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  image: {
    type: new Schema({
      filename: { type: String },
      url: {
        type: String,
        default:
          "https://unsplash.com/photos/a-view-of-a-mountain-range-with-a-lake-in-the-foreground-ckcEoPdIcIY",
      },
    }),
    default: {
      filename: "default-image",
      url: "https://unsplash.com/photos/a-view-of-a-mountain-range-with-a-lake-in-the-foreground-ckcEoPdIcIY",
    },
  },
  price: Number,
  location: String,
  country: String,

  reviews:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Review",
    
    
    }],
});

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;