"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTvShow = exports.updateTvShow = exports.addTvShow = exports.checkUser = exports.addUser = exports.allShows = void 0;
const userShows_1 = __importDefault(require("../models/userShows"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const dotenv_1 = __importDefault(require("dotenv"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
dotenv_1.default.config();
// get tv shows of a user
let allShows = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    let username = request.params.username;
    let shows = yield userShows_1.default.findOne({ username });
    // if there is no user then returning appropiate message
    if (shows === null) {
        response.send({
            message: "failed to fecth shows",
            payload: [],
        });
    }
    else {
        response.send({
            message: "fecthed shows",
            payload: shows.TvShows,
        });
    }
});
exports.allShows = allShows;
// just adding a user with his tv shows as there is no signup page
let addUser = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    let result = yield userShows_1.default.findOne({
        username: request.body.username,
    });
    // if there is no user then we can insert a user
    // and hashing the password for security reasons
    if (result === null) {
        let hashLength = Number(process.env.HASHLENGTH);
        let hashedPassword = yield bcryptjs_1.default.hash(request.body.password, hashLength);
        let userObject = request.body;
        userObject.password = hashedPassword;
        let createUser = yield userShows_1.default.insertMany(userObject);
        response.send({ message: "user created successfully" });
    }
    else {
        response.send({
            message: "user already exists",
        });
    }
});
exports.addUser = addUser;
// api for user to login
let checkUser = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    let userCredObj = request.body;
    let userOfDB = yield userShows_1.default.findOne({
        username: userCredObj.username,
    });
    // if username does not exist then sending invalid user
    if (userOfDB === null) {
        response.send({ message: "Invalid user" });
    }
    else {
        let userExists = yield bcryptjs_1.default.compare(userCredObj.password, userOfDB.password);
        // if password wrong then sending response invalid password
        if (!userExists) {
            response.send({ message: "Invalid password" });
        }
        else {
            // if success using jwt token to know that user is real
            let userToken = process.env.SECRET_KEY;
            let tokenLife = process.env.TOKEN_LIFE;
            let token = jsonwebtoken_1.default.sign({ username: userOfDB.username }, userToken, {
                expiresIn: tokenLife,
            });
            response.send({
                message: "login success",
                payload: token,
                userObj: userOfDB,
            });
        }
    }
});
exports.checkUser = checkUser;
// add a tv show
let addTvShow = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    let username = request.body.username;
    let tvShowDetails = request.body.tvShowDetails;
    // converting show title to lowers case so that if user is adding another
    // tvshow then we can alert user
    // adding tv show based on username and the details need to be added
    tvShowDetails.title = tvShowDetails.title.toLowerCase();
    let addTvShow = yield userShows_1.default.updateOne({ username }, { $push: { TvShows: tvShowDetails } });
    let shows = yield userShows_1.default.findOne({ username });
    if (addTvShow.modifiedCount === 1) {
        response.send({
            message: "tvshow added successfully",
            payload: shows === null || shows === void 0 ? void 0 : shows.TvShows,
        });
    }
    else {
        response.send({
            message: "failed to add show",
        });
    }
});
exports.addTvShow = addTvShow;
//update a tvshow
let updateTvShow = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    let username = request.body.username;
    let tvShowDetails = request.body.tvShowDetails;
    // updating tvshow based on username and tvshow id to update the details
    tvShowDetails.title = tvShowDetails.title.toLowerCase();
    let updateTvShowOfUser = yield userShows_1.default.updateOne({ username, "TvShows._id": tvShowDetails._id }, {
        $set: {
            "TvShows.$.title": tvShowDetails.title,
            "TvShows.$.imgLink": tvShowDetails.imgLink,
            "TvShows.$.streamingApp": tvShowDetails.streamingApp,
            "TvShows.$.rating": tvShowDetails.rating,
            "TvShows.$.review": tvShowDetails.review,
        },
    });
    let shows = yield userShows_1.default.findOne({ username });
    if (updateTvShowOfUser.matchedCount === 1) {
        response.send({ message: "updated successfully", payload: shows === null || shows === void 0 ? void 0 : shows.TvShows });
    }
    else {
        response.send({
            message: "updating show failed",
        });
    }
});
exports.updateTvShow = updateTvShow;
// delete a tvshow
let deleteTvShow = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    let username = request.body.username;
    let tvShowDetails = request.body.tvShowDetails;
    // deleting tvshow based on username and tvshow id to update the details
    let deleteTvShow = yield userShows_1.default.updateOne({ username }, { $pull: { TvShows: { _id: tvShowDetails._id } } });
    let shows = yield userShows_1.default.findOne({ username });
    if (deleteTvShow.modifiedCount === 1) {
        response.send({ message: "deleted successfully", payload: shows === null || shows === void 0 ? void 0 : shows.TvShows });
    }
    else {
        response.send({
            message: "deleting a tvshow failed",
        });
    }
});
exports.deleteTvShow = deleteTvShow;
