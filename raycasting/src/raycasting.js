/* Classes */

// credit to https://ncsucgclass.github.io/prog1/drawstuff.js
// Color Class
class Color {
	
	// color constructor
	constructor(r, g, b, a) {
		
		try {
			if ((typeof(r) !== "number") || (typeof(g) !== "number") || (typeof(b) !== "number") || (typeof(a) !== "number"))
				throw "color component not a number";
			else if ((r < 0) || (g < 0) || (b < 0) || (a < 0))
				throw "color component less than 0";
			else if ((r > 255) || (g > 255) || (b > 255) || (a > 255))
				throw "color component less than 0";
			else
				this.r = r; this.g = g; this.b = b; this.a = a;
		} // end try
		
		catch(e) {
			console.log(e);
		} // end catch
		
	} // end constructor
	
	// color change method
	change(r, g, b, a) {
		
		try {
			if ((typeof(r) !== "number") || (typeof(g) !== "number") || (typeof(b) !== "number") || (typeof(a) !== "number"))
				throw "color component not a number";
			else if ((r < 0) || (g < 0) || (b < 0) || (a < 0))
				throw "color component less than 0";
			else if ((r > 255) || (g > 255) || (b > 255) || (a > 255))
				throw "color component less than 0";
			else
				this.r = r; this.g = g; this.b = b; this.a = a;
		} // end try
		
		catch(e) {
			console.log(e);
		} // end  catch
		
	} // end color change method
	
} // end class color

// Vector Class for vector mathematics
class vector {
	
	// vector constructor
	constructor(x=0, y=0, z=0) {
	
		this.set(x, y, z)		
	
	} // end constructor
	
	// set a vector
	set(x, y, z) {
		
		try {
			if ((typeof(x) !== "number") || (typeof(y) !==  "number") || (typeof(z) !== "number" ))
				throw "vector components are not a number";
			else
				this.x = x; this.y = y; this.z = z;
		} // end try
		
		catch(e) {
			console.log(e);
			
		} // end catch
	
	} // end set
	
	// copy the passed vector into this one
	copy(v) {
		
		try {
			if (!(v instanceof vector))
				throw "Vector cannot be copied as the given parameter is a non-vector parameter"
			else
				this.x = v.x; this.y = v.y; this.z = v.z;
		} // end try
		
		catch(e) {
			console.log(e);
		} // end catch
		
	} // end copy
	
	toConsole(prefix) {
		console.log(prefix+"["+this.x+", "+this.y+", "+this.z+"]");
	} // end toconsole
	
	// static dot product of two vectors
	static dot(v1, v2) {
		
		try {
			if (!(v1 instanceof vector) || !(v2 instanceof vector))
				throw "Vector.dot: Non-vector parameter";
			else
				return(v1.x*v2.x + v1.y*v2.y + v1.z*v2.z);				
		} // end try
		
		catch(e) {
			console.log(e);
			return(NaN);
		} // end catch
	
	} // end dot
	
	// static add vector
	static add(v1, v2) {
		
		try {
			if (!(v1 instanceof vector) || !(v2 instanceof vector))
				throw "vector.add: Non-vector parameter";
			else
				return(new vector(v1.x + v2.x, v1.y + v2.y, v1.z + v2.z));
		} // end add

		catch(e) {
			console.log(e);
			return(new vector(NaN, NaN, NaN));
		} // end catch
		
	} // end add
	
	// static subtract vector
	static subtract(v1, v2) {
		
		try{
			if (!(v1 instanceof vector) || !(v2 instanceof vector))
				throw "vector.subtract: Non-vector parameter";
			else
				return(new vector(v1.x - v2.x, v1.y - v2.y, v1.z - v2.z));
		} // end try
		
		catch(e) {
			console.log(e);
			return(new vector(NaN, NaN, NaN));
		} // end catch
		
	} // end subtract
	
	// static scale method (scaling a vector using a constant c)
	static scale(c, v) {
		
		try {
			if (!(v instanceof vector) || (typeof(c) !== "number"))
				throw "vector.scale: malformed parameters";
			else
				return(new vector(c*v.x, c*v.y, c*v.z));
		} // end try
		
		catch(e) {
			console.log(e);
			return(new vector(NaN, NaN, NaN));
		} // end catch
		
	} // end scale
	
	// static normalize
	static normalize(v) {
		
		try {
			if (!(v instanceof vector))
				throw "vector.normalize: Non-vector parameter";
			else
				var denom = 1/Math.sqrt(vector.dot(v, v));
				return(vector.scale(denom, v));
		} // end try
		
		catch(e) {
			console.log(e);
			return(new vector(NaN, NaN, NaN));
		}
		
	} // end normalize
	
	// static divide vector
	static divide(v1, v2) {
		
		try {
			if (!(v1 instanceof vector) || !(v2 instanceof vector))
				throw "vector.divide: Non-vector parameter";
			else
				return(new vector(v1.x/v2.x, v1.y/v2.y, v1.z/v2.z));
		} // end try
		
		catch(e) {
			console.log(e);
			return(new vector(NaN, NaN, NaN));
		} // end catch
		
	} // end divide
	
	// static cross product
	static cross(v1, v2) {
		
		try {
			if (!(v1 instanceof vector) || !(v2 instanceof vector))
				throw "vector.cross: Non-vector parameter";
			else
				return(new vector(v1.y*v2.z - v1.z*v2.y, v1.x*v2.z - v1.z*v2.x, v1.x*v2.y - v2.x*v1.y));
		} // end try
		
		catch(e) {
			console.log(e);
			return(new vector(NaN, NaN, NaN));
		} // end catch
		
	} // end cross
	
	
} // vector class end

// credit to https://ncsucgclass.github.io/prog1/drawstuff.js
// function to draw a pixel at location x, y
function drawpixel(imagedata, x, y, color) {
	y  = imagedata.height - y;
	try {
		if ((typeof(x) !== "number") || typeof(y) !== "number")
			throw "location for drawpixel is not a number"
		else if (x < 0 || y < 0 || x >= imagedata.width || y >= imagedata.height)
			throw "location for drawpixel is outside of the image"
		else if (!(color instanceof Color))
			throw "drawpixel color is not a color"
		else
			var pixel_index = (y*imagedata.width + x) * 4;
			imagedata.data[pixel_index] = color.r;
			imagedata.data[pixel_index + 1] = color.g;
			imagedata.data[pixel_index + 2] = color.b;
			imagedata.data[pixel_index + 3] = color.a;
	} // end try
	 
	catch(e) {
		console.log(e);
	} // end catch
	
} // end drawpixel

// credit to https://ncsucgclass.github.io/prog1/drawstuff.js
//get the input boxex from the standard class URL
function getInputBoxes() {
	
    const INPUT_BOXES_URL = 
        "https://ncsucgclass.github.io/prog1/boxes.json";
        
    // load the boxes file
    var httpReq = new XMLHttpRequest(); // a new http request
    httpReq.open("GET",INPUT_BOXES_URL,false); // init the request
    httpReq.send(null); // send the request
    
	var startTime = Date.now();
    
	while ((httpReq.status !== 200) && (httpReq.readyState !== XMLHttpRequest.DONE)) {
        if ((Date.now()-startTime) > 3000)
            break;
    } // until its loaded or we time out after three seconds
    
	if ((httpReq.status !== 200) || (httpReq.readyState !== XMLHttpRequest.DONE)) {
        console.log*("Unable to open input boxes file!");
        return String.null;
    } 
	
	else
        return JSON.parse(httpReq.response); 
	
} // end get input boxes

// RAY CASTING FUNCTION STARTS
function draw_boxes_raycasting(context, eye, light, bling_phong) {
		
		var input_boxes = getInputBoxes();
		num = input_boxes.length;
		
		
		if (input_boxes !== String.null) {
			
			var lx = 0; var rx = 0;
			var ty = 0; var by = 0;
			var fz = 0; var rz = 0;
			// copying everything from input to local variables
			var h  = context.canvas.height;
			var w = context.canvas.width;
			var imagedata = context.createImageData(w, h);
		
			
			// intialization
			var color = new Color(0, 0, 0, 0);
			var p = new vector(0, 0, 0);
			
			// loop over width
			for (var i = 0; i <= w; i++) {
				
				// loop over height
				for (var j = 0; j <= h; j++) {
										
					p.set(i/w, j/h, 0);
					
					
					d = vector.subtract(p, eye);
					// loop over boxes
					var t = 100000;
					
					for (var b = 0; b < num; b++) {
						
						// copying from input_boxes file
						lx = input_boxes[b].lx;
						rx = input_boxes[b].rx;
						ty = input_boxes[b].ty;
						by = input_boxes[b].by;
						fz = input_boxes[b].fz;
						rz = input_boxes[b].rz;
							
						// calculating distance to particular planes from the ray

						// ray distance to bottom y
						var rdby = (by - eye.y)/d.y;
						// ray distance to top y
						var rdty = (ty - eye.y)/d.y;
						// ray distance to left x
						var rdlx = (lx - eye.x)/d.x;
						// ray distance to right x
						var rdrx = (rx - eye.x)/d.x;
						// ray distance to front z;
						var rdfz = (fz - eye.z)/d.z;
						// ray distance to rear z;
						var rdrz = (rz - eye.z)/d.z;
						
						// calculating first and second intersection of the ray with any particular planes
						
						// first and second intersection with y planes
						var fsty = Math.min(rdby, rdty);
						var sndy = Math.max (rdby, rdty);
						// first and second intersection with x planes
						var fstx = Math.min(rdlx, rdrx);
						var sndx = Math.max (rdlx, rdrx);
						// first and second intersection with z planes
						var fstz = Math.min(rdfz, rdrz);
						var sndz = Math.max (rdfz, rdrz);

						
						// the very first and second intersection with the box
						var t0 = Math.max(fstx, fsty, fstz);
						var t1 = Math.min(sndx, sndy, sndz);
						
						// check if the ray intersects with the box?

						var R = 0; var G = 0; var B = 0;					
						// if this condition meets than the ray interesects with the box
						if (t0 <= t1) {
							
							//Normal vectors according to the plane of intersection;
							if (t0 == fstx)
								var N = new vector(1, 0, 0);
							else if (t0 ==  fsty)
								var N = new vector(0, 1, 0);
							else
								var N = new vector(0, 0, -1);
							
							// logic so that overlapping boxes are mapped correctly
							t = Math.min(t, t0);
							if (t < t0) {
								continue;
							}
							
							// bling phong illumination
							if (bling_phong == true){
								var ActualPosition = new vector(0, 0, 0);
								ActualPosition = vector.add(vector.scale(t0, d), eye);
								var V = vector.subtract(eye, ActualPosition); // view vector
								var L = vector.subtract(light, ActualPosition); // light vector
								var H = vector.scale(1/2, vector.add(L, V));
								var H_norm = vector.normalize(H);
								var N = vector.normalize(N);
								
								R = input_boxes[b].ambient[0] + input_boxes[b].diffuse[0]*vector.dot(N, vector.normalize(L)) + input_boxes[b].specular[0]*Math.pow(vector.dot(N, H), input_boxes[b].n);
								G = input_boxes[b].ambient[1] + input_boxes[b].diffuse[1]*vector.dot(N, vector.normalize(L)) + input_boxes[b].specular[1]*Math.pow(vector.dot(N, H), input_boxes[b].n);
								B = input_boxes[b].ambient[2] + input_boxes[b].diffuse[2]*vector.dot(N, vector.normalize(L)) + input_boxes[b].specular[2]*Math.pow(vector.dot(N, H), input_boxes[b].n);
								
								if ( R < 0)
									R = 0;
								else if (R > 1)
									R =1;
								if ( G < 0)
									G = 0;
								else if (G > 1)
									G =1;
								if ( B < 0)
									B = 0;
								else if (B > 1)
									B = 1;
							
								color.change(R*255,G*255,B*255, 255);
							}
							else {
								c = color.change(Math.round(input_boxes[b].diffuse[0]*255), Math.round(input_boxes[b].diffuse[1]*255), Math.round(input_boxes[b].diffuse[2]*255), 255)
							}
							drawpixel(imagedata, i, j, color);
							t = t0;						
						}
					
					}
					
				} // end of for loop for height
			
			} // end of for loop for width

		} // end of if statement
		context.putImageData(imagedata, 0, 0); // put image data on canvas
} // enf of raycasting function


function main() {
	
	// get the context and canvas
	var canvas = document.getElementById("viewport");
	var context = canvas.getContext("2d");
	
	
	// input light and eye
	var eye = new vector(0.5, 0.5, -0.5);
	var light = new vector(-0.5, 1.5, -0.5);
	
	//drawRandPixelsInInputBoxes(context);
	var bling_phong = true;
	draw_boxes_raycasting(context, eye, light, bling_phong);
}