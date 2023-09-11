import { Router } from 'express'
import { FiveDigit } from '../utils/index.js';
import { sendMail } from '../mail/index.js';
import user from '../helper/user.js';
import jwt from 'jsonwebtoken'

const router = Router()

const CheckLogged = (req, res, next) => {
    const { token = null } = req?.cookies;

    jwt.verify(token, process.env.JWT_SECRET, async (err, decode) => {
        if (decode?._id?.length === 24) {
            try {
                let userData = await user.get_user(decode?._id);

                if (userData) {
                    res.status(208).json({
                        status: 208,
                        message: "Already Logged",
                        data: userData,
                    });
                }
            } catch (err) {
                res.clearCookie("token");
                next();
            }
        } else {
            console.log(err ? `Error : ${err?.name}` : "Something Went Wrong");
            res.clearCookie("token");
            next();
        }
    });
};

router.get("/checkLogged", CheckLogged, (req, res) => {
    res.status(405).json({
        status: 405,
        message: "User not logged",
    });
});

router.post('/register', CheckLogged, async (req, res) => {
    let { email, password } = req?.body

    var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    if (email?.match(validRegex) &&
        password?.length >= 8) {

        email = email?.toLowerCase?.();

        const secret = FiveDigit?.();

        let response;

        try {
            response = await user?.register_request({
                email: `${email}_register`,
                secret,
            });

        } catch (err) {
            if (err?.status) {
                res.status(err.status).json(err);
            } else {
                res.status(500).json({
                    status: 500,
                    message: err,
                });
            }
        } finally {
            if (response) {
                sendMail(
                    {
                        to: email,
                        subject: `Kale Register Verification Code`,
                        text: secret,
                    },
                    (err, done) => {
                        if (err) {
                            console.log(err);
                        } else {
                            console.log(`Email sent: ${done.response}`);
                        }
                    }
                );

                res.status(200).json({
                    status: 200,
                    message: "Register Otp Sented",
                    data: true
                });
            }
        }
    } else {
        res.status(422).json({
            status: 422,
            message: "Enter correct data.",
        });
    }
})

router.post('/register-verify', CheckLogged, async (req, res) => {

    let { email, otp, password } = req?.body;

    var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    if (email?.match(validRegex) &&
        password?.length >= 8 && otp) {

        try {
            let response = await user.register_verify({
                email: `${email}_register`,
                password,
                secret: otp,
            });

            res.status(200).json({
                status: 200,
                message: "Register Completed",
            });
        } catch (err) {
            if (err?.status) {
                res.status(err.status).json(err);
            } else {
                res.status(500).json({
                    status: 500,
                    message: err,
                });
            }
        }
    } else {
        res.status(422).json({
            status: 422,
            message: "Enter correct data.",
        });
    }
})

router.post('/forgot', CheckLogged, async (req, res) => {
    let { email, password } = req?.body

    var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    if (email?.match(validRegex) &&
        password?.length >= 8) {

        email = email?.toLowerCase?.();

        const secret = FiveDigit?.();

        let response;

        try {
            response = await user?.forogt_request({
                email: `${email}_forgot`,
                secret,
            });

        } catch (err) {
            if (err?.status) {
                res.status(err.status).json(err);
            } else {
                res.status(500).json({
                    status: 500,
                    message: err,
                });
            }
        } finally {
            if (response) {
                sendMail(
                    {
                        to: email,
                        subject: `Kale Forgot Verification Code`,
                        text: secret,
                    },
                    (err, done) => {
                        if (err) {
                            console.log(err);
                        } else {
                            console.log(`Email sent: ${done.response}`);
                        }
                    }
                );

                res.status(200).json({
                    status: 200,
                    message: "Register Otp Sented",
                    data: true
                });
            }
        }
    } else {
        res.status(422).json({
            status: 422,
            message: "Enter correct data.",
        });
    }
})

router.put('/forgot-verify', CheckLogged, async (req, res) => {

    let { email, otp, password } = req?.body;

    var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    if (email?.match(validRegex) &&
        password?.length >= 8 && otp) {

        try {
            let response = await user.forgot_verify({
                email: `${email}_forgot`,
                password,
                secret: otp,
            });

            res.status(200).json({
                status: 200,
                message: "Register Completed",
            });
        } catch (err) {
            if (err?.status) {
                res.status(err.status).json(err);
            } else {
                res.status(500).json({
                    status: 500,
                    message: err,
                });
            }
        }
    } else {
        res.status(422).json({
            status: 422,
            message: "Enter correct data.",
        });
    }
})

router.get('/login', CheckLogged, async (req, res) => {
    let { email, password } = req?.query

    var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    if (email?.match(validRegex) &&
        password?.length >= 8) {

        try {
            let response = await user.user_match(email, password)

            let token = jwt.sign(
                {
                    _id: response._id,
                },
                process.env.JWT_SECRET,
                {
                    expiresIn: "24h",
                }
            );

            res.status(200)
                .cookie("token", token, {
                    httpOnly: true,
                    expires: new Date(Date.now() + 86400000),
                }).json({
                    status: 200,
                    message: "Success",
                    data: response
                })
        } catch (err) {
            res?.status?.(err?.status || 500).json({
                status: err?.status || 500,
                message: err?.message || err
            })
        }
    } else {
        res.status(422).json({
            status: 422,
            message: "Enter correct data.",
        });
    }
})

router.get('/logout', (req, res) => {
    res?.clearCookie?.('token')?.status(200).json({ status: 200, message: "Success" })
})

export default router;