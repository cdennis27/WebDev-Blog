const router = require('express').Router();
const userRoutes = require('./userRoutes');
const commentRoutes = require('./commentRoutes');
const messageRoutes = require('./messageRoutes');

//api routes
router.use('/users', userRoutes);
router.use('/comments', commentRoutes);
router.use('/messages', messageRoutes);

module.exports = router;