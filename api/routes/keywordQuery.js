var express = require('express');
var router = express.Router();
var mongo = require('../db/mongo');

router.get('/', async (req, res, next) => {
    req.setTimeout(0);
    try {
        let records = await mongo.getNameKeywordQuery(
            req.query.keyword
        );
        console.log("Returning records.");
        res.json(records);
    } catch (err) {
        console.log("ERROR: ", err);
        res.json({ error: err });
    }
});

module.exports = router;