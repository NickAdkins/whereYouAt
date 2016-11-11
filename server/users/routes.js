
var controller = require("./controller");
var express = require('express');

// var router = express.Router()
//
// // router.get("/users", controller.index);
// router.get("/users", function (req, res) {
//     res.status(200).end("success");
// });
//
// router.get("/users/:user", controller.retrieve);
//
// // router.get("/users", controller.indexEvent)
//
// router.post("/users", controller.create);
//
// router.put("/users/:user", controller.update);
//
// router.delete("/users", controller.deleteAll);
// router.delete("/users/:user", controller.deleteOne);
//
//
// module.exports = router
var router = {
    index : controller.index,
    retrieve : controller.retrieve,
    deleteOne : controller.deleteOne,
    deleteAll : controller.deleteAll,
    update: controller.update,
    create: controller.create
}

module.exports = router
