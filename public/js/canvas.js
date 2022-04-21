const canvash=800;
const canvasw=800;

window.onload = function () {
  
  var canvas = document.getElementById("canvas");
  var ctx = canvas.getContext("2d");
  ctx.strokeStyle = "#222222";
  ctx.lineWith = 2;


  canvas.height = canvash;
  canvas.width = canvasw;

  
  var drawing = false;
  var actualPos = { x: 0, y: 0 };
  var lastPos = actualPos;

 
  canvas.addEventListener(
    "touchstart",
    function (e) {
      e.preventDefault();
      drawing = true;
      var pos=getTouchPos(canvas, e);
      actualPos = pos;
      lastPos = pos;
      
    },
    false
  );
  canvas.addEventListener(
    "touchend",
    function (e) {
      e.preventDefault();
      drawing = false;
    },
    false
  );
  canvas.addEventListener(
    "touchmove",
    function (e) {
      e.preventDefault();
      actualPos = getTouchPos(canvas, e);
    },
    false
  );

  function getTouchPos(canvasDom, touchEvent) {
    var rect = canvasDom.getBoundingClientRect();
    return {
      x: touchEvent.touches[0].clientX - rect.left,
      y: touchEvent.touches[0].clientY - rect.top,
    };
  }

  window.requestAnimFrame = (function (callback) {
    return (
      window.requestAnimationFrame ||
      window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      window.oRequestAnimationFrame ||
      window.msRequestAnimationFrame ||
      function (callback) {
        window.setTimeout(callback, 1000/60 );
      }
    );
  })();

  function renderCanvas() {
    if (drawing) {
        ctx.moveTo(lastPos.x, lastPos.y);
        ctx.lineTo(actualPos.x, actualPos.y);
        ctx.stroke();
        lastPos = actualPos;     
    }
  }

  (function drawLoop() {
    requestAnimFrame(drawLoop);
    renderCanvas();
  })();
  
  canvas.addEventListener(
    "mousedown",
    function (e) {
      drawing = true;
      var pos=getMousePos(canvas, e);
      actualPos=pos;
      lastPos = pos;
    },
    false
  );
  canvas.addEventListener(
    "mouseup",
    function (e) {
      drawing = false;
    },
    false
  );
  canvas.addEventListener(
    "mousemove",
    function (e) {
      actualPos = getMousePos(canvas, e);
    },
    false
  );

  function getMousePos(canvasDom, mouseEvent) {
    var rect = canvasDom.getBoundingClientRect();
    return {
      x: mouseEvent.clientX - rect.left,
      y: mouseEvent.clientY - rect.top,
    };
  }
};


