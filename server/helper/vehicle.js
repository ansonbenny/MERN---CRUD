import { db } from '../config/config.js'
import collections from '../config/collections.js';
import { ObjectId } from 'mongodb';

export default {
    get_manufacture: () => {
        return new Promise(async (resolve, reject) => {
            try {
                let res = db.collection(collections.MODELS).find().limit(20).toArray()

                resolve(res)
            } catch (err) {
                console.log(err)
                reject(err)
            }
        })
    },
    get_models: (manufacture) => {
        return new Promise(async (resolve, reject) => {
            try {
                let res = db.collection(collections.MODELS).find({
                    make: manufacture
                }).limit(20).toArray()

                resolve(res)
            } catch (err) {
                console.log(err)
                reject(err)
            }
        })
    },
    add_vehicle: ({ _id, ...details }, userId) => {
        return new Promise(async (resolve, reject) => {
            try {
                let res = await db.collection(collections.VEHICLES).insertOne({
                    _id: new ObjectId(_id),
                    userId,
                    ...details
                })

                resolve(res)
            } catch (err) {
                reject(err)
            }
        })
    },
    getVehicles: ({ search, userId, offset = 0, sort }) => {
        return new Promise(async (resolve, reject) => {
            if (sort == 'recent') {
                sort = {
                    _id: 1
                }
            } else if (sort == "low") {
                sort = {
                    price: 1
                }
            } else {
                sort = {
                    price: -1
                }
            }

            try {
                let res = await db.collection(collections.VEHICLES).aggregate([{
                    $lookup: {
                        from: collections.VEHICLES,
                        pipeline: [{
                            $match: {
                                name: {
                                    $regex: search,
                                    $options: "i"
                                },
                                userId
                            }
                        }],
                        as: "normal"
                    }
                }, {
                    $group: {
                        _id: 1,
                        normal: {
                            $first: "$normal"
                        }
                    }
                },
                {
                    $lookup: {
                        from: collections.VEHICLES,
                        pipeline: [{
                            $match: {
                                manufacture: {
                                    $regex: search,
                                    $options: "i"
                                },
                                userId
                            }
                        }],
                        as: "manufacture"
                    }
                }, {
                    $lookup: {
                        from: collections.VEHICLES,
                        pipeline: [{
                            $match: {
                                model: {
                                    $regex: search,
                                    $options: "i"
                                },
                                userId
                            }
                        }],
                        as: "model"
                    }
                }, {
                    $project: {
                        _id: 1,
                        vehicles: {
                            $concatArrays: ["$normal", "$manufacture", "$model"]
                        }
                    }
                },
                {
                    $unwind: "$vehicles"
                }, {
                    $group: {
                        _id: 1,
                        vehicles: {
                            $addToSet: {
                                _id: "$vehicles._id",
                                name: "$vehicles.name",
                                thumbnail: "$vehicles.thumbnail",
                                files: "$vehicles.files",
                                available: "$vehicles.available",
                                price: {
                                    $toInt: "$vehicles.price"
                                }
                            }
                        }
                    }
                }, {
                    $unwind: "$vehicles"
                }, {
                    $project: {
                        _id: "$vehicles._id",
                        name: "$vehicles.name",
                        thumbnail: "$vehicles.thumbnail",
                        files: "$vehicles.files",
                        available: "$vehicles.available",
                        price: "$vehicles.price"
                    }
                }, {
                    $sort: {
                        ...sort
                    }
                }, {
                    $group: {
                        _id: 1,
                        count: {
                            $sum: 1
                        },
                        vehicles: {
                            $push: {
                                _id: "$_id",
                                name: "$name",
                                thumbnail: "$thumbnail",
                                files: "$files",
                                available: "$available",
                                price: "$price"
                            }
                        }
                    }
                }, {
                    $unwind: "$vehicles"
                }, {
                    $skip: parseInt(offset)
                }, {
                    $limit: 15
                }, {
                    $group: {
                        _id: 1,
                        count: {
                            $first: "$count"
                        },
                        vehicles: {
                            $push: "$vehicles"
                        }
                    }
                }]).toArray()

                resolve(res?.[0] || {})
            } catch (err) {
                reject(err)
            }
        })
    },
    get_vehicle: (_id, userId) => {
        return new Promise(async (resolve, reject) => {
            try {
                let res = await db.collection(collections.VEHICLES).findOne({
                    _id: new ObjectId(_id),
                    userId
                })

                if (res) {
                    resolve(res)
                } else {
                    reject({
                        status: 404,
                        message: "Not Found"
                    })
                }
            } catch (err) {
                reject(err)
            }
        })
    },
    delete_vehicle: (_id, userId) => {
        return new Promise(async (resolve, reject) => {
            try {
                let res = await db.collection(collections.VEHICLES).deleteOne({
                    _id: new ObjectId(_id),
                    userId
                })

                if (res?.deletedCount >= 1) {
                    resolve(res)
                } else {
                    reject({
                        status: 500,
                        message: "Delete Failed"
                    })
                }
            } catch (err) {
                reject(err)
            }
        })
    },
    edit_vehicle: ({ _id, files, ...details }, userId, delete_files) => {
        return new Promise(async (resolve, reject) => {
            try {
                let res = await db.collection(collections.VEHICLES).updateOne({
                    _id: new ObjectId(_id),
                    userId
                }, {
                    $set: details
                })

                await db.collection(collections.VEHICLES).updateOne({
                    _id: new ObjectId(_id),
                    userId
                }, {
                    $push: {
                        files: {
                            $each: files
                        }
                    }
                })

                await db.collection(collections.VEHICLES).updateOne({
                    _id: new ObjectId(_id),
                    userId
                }, {
                    $pull: {
                        files: {
                            $in: delete_files
                        }
                    }
                })

                resolve(res)
            } catch (err) {
                reject(err)
            }
        })
    }
}
