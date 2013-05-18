if(!/(&|\?)username=/.test(window.location.search)){
  var newSearch = window.location.search;
  if(newSearch !== '' & newSearch !== '?'){
    newSearch += '&';
  }
  newSearch += 'username=' + (prompt('What is your name?') || 'anonymous');
  window.location.search = newSearch;
}

/*
$.ajaxPrefilter(function(settings, _, jqXHR) {
  jqXHR.setRequestHeader("X-Parse-Application-Id", "voLazbq9nXuZuos9hsmprUz7JwM2N0asnPnUcI7r");
  jqXHR.setRequestHeader("X-Parse-REST-API-Key", "QC2F43aSAghM97XidJw8Qiy1NXlpL5LR45rhAVAf");
});
*/

var buddyList = {};
var roomnames = {'messages': 'messages'};
var currentRoom = roomnames['messages'];
var renderMessage = function(user, message) {
  var $newUser = $('<span class="username" />').text('@' + user + ': ');
  if (buddyList[user]) { $newUser.addClass('buddy'); }
  var $newMessages = $('<p />').text(message);
  var $chatMessage = $('<li />').prepend($newUser, $newMessages);
  $('#message').prepend($chatMessage);
  $newUser.on('click', function(e) {
    buddyList[user] = true;
    $(this).addClass('buddy');
  });
};
var polling = setInterval(function(){
  $.get('http://127.0.0.1:8080/classes/' + currentRoom, {order: '-createdAt'}, function(data) {
    data = $.parseJSON(data);
    $('#message').empty();
    console.log(data);
    for (var i = data.results.length-1; i >= 0; i--) {
      renderMessage(data.results[i].username, data.results[i].text);
    }
  });
}, 2000);

$('.chatrooms').on('click', function(e) {
  e.preventDefault();
  var value = $(this).text();
  currentRoom = roomnames[value] = value;
});
$('#addNewRoom').on('click', function(e) {
  e.preventDefault();
  var value = $('#addRoom').val();
  currentRoom = roomnames[value] = value;
  $('.dropdown-menu').append('<li class="chatrooms"><a href="#'+ value +'">'+ value +'</a></li>');
});
$('#submitMessage').on('click', function(e){
  e.preventDefault();
  var text = $('#input').val();
  var message = {
    'username': window.location.search.substr(10),
    'text': text
    // 'roomname': roomname // Optional
    // 'hax': 'alert("hi")' // Optional; used in an extra credit option below
  };
  renderMessage(message.username, message.text);
  $.ajax('http://127.0.0.1:8080/classes/' + currentRoom, {
    type: 'POST',
    data: JSON.stringify(message),
    contentType: 'application/json',
    success: function(data) {
      console.log(data);
    },
    error: function(data) {
      console.log('Failed');
    }
  });
  $('#input').val('');

});