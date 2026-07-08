const express = require("express")
const cookieParser = require("cookie-parser")
const cors = require("cors")

const app = express()

app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true
}))

/* require all the routes here */
const authRouter = require("./routes/auth.routes")
const interviewRouter = require("./routes/interview.routes")


/* using all the routes here */
app.use("/api/auth", authRouter)
app.use("/api/interview", interviewRouter)

app.use((req, res) => {
    res.status(404).json({
        message: "Route not found."
    })
})

app.use((err, req, res, next) => {
    console.error(err)

    if (err.name === "MulterError") {
        const message = err.code === "LIMIT_FILE_SIZE"
            ? "Resume file must be 5MB or smaller."
            : err.message

        return res.status(400).json({ message })
    }

    if (err.name === "CastError") {
        return res.status(400).json({
            message: "Invalid id format."
        })
    }

    if (err.code === 11000) {
        return res.status(400).json({
            message: "Account already exists with this email address or username."
        })
    }

    const statusCode = err.statusCode || 500

    res.status(statusCode).json({
        message: err.message || "Something went wrong."
    })
})

module.exports = app
