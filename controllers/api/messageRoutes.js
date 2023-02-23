const router = require('express').Router();
const { Message } = require('../../models');
const withAuth = require('../../helpers/auth');

router.post('/', withAuth, async (req, res) => {
    //console.log(req.body);

    try {

        const newMessage = await Message.create({
            ...req.body,
            userid: req.session.userid,
            user_name: req.session.username,
        });
        //console.log(newMessage);
        res.status(200).json(newMessage);
    } catch (err) {
        res.status(400).json(err);
    }
});


module.exports = router;