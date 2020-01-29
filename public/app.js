let deleteChirp = (id) => {
  $.ajax({
    type: 'DELETE',
    url: `/api/chirps/${id}/`
  })
  .then($('#chirpList').text(''))  // Clear out the chirps.
  .then(displayChirps());  // Display an updated list of chirps.
};

let updateChirp = (id) => {
  let newUsername = prompt("Enter a new username");
  let newChirp = prompt("Enter a new chirp");

  $.ajax({
    type: 'PUT',
    url: `/api/chirps/${id}/`,
    data: {
      username: newUsername,
      message: newChirp
    }
  })
  .then($('#chirpList').text(''))  // Clear out the chirps.
  .then(displayChirps());  // Display an updated list of chirps.
};

let displayChirps = () => {
  $.get({
    type: 'GET',
    url: '/api/chirps/',
  }, data => {

    for (let key in data) {
      if (key === "nextid") break;
      $('#chirpList').append(`<p><label onclick="deleteChirp(${key})">X</label> <span onclick="updateChirp(${key})">user: ${data[key].username}, message: ${data[key].message}</span></p>`);
    }
  });
};

displayChirps();

$('#submitchirp').click(() => {
  $.ajax({
    type: 'POST',
    url: '/api/chirps',
    data: {
      username: $('#username').val(),
      message: $('#message').val()
    }
  })
  .then(res => console.log(res))
  .then($('#chirpList').text(''))  // Clear out the chirps.
  .then(displayChirps());  // Display an updated list of chirps.
});
