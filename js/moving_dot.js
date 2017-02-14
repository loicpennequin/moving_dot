$(document).ready(function(){
    var lives = 3;

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
    //user player movement handling
    $("body").keydown(function(e) {
    //collisions handling
        var collision = function(o) {       // o is the coordinates of the obstacle object
            Update();
            if ( (playerCoord.left > o.left && playerCoord.left < o.right) &&
                  (playerCoord.top > o.top && playerCoord.top < o.bottom) ){
                  $("#life" + lives).addClass('hidden')
                  lives = lives-1;
                  $('#dot').css('left', '200px');
                  $('#dot').css('top', '200px');
                  Update();
                  if (lives == 0) {
                      $('#field').addClass('hidden')
                      alert('Game Over. Refresh page to try again.');
                  }
            }
        }
        collision(obCoord1);
        collision(obCoord2);
        collision(obCoord3);
     //key inputs
                var move = function( a, b, c , d){   // a = uncode key, b = left or top , c and d = + or -
                    if(e.keyCode == a) {
                        if ( x == 0 ) {
                          $('#dot').css( b, c + '=400px');
                          }
                          $('#dot').css( b, d + '=5px');
                          Update();
                       }
                }
                move(37,'left','+','-');
                move(38,'top','+','-');
                move(39,'left','-','+');
                move(40,'top','-','+');
        //coin pickup handling
        var coinPickUp =  function(c,id) {       // c is the coordinates of the picked-up coin, id its html id
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
                 $('#field').addClass('hidden');
                 alert('YOU WON !');
        }
    });
});
