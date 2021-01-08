const Router = require('express-promise-router')
const db = require('../db')

const router = new Router()

const isNum = (value) => /^\d+$/.test(value)

router.get('/', async (req, res) => {
    const {rows} = await db.query('SELECT id, name, publisher, price, publish_date FROM products ORDER BY ID')

    res.status(200).send({products: rows})
});

router.post('/', async (req, res) => {
    let {name, type, subject, price, publisher} = req.body;
    if (!isNum(price) || !name || !type || !subject || !publisher) {
        return res.status(400).send({message: 'invalid input'});
    }

    const {rows} = await db.query('SELECT * FROM products WHERE publisher = $1 AND name = $2',
        [publisher, name])

    if (rows.length)
        return res.status(409).send({message: 'product already exist.'})

    await db.query("INSERT INTO products (name, type, subject, price, publisher, publish_date) VALUES"
        + "($1, $2, $3, $4, $5, current_date)", [name, type, subject, price, publisher])

    res.status(201).send({message: 'product has been created.'})
});

module.exports = router
