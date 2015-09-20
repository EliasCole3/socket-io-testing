$(function() {
  
  var socket = io();
  
  $('form').submit(function(){
    socket.emit('chat message', $('#m').val());
    $('#m').val('');
    return false;
  });
  
  socket.on('chat message', function(msg){
    $('#messages').append($('<li>').text(msg));
  });
  
  var draggableOptions = {
    //grid: [ 50, 20 ],
    drag: function( event, ui ) {
       
       if(abc.dragCounter === abc.dragDelay){
         console.log("X: " + event.clientX);
         console.log("Y: " + event.clientY);
         console.log(ui)
         console.log(event)
         console.log(ui.helper[0].id)
         
         
         
         abc.dragCounter = 0;
         
         var emitObj = {
           id: ui.helper[0].id,
           x: event.clientX,
           y: event.clientY
         };
         
         socket.emit('element dragged', emitObj);
       }
       
       abc.dragCounter++;
        
    }
  };
  
  $( "#draggable" ).draggable(draggableOptions);
  
    socket.on('element dragged', function(emitObj){
      $('#' + emitObj.id).css("top", emitObj.y);
      $('#' + emitObj.id).css("left", emitObj.x)
    });

});

var abc = {
  
   dragDelay: 1,
   
   dragCounter: 0
  
};