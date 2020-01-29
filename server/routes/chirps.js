const express = require('express');
const chirpStore = require('../../chirpstore');
const router = express.Router();

router.get('/:id?', (req, res) => {
  let id = req.params.id;
  if (id) {
    res.json(chirpStore.GetChirp(id));
  } else {
    res.send(chirpStore.GetChirps());
  }

});

router.post('/', (req, res) => {
  chirpStore.CreateChirp({ username: req.body.username, message: req.body.message });
  res.status(200).send('Thanks for creating a chirp!');
});

router.put('/:id/', (req, res) => {
  let id = req.params.id;
  chirpStore.UpdateChirp(id, { username: req.body.username, message: req.body.message }); // Pass in an object to update BOTH the user and the text!
  res.sendStatus(200);
});

router.delete('/:id/', (req, res) => {
  let id = req.params.id;
  chirpStore.DeleteChirp(id);  // Just pass in the ID to delete.
  res.sendStatus(200);
});

module.exports = router;
