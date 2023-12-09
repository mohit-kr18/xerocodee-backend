import express from "express";
import morgan from "morgan";
import cors from "cors";
import createError from "http-errors";
import AuthRoute from './Routes/Auth.route.js';
import PrefRoute from './Routes/prefs.route.js';
import './Helpers/init_mongodb.js';
import { verifyAccessToken } from "./Helpers/jwt_helper.js";
import User from "./Models/User.model.js";


const app = express();
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get('/',verifyAccessToken, async(req, res, next) => {
    console.log(req.payload);
    const user = await User.findById(req.payload.aud)
    user.password = undefined;
    const userdata = {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
    }
    res.json(userdata);
});

app.use('/api/auth', AuthRoute);
app.use('/api/prefs', PrefRoute)

app.use(async (req,res,next)=>{
    next(createError.NotFound());
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.send({
        error : {
            status : error.status || 500,
            message : error.message || "Internal Server Error"
        }
    })
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});