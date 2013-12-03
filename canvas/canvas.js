function draw_circle(ctx, position, r) {
	position.extent = r;
	ctx.ctx.fillStyle = "#58FAF4";	
	ctx.ctx.beginPath();
	ctx.ctx.arc(position.x, position.y, r, 0, Math.PI*2, true);
	ctx.ctx.fill();
}

function draw_star(ctx, position, r, arms) {
	var dt = 2*Math.PI/(2*arms);
	var inner_r = r/4
	position.extent = r;
	
	ctx.ctx.strokeStyle = "#58FAF4";
	ctx.ctx.beginPath();	
	ctx.ctx.moveTo(position.x, position.y);
	for (var i = 0;i < arms*2+1;i++) {
		if (i == 0) {
			ctx.ctx.moveTo(position.x + inner_r * Math.cos(dt * i), 
							position.y + inner_r * Math.sin(dt * i));
		} else if (i % 2 == 1) {
			ctx.ctx.lineTo(position.x + r * Math.cos(dt * i), 
							position.y + r * Math.sin(dt * i));
		} else {
			ctx.ctx.lineTo(position.x + inner_r * Math.cos(dt * i), 
							position.y + inner_r * Math.sin(dt * i));
		}
	}
	ctx.ctx.stroke();
}

function draw_rectangle(ctx, position) {
	ctx.ctx.fillStyle = "#000000";	
	ctx.ctx.beginPath();
	ctx.ctx.rect(position.x, position.y, ctx.WIDTH, ctx.HEIGHT);
	ctx.ctx.closePath();
	ctx.ctx.fill();
}

function draw_line(ctx, position, history) {
	ctx.ctx.beginPath();
	ctx.ctx.moveTo(0, 0);
	for (var i = 0;i < history.length;i++) {
		ctx.ctx.lineTo(history[i].x, history[i].y);
	}
	ctx.ctx.lineTo(position.x, position.y);
	ctx.ctx.lineWidth = 1;
	ctx.ctx.strokeStyle = "#A9F5F2";
	ctx.ctx.stroke();
}

function DrawingContext(context, width, height) {
	this.ctx = context;
	this.WIDTH = width;
	this.HEIGHT = height;
}

function DrawingObject(x, y, dx, dy, width, height) {
	this.x 	= x;
	this.y 	= y;
	this.dx = dx;
	this.dy = dy;
	this.WIDTH = width;
	this.HEIGHT = height;
	this.extent = 0;

	this.rx = 1;
	this.ry = 1;
	this.k = 0.75;
	this.g = 10;

	this.update = function update(timestamp) {		
		this.dy = this.dy + (this.g / 60);
		
		if (this.x + this.dx + this.extent > this.WIDTH || this.x + this.dx - this.extent < 0) {
			this.dx = -this.k * this.dx;
		}
		if (this.y + this.dy + this.extent > this.HEIGHT || this.y + this.dy - this.extent < 0) {
			this.dy = -this.k * this.dy;
			this.dx = this.k * this.dx;
		}
		
		this.x += this.dx;
		this.y += this.dy;
	}
}