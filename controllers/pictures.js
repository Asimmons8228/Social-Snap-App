const Picture = require("../models/picture");


async function index(req, res) {
  const pictures = await Picture.find({})
  res.render("pictures/index", { title: "All Pictures", pictures });
}

async function create(req, res) {

  
  req.body.user = req.user._id;
  const picture = await Picture.create(req.body);
  
  console.log("PICTURE-OBJECT", req.body);
  try {
    await picture.save();
    // profile.pname = req.user.name;
    // const profile = await Profile.create({
    //   pname: req.body.name,
    //   pavatar: req.body.avatar,
    //   user: req.body._id,
    // })
    // const picture = await Picture.create({
    //   piccontent: req.body.piccontent,
    //   caption: req.body.caption,
    //   user: req.body._id,
    // )};
    console.log(picture)
    // Redirect to the new picture's show functionality
    res.redirect('/pictures');
  } catch (err) {
    // Typically some sort of validation error
    console.log(err);
    res.render("pictures/new", { errorMsg: err.message });
  }
}

function newPicture(req, res) {
  res.render("pictures/new", {
    title: "Welcome to SocialSnap!",
    errorMsg: "",
  });
}

module.exports = { index, create, new: newPicture };
