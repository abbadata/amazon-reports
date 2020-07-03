var express = require('express');
var router = express.Router();
var mongo = require('../db/mongo');


router.get("/:nodeid", async (req, res, next) => {
    let record = await mongo.getBrowseNode(req.params.nodeid);
    console.log("Record: ", record);
    res.json(record);
});

module.exports = router;
