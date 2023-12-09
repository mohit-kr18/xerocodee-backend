import express from 'express';
import { prefSchema } from '../Helpers/validation_schema.js';
import Pref from '../Models/Pref.model.js';


const router = express.Router();


router.post("/addPref", async (req, res, next) => {
    try {
        const result = await prefSchema.validateAsync(req.body);
        const isPresent = await Pref.findOne({ userId: result.userId });
        if (isPresent) {
            isPresent.accountType = result.accountType;
            isPresent.accountName = result.accountName;
            isPresent.developmentOptions = result.developmentOptions;
            const savedPref = await isPresent.save();
            return res.json({
                status: "success",
                data: savedPref,
                error: null
            })
        }
        else{
            const pref = new Pref(result);
            const savedPref = await pref.save();
            return res.json({
                status: "success",
                data: savedPref,
                error: null
            })
        }
    } catch (error) {
        next(error);
    }
})


router.get("/getPref/:userId", async (req, res, next) => {
    try {
        const userId = req.params.userId;
        const result = await Pref.findOne({ userId: userId });
        if (result) {
            return res.json({
                status: "success",
                data: result,
                error: null
            })
        }
        else{
            return res.json({
                status: "success",
                data: null,
                error: null
            })
        }
    } catch (error) {
        next(error);
    }
})

export default router;