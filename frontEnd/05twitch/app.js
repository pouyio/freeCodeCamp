var usersOnline = [];
var usersNotOnline = [];
var baseURL = "https://wind-bow.glitch.me/twitch-api";
var users = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas"];

function getInformation() {
  users.forEach(function(user) {
    $.getJSON(baseURL + "/streams/" + user).success(function(data) {
      var obj = {};
      if (data.stream !== null) {
        obj = createObj(data.stream.channel);
        obj.online = true;
        usersOnline.push(obj);
        showUser(obj);

      } else {
        $.getJSON(baseURL + "/channels/" + user).success(function(data) {
          obj = createObj(data);
          obj.online = false;
          usersNotOnline.push(obj);
          showUser(obj);
        });
      }
    });
  });

  function createObj(obj) {
    var object = {};
    object.name = obj.name;
    object.displayName = obj.display_name;
    if (obj.logo === null) {
      object.logo = "http://la-af.com/wp-content/uploads/instructors/placeholder.png";
    } else {
      object.logo = obj.logo;
    }
    if (obj.status === null) {
      object.status = "No description";
    } else {
      object.status = obj.status;
    }
    object.url = obj.url
    return object;
  }

  function showUser(user) {
    var str1, str2;
    if (user.online) {
      str1 = "online";
      str2 = "done";
    } else {
      str1 = "offline";
      str2 = "not_interested";
    }

    var li = "<li id=\"" + user.name + "\" class=\"collection-item avatar " + str1 + "\">";
    var img = "<img src=\"" + user.logo + "\" class=\"circle\">";
    var span = "<span class=\"title\"><a target=\"_blank\" href=\"" + user.url + "\">" + user.displayName + "</a></span>";
    var p = "<p>" + user.status + "</p>";
    var close = "</img></li>";
    var a = "<a class=\"secondary-content " + str1 + "\"><i class=\"material-icons\">" + str2 + "</i></a>";
    var content = li + img + span + p + a + close;
    $('ul.collection').append(content);
  }
}

function changeTab(e) {
  switch (e.currentTarget.id) {
    case "all":
      $('li.collection-item').show("slide", {
        direction: "left"
      });
      $('li.collection-item.ocult').removeClass("ocult");
      break;
    case "online":
      $('li.collection-item.offline').hide("slide", {
        direction: "right"
      }).addClass("ocult");
      $('li.collection-item.online.ocult').show("slide", {
        direction: "left"
      }).removeClass("ocult");
      break;
    case "offline":
      $('li.collection-item.online').hide("slide", {
        direction: "right"
      }).addClass("ocult");
      $('li.collection-item.offline.ocult').show("slide", {
        direction: "left"
      }).removeClass("ocult");
      break;
    default:
  }
}

function searchHandle() {
  var value = $(this).val().toLowerCase();
  $('li.collection-item').each(function() {
    var id = $(this).attr('id');
    if (id.indexOf(value) === -1) {
      $('li#' + id).addClass("hide");
    } else {
      $('li#' + id).removeClass("hide");
    }
  });
}

$(document).ready(function() {
  // Materialize Initialization
  $('ul.tabs').tabs();
  $('.materialboxed').materialbox();

  getInformation();

  // Tabs mechanism
  $('li.tab').click(changeTab);

  // Search mechanism
  $('#search').keyup(searchHandle);

});
