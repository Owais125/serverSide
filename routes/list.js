const router = require('express').Router()
const User = require('../Models/user')
const List = require('../Models/list')

router.post("/addTask", async (req, res) => {
    try {
        const { title, body, id } = req.body
        const existingUser = await User.findById(id)
        if (existingUser) {
            const list = new List({ title, id, body, user: existingUser })
            await list.save().then(() => res.status(200).json({ list }))
            existingUser.list.push(list)
            existingUser.save()
        }
    } catch (error) {
        console.log(error)
    }
})

// UPdate TAsk
router.put("/updateTask/:id", async (req, res) => {
    try {
        
        const { title, body, email } = req.body
        const existingUser = await User.findOne({ email })
        if (existingUser) {
            // const {title,body} = req.body

        const list = await List.findByIdAndUpdate(req.params.id, { title, body })
        await list.save().then(() => res.status(200).json({ message: "Task Upadate" }))
        }
    } catch (error) {
        console.log(error)
    }
})

// Delete TAsk
router.delete("/deleteTask/:id", async (req, res) => {
    try {
        const { title, body, id } = req.body
        const existingUser = await User.findByIdAndUpdate(id, { $pull: { list: req.params.id } })
        if (existingUser) {
            const list = await List.findByIdAndDelete(req.params.id).then(() => res.status(200).json({ message: "Task Has been Delete" }))
        }
    } catch (error) {
        console.log(error)
    }
})

router.get("/getTask/:id", async (req, res) => {
    const list = await List.find({ user: req.params.id }).sort({ createdAt: -1 })
    if (list.length !== 0) {
        res.status(200).json({ list: list })
    } else {
        res.status(400).json({ message: "No Task Available" })
    }
})


module.exports = router