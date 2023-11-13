var express = require("express");
var router = express.Router();

const picturesCtrl = require("../controllers/pictures");
const ensureLoggedIn = require('../config/ensureLoggedIn');


router.get("/", picturesCtrl.index);

router.get("/new", ensureLoggedIn, picturesCtrl.new);

router.post("/", ensureLoggedIn, picturesCtrl.create);

router.post("/like", ensureLoggedIn, picturesCtrl.likePicture);

router.post("/unlike", ensureLoggedIn, picturesCtrl.unlikePicture);

module.exports = router;
