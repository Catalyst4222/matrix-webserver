import { access } from "fs/promises";
import { router } from ".";
import { matrix } from "../utils/matrix";
import { loadGif, loadPng } from "../utils/image";


const currentImage = null;


router.get("/display", (req, res) => {
    

    return res.status(501).send();
});

router.post("/display", async (req, res) => {
    if (!req.query.name) {
        return res.status(400).send();
    }

    try {
        await access(`src/images/${req.query.name}`);
    } catch (e) {
        return res.status(404).send();
    }

    const gif = await loadPng(`src/images/${req.query.name}`);
    console.log(gif);


    return res.status(501).send();
});