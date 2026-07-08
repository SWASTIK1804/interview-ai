const multer = require("multer")
const path = require("path")

function pdfOnly(req, file, cb) {
    const ext = path.extname(file.originalname).toLowerCase()

    if (file.mimetype === "application/pdf" && ext === ".pdf") {
        return cb(null, true)
    }

    cb(Object.assign(new Error("Only PDF resume files are supported."), { statusCode: 400 }))
}


const upload = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 5 * 1024 * 1024 // 5MB
    },
    fileFilter: pdfOnly
})


module.exports = upload
