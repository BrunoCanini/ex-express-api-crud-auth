const express = require("express");
const router = express.Router();
const { body, checkSchema } = require("express-validator");

const postsController = require("../controllers/posts");
const postCreate = require("../validations/postCreate");

router.get("/", postsController.index);
router.get("/:slug", postsController.show);
router.post("/", checkSchema(postCreate),postsController.store);
router.put("/:slug", postsController.update);
router.delete("/:slug", postsController.destroy);

module.exports = router