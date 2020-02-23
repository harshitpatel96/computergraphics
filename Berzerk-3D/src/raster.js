/* 			PROG 5 : Berzerk 3D 		  */
/* First person shooting game in THREE.js */
/* 				Harshit Patel			  */
/*			unity id:- @hpatel24		  */
/*CSC 561 - Principles of Computer Graphics */
/* 				FALL 2019 				*/

window.confirm("Ready to play?"); // start the play when player confirms the message
var width = window.innerWidth;
height = window.innerHeight;

var bulletflag = false; // flag to trigger when to shoot a bullet
var renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(width, height);
document.body.appendChild(renderer.domElement);

var scene = new THREE.Scene;


const loader = new THREE.TextureLoader(); // loader to load textures


var numofenemies = 5; // countdown to declare win once all enemies die
// 3 way trigger flags, 0 means no shoot, 1 means shoot in + axis and 2 means shoot in - axis
var etrig0x = 0;
var etrig0z = 0;
var etrig1x = 0;
var etrig1z = 0;
var etrig2x = 0;
var etrig2z = 0;
var etrig3x = 0;
var etrig3z = 0;
var etrig4x = 0;
var etrig4z = 0;

// MAP Design //
var wall0dim = new THREE.BoxGeometry(10, 200, 2000);
var wall0Material = new THREE.MeshBasicMaterial({
    map: loader.load('https://static.wixstatic.com/media/3176fe_7b413c68b5c448dba015a3d96ed04a16.jpg'),
  });
var wall0 = new THREE.Mesh(wall0dim, wall0Material);
wall0.position.set(1000, 100, 0);

var wall1dim = new THREE.BoxGeometry(10, 200, 2000);
var wall1Material = new THREE.MeshBasicMaterial({
    map: loader.load('https://static.wixstatic.com/media/3176fe_7b413c68b5c448dba015a3d96ed04a16.jpg'),
  });
var wall1 = new THREE.Mesh(wall1dim, wall1Material);
wall1.position.set(-1000, 100, 0);

var wall2dim = new THREE.BoxGeometry(10, 200, 2000);
var wall2Material = new THREE.MeshBasicMaterial({
    map: loader.load('https://static.wixstatic.com/media/3176fe_7b413c68b5c448dba015a3d96ed04a16.jpg'),
  });
var wall2 = new THREE.Mesh(wall2dim, wall2Material);
wall2.position.set(0, 100, 1000);
wall2.rotation.y = Math.PI * 90 / 180;

var wall3dim = new THREE.BoxGeometry(10, 200, 2000);
var wall3Material = new THREE.MeshBasicMaterial({
    map: loader.load('https://static.wixstatic.com/media/3176fe_7b413c68b5c448dba015a3d96ed04a16.jpg'),
  });
var wall3 = new THREE.Mesh(wall3dim, wall3Material);
wall3.position.set(0, 100, -1000);
wall3.rotation.y = -Math.PI * 90 / 180;

var floordim = new THREE.BoxGeometry(2000, 0, 2000);
var floorMaterial = new THREE.MeshLambertMaterial({ color: 0xeeeeee });
var floor = new THREE.Mesh(floordim, floorMaterial);
floor.position.set(0,0,0);

var innerwall0dim = new THREE.BoxGeometry(10, 200, 1200);
var innerwall0Material = new THREE.MeshBasicMaterial({
    map: loader.load('https://static.wixstatic.com/media/3176fe_7b413c68b5c448dba015a3d96ed04a16.jpg'),
  });
var innerwall0 = new THREE.Mesh(innerwall0dim, innerwall0Material);
innerwall0.position.set(-600, 100, 0);

var innerwall1dim = new THREE.BoxGeometry(10, 200, 1200);
var innerwall1Material = new THREE.MeshBasicMaterial({
    map: loader.load('https://static.wixstatic.com/media/3176fe_7b413c68b5c448dba015a3d96ed04a16.jpg'),
  });
var innerwall1 = new THREE.Mesh(innerwall1dim, innerwall1Material);
innerwall1.position.set(600, 100, 0);

// add walls to the scene
scene.add(wall0);
scene.add(wall1);
scene.add(wall2);
scene.add(wall3);
scene.add(innerwall0);
scene.add(innerwall1);
scene.add(floor);

/*  make box shaped enemies */
var enemy0dim = new THREE.BoxGeometry(50, 150, 50);
var enemy0Material = new THREE.MeshBasicMaterial({
	map: loader.load('https://cdn0.iconfinder.com/data/icons/outlined-emoticons-pack/200/emoticons_evil-512.png'),
	})
var enemy0 = new THREE.Mesh(enemy0dim, enemy0Material);
enemy0.position.set(-400,100,-800);

var enemy1dim = new THREE.BoxGeometry(50, 150, 50);
var enemy1Material = new THREE.MeshBasicMaterial({
	map: loader.load('https://cdn0.iconfinder.com/data/icons/outlined-emoticons-pack/200/emoticons_evil-512.png'),
	})
var enemy1 = new THREE.Mesh(enemy1dim, enemy1Material);
enemy1.position.set(-500, 100, 800);

var enemy2dim = new THREE.BoxGeometry(50, 150, 50);
var enemy2Material = new THREE.MeshBasicMaterial({
	map: loader.load('https://cdn0.iconfinder.com/data/icons/outlined-emoticons-pack/200/emoticons_evil-512.png'),
	})
var enemy2 = new THREE.Mesh(enemy2dim, enemy2Material);
enemy2.position.set(0, 100, 0);

var enemy3dim = new THREE.BoxGeometry(50, 150, 50);
var enemy3Material = new THREE.MeshBasicMaterial({
	map: loader.load('https://cdn0.iconfinder.com/data/icons/outlined-emoticons-pack/200/emoticons_evil-512.png'),
	})
var enemy3 = new THREE.Mesh(enemy3dim, enemy3Material);
enemy3.position.set(800, 100, -300);

var enemy4dim = new THREE.BoxGeometry(50, 150, 50);
var enemy4Material = new THREE.MeshBasicMaterial({
	map: loader.load('https://cdn0.iconfinder.com/data/icons/outlined-emoticons-pack/200/emoticons_evil-512.png'),
	})
var enemy4 = new THREE.Mesh(enemy4dim, enemy4Material);
enemy4.position.set(-500, 100, -200);

// add enemies to scene
scene.add(enemy0);
scene.add(enemy1);
scene.add(enemy2);
scene.add(enemy3);
scene.add(enemy4);

// make bullet for each enemy. It moves with the bot //
var bullet0dim = new THREE.BoxGeometry(10, 10, 10);					
var bullet0material = new THREE.MeshPhongMaterial({color:0xaaa9ad});
var bullet0 = new THREE.Mesh(bullet0dim, bullet0material);
bullet0.position.set(enemy0.position.x, enemy0.position.y, enemy0.position.z);
scene.add(bullet0);

var bullet1dim = new THREE.BoxGeometry(10, 10, 10);					
var bullet1material = new THREE.MeshPhongMaterial({color:0xaaa9ad});
var bullet1 = new THREE.Mesh(bullet1dim, bullet1material);
bullet1.position.set(enemy1.position.x, enemy1.position.y, enemy1.position.z);
scene.add(bullet1);

var bullet2dim = new THREE.BoxGeometry(10, 10, 10);					
var bullet2material = new THREE.MeshPhongMaterial({color:0xaaa9ad});
var bullet2 = new THREE.Mesh(bullet2dim, bullet2material);
bullet2.position.set(enemy2.position.x, enemy2.position.y, enemy2.position.z);
scene.add(bullet2);

var bullet3dim = new THREE.BoxGeometry(10, 10, 10);					
var bullet3material = new THREE.MeshPhongMaterial({color:0xaaa9ad});
var bullet3 = new THREE.Mesh(bullet3dim, bullet3material);
bullet3.position.set(enemy3.position.x, enemy3.position.y, enemy3.position.z);
scene.add(bullet3);

var bullet4dim = new THREE.BoxGeometry(10, 10, 10);					
var bullet4material = new THREE.MeshPhongMaterial({color:0xaaa9ad});
var bullet4 = new THREE.Mesh(bullet4dim, bullet4material);
bullet4.position.set(enemy4.position.x, enemy4.position.y, enemy4.position.z);
scene.add(bullet4);



/* Camera and Lights*/ 
var camera = new THREE.PerspectiveCamera(90, width / height, 0.1, 10000);

// this is a first person game and hence camera itself is the player //
camera.position.set(-900,100,-900);
point = new THREE.Vector3(1, 0, 0);
camera.lookAt(point);
camera.up.set(0,1,0);

// bullet for player //
var bulletdim = new THREE.BoxGeometry(10, 10, 10);					
var bulletmaterial = new THREE.MeshPhongMaterial({color:0xaaa9ad});
var bullet = new THREE.Mesh(bulletdim, bulletmaterial);
bullet.position.set(camera.position.x, camera.position.y, camera.position.z);
scene.add(bullet);

// a box shaped box that is attached around camera. To make it more like other robots and so that it can be easily shot by bots //
var camBoxdim = new THREE.BoxGeometry(50, 150, 50);
var camBoxmaterial = new THREE.MeshPhongMaterial({color:0xffffff, opacity:1, transparent:true});
var camBox = new THREE.Mesh(camBoxdim, camBoxmaterial);
camBox.position.set(camera.position.x, camera.position.y - 25, camera.position.z);

scene.add(camera);
scene.add(camBox);

// backdrop //
var skyboxGeometry = new THREE.CubeGeometry(10000, 10000, 10000);
var skyboxMaterial = new THREE.MeshBasicMaterial({ color: 0xf1f1f1, side: THREE.BackSide });
var skybox = new THREE.Mesh(skyboxGeometry, skyboxMaterial);

scene.add(skybox);

// hemisphere light //
const hemiLight = new THREE.HemisphereLight(0xffffff, 0xffffff, 0.61);
hemiLight.position.set(200,200,100)
var pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(200, 200, 100);
var pointLight1 = new THREE.PointLight(0xffffff);
pointLight1.position.set(-200,100,100);
scene.add(pointLight);
scene.add(pointLight1);

/* Direction of player */
const distance = 10;
var direction = new THREE.Vector3();
camera.getWorldDirection( direction );


// Bounding box for each wall and enemy boxes //
wall0.geometry.computeBoundingBox();
wall1.geometry.computeBoundingBox();
wall2.geometry.computeBoundingBox();
floor.geometry.computeBoundingBox();
wall3.geometry.computeBoundingBox();
innerwall0.geometry.computeBoundingBox();
innerwall1.geometry.computeBoundingBox();

enemy0.geometry.computeBoundingBox();
enemy1.geometry.computeBoundingBox();
enemy2.geometry.computeBoundingBox();
enemy3.geometry.computeBoundingBox();
enemy4.geometry.computeBoundingBox();

var bboxW0 = new THREE.Box3(new THREE.Vector3(), new THREE.Vector3());
var bboxW1 = new THREE.Box3(new THREE.Vector3(), new THREE.Vector3());
var bboxW2 = new THREE.Box3(new THREE.Vector3(), new THREE.Vector3());
var bboxW3 = new THREE.Box3(new THREE.Vector3(), new THREE.Vector3());
var bboxF = new THREE.Box3(new THREE.Vector3(), new THREE.Vector3());
var bboxIW0 = new THREE.Box3(new THREE.Vector3(), new THREE.Vector3());
var bboxIW1 = new THREE.Box3(new THREE.Vector3(), new THREE.Vector3());

var bboxE0 = new THREE.Box3(new THREE.Vector3(), new THREE.Vector3());
var bboxE1 = new THREE.Box3(new THREE.Vector3(), new THREE.Vector3());
var bboxE2 = new THREE.Box3(new THREE.Vector3(), new THREE.Vector3());
var bboxE3 = new THREE.Box3(new THREE.Vector3(), new THREE.Vector3());
var bboxE4 = new THREE.Box3(new THREE.Vector3(), new THREE.Vector3());


bboxW0.setFromObject(wall0);
bboxW1.setFromObject(wall1);
bboxW2.setFromObject(wall2);
bboxW3.setFromObject(wall3);
bboxF.setFromObject(floor);
bboxIW0.setFromObject(innerwall0);
bboxIW1.setFromObject(innerwall1);

bboxE0.setFromObject(enemy0);
bboxE1.setFromObject(enemy1);
bboxE2.setFromObject(enemy2);
bboxE3.setFromObject(enemy3);
bboxE4.setFromObject(enemy4);


var directionflag = false; // a flag that directs the game when to bring back the bullet

document.addEventListener("keydown", handleKeyDown, false);

function handleKeyDown(event){
	
	switch(event.code){
			
		case "KeyW":
			// move forward 
			camera.getWorldDirection( direction ); // get the direction in which camera is looking
			camera.position.set( camera.position.x + (10*direction.x), camera.position.y, camera.position.z + (10*direction.z)); // move player to that location //
			camBox.position.set(camera.position.x, camera.position.y - 25, camera.position.z); // move cambox to that location //
			camBox.geometry.computeBoundingBox(); // update bounding box //
			if (!directionflag)
			{
				bullet.position.set(camera.position.x, camera.position.y, camera.position.z); // if direction flag is on than store the bullet back to camera
			}
			var bboxCB = new THREE.Box3(new THREE.Vector3(), new THREE.Vector3());
			bboxCB.setFromObject(camBox);

			if (bboxCB.intersectsBox(bboxW0) || bboxCB.intersectsBox(bboxW1) || bboxCB.intersectsBox(bboxW2) || bboxCB.intersectsBox(bboxW3) || bboxCB.intersectsBox(bboxIW0) || bboxCB.intersectsBox(bboxIW1) || bboxCB.intersectsBox(bboxE0) || bboxCB.intersectsBox(bboxE1) || bboxCB.intersectsBox(bboxE2) || bboxCB.intersectsBox(bboxE3) || bboxCB.intersectsBox(bboxE4))
			{	
				window.confirm("Game Over");
				window.location.reload();
			}
			break;
			
		case "KeyS":
			// move backwards
			camera.getWorldDirection( direction );
			camera.position.set( camera.position.x - (10*direction.x), camera.position.y, camera.position.z - (10*direction.z));
			camBox.position.set(camera.position.x, camera.position.y - 25, camera.position.z);
			camBox.geometry.computeBoundingBox();
			if (!directionflag)
			{
				bullet.position.set(camera.position.x, camera.position.y, camera.position.z);
			}			
			var bboxCB = new THREE.Box3(new THREE.Vector3(), new THREE.Vector3());
			bboxCB.setFromObject(camBox);
			
			if (bboxCB.intersectsBox(bboxW0) || bboxCB.intersectsBox(bboxW1) || bboxCB.intersectsBox(bboxW2) || bboxCB.intersectsBox(bboxW3) || bboxCB.intersectsBox(bboxIW0) || bboxCB.intersectsBox(bboxIW1) || bboxCB.intersectsBox(bboxE0) || bboxCB.intersectsBox(bboxE1) || bboxCB.intersectsBox(bboxE2) || bboxCB.intersectsBox(bboxE3) || bboxCB.intersectsBox(bboxE4))
			{	
				window.confirm("Game Over");
				window.location.reload();
			}
			
			break;
			
		 case "KeyQ":
			// rotate along z axis if camera gets misaligned //
			camera.rotation.z += Math.PI/108;
			break;
			
		case "KeyE":
			// rotate along z axis if camera gets misaligned //
			camera.rotation.z -= Math.PI/108;
			break; 
			
		case "KeyA":
			// rotate along y axis //
			camera.rotation.y -= Math.PI/100;
			camera.rotation.x = camera.rotation.x;
			camera.rotation.z = camera.rotation.z;
			break;
			
		case "KeyD":
			// rotate along y axis //
			camera.rotation.y += Math.PI/100;
			camera.rotation.x = camera.rotation.x;
			camera.rotation.z = camera.rotation.z;
			break;
		
		case "Space":
			// switch on bullet flag //
			bulletflag = true;
			break;
	}

}




var d = new THREE.Vector3(); // direction storage vector //
function render() {

		requestAnimationFrame(render);
		bullet.__dirtyPosition = true;
		bullet.geometry.computeBoundingBox();
		var bboxB = new THREE.Box3(new THREE.Vector3(), new THREE.Vector3());
		bboxB.setFromObject(bullet); // update bbox of player bullet
		
		// moving enemies //
		try
		{
			if (enemy0.position.x + 5 < wall0.position.x - 100)
			{
				enemy0.position.x += 0.5;
				bullet0.position.x += 0.5;
				enemy0.geometry.computeBoundingBox();
				bboxE0.setFromObject(enemy0);
			}
			else if(enemy0.position.z + 5 < wall2.position.x - 100)
			{
				enemy0.position.z += 0.5;
				bullet0.position.z += 0.5;
				enemy0.geometry.computeBoundingBox();
				bboxE0.setFromObject(enemy0);
			}
		}
		catch(e)
		{
			false;
		}
		
		try
		{
			if (enemy1.position.x + 0.5 < wall2.position.x - 100)
			{
				enemy1.position.x += 0.5;
				bullet1.position.x += 0.5;
				enemy1.geometry.computeBoundingBox();
				bboxE1.setFromObject(enemy1);
			}
			else if(enemy1.position.z + 0.5 < wall1.position.x - 100)
			{
				enemy1.position.z += 0.5;
				bullet1.position.z += 0.5;
				enemy1.geometry.computeBoundingBox();
				bboxE1.setFromObject(enemy1);
			}
		}
		catch(e)
		{
			false;
		}
		try
		{
			if ((enemy2.position.x - 0.5 > innerwall0.position.x + 100) && (enemy2.position.x - 0.5 > wall1.position.x + 100))
			{
				enemy2.position.x -= 0.5;
				bullet2.position.x -= 0.5;
				enemy2.geometry.computeBoundingBox();
				bboxE2.setFromObject(enemy2);
			}
			else if ((enemy2.position.z + 0.5 <= innerwall1.position.x - 100) && (enemy2.position.z - 0.5  > wall1.position.x + 100))
			{
				enemy2.position.z -= 0.5;
				bullet2.position.z -= 0.5;
				enemy2.geometry.computeBoundingBox();
				bboxE2.setFromObject(enemy2);
			}
		}
		catch(e)
		{
			false;
		}
		
		try
		{
			if (enemy3.position.z - 0.5 > wall3.position.z + 100)
			{
				enemy3.position.z -= 0.5;
				bullet3.position.z -= 0.5;
				enemy3.geometry.computeBoundingBox();
				bboxE3.setFromObject(enemy3);
			}
		}
		catch(e)
		{
			false;
		}
		
		try
		{
			if (enemy4.position.x + 0.5 < innerwall1.position.x - 100)
			{
				enemy4.position.x += 0.5;
				bullet4.position.x += 0.5;
				enemy4.geometry.computeBoundingBox();
				bboxE4.setFromObject(enemy4);
			}
		}
		catch(e)
		{
			false;
		}
		
		// recompute bounding box of each enemies bullet)
		bullet0.geometry.computeBoundingBox();
		bullet1.geometry.computeBoundingBox();
		bullet2.geometry.computeBoundingBox();
		bullet3.geometry.computeBoundingBox();
		bullet4.geometry.computeBoundingBox();

		var bboxb0 = new THREE.Box3(new THREE.Vector3(), new THREE.Vector3());
		var bboxb1 = new THREE.Box3(new THREE.Vector3(), new THREE.Vector3());
		var bboxb2 = new THREE.Box3(new THREE.Vector3(), new THREE.Vector3());
		var bboxb3 = new THREE.Box3(new THREE.Vector3(), new THREE.Vector3());
		var bboxb4 = new THREE.Box3(new THREE.Vector3(), new THREE.Vector3());
		
		bboxb0.setFromObject(bullet0);
		bboxb1.setFromObject(bullet1);
		bboxb2.setFromObject(bullet2);
		bboxb3.setFromObject(bullet3);
		bboxb4.setFromObject(bullet4);
		
		// when player shoots do this //
		if (bulletflag == true && !(bboxB.intersectsBox(bboxW0) || bboxB.intersectsBox(bboxW1) || bboxB.intersectsBox(bboxW2) || bboxB.intersectsBox(bboxW3) || bboxB.intersectsBox(bboxIW0) || bboxB.intersectsBox(bboxIW1) || bboxB.intersectsBox(bboxE0) || bboxB.intersectsBox(bboxE1) || bboxB.intersectsBox(bboxE2) || bboxB.intersectsBox(bboxE3) || bboxB.intersectsBox(bboxE4)))
		{	
			if (bullet.position.x == camera.position.x || bullet.position.z == camera.position.z)
			{	
				camera.getWorldDirection( direction );
				d.x = direction.x;
				d.y = direction.y;
				d.z = direction.z;
				bullet.position.set(bullet.position.x + (10*d.x), bullet.position.y, bullet.position.z + (10*d.z));
				directionflag = true;
			}
			bullet.position.set(bullet.position.x + (10*d.x), bullet.position.y, bullet.position.z + (10*d.z));
		}	
		else
		{
			bullet.position.set(camera.position.x, camera.position.y, camera.position.z);
			bulletflag = false;
			directionflag = false;
			
			// enemies die when shot at //
			if (bboxB.intersectsBox(bboxE0))
			{
					enemy0.position.y = 1000;
					enemy0.geometry.computeBoundingBox();
					bboxE0.setFromObject(enemy0);
					scene.remove(enemy0);
					bullet0.position.y = 1000;
					bullet0.geometry.computeBoundingBox();
					bboxb0.setFromObject(bullet0);
					scene.remove(bullet0);
					numofenemies -= 1;
			}
			
			if (bboxB.intersectsBox(bboxE1))
			{
					enemy1.position.y = 1000;
					enemy1.geometry.computeBoundingBox();
					bboxE1.setFromObject(enemy1);
					scene.remove(enemy1);
					bullet1.position.y = 1000;
					bullet1.geometry.computeBoundingBox();
					bboxb1.setFromObject(bullet1);
					scene.remove(bullet1);
					numofenemies -= 1;
			}
			
			if (bboxB.intersectsBox(bboxE2))
			{
					enemy2.position.y = 1000;
					enemy2.geometry.computeBoundingBox();
					bboxE2.setFromObject(enemy2);
					scene.remove(enemy2);
					bullet2.position.y = 1000;
					bullet2.geometry.computeBoundingBox();
					bboxb2.setFromObject(bullet2);
					scene.remove(bullet2);
					numofenemies -= 1;
			}
			if (bboxB.intersectsBox(bboxE3))
			{
					enemy3.position.y = 1000;
					enemy3.geometry.computeBoundingBox();
					bboxE3.setFromObject(enemy3);
					scene.remove(enemy3);
					bullet3.position.y = 1000;
					bullet3.geometry.computeBoundingBox();
					bboxb3.setFromObject(bullet3);
					scene.remove(bullet3);
					numofenemies -= 1;
			}
			if (bboxB.intersectsBox(bboxE4))
			{
					enemy4.position.y = 1000;
					enemy4.geometry.computeBoundingBox();
					bboxE4.setFromObject(enemy4);
					scene.remove(enemy4);
					bullet4.position.y = 1000;
					bullet4.geometry.computeBoundingBox();
					bboxb4.setFromObject(bullet4);
					scene.remove(bullet4);
					numofenemies -= 1;
			}			

			
		}
		// when no enemies left game won
		if (numofenemies == 0)
		{
			window.confirm("Hurray!!!! You won the game");
			location.reload();
		}
		
		// recompute bbox for cambox
		camBox.geometry.computeBoundingBox();
		var bboxCB = new THREE.Box3(new THREE.Vector3(), new THREE.Vector3());
		bboxCB.setFromObject(camBox);
		
		
		// if enemy shot hit player then player is dead //
		if (bboxb0.intersectsBox(bboxCB) || bboxb1.intersectsBox(bboxCB) || bboxb2.intersectsBox(bboxCB) || bboxb3.intersectsBox(bboxCB) || bboxb4.intersectsBox(bboxCB))
		{
			window.confirm("Game Over: You got shot!");
			location.reload();
		}
		
		// enemy shot logic //
		if (etrig0x == 1)
		{
			bullet0.position.x -= 5;
		}
		else if(etrig0x == 2)
		{
			bullet0.position.x += 5;
		}
		else if(etrig0z == 1)
		{
			bullet0.position.z -= 5;
		}
		else if(etrig0z == 2)
		{
			bullet0.position.z += 5;
		}
		
		if (etrig1x == 1)
		{
			bullet1.position.x -= 5;
		}
		else if(etrig1x == 2)
		{
			bullet1.position.x += 5;
		}
		else if(etrig1z == 1)
		{
			bullet1.position.z -= 5;
		}
		else if(etrig1z == 2)
		{
			bullet1.position.z += 5;
		}
		
		if (etrig2x == 1)
		{
			bullet2.position.x -= 5;
		}
		else if(etrig2x == 2)
		{
			bullet2.position.x += 5;
		}
		else if(etrig2z == 1)
		{
			bullet2.position.z -= 5;
		}
		else if(etrig2z == 2)
		{
			bullet2.position.z += 5;
		}
		
		if (etrig3x == 1)
		{
			bullet3.position.x -= 5;
		}
		else if(etrig3x == 2)
		{
			bullet3.position.x += 5;
		}
		else if(etrig3z == 1)
		{
			bullet3.position.z -= 5;
		}
		else if(etrig3z == 2)
		{
			bullet3.position.z += 5;
		}
		
		if (etrig4x == 1)
		{
			bullet4.position.x -= 5;
		}
		else if(etrig4x == 2)
		{
			bullet4.position.x += 5;
		}
		else if(etrig4z == 1)
		{
			bullet4.position.z -= 5;
		}
		else if(etrig4z == 2)
		{
			bullet4.position.z += 5;
		}
		
		// enemy bot shooting
		if (enemy0.position.z <= camera.position.z + 25 && enemy0.position.z > camera.position.z - 25)
		{
			if (camera.position.x <= enemy0.position.x)
			{
				bullet0.position.x -= 5;
				etrig0x = 1;
			}
			else
			{
				bullet0.position.x += 5;
				etrig0x = 2;

			}				
		}
		else if (enemy0.position.x <= camera.position.x + 25 && enemy0.position.x > camera.position.x - 25)
		{
			if (camera.position.z <= enemy0.position.z)
			{
				bullet0.position.z -= 5;
				etrig0z = 1;
				
			}
			else
			{
				bullet0.position.z += 5;

				etrig0z = 2;
				
			}				
		}
		
		if (enemy1.position.z <= camera.position.z + 25 && enemy1.position.z > camera.position.z - 25)
		{
			if (camera.position.x <= enemy1.position.x)
			{
				bullet1.position.x -= 5;
				etrig1x = 1;
				
			}
			else
			{
				bullet1.position.x += 5;
				etrig1x = 2;
				
			}				
		}
		
		if (enemy1.position.x <= camera.position.x + 25 && enemy1.position.x > camera.position.x - 25)
		{
			if (camera.position.z <= enemy1.position.z)
			{
				bullet1.position.z -= 5;
				etrig1z = 1;
				
			}
			else
			{
				bullet1.position.z += 5;
				etrig1z = 2;
				
			}				
		}
		
		if (enemy2.position.z <= camera.position.z + 25 && enemy2.position.z > camera.position.z - 25)
		{
			if (camera.position.x <= enemy1.position.x)
			{
				bullet2.position.x -= 5;
				etrig2x = 1;
	
			}
			else
			{
				bullet2.position.x += 5;
				etrig2x = 2;
				
			}				
		}
		
		if (enemy2.position.x <= camera.position.x + 25 && enemy2.position.x > camera.position.x - 25)
		{
			if (camera.position.z <= enemy2.position.z)
			{
				bullet2.position.z -= 5;
				etrig2z = 1;
				
			}
			else
			{
				bullet2.position.z += 5;
				etrig2z = 2;
				
			}				
		}
		
		if (enemy3.position.z <= camera.position.z + 25 && enemy3.position.z > camera.position.z - 25)
		{
			if (camera.position.x <= enemy3.position.x)
			{
				bullet3.position.x -= 5;
				etrig3x = 1;
			
			}
			else
			{
				bullet3.position.x += 5;
				etrig3x = 2;
			}				
		}
		
		if (enemy3.position.x <= camera.position.x + 25 && enemy3.position.x > camera.position.x - 25)
		{
			if (camera.position.z <= enemy3.position.z)
			{
				bullet3.position.z -= 5;
				etrig3z = 1;
				
			}
			else
			{
				bullet3.position.z += 5;
				etrig3z = 2;
				
			}				
		}
		
		if (enemy4.position.z <= camera.position.z + 25 && enemy4.position.z > camera.position.z - 25)
		{
			if (camera.position.x <= enemy4.position.x)
			{
				bullet4.position.x -= 5;
				etrig4x = 1;
			}
			else
			{
				bullet4.position.x += 5;
				etrig4x = 2;
				
			}				
		}
		
		if (enemy4.position.x <= camera.position.x + 25 && enemy4.position.x > camera.position.x - 25)
		{
			if (camera.position.z <= enemy4.position.z)
			{
				bullet4.position.z -= 5;
				etrig4z = 1;
				
			}
			else
			{
				bullet4.position.z += 5;
				etrig4z = 2;
		
			}				
		}
		
		
		
		bboxb0.setFromObject(bullet0);
		bboxb1.setFromObject(bullet1);
		bboxb2.setFromObject(bullet2);
		bboxb3.setFromObject(bullet3);
		bboxb4.setFromObject(bullet4);
		
		// destroy enemy bullet if then hit a wall //
		if (bboxb0.intersectsBox(bboxW0) || bboxb0.intersectsBox(bboxW1) || bboxb0.intersectsBox(bboxW2) || bboxb0.intersectsBox(bboxW3) || bboxb0.intersectsBox(bboxIW0) || bboxb0.intersectsBox(bboxIW1))
		{
			bullet0.position.set(enemy0.position.x, enemy0.position.y, enemy0.position.z);
			etrig0x = 0;
			etrig0z = 0;
		}
		
		if (bboxb1.intersectsBox(bboxW0) || bboxb1.intersectsBox(bboxW1) || bboxb1.intersectsBox(bboxW2) || bboxb1.intersectsBox(bboxW3) || bboxb1.intersectsBox(bboxIW0) || bboxb1.intersectsBox(bboxIW1))
		{
			bullet1.position.set(enemy1.position.x, enemy1.position.y, enemy1.position.z);
			etrig1x = 0;
			etrig1z = 0;
		}
		
		if (bboxb2.intersectsBox(bboxW0) || bboxb2.intersectsBox(bboxW1) || bboxb2.intersectsBox(bboxW2) || bboxb2.intersectsBox(bboxW3) || bboxb2.intersectsBox(bboxIW0) || bboxb2.intersectsBox(bboxIW1))
		{
			bullet2.position.set(enemy2.position.x, enemy2.position.y, enemy2.position.z);
			etrig2x = 0;
			etrig2z = 0;
		}
		
		if (bboxb3.intersectsBox(bboxW0) || bboxb3.intersectsBox(bboxW1) || bboxb3.intersectsBox(bboxW2) || bboxb3.intersectsBox(bboxW3) || bboxb3.intersectsBox(bboxIW0) || bboxb3.intersectsBox(bboxIW1))
		{
			bullet3.position.set(enemy3.position.x, enemy3.position.y, enemy3.position.z);
			etrig3x = 0;
			etrig3z = 0;
		}
		
		if (bboxb4.intersectsBox(bboxW0) || bboxb4.intersectsBox(bboxW1) || bboxb4.intersectsBox(bboxW2) || bboxb4.intersectsBox(bboxW3) || bboxb4.intersectsBox(bboxIW0) || bboxb4.intersectsBox(bboxIW1))
		{
			bullet4.position.set(enemy4.position.x, enemy4.position.y, enemy4.position.z);
			etrig4x = 0;
			etrig4z = 0;
		}
		
		
		renderer.render(scene, camera);




}
render();