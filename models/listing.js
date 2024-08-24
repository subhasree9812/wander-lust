const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const listingSchema = new Schema({
    title: {
        type:String,
        required: true,
    },
    description: String,
    image:{
       type:String,
       default:
        "https://unsplash.com/photos/a-view-of-a-mountain-range-with-a-lake-in-the-foreground-ckcEoPdIcIY",
       set: (v) => 
        v === ""
        ? "https://unsplash.com/photos/a-view-of-a-mountain-range-with-a-lake-in-the-foreground-ckcEoPdIcIY"
        : v,
    },
    
    price: Number,
    location: String,
    country: String,
});

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;