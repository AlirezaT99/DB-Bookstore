const Router = require('express-promise-router')
const db = require('../db')

const router = new Router()

router.post('/', async (req, res) => {
    let {queryText} = req.body;
    if (queryText.includes('drop')) {
        return res.sendStatus(401)
    }
    const {fields, rows} = await db.query(queryText)
    res.status(200).send({fields: fields.map((obj) => obj.name), rows})
});

module.exports = router
