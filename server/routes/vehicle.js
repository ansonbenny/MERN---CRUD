import { Router } from "express";
import jwt from "jsonwebtoken";
import user from "../helper/user.js";
import vehicle from "../helper/vehicle.js";
import multer from "../multer/index.js";
import files from "../helper/files.js";
import vahicles from '../samples/vahicles.json' assert {type: "json"}

const router = Router();

const CheckLogged = (req, res, next) => {
    const { token = null } = req?.cookies;

    jwt.verify(token, process.env.JWT_SECRET, async (err, decode) => {
        if (decode?._id?.length === 24) {
            try {
                let userData = await user.get_user(decode?._id);

                if (userData) {
                    req.body.userId = userData?._id?.toString()
                    req.query.userId = userData?._id?.toString()

                    next()
                }
            } catch (err) {
                res.clearCookie("token").status(405).json({
                    status: 405,
                    message: "User not logged",
                });
            }
        } else {
            console.log(err ? `Error : ${err?.name}` : "Something Went Wrong");
            res.clearCookie("token").status(405).json({
                status: 405,
                message: "User not logged",
            });
        }
    });
};

router.get('/get_manufacture', CheckLogged, async (req, res) => {
    try {
        // if data in db
        //let data = await vehicle.get_manufacture()

        let data = vahicles.slice(0, 30)

        res.status(200).json({
            status: 200,
            message: "Success",
            data
        })
    } catch (err) {
        res.status(500).json({
            status: 500,
            message: err
        })
    }
})

router.get('/get_models', CheckLogged, async (req, res) => {
    try {
        // if data in db
        //let data = await vehicle.get_models(req?.query?.manufacture)

        let data = vahicles.filter((obj) => {
            return req?.query?.manufacture?.toLowerCase?.() == obj?.make?.toLowerCase?.()
        })

        res.status(200).json({
            status: 200,
            message: "Success",
            data
        })
    } catch (err) {
        res.status(500).json({
            status: 500,
            message: err
        })
    }
})

router.post('/add_vehicle', CheckLogged, multer.vehicle_imgs.array('file', 20), async (req, res) => {
    req.body.thumbnail = req?.files?.filter?.((obj) => obj?.originalname == req.body.primary)?.[0]

    req.body.files = req?.files?.filter?.((obj) => obj?.originalname !== req.body.primary)

    delete req.body.primary

    try {
        let response = await vehicle?.add_vehicle(req?.body, req?.query?.userId)

        res.status(200).json({
            status: 200,
            message: "Success",
            data: response
        })
    } catch (err) {
        res.status(500).json({
            status: 500,
            message: err
        })
    }
})

router.get('/get_vehicles', CheckLogged, async (req, res) => {
    try {
        let response = await vehicle.getVehicles(req?.query)

        res.status(200).json({
            status: 200,
            message: "Success",
            data: response
        })
    } catch (err) {
        res.status(500).json({
            status: 500,
            message: err
        })
    }
})

router.get("/get_vehicle/:id", CheckLogged, async (req, res) => {
    if (req?.params?.id?.length == 24) {
        try {
            let response = await vehicle.get_vehicle(req?.params?.id, req?.query?.userId)

            res.status(200).json({
                status: 200,
                message: "Success",
                data: response
            })
        } catch (err) {
            res.status(err?.status || 500).json({
                status: err?.status || 500,
                message: err?.message || err
            })
        }
    } else {
        res.status(404).json({
            status: 404,
            message: "Not Found"
        })
    }
})

router.delete('/delete_vehicle/:id', CheckLogged, async (req, res) => {
    if (req?.params?.id?.length == 24) {
        try {
            let response = await vehicle.delete_vehicle(req?.params?.id, req?.query?.userId)

            if (response) {
                files.delete_folder(req?.params?.id)

                res.status(200).json({
                    status: 200,
                    message: "Success",
                    data: response
                })
            }
        } catch (err) {
            res.status(err?.status || 500).json({
                status: err?.status || 500,
                message: err?.message || err
            })
        }
    } else {
        res.status(404).json({
            status: 404,
            message: "Not Found"
        })
    }
})

router.put("/edit_vehicle/", CheckLogged, multer.vehicle_imgs.array("file", 20), async (req, res) => {
    const delete_files = JSON.parse(req?.body?.delete_files);

    if (req?.body?.primary !== 'undefined') {
        req.body.thumbnail = req?.files?.filter?.((obj) => obj?.originalname == req.body.primary)?.[0]
    }

    req.body.files = req?.files?.filter?.((obj) => obj?.originalname !== req.body.primary)

    delete req?.body?.primary
    delete req?.body?.delete_files
    delete req?.body?.file

    try {
        let response = await vehicle.edit_vehicle(req?.body, req?.query?.userId, delete_files)

        if (response) {
            delete_files?.forEach((obj) => {
                files.delete_file(obj?.path)
            })

            res.status(200).json({
                status: 200,
                message: "Success"
            })
        }
    } catch (err) {
        res.status(500).json({
            status: 500,
            message: err
        })
    }
})

export default router;