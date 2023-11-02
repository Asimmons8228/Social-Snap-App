const Picture = require("../models/picture");


module.exports = {
  create,
  delete: deleteReview,
  edit,
  update
};

async function create(req, res) {
  console.log(req.body)
  const picture = await Picture.findById(req.params.id);
  req.body.user= req.user._id;
  req.body.userAvatar= req.user.avatar;
  req.body.userName= req.user.name;
  console.log(req.body);
  picture.comments.push(req.body);
  try {
        await picture.save();
    // const comment = await Comment.create({
    //   content: req.body.content,
    //   date: req.body.date,
    //   user: req.user._id,
  } catch (err) {
    console.log(err);
  }
  // Step 5:  Respond to the Request (redirect if data has been changed)
  res.redirect(`/pictures`);
}

async function deleteReview(req, res) {
  // Note the cool "dot" syntax to query on the property of a subdoc
  const picture = await Picture.findOne({ 'comments._id': req.params.id, 'comments.user': req.user._id });
  // Rogue user!
  if (!picture) return res.redirect('/pictures');
  // Remove the review using the remove method available on Mongoose arrays
  picture.comments.remove(req.params.id);
  // Save the updated movie doc
  await picture.save();
  // Redirect back to the movie's show view
  res.redirect("/pictures");
}

async function edit(req, res) {

  const picture = await Picture.findOne({ 'comments._id': req.params.id });

  const comment = picture.comments.id(req.params.id);

  res.render('comments/edit', {comment});
}

async function update(req, res) {
  // Note the cool "dot" syntax to query on the property of a subdoc
  const picture = await Picture.findOne({ 'comments._id': req.params.id });

  const commentSubdoc = picture.comments.id(req.params.id);
  // Ensure that the comment was created by the logged in user
  if (!commentSubdoc.user.equals(req.user._id)) return res.redirect(`/pictures/${picture._id}`);
  // Update the text of the comment
  commentSubdoc.content = req.body.content;
  try {
    await picture.save();
  } catch (e) {
    console.log(e.message);
  }
  res.redirect(`/pictures`);
}
