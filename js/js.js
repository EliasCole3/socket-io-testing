'use strict';

$(function () {
  abc.initialize();
  // ebot.updateDocumentation(abc)
});

var abc = {

  initialize: function initialize() {
    abc.socket = io();
    abc.assignInitialHandlers();

    // $("#resizable-test").resizable().css("width", "100px").css("height", "100px").css("background-color", "pink")
  },

  assignInitialHandlers: function assignInitialHandlers() {
    abc.assignHandlerChat();
    abc.assignHanderDrag();
    abc.assignHandlerAddDiv();
  },

  assignHandlerChat: function assignHandlerChat() {
    $('form').submit(function () {
      abc.socket.emit('chat message', $('#m').val());
      $('#m').val('');
      return false;
    });

    abc.socket.on('chat message', function (msg) {
      $('#messages').append($('<li>').text(msg));
    });
  },

  assignHanderDrag: function assignHanderDrag() {

    // let draggableOptions = {
    //   //grid: [ 50, 20 ],
    //   drag: (event, ui) => {
    //     // console.log("X: " + event.clientX)
    //     // console.log("Y: " + event.clientY)
    //     // console.log(ui)
    //     // console.log(event)
    //     // console.log(ui.helper[0].id)

    //     let emitObj = {
    //       id: ui.helper[0].id,
    //       x: event.clientX,
    //       y: event.clientY
    //     }

    //     abc.socket.emit('element dragged', emitObj)

    //   }
    // }

    $("#draggable").draggable(abc.draggableOptions);

    abc.socket.on('element dragged', function (emitObj) {
      $('#' + emitObj.id).css("top", emitObj.y);
      $('#' + emitObj.id).css("left", emitObj.x);
    });
  },

  assignHandlerAddDiv: function assignHandlerAddDiv() {
    $("#add-div").click(function (e) {
      abc.createNewWireframeDiv();
      abc.socket.emit('div added');
    });

    abc.socket.on('div added', function () {
      // $("#add-div").click()
      abc.createNewWireframeDiv();
    });

    abc.socket.on('element resized', function (emitObj) {
      $('#' + emitObj.id).css("width", emitObj.width).css("height", emitObj.height);
    });
  },

  createNewWireframeDiv: function createNewWireframeDiv() {
    var ranTop = ebot.getRandomInt(100, 500);
    var ranLeft = ebot.getRandomInt(100, 500);
    var randomColor = 'rgba(' + ebot.getRandomInt(0, 255) + ', ' + ebot.getRandomInt(0, 255) + ', ' + ebot.getRandomInt(0, 255) + ', 0.8)';
    var id = 'dynamically-added-div-' + abc.currentDynamicDivId;
    var htmlString = '<div id=\'' + id + '\' style=\'position:absolute; top:' + ranTop + 'px; left:' + ranLeft + 'px; background-color: ' + randomColor + '; width: 100px; height: 100px;\'></div>';
    $("body").append(htmlString);
    $('#' + id).resizable(abc.resizableOptions).draggable(abc.draggableOptions);
    abc.currentDynamicDivId++;
  },

  dragDelay: 1,

  dragCounter: 0,

  socket: {},

  currentDynamicDivId: 1,

  draggableOptions: {
    drag: function drag(event, ui) {
      console.log(event);
      var emitObj = {
        id: ui.helper[0].id,
        x: event.clientX,
        y: event.clientY

        //same
        // x: event.pageX,
        // y: event.pageY

        //worse
        // x: event.screenX,
        // y: event.screenY

        //this is only how much it moved in each drag action, doesn't work at all
        // x: event.offsetX,
        // y: event.offsetY
      };

      //clientX
      //screenX
      //pageX
      //offsetX

      abc.socket.emit('element dragged', emitObj);
    }
  },

  resizableOptions: {
    // $( ".selector" ).on( "resize", function( event, ui ) {} )
    resize: function resize(event, ui) {
      // console.log(ui)
      // console.log(ui.size.height)
      // console.log(ui.element[0].id)

      var emitObj = {
        id: ui.element[0].id,
        height: ui.size.height,
        width: ui.size.width
      };

      abc.socket.emit('element resized', emitObj);
    }
  }

};
//# sourceMappingURL=js.js.map
