import multer from "multer";
import SharpMulter from "sharp-multer";
import { readdir } from "fs/promises";

import { router } from ".";


const storage = SharpMulter({
    destination: function (req, file, cb) {
        cb(null, "src/images"); // Specify the destination folder for uploaded files
    },
    filename: function (name, options, req) {
        // console.log(req.query, cb);
        return req.query?.name?.toString?.() || name;
    },
    imageOptions: {
        fileFormat: "png",
        resize: {
            height: 32,
            width: 64,
            resizeMode: "inside"
        }
    }
});
  
const upload = multer({ storage: storage });


/* Get all image names */
router.get("/images", async (req, res) => {
    const files = await readdir("src/images");
    res.json(files);
});


/* Get an image by its name */
router.get("/image", async (req, res) => {
    if (!req.query.name) {
        return res.status(404).send();
    }

    res.sendFile(`${req.query.name}`, {root: "src/images"});
});


/* Upload a new file */
router.post("/image", upload.single("file"), (req, res) => {
    if (!req.file) {
        return res.status(400).send();
    }
    res.status(201).send(); 
});

// TODO remove file