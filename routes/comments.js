var express = require("express");
var router = express.Router();
const commentsCtrl = require("../controllers/comments");
const ensureLoggedIn = require('../config/ensureLoggedIn');

/* GET users listing. */
router.post("/pictures/:id/comments", ensureLoggedIn, commentsCtrl.create);
router.delete('/comments/:id', ensureLoggedIn, commentsCtrl.delete);
router.get('/comments/:id/edit', ensureLoggedIn, commentsCtrl.edit);
router.put('/comments/:id', ensureLoggedIn, commentsCtrl.update);
module.exports = router;
