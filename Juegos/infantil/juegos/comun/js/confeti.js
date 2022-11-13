// Confetti Effect by Gtibo "Confetti Party"
//------------------------------------------------------------------
function confettiEffect (){
  //grabing area to create the effect
  canvas = document.getElementById("canvas");
  canvas.style.opacity = 1;
  context = canvas.getContext("2d");
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;

  // creating the tabel
  particle = [];
  particleCount = 0,
  gravity = 0.6,/*cambio*/
  //Colores corporativos//
  colors = ["#84b5d4","#D44949","#ECD877","#83D891","#feb2ca"];

  console.log(width + ", " + height);

  for( var i = 0; i < 300; i++){

    particle.push({
    	x : width/2,
    	y : height/2,
    	boxW : randomRange(5,20),
    	boxH : randomRange(5,20),
    	size : randomRange(2,8),

    	spikeran:randomRange(3,5),

    	velX :randomRange(-15,15),/*cambio*/
    	velY :randomRange(-70,-30),/*cambio*/

    	angle :convertToRadians(randomRange(0,360)),
    	color:colors[Math.floor(Math.random() * colors.length)],
    	anglespin: randomRange(-0.2,0.2),

    	draw : function(){
    		context.save();

            context.translate(this.x,this.y);
            context.rotate(this.angle);
    		context.fillStyle=this.color;
    		
            context.beginPath();
    	    context.fillRect(this.boxW/2*-1,this.boxH/2*-1,this.boxW,this.boxH);
    		context.fill();
			context.closePath();
;
    		context.restore();

    	    this.angle += this.anglespin;
            this.velY*= 0.999;
    	    this.velY += 2;/*velocidad de confeti*//*antes a 0.03*/;

            this.x += this.velX;
            this.y += this.velY;

    		if(this.y < 0){
      	        this.velY *= -0.2;
      		    this.velX *= 0.9;
      	    };

      	    if(this.y > height){
            	this.anglespin = 0;
            	this.y = height;
            	this.velY *= -0.2;
          		this.velX *= 0.9;
    	    };

    	    if(this.x > width ||this.x< 0){
        	    this.velX *= -0.5;
            };
    	},
  	});
  }

  function drawScreen(){
  	context.globalAlpha = 1;
	for( var i = 0; i < particle.length; i++){
		particle[i].draw();
	}
  }

    function loadImage(url){
        var img = document.createElement("img");
        img.src=url;
        return img;
    }

    function update(){
        context.clearRect(0,0,width,height);
        drawScreen();
        requestAnimationFrame(update);
    }

    update();

    function randomRange(min, max){
        return min + Math.random() * (max - min );
    }

    function randomInt(min, max){
        return Math.floor(min + Math.random()* (max - min + 1));
    }

    function convertToRadians(degree) {
        return degree*(Math.PI/180);
    }

    function drawStar(cx, cy, spikes, outerRadius, innerRadius,color) {
        var rot = Math.PI / 2 * 3;
        var x = cx;
        var y = cy;
        var step = Math.PI / spikes;

        context.strokeSyle = "#000";
        context.beginPath();
        context.moveTo(cx, cy - outerRadius);

        for (i = 0; i < spikes; i++) {
            x = cx + Math.cos(rot) * outerRadius;
            y = cy + Math.sin(rot) * outerRadius;
            context.lineTo(x, y)
            rot += step

            x = cx + Math.cos(rot) * innerRadius;
            y = cy + Math.sin(rot) * innerRadius;
            context.lineTo(x, y)
            rot += step
        }

        context.lineTo(cx, cy - outerRadius)
        context.closePath();
        context.fillStyle = color;
        context.fill();
    }
}