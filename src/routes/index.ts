import { Router } from "express";

export const router = Router();

router.get("/", (req, res) => {
    res.send("Hello world!");
});

// Other routes are defined in other files
require("./images");
require("./display");
