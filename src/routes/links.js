const express = require('express');
const router = express.Router();

router.get("/", async(req, res) => {
    await req.getConnection((err, conn) => {
        if(err) {
            console.log(err);
        }
        conn.query('select * from links', (err, dataSelect) => {
            if(err) {
                console.log(err);
            }
            console.log(dataSelect);
            res.render('links/list.hbs', {dataSelect});
        });
    });
});

router.get('/add', (req, res) =>{
    res.render('links/add.hbs')
});

router.post('/add', async (req, res) => {
    const {title, url, description} = req.body;
    const newLink = {
        title,
        url,
        description
    }
    await req.getConnection((err, conn) => {
        if(err) {
            console.log(err);
        }
        conn.query('insert into links set ?', [newLink], (err, data) => {
            if(err) {
                console.log(err);
            }
            res.send('Recibido');
        });
    });
});

module.exports = router;