var express = require('express');
var router = express.Router();
var mongo = require('../db/mongo');

router.get("/:nodeid", async (req, res, next) => {
    req.setTimeout(0);
    console.log("Browsenode: ", req.params.nodeid);
    let itemlist = await mongo.getBrowseNodeProductQuery(req.params.nodeid);
    console.log("Itemlist: ", itemlist);
    res.json(itemlist);
});

module.exports = router;
