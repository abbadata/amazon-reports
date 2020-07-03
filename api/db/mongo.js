const MongoClient = require("mongodb").MongoClient;

var db, products, reports, browsenodes;

MongoClient.connect(
    "mongodb://localhost:27017/Amazon",
    { useNewUrlParser: true },
    function (e, client) {
        if (e) {
            console.log(e);
        } else {
            db = client.db(process.env.DB_NAME);
            products = db.collection("products");
            reports = db.collection("reports");
            browsenodes = db.collection("browsenodes");
            console.log("mongo :: connected to database ");
        }
    }
);

exports.getBrowseNode = async function (nodeid) {
    return new Promise(function (resolve, reject) {
        browsenodes.findOne({ _id: Number(nodeid) }, function (err, docs) {
            if (err) {
                reject(err);
            }
            else {
                // get all children and parent name
                browsenodes.findOne({ _id: docs.parent }, function (err2, parent) {
                    if (err2) {
                        reject(err2);
                    }
                    else {
                        docs["parentname"] = parent.name;
                        // Need to get childnodes too
                        browsenodes.find({ parent: docs._id }).toArray(function (err3, children) {
                            if (err3) {
                                reject(err3);
                            }
                            else {
                                docs["children"] = children;
                                resolve(docs);
                            }
                        });
                    }
                });
            }
        });
    });
}

exports.getBrowseNodeProductQuery = async function (nodeid) {
    return new Promise(function (resolve, reject) {
        products
            .find({
                browsenode: Number(nodeid)
            })
            .limit(2000)
            .toArray(function (err, result) {
                if (err) return reject(err);
                return resolve(result);
            });
    });
}

exports.getAsin = async function (asin) {
    return new Promise((resolve, reject) => {
        products
            .findOne({ _id: asin }, function (err, item) {
                err ? reject(err) : resolve(item);
            });
    });
}



exports.getPercentFromList = async function (percent, startDate) {
    return new Promise(function (resolve, reject) {
        let res = products
            .find({
                pflist: { $lt: -60 },
                scandt: { $gt: startDate },
                $or: [
                    { "detail.numAvailable": { $exists: false } },
                    { "detail.numAvailable": { $ne: 1 } },
                ],
            })
            .sort({ pflist: 1 })
            .limit(2000)
            .toArray(function (err, result) {
                if (err) return reject(err);
                return resolve(result);
            });
    });
};



exports.getNameKeywordQuery = async function (keyword) {
    return new Promise(function (resolve, reject) {
        let res = products
            .find({
                name: { '$regex': keyword, '$options': 'i' }
            })
            .sort({ pflast: 1 })
            .limit(3000)
            .toArray(function (err, result) {
                if (err) return reject(err);
                return resolve(result);
            });
    });
};


exports.getReportTime = async function (reportid) {
    return new Promise(function (resolve, reject) {
        let rtime = reports.findOne({ _id: reportid }, function (err, docs) {
            err ? reject(err) : resolve(docs);
        });
    });
};

exports.updateReportTime = async function updateReportTime(reportid) {
    let updateObj = [
        {
            $addFields: {
                prevdate: "$date",
                date: new Date(),
            },
        },
    ];
    await reports.updateOne({ _id: reportid }, updateObj, { upsert: true });
}

