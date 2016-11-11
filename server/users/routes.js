var express = require('express');
var controller = require('"./controller"');
var router = express.Router()

router.get("/users/:user", controller.retrieve);
router.get("/users", controller.index);
// router.get("/users", controller.indexEvent)

router.post("/users", controller.create);

router.put("/users/:user", controller.update);

router.delete("/users/:user", controller.deleteOne);
router.delete("/users", controller.deleteAll);

module.exports = router
