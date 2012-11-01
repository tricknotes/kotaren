// for jQuery mobile initialize
$(document).bind("mobileinit", function(){
  $.extend( $.mobile, {
    ajaxEnabled: false
  });
});


function updateElem(id, html){
  if ( $(id).html() == html ){return}

  $(id).hide();
  $(id).empty();
  $(id).html(html);
  $(id).fadeIn();
}

var progress_default_option = {
    steps           : 0,
    stepDuration    : 0,
    max             : 100,
    showText        : true,
    textFormat      : 'percentage',
    width           : 120,
    height          : 12, 
    callback        : null,
    boxImage        : '/assets/progressbar.gif',
    barImage        : { 
        0:   '/assets/progressbg_red.gif',
        30:  '/assets/progressbg_orange.gif',
        60:  '/assets/progressbg_yellow.gif',
        100: '/assets/progressbg_green.gif'
    } 
}

var progress_controller = {
  step : 10,
  option : { steps : 20, stepDuration : 20 },

  up : function (user_id, tune_id){
    this.move_bar(user_id, tune_id, function (current_val, step){
      return current_val + step;
    });
  },

  down : function (user_id, tune_id){
    this.move_bar(user_id, tune_id, function (current_val, step){
      return current_val - step;
    });
  },

  play : function (user_id, tune_id){
    this.move_bar(user_id, tune_id, function (current_val, step){
      return current_val + 1;
    });
  },

  touch_bar : function ( user_id, tune_id ){
    var current_val = Number($('#progress_' + tune_id + '_pbText').html().replace("%",""))
    this.update_remote(user_id, tune_id,current_val);
  },


  move_bar : function ( user_id, tune_id, move_callback ){
    var current_val = Number($('#progress_' + tune_id + '_pbText').html().replace("%",""))
    var next_val = move_callback(current_val, this.step);
    if (next_val > 100){ 
      next_val = 100; 
    }else if (next_val < 0){ 
      next_val = 0; 
    }
    $('#progress_' + tune_id ).progressBar( next_val , this.option );
    $('#tune_progress_' + tune_id ).progressBar( next_val , this.option );

    this.update_remote(user_id, tune_id,next_val);
  },

  update_remote : function(user_id, tune_id, val){
    $.ajax({
      type: "GET",
      cache: false,
      url: "/users/" + user_id + "/tunes/update_progress",
      data: "tune_id=" + tune_id + "&progress_val=" + val
    });
  }
}

