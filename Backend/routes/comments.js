const Router = require('express-promise-router')
const db = require('../db')

const router = new Router()

router.get('/', async (req, res) => {
    const {rows} = await db.query('SELECT id, phone_number, publisher, product, comment'
        + ' FROM product_feedback ORDER BY ID')

    res.status(200).send({comments: rows})
});

router.delete('/:id?', async (req, res) => {
    const {id} = req.params;

    await db.query('DELETE FROM product_feedback WHERE ID=$1', [id]);

    return res.sendStatus(204);
});

router.post('/', async (req, res) => {
    let {phoneNumber, productId, comment, rate} = req.body;

    const {rows: products} = await db.query("SELECT * FROM products where ID = $1", [productId]);

    let {publisher, name: productName} = products[0];

    await db.query("INSERT INTO product_feedback (phone_number, publisher, product, comment, rate) VALUES"
        + "($1, $2, $3, $4, $5)", [phoneNumber, publisher, productName, comment, rate])

    res.status(201).send({message: 'feedback submitted successfully.'})
});

module.exports = router
