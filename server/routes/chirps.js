const express = require('express');
let router = express.Router();

router.get('/:id', (req, res) => {
  res.send('chirps');
});
