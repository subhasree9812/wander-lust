const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../models/listing.js");
const{isLoggedIn, isOwner,validateListing} = require("../middleware.js");
const listingController = require("../controllers/listings.js");
const multer = require('multer');
const{storage}=require("../cloudConfig.js");
const upload = multer({storage});


router
.route("/")
.get( wrapAsync(listingController.index))
.post(
    isLoggedIn,
     upload.single('listing[image]'),
     validateListing, 
    wrapAsync(listingController.createListing));
 

    //New Route
    router.get("/new",isLoggedIn, listingController.renderNewForm);

    router
    .route("/:id")
    .get(wrapAsync(listingController.showListing))
    .put(
        isLoggedIn,
        isOwner,
        validateListing,
        wrapAsync(listingController.updateListing))
    .delete(
        isLoggedIn,
        isOwner,
        wrapAsync(listingController.destroyListing));;
  

    //Edit Route
    module.exports.renderEditForm = async (req, res) => {
        let { id } = req.params;
        const listing = await Listing.findById(id);
        if (!listing) {
          req.flash("error", "Listing you requested for does not exist.");
          res.redirect("/listing");
        }
        let originalImageUrl = listing.image.url;
        originalImageUrl = originalImageUrl.replace("/upload", "/upload/w_150");
        res.render("listings/edit.ejs", { listing,originalImageUrl });
      };
   
    module.exports = router;
    