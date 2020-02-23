
var width = window.innerWidth;
var height = window.innerHeight;

var renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(width, height);
document.body.appendChild(renderer.domElement);

var scene = new THREE.Scene;

var wall0dim = new THREE.BoxGeometry(10, 100, 1000);
var wall0Material = new THREE.MeshLambertMaterial({ color: 0xff8300 });
var wall0 = new THREE.Mesh(wall0dim, wall0Material);
wall0.position.set(-300, -100, -100)
wall0.rotation.y = Math.PI * 45 / 180;

var wall1dim = new THREE.BoxGeometry(10, 100, 1000);
var wall1Material = new THREE.MeshLambertMaterial({ color: 0xff8300 });
var wall1 = new THREE.Mesh(wall1dim, wall1Material);
wall1.position.set(-300, -100, -800)
wall1.rotation.y = Math.PI * 135 / 180;

var wall2dim = new THREE.BoxGeometry(10, 100, 1000);
var wall2Material = new THREE.MeshLambertMaterial({ color: 0xff8300 });
var wall2 = new THREE.Mesh(wall2dim, wall2Material);
wall2.position.set(400, -100, -800)
wall2.rotation.y = Math.PI * 45 / 180;

var wall3dim = new THREE.BoxGeometry(10, 100, 1000);
var wall3Material = new THREE.MeshLambertMaterial({ color: 0xff8300 });
var wall3 = new THREE.Mesh(wall3dim, wall3Material);
wall3.position.set(400, -100, -100)
wall3.rotation.y = Math.PI * 135 / 180;

var floordim = new THREE.BoxGeometry(1000, 0, 1000);
var floorMaterial = new THREE.MeshLambertMaterial({ color: 0xffffff });
var floor = new THREE.Mesh(floordim, floorMaterial);
floor.position.set(50, -150, -450);
floor.rotation.y = Math.PI * 45 / 180;

var innerwall0dim = new THREE.BoxGeometry(10, 100, 500);
var innerwall0Material = new THREE.MeshLambertMaterial({ color: 0xff8300 });
var innerwall0 = new THREE.Mesh(innerwall0dim, innerwall0Material);
innerwall0.position.set(200, -100, -300)
innerwall0.rotation.y = Math.PI * 135 / 180;

var innerwall1dim = new THREE.BoxGeometry(10, 100, 500);
var innerwall1Material = new THREE.MeshLambertMaterial({ color: 0xff8300 });
var innerwall1 = new THREE.Mesh(innerwall1dim, innerwall1Material);
innerwall1.position.set(-100, -100, -600)
innerwall1.rotation.y = Math.PI * 135 / 180;

scene.add(wall0);
scene.add(wall1);
scene.add(wall2);
scene.add(wall3);
scene.add(innerwall0);
scene.add(innerwall1);
scene.add(floor);

//var camera = new THREE.OrthographicCamera( width / - 2, width / 2, height / 2, height / - 2, 1, 100000 );
var camera = new THREE.PerspectiveCamera(90, width / height, 0.1, 10000);

camera.position.x = floor.position.x/2;
camera.position.y = floor.position.y + 50;
camera.position.z = floor.position.z/2;
camera.rotation.y = Math.PI * 135/180;
camera.lookAt(1,0,0);
camera.up.set(0,0,1);

scene.add(camera);


var skyboxGeometry = new THREE.CubeGeometry(10000, 10000, 10000);
var skyboxMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff, side: THREE.BackSide });
var skybox = new THREE.Mesh(skyboxGeometry, skyboxMaterial);

scene.add(skybox);

var pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(200, 200, 100);
var pointLight1 = new THREE.PointLight(0xffffff);
pointLight1.position.set(-200,100,100);
scene.add(pointLight);
scene.add(pointLight1);

var clock = new THREE.Clock();

const distance = 10;
var direction = new THREE.Vector3();
camera.getWorldDirection( direction );

document.addEventListener("keydown", handleKeyDown, false);
function handleKeyDown(event){
	
	switch(event.code){
		/* case "KeyA":
			camera.position.z += 10;
			break;
		
		case "KeyD":
			camera.position.z -= 10;
			break; */
			
		case "KeyW":
			camera.getWorldDirection( direction );
			camera.position.add(direction.multiplyScalar(distance));
			break;
			
		case "KeyS":
			camera.getWorldDirection( direction );
			camera.position.add( direction.multiplyScalar(-distance));
			break;
			
		/* case "KeyQ":
			camera.position.y += 10;
			break;
			
		case "KeyE":
			camera.position.y -= 10;
			break; */
			
		case "KeyA":
			camera.rotation.x -= Math.PI/100;
			break;
			
		case "KeyD":
			camera.rotation.y += Math.PI/100;
			break;
		
		
	}
}


function render() {
		requestAnimationFrame(render);
		renderer.render(scene, camera);
}


render();
