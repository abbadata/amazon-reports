var express = require('express');
var router = express.Router();
var mongo = require('../db/mongo');

router.get('/:asin', async (req, res, next) => {
    try {
        let item = await mongo.getAsin(
            req.params.asin
        );
        res.json(item);
    } catch (err) {
        console.log("ERROR: ", err);
        res.json({ error: err });
    }
});

module.exports = router;