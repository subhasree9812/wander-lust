const Listing = require("../models/listing");
const Review = require("../models/review");

module.exports.createReviews = async(req,res)=>{
    let {id}=req.params;
    let listing =await Listing.findById(req.params.id);
    let newReview = new Review(req.body.review);
    newReview.author = req.user._id;
    console.log(newReview);
    listing.reviews.push(newReview);

    await newReview.save();
    await listing.save();

    req.flash("success", "New Review Created");
        res.redirect(`/listings/${id}`);
    };

    module.exports.destroyReview = async (req, res) => {
        let { id, reviewid } = req.params;
        await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewid } });
        await Review.findByIdAndDelete(reviewid);
        req.flash("success", "Review Deleted");
        res.redirect(`/listings/${id}`);
    };