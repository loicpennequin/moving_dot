$(document).ready(function(){
    console.log(window.location.href);
    var lives = 3;
    var locked = false;   //used to prevent player from moving when hit

    //tracking player, coins and obstacles coordinates
    var x = document.getElementById('dot').offsetLeft;
    var y = document.getElementById('dot').offsetTop;
    var playerCoord = document.getElementById('dot').getBoundingClientRect();
    var obCoord1 = document.getElementById('obstacle1').getBoundingClientRect();
    var obCoord2 = document.getElementById('obstacle2').getBoundingClientRect();
    var obCoord3 = document.getElementById('obstacle3').getBoundingClientRect();
    var coin1 = document.getElementById('coin1').getBoundingClientRect();
    var coin2 = document.getElementById('coin2').getBoundingClientRect();
    var coin3 = document.getElementById('coin3').getBoundingClientRect();
    var coin4 = document.getElementById('coin4').getBoundingClientRect();

    //update coordinates after key input
    var Update = function() {
        x= document.getElementById('dot').offsetLeft;
        y= document.getElementById('dot').offsetTop;
        playerCoord = document.getElementById('dot').getBoundingClientRect();
        obCoord1 = document.getElementById('obstacle1').getBoundingClientRect();
        obCoord2 = document.getElementById('obstacle2').getBoundingClientRect();
        obCoord3 = document.getElementById('obstacle3').getBoundingClientRect();
    }

    //collisions handling
    var collision = function(o) {       // o is the coordinates of the obstacle object
        Update();
        if ( (playerCoord.left > o.left && playerCoord.left < o.right) &&
              (playerCoord.top > o.top && playerCoord.top < o.bottom) ){
              $("#life" + lives).addClass('hidden')
              lives = lives-1;
              $('#dot').css('left', '200px');
              $('#dot').css('top', '200px');
              locked = true;
              $('#field').addClass('hit');
              setTimeout(function(){
                  $('#field').removeClass('hit');
                  locked = false;
              }, 1500)
              Update();
              if (lives == 0) {
                  $('#game').addClass('fade_out');
                  setTimeout(function(){
                      $("#game_over").addClass('game_end_anim')
                  }, 1000);
              }
        }
    }

    setInterval(function(){
        collision(obCoord1);
        collision(obCoord2);
        collision(obCoord3);
    }, 100);

    //user player movement handling
    $("body").keydown(function(e) {
     //key inputs
                var move = function( a, b, c , d, axis, edge){   // a = uncode key, b = left or top , c and d = + or -, axis = x or y
                    if(e.keyCode == a) {
                        if ( axis == edge ) {
                          $('#dot').css( b, c + '=400px');
                          }
                          $('#dot').css( b, d + '=5px');
                          Update();
                       }
                }
                if ( locked == false) {
                    move(37,'left','+','-',x, 0);
                    move(38,'top','+','-',y, 0);
                    move(39,'left','-','+',x,395);
                    move(40,'top','-','+',y,395);
                }
        //coin pickup handling
        var coinPickUp =  function(c,id) {       // c is the coordinates of the picked-up coin, id is its html id
            Update();
            if ( (playerCoord.left > c.left && playerCoord.left < c.right) &&
                  (playerCoord.top > c.top && playerCoord.top < c.bottom) ){
                $('#' + id).addClass('hidden');
            }
        }
        coinPickUp(coin1, 'coin1');
        coinPickUp(coin2, 'coin2');
        coinPickUp(coin3, 'coin3');
        coinPickUp(coin4, 'coin4');
        //win condition
        if ( $('#coin1').hasClass('hidden') &&
             $('#coin2').hasClass('hidden') &&
             $('#coin3').hasClass('hidden') &&
             $('#coin4').hasClass('hidden')){
                $('#game').addClass('fade_out');
                setTimeout(function(){
                    $("#win").addClass('game_end_anim')
                    $("#timer").html(nextLevelTimer)
                    var nextLevelTimer = 5;
                    for (let i = 1 ; i <= 5 ; i++) {
                        setTimeout(function(){
                            nextLevelTimer--;
                            $("#timer").html(nextLevelTimer)
                            console.log(nextLevelTimer);
                        }, 1000 * i);
                    }
                }, 1000);
                setTimeout(function() {
                    localStorage.setItem("storedLives",lives);
                    window.location.href = 'level2.html'
                }, 6000)
        }
    });
});
