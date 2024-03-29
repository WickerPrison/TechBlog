const Posts = require('./posts');
const Comments = require('./comments');

Posts.hasMany(Comments, {
    foreignKey: 'post_id',
    onDelete: 'CASCADE'
})

module.exports = { Posts, Comments };