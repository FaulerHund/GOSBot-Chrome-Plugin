function alert_create(title, text, type = 'info') {
  document.getElementById("alert").innerHTML = `<div class="alert alert-`+type+` alert-dismissible fade show" role="alert">
    <strong>`+title+`</strong> `+text+`
    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
      <span aria-hidden="true">&times;</span>
    </button>
  </div>`;
}

document.addEventListener('DOMContentLoaded', function() {
  var btn_play = document.getElementById('btn_play');
  // onClick's logic below:
  btn_play.addEventListener('click', function() {
    fc_btn_play();
  });
});

document.addEventListener('DOMContentLoaded', function() {
  var btn_import = document.getElementById('btn_import');
  // onClick's logic below:
  btn_import.addEventListener('click', function() {
    fc_btn_import();
  });
});
document.addEventListener('DOMContentLoaded', function() {
  var btn_import = document.getElementById('btn_mplay');
  // onClick's logic below:
  btn_import.addEventListener('click', function() {
    fc_btn_mplay();
  });
});
document.addEventListener('DOMContentLoaded', function() {
  var btn_import = document.getElementById('btn_mstop');
  // onClick's logic below:
  btn_import.addEventListener('click', function() {
    fc_btn_stop();
  });
});
document.addEventListener('DOMContentLoaded', function() {
  var btn_import = document.getElementById('btn_mpause');
  // onClick's logic below:
  btn_import.addEventListener('click', function() {
    fc_btn_pause();
  });
});


function fc_btn_play() {
  console.log("Play wurde gedrückt");
  alert_create("Warten", "Deine Eingaben wird verarbeitet", "info");
  var current_url;
  chrome.tabs.getSelected(null,function(tab) {
    current_url = tab.url;
    $.ajax({
      type: "GET",
      url: "https://gosbot.de/api/?method=pwyw.play&ytID="+current_url+"&type_url=1",
      success: function(data)
      {
        datasplit = data.split(":::");
        if (datasplit[2]==1) {
          alert_create(datasplit[0], datasplit[1], "success");
          songinfoload();
        } else {
          alert_create(datasplit[0], datasplit[1], "warning");
        }
      }
    });
  });
}

function fc_btn_import() {
  console.log("Import wurde gedrückt");
  alert_create("Warte!", "Dieses Video wird in deine Bibliothek importiert!", "info");
  var current_url;
  chrome.tabs.getSelected(null,function(tab) {
    current_url = tab.url;
    $.ajax({
      type: "GET",
      url: "https://gosbot.de/api/?method=pwyw.download&ytID="+current_url+"&type_url=1",
      success: function(data)
      {
        datasplit = data.split(":::");
        if (datasplit[2]==1) {
          alert_create(datasplit[0], datasplit[1], "success");          
        } else {
          alert_create(datasplit[0], datasplit[1], "warning");
        }
      }
    });
  });
}

function fc_btn_pause() {
  console.log("Pause wurde gedrückt");
    $.ajax({
      type: "GET",
      url: "https://gosbot.de/api/?method=bot.pause",
      success: function(data)
      {
        datasplit = data.split(":::");
        if (datasplit[2]==1) {
          alert_create(datasplit[0], datasplit[1], "success");          
        } else {
          alert_create(datasplit[0], datasplit[1], "warning");
        }
      }
    });
}

function fc_btn_mplay() {
  console.log("Play wurde gedrückt");
    $.ajax({
      type: "GET",
      url: "https://gosbot.de/api/?method=bot.play",
      success: function(data)
      {
        datasplit = data.split(":::");
        if (datasplit[2]==1) {
          alert_create(datasplit[0], datasplit[1], "success");          
        } else {
          alert_create(datasplit[0], datasplit[1], "warning");
        }
      }
    });
}

function fc_btn_stop() {
  console.log("Play wurde gedrückt");
    $.ajax({
      type: "GET",
      url: "https://gosbot.de/api/?method=bot.stop",
      success: function(data)
      {
        datasplit = data.split(":::");
        if (datasplit[2]==1) {
          alert_create(datasplit[0], datasplit[1], "success");
          songinfoload();      
        } else {
          alert_create(datasplit[0], datasplit[1], "warning");
        }
      }
    });
}

function getSongInfo() {
  songtitlehtml = document.getElementById("songtitle").innerHTML;
  url = 'https://gosbot.de/api/?method=bot.info.value&value=songname_now';
  $.get(url, function(data) {
      if (data) {
          songtitle = data;
      } else {
          songtitle = 'Unbekannter Songtitle';
      }
          document.getElementById("songtitle").innerHTML = songtitle;
  })
}
function getSongCover() {
  url = 'https://gosbot.de/api/?method=bot.info.value&value=songcover_now';
  $.get(url, function(data) {
      if (data) {
          songcover = data;
      } else {
          songcover = 'https://gosbot.de/images/cdcover.png';
      }
          document.getElementById("player_songcover").src = songcover;
  })
}
time=setInterval(function(){
  songinfoload();
},5000);

function songinfoload() {
  getSongInfo();
  getSongCover();
}