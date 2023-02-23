const router = require('express').Router();
const { User, Comment, Message } = require('../models');
const withAuth = require('../helpers/auth');

router.get('/', async (req, res) => {
    try {

        const carData = await Comment.findAll({
            include: [
                {
                    model: User,
                    attributes: ['name'],
                },
                {
                    model: Message,
                    attributes: ['id', 'message', 'date_created', 'commentid', 'userid', 'user_name'],
                }
            ],
        });
        
console.log(carData);

        const comments = carData.map((comment) => comment.get({ plain: true }));

        res.render('homepage', {
            comments,
            session_username: req.session.username,
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/login', (req, res) => {

    if (req.session.logged_in) {
      res.redirect('/');
      return;
    }
  
    res.render('login');
  });

router.get('/board/:id', async (req, res) => {
    try {
        const commentData = await Comment.findByPk(req.params.id, {
            include: [
                {
                    model: User,
                    attributes: ['name'],
                },
                {
                    model: Message,
                    attributes: ['id', 'message', 'date_created', 'commentid', 'userid', 'user_name'],
                }
            ],
        });

        console.log(commentData);

        const comment = commentData.get({ plain: true });
        
        res.render('board', {
            ...comment,
            logged_in: req.session.logged_in,
            session_username: req.session.username,

        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/dashboard', withAuth, async (req, res) => {
    try {
        const userData = await User.findByPk(req.session.userid, {
            attributes: { exclude: ['password'] },
            include: [{ model: Comment, attributes: ['id', 'message', 'title', 'date_created', 'user_name'], include: [{ model: Message, attributes: ['id', 'message', 'date_created', 'commentid', 'userid', 'user_name'] }] }],
        });

        const user = userData.get({ plain: true });
        console.log(`aUseeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeer`);
        console.log(user);
        console.log(user.comments.length);
        

        
        console.log(`Testingggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggg`);
            

        res.render('dashboard', {
            ...user,
            session_username: req.session.username,
            session_userid: req.session.userid,
            logged_in: true
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/edit/:id', withAuth, async (req, res) => {
    try {
        const commentData = await Comment.findByPk(req.params.id, {
            include: [
                {
                    model: User,
                    attributes: ['name'],
                },
                {
                    model: Message,
                    attributes: ['id', 'message', 'date_created', 'commentid', 'userid', 'user_name'],
                }
            ],
        });

        console.log(commentData);

        const comment = commentData.get({ plain: true });
        
        res.render('edit', {
            ...comment,
            logged_in: req.session.logged_in,
            session_username: req.session.username,

        });
    } catch (err) {
        res.status(500).json(err);
    }
});






module.exports = router;
