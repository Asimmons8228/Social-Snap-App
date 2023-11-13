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

    console.log(picture)

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
async function likePicture(req, res) {
  const { pictureId } = req.body;
  const userId = req.user._id; // Assuming the user is logged in

  try {
    const picture = await Picture.findById(pictureId);

    if (!picture) {
      return res.status(404).json({ error: 'Picture not found' });
    }

    if (picture.likes.includes(userId)) {
      return res.status(400).json({ error: 'User already liked the picture' });
    }

    picture.likes.push(userId);
    await picture.save();

    return res.redirect('/pictures');
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
}

async function unlikePicture(req, res) {
  const { pictureId } = req.body;
  const userId = req.user._id; // Assuming the user is logged in

  try {
    const picture = await Picture.findById(pictureId);

    if (!picture) {
      return res.status(404).json({ error: 'Picture not found' });
    }

    if (!picture.likes.includes(userId)) {
      return res.status(400).json({ error: 'User has not liked the picture' });
    }

    // Find the index of the user's like and remove it from the array
    const likeIndex = picture.likes.indexOf(userId);
    picture.likes.splice(likeIndex, 1);

    await picture.save();

    return res.redirect('/pictures');
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
}

module.exports = { index, create, new: newPicture, likePicture, unlikePicture };
