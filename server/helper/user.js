import { db } from '../config/config.js'
import collections from '../config/collections.js';
import bcrypt from 'bcrypt'
import { ObjectId } from 'mongodb';

export default {
    register_request: (details) => {
        return new Promise(async (resolve, reject) => {
            let response;

            try {
                await db
                    .collection(collections.TEMP)
                    .createIndex({ email: 1 }, { unique: true });

                await db
                    .collection(collections.TEMP)
                    .createIndex({ expireAt: 1 }, { expireAfterSeconds: 3600 });

                let check = await db.collection(collections.USERS).findOne({
                    email: details?.email?.replace?.("_register", ""),
                });

                if (!check) {
                    response = await db.collection(collections.TEMP).insertOne({
                        ...details,
                        expireAt: new Date(),
                    });
                } else {
                    reject({
                        status: 422,
                        message: "Already Registered Email",
                    });
                }
            } catch (err) {
                if (err?.code === 11000) {
                    response = await db
                        .collection(collections.TEMP)
                        .findOneAndUpdate(
                            {
                                email: details?.email,
                            },
                            {
                                $set: {
                                    ...details,
                                    expireAt: new Date(),
                                },
                            }
                        )
                        .catch((err_2) => {
                            reject(err_2);
                        });

                } else {
                    reject(err);
                }
            } finally {
                if (response) {
                    if (response?.insertedId) {
                        resolve({ _id: response.insertedId.toString() });
                    } else if (response?._id) {
                        resolve({ _id: response?._id.toString() });
                    }
                }
            }
        });
    },
    register_verify: (details) => {
        return new Promise(async (resolve, reject) => {
            let response;

            try {
                await db
                    .collection(collections.USERS)
                    .createIndex({ email: 1 }, { unique: true });

                let check = await db.collection(collections.USERS).findOne({
                    email: details?.email?.replace?.("_register", ""),
                });

                if (!check) {
                    let temp = await db.collection(collections.TEMP).findOne({
                        email: details?.email,
                        secret: details?.secret,
                    });

                    if (temp) {
                        delete details.secret;

                        details.password = await bcrypt.hash(details?.password, 10)

                        response = await db.collection(collections.USERS).insertOne({
                            ...details,
                            email: details.email.replace("_register", ""),
                        });
                    } else {
                        reject({ status: 422, message: "Wrong Verification Details" });
                    }
                } else {
                    reject({
                        status: 422,
                        message: "Already Registered Email",
                    });
                }
            } catch (err) {
                if (err?.code === 11000) {
                    reject({
                        status: 422,
                        message: "Already Registered Email",
                    });
                } else {
                    reject(err);
                }
            } finally {
                if (response) {
                    await db
                        .collection(collections.TEMP)
                        .deleteOne({
                            email: details?.email,
                        })
                        .catch((err) => {
                            console.log("Temp Delete Error : ", err);
                        });
                    resolve(response);
                }
            }
        });
    },
    forogt_request: (details) => {
        return new Promise(async (resolve, reject) => {
            let response;

            try {
                await db
                    .collection(collections.TEMP)
                    .createIndex({ email: 1 }, { unique: true });

                await db
                    .collection(collections.TEMP)
                    .createIndex({ expireAt: 1 }, { expireAfterSeconds: 3600 });

                let check = await db.collection(collections.USERS).findOne({
                    email: details?.email?.replace?.("_forgot", ""),
                });

                if (check) {
                    response = await db.collection(collections.TEMP).insertOne({
                        ...details,
                        expireAt: new Date(),
                    });
                } else {
                    reject({
                        status: 422,
                        message: "Email Not Registered.",
                    });
                }
            } catch (err) {
                if (err?.code === 11000) {
                    response = await db
                        .collection(collections.TEMP)
                        .findOneAndUpdate(
                            {
                                email: details?.email,
                            },
                            {
                                $set: {
                                    ...details,
                                    expireAt: new Date(),
                                },
                            }
                        )
                        .catch((err_2) => {
                            reject(err_2);
                        });

                } else {
                    reject(err);
                }
            } finally {
                if (response) {
                    if (response?.insertedId) {
                        resolve({ _id: response.insertedId.toString() });
                    } else if (response?._id) {
                        resolve({ _id: response?._id.toString() });
                    }
                }
            }
        });
    },
    forgot_verify: (details) => {
        return new Promise(async (resolve, reject) => {
            let response;

            try {
                await db
                    .collection(collections.USERS)
                    .createIndex({ email: 1 }, { unique: true });

                let check = await db.collection(collections.USERS).findOne({
                    email: details?.email?.replace?.("_forgot", ""),
                });

                if (check) {
                    let temp = await db.collection(collections.TEMP).findOne({
                        email: details?.email,
                        secret: details?.secret,
                    });

                    if (temp) {
                        delete details.secret;

                        details.password = await bcrypt.hash(details?.password, 10)

                        response = await db.collection(collections.USERS).updateOne({
                            email: details.email.replace("_forgot", "")
                        }, {
                            $set: {
                                password: details?.password
                            }
                        });
                    } else {
                        reject({ status: 422, message: "Wrong Verification Details" });
                    }
                } else {
                    reject({
                        status: 422,
                        message: "Email Not Registered.",
                    });
                }
            } catch (err) {
                reject(err);
            } finally {
                if (response) {
                    await db
                        .collection(collections.TEMP)
                        .deleteOne({
                            email: details?.email,
                        })
                        .catch((err) => {
                            console.log("Temp Delete Error : ", err);
                        });
                    resolve(response);
                }
            }
        });
    },
    user_match: (email, password) => {
        return new Promise(async (resolve, reject) => {
            try {
                let res = await db.collection(collections.USERS).findOne({
                    email
                })

                if (res) {
                    bcrypt.compare(password, res?.password, (err, result) => {
                        if (result) {
                            delete res?.password;

                            resolve(res)
                        } else {
                            reject({ status: 422, message: "Wrong Password or Email" })
                        }
                    })
                } else {
                    reject({ status: 404, message: "Wrong Password or Email" })
                }
            } catch (err) {
                reject(err)
            }
        })
    },
    get_user: (_id) => {
        return new Promise(async (resolve, reject) => {
            try {
                let res = await db.collection(collections.USERS).findOne({
                    _id: new ObjectId(_id)
                })

                if (res) {
                    resolve(res)
                } else {
                    reject({ status: 422, message: "Not Found" })
                }
            } catch (err) {
                reject(err)
            }
        })
    }
}