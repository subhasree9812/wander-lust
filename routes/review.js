const express = require("express");
const router = express.Router({mergeParams: true});
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const Review = require("../models/review.js");
const Listing = require("../models/listing.js");
const{validateReview, isLoggedIn,isReviewAuthor} = require("../middleware.js");



 //Post Review Route
    router.post("/",
        isLoggedIn, validateReview, wrapAsync(async(req,res)=>{
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
    
    
        }));

//Delete Review Route
router.delete("/:reviewid",
    isLoggedIn,
    isReviewAuthor,
     wrapAsync(async (req, res) => {
    let { id, reviewid } = req.params;
    await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewid } });
    await Review.findByIdAndDelete(reviewid);
    req.flash("success", "Review Deleted");
    res.redirect(`/listings/${id}`);
}));

module.exports = router;