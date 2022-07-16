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
exports.verifyToken = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
dotenv_1.default.config();
// middleware used to verify user everytime requests
let verifyToken = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    let bearerToken = request.headers.authorization;
    // if there is no token exist then user cannot be given access
    // to do any operations to his data in database
    if (bearerToken === undefined) {
        return response.send({ message: "Unauthorized request" });
    }
    let token = bearerToken.split(" ")[1];
    if (token === "null") {
        return response.send({ message: "Unauthorized request" });
    }
    try {
        // used to verify token by jwt.verify method
        let userToken = process.env.SECRET_KEY;
        jsonwebtoken_1.default.verify(token, userToken);
        next();
    }
    catch (err) {
        return response.send({ message: "Session expired..Relogin to continue" });
    }
});
exports.verifyToken = verifyToken;
