var particleBgColor = ['#ff5108', '#1fda9a', '#e94c6f','#3a9ad9','#00a03e', '#f05b47', '#bff073', '#0dc9f7', '#7accc8', '#8bad39' ,'#60047a'];
var changeColor = function(){
  var color = particleBgColor[Math.floor(Math.random() * particleBgColor.length)];
  $('#particles-js').css("background-color", color);
};
