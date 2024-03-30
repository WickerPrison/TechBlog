const Posts = require('./posts');
const Comments = require('./comments');

Posts.hasMany(Comments, {
    foreignKey: 'post_id',
    onDelete: 'CASCADE'
});

Comments.belongsTo(Posts, {
    foreignKey: 'post_id'
});

module.exports = { Posts, Comments };