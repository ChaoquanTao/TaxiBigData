 var replay_speed =1;
$(function() {
               
                $( "#slider" ).slider({
                  range: "max",
                  min: 1,
                  max: 10,
                  value: 1,
                  slide: function( event, ui ) {
                    $( "#amount" ).val( ui.value );
                    console.log(ui.value);
                    replay_speed = ui.value
                   // console.log(data)
                  }
                });
                $( "#amount" ).val( $( "#slider" ).slider( "value" ) );
                 // console.log(ui.value)
});