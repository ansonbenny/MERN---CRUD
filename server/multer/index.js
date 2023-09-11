import { ObjectId } from "mongodb";
import multer from "multer";
import fs from "node:fs/promises";

export default {
  vehicle_imgs: multer?.({
    storage: multer?.diskStorage({
      destination: async (req, file, cb) => {

        if (!req?.body?._id) {
          req.body._id = new ObjectId()?.toHexString?.()
        }

        req.body.upload_id = Date.now()?.toString(16)

        let dir = `./files/vehicles/${req?.body?._id}`

        try {
          await fs?.access(dir);
        } catch (err) {
          await fs?.mkdir(dir, {
            recursive: true,
          });
        }

        cb(null, dir)
      },
      filename: (req, file, cb) => {
        cb(null, `${req?.body?.upload_id}${file?.originalname}`)
      }
    })
  }),
};
