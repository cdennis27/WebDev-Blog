const User = require('./User');
const Comment = require('./Comment');
const Message = require('./Message');



User.hasMany(Comment, {
  foreignKey: 'userid',
  onDelete: 'CASCADE'
});

Comment.belongsTo(User, {
  foreignKey: 'userid'
});

Comment.hasMany(Message, {
  foreignKey: 'commentid',
  onDelete: 'CASCADE'
});

Message.belongsTo(Comment, {
  foreignKey: 'commentid'
});

User.hasMany(Message, {
  foreignKey: 'userid',
  onDelete: 'CASCADE'
});

Message.belongsTo(User, {
  foreignKey: 'userid'
});


module.exports = { User, Comment, Message };