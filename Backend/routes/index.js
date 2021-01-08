const usersRouter = require('./users');
const commentsRouter = require('./comments');
const productsRouter = require('./products');
const queryRouter = require('./query');

module.exports = app => {
    app.use('/api/users', usersRouter);
    app.use('/api/comments', commentsRouter);
    app.use('/api/products', productsRouter);
    app.use('/api/query', queryRouter);
}
