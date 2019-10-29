const express = require('express');
const router = express.Router();

router.get("/", (req, res) => {
    res.send("<a href='links/add'>Para ir al formulario de links, da click aqui</a>");
});

module.exports = router;