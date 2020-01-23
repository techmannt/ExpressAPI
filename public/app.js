let deleteChirp = (id) => {
  $.ajax({
    type: 'DELETE',
    url: `api/chirps/${id}/`
  });

  $('#chirpList').text('');  // Clear out the chirps.
  displayChirps();  // Display an updated list of chirps.
};

let updateChirp = (id) => {
  let newUsername = prompt("Enter a new username");
  let newChirp = prompt("Enter a new chirp");

  $.post(`api/chirps/${id}/`,
    {
      username: newUsername,
      message: newChirp
    }
  );

  $('#chirpList').text('');  // Clear out the chirps.
  displayChirps();  // Display an updated list of chirps.
};

let displayChirps = () => {
  $.get({
    type: 'GET',
    url: 'api/chirps/',
  }, data => {

    for (let key in data) {
      if (key === "nextid") break;
      $('#chirpList').append(`<p><label onclick="deleteChirp(${key})">X</label> <span onclick="updateChirp(${key})">user: ${data[key].username}, message: ${data[key].message}</span></p>`);
    }
  });
};

$('#submitchirp').click(() => {
  $.ajax({
    type: 'POST',
    url: 'api/chirps',
    data: {
      username: $('#username').val(),
      message: $('#message').val()
    }
  });

  $('#chirpList').text('');  // Clear out the chirps.
  displayChirps();  // Display an updated list of chirps.

});
