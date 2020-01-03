var canvas = document.querySelector('#canvas');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var c = canvas.getContext('2d');



var mouse = {
    x: undefined,
    y: undefined,
};

var maxRadius = 39;
var minRadius = 3;

var colorArray = ['#6588A6', '#F2C572', '#F29863', '#F2785C', '#F2594B'];

window.addEventListener('mousemove', function(event){
    mouse.x = event.x;
    mouse.y = event.y;
});

window.addEventListener('resize', function(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    init();
});

function Circle(x, y, dx, dy, radius, color){
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.minRadius = radius;
    this.color = color;
    this.fillColor = colorArray[Math.floor(Math.random() * colorArray.length)];
    
    this.draw = function() {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
       // c.strokeStyle = this.color;
       // c.stroke();
        c.fillStyle = this.fillColor;
        c.fill();
    };
    this.update = function(){
        if (this.x + this.radius > innerWidth || this.x - this.radius < 0){
            this.dx = -this.dx
        };
        this.x += this.dx;
        if (this.y + this.radius > innerHeight || this.y - this.radius < 0){
            this.dy = -this.dy
        };
        this.y += this.dy;

        // interaction
            if (mouse.x - this.x < 50 && mouse.x - this.x > -50
                && mouse.y -this.y < 50 && mouse.y - this.y >-50 
                ){ if(this.radius < maxRadius){
                    this.radius += 1;
                }
                
            } else if (this.radius > this.minRadius){
                this.radius -= 1;
            };

        this.draw();
    };
};

var circleArray = [];

function init(){
    circleArray = [];
        
    for (let i = 0; i <1500 ; i++){
            var radius = Math.random() * 3 + 1;
            var x = Math.random() * (innerWidth - radius * 2) + radius;  // here we use another way to not make the circle getting stucked
        // // to not make the circle stuck at the border x
            // if (x > (innerWidth - radius)){
            //     x = x - radius;
        // } else if (x < (0 + radius)){
            //     x = x + radius;
        // };

            var y = Math.random() * (innerHeight - radius * 2) + radius;
         // // to not make the circle stuck at the border x
            // if (y > (innerHeight - radius)){
            //     y = y - radius;
            // } else if (y < (0 + radius)){
        //     y = y + radius;
            // };
            // the speed of the circle movement
            var dx = (Math.random() - 0.5) * 3;
        var dy = (Math.random() - 0.5) * 3;

            var color = '#'+Math.random().toString(16).substr(2,6);

            circleArray.push(new Circle(x, y, dx, dy, radius, color));
        };

};




function animate(){
    requestAnimationFrame(animate);
    
    c.clearRect(0, 0, innerWidth, innerHeight);
   
    for (let i = 0; i < circleArray.length; i++){
        circleArray[i].update();
    };
    
};







// // here the peace of code which make one circle


// // radius of the circle
// var radius = 60;

// // start x , y  positions of the variables 
// var x = Math.random() * innerWidth;
// // to not make the circle stuck at the border x
// if (x > (innerWidth - radius)){
//     x = x - radius;
// } else if (x < (0 + radius)){
//     x = x + radius;
// };

// var y = Math.random() * innerHeight;
// // to not make the circle stuck at the border x
// if (y > (innerHeight - radius)){
//     y = y - radius;
// } else if (y < (0 + radius)){
//     y = y + radius;
// };

// // the speed of the circle movement
// var dx = (Math.random() - 0.5) * 10;
// var dy = (Math.random() - 0.5) * 10;

// // here we use a function and call it within it self by using requestAnimationFrame() and calling the same function
// function animate(){
//     requestAnimationFrame(animate);
//     // clearRect(start x, start y, end x, end y) 
//     // this method is used to wipe out the previous circle and this makes the circle looks like it's moving
//     c.clearRect(0, 0, innerWidth, innerHeight);
   
//     c.beginPath();
//     c.arc(x, y, radius, 0, Math.PI * 2, false);
//     c.strokeStyle = 'orange';
//     c.stroke();
//     // we use this conditional to make the circle bounce at the borders and to make it always move in the window


//     if (x + radius > innerWidth || x - radius < 0){
//         dx = -dx
//     };
//     x += dx;
//     if (y + radius > innerHeight || y - radius < 0){
//         dy = -dy
//     };
//     y += dy;


// };

animate();
init();

