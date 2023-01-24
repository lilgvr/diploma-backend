import express, { Router } from "express";
import path from "path";
import { UploadedFile } from "express-fileupload";

const router: Router = express.Router();
const { PROJECT_ROOT } = require('../../../app.config');

router.post('/avatar', (req, res) => {
    if (!req.files) return res.status(400).json({ status: 400, message: "No files was uploaded" });

    const file = req.files.avatarImage as UploadedFile;

    const imgPath = path.join(PROJECT_ROOT, '/static/images/avatars', file.name);

    file.mv(imgPath, err => {
        if (err) return res.status(500).json({ status: 500, message: err.message });

        res.json({
            uploaded: true,
            url: `${ process.env.ROOT_URL }/static/images/avatars/${ file.name }`,
            md5: file.md5
        });
    })
});

router.post('/poster', (req, res) => {
    if (!req.files) return res.status(400).json({ uploaded: false, error: "No files was uploaded" });

    const file = req.files.posterImage as UploadedFile;

    const imgPath = path.join(PROJECT_ROOT, '/static/images/posters', file.name);

    file.mv(imgPath, err => {
        if (err) return res.status(500).json({ status: 500, message: err.message });

        res.json({
            uploaded: true,
            url: `${ process.env.ROOT_URL }/static/images/posters/${ file.name }`,
            md5: file.md5
        });
    })
});

module.exports = router;
