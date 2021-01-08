const Router = require('express-promise-router')
const db = require('../db')

const router = new Router()

const isNum = (value) => /^\d+$/.test(value)

router.get('/', async (req, res) => {
    const {rows} = await db.query('SELECT name, email, balance, phone_number FROM users')

    res.status(200).send({users: rows})
});

router.delete('/:id?', async (req, res) => {
    const { id } = req.params;

    await db.query('DELETE FROM users WHERE phone_number=$1', [id]);

    return res.sendStatus(204);
});

router.put('/', async (req, res) => {
    let { phoneNumber, amount } = req.body;
    if (!isNum(amount)) {
        return res.status(400).send({ message: 'url id is not valid' });
    }

    await db.query('UPDATE users SET balance = balance + $1 WHERE phone_number=$2', [amount, phoneNumber]);

    return res.sendStatus(204);
});

router.post('/', async (req, res) => {
    let { name, phone_number, email, balance, password } = req.body;

    if (!isNum(balance) || !name || !phone_number || !email || !password) {
        return res.status(400).send({ message: 'invalid input' });
    }

    const { rows } = await db.query('SELECT * FROM users WHERE phone_number = $1', [phone_number])

    if (rows.length)
        return res.status(409).send({ message: 'phone number already exist.' })

    await db.query("INSERT INTO users (name, email, phone_number, balance, password) VALUES"
        + "($1, $2, $3, $4, crypt($5, gen_salt(\'bf\')))", [name, email, phone_number, balance, password])

    res.status(201).send({ message: 'user has been created.' })
});

module.exports = router
