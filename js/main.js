//Scene, camera and renderer being initialised
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor( 0xf4aa76, 1);
renderer.shadowMapEnabled = true;
renderer.shadowMapSoft = false;
document.body.appendChild(renderer.domElement);

//Declaring Variables
var canvas = document.querySelector('canvas');
var sunAngle = 0;
var sun = new THREE.DirectionalLight( 0xffffff, 1);
var sunneg = new THREE.DirectionalLight( 0xffffff, 1);
var sunpos = new THREE.DirectionalLight( 0xffffff, 1);
var voxgeometry = new THREE.BoxGeometry(1, 1, 1);
var voxmaterial = new THREE.MeshLambertMaterial( {color: 0x888888} );
var voxmaterial1 = new THREE.MeshLambertMaterial( {color: 0xF06D41} );
var voxmaterial2 = new THREE.MeshLambertMaterial( {color: 0xCC6E4E} );
var voxmaterial3 = new THREE.MeshLambertMaterial( {color: 0xC44318} );
var voxarrindnum = 0;
var altitude = 0;
var colourOrder = 0;
var initColours = [];
var map = [
[Math.round((Math.random() * 4) + 1), Math.round((Math.random() * 4) + 1), Math.round((Math.random() * 4) + 1), Math.round((Math.random() * 4) + 1), Math.round((Math.random() * 4) + 1), Math.round((Math.random() * 4) + 1), Math.round((Math.random() * 4) + 1), Math.round((Math.random() * 4) + 1), Math.round((Math.random() * 4) + 1), Math.round((Math.random() * 4) + 1)], 
[Math.round((Math.random() * 4) + 1), Math.round((Math.random() * 4) + 1), Math.round((Math.random() * 4) + 1), Math.round((Math.random() * 4) + 1), Math.round((Math.random() * 4) + 1), Math.round((Math.random() * 4) + 1), Math.round((Math.random() * 4) + 1), Math.round((Math.random() * 4) + 1), Math.round((Math.random() * 4) + 1), Math.round((Math.random() * 4) + 1)], 
[Math.round((Math.random() * 4) + 1), Math.round((Math.random() * 4) + 1), Math.round((Math.random() * 4) + 1), Math.round((Math.random() * 4) + 1), Math.round((Math.random() * 4) + 1), Math.round((Math.random() * 4) + 1), Math.round((Math.random() * 4) + 1), Math.round((Math.random() * 4) + 1), Math.round((Math.random() * 4) + 1), Math.round((Math.random() * 4) + 1)], 
[Math.round((Math.random() * 4) + 1), Math.round((Math.random() * 4) + 1), Math.round((Math.random() * 4) + 1), Math.round((Math.random() * 4) + 1), Math.round((Math.random() * 4) + 1), Math.round((Math.random() * 4) + 1), Math.round((Math.random() * 4) + 1), Math.round((Math.random() * 4) + 1), Math.round((Math.random() * 4) + 1), Math.round((Math.random() * 4) + 1)], 
[Math.round((Math.random() * 4) + 1), Math.round((Math.random() * 4) + 1), Math.round((Math.random() * 4) + 1), Math.round((Math.random() * 4) + 1), Math.round((Math.random() * 4) + 1), Math.round((Math.random() * 4) + 1), Math.round((Math.random() * 4) + 1), Math.round((Math.random() * 4) + 1), Math.round((Math.random() * 4) + 1), Math.round((Math.random() * 4) + 1)], 
[Math.round((Math.random() * 4) + 1), Math.round((Math.random() * 4) + 1), Math.round((Math.random() * 4) + 1), Math.round((Math.random() * 4) + 1), Math.round((Math.random() * 4) + 1), Math.round((Math.random() * 4) + 1), Math.round((Math.random() * 4) + 1), Math.round((Math.random() * 4) + 1), Math.round((Math.random() * 4) + 1), Math.round((Math.random() * 4) + 1)], 
[Math.round((Math.random() * 4) + 1), Math.round((Math.random() * 4) + 1), Math.round((Math.random() * 4) + 1), Math.round((Math.random() * 4) + 1), Math.round((Math.random() * 4) + 1), Math.round((Math.random() * 4) + 1), Math.round((Math.random() * 4) + 1), Math.round((Math.random() * 4) + 1), Math.round((Math.random() * 4) + 1), Math.round((Math.random() * 4) + 1)], 
[Math.round((Math.random() * 4) + 1), Math.round((Math.random() * 4) + 1), Math.round((Math.random() * 4) + 1), Math.round((Math.random() * 4) + 1), Math.round((Math.random() * 4) + 1), Math.round((Math.random() * 4) + 1), Math.round((Math.random() * 4) + 1), Math.round((Math.random() * 4) + 1), Math.round((Math.random() * 4) + 1), Math.round((Math.random() * 4) + 1)], 
[Math.round((Math.random() * 4) + 1), Math.round((Math.random() * 4) + 1), Math.round((Math.random() * 4) + 1), Math.round((Math.random() * 4) + 1), Math.round((Math.random() * 4) + 1), Math.round((Math.random() * 4) + 1), Math.round((Math.random() * 4) + 1), Math.round((Math.random() * 4) + 1), Math.round((Math.random() * 4) + 1), Math.round((Math.random() * 4) + 1)], 
[Math.round((Math.random() * 4) + 1), Math.round((Math.random() * 4) + 1), Math.round((Math.random() * 4) + 1), Math.round((Math.random() * 4) + 1), Math.round((Math.random() * 4) + 1), Math.round((Math.random() * 4) + 1), Math.round((Math.random() * 4) + 1), Math.round((Math.random() * 4) + 1), Math.round((Math.random() * 4) + 1), Math.round((Math.random() * 4) + 1)]
];
var voxels = [];
var bounds = [];
var modes = [];
var voxcolbulltempnum;
var x, y, z;
var mode = 'block';
var spawnz = map.length/2;
var spawnx = map[Math.round(spawnz)].length/2;
var spawny = map[Math.round(spawnz) - 1][Math.round(spawnx) - 1];
var bullblockgeometry = new THREE.BoxGeometry(1, 1, 1);
var bullblockmaterial = new THREE.MeshLambertMaterial({color: 0xFFFFFF});
var bullport1geometry = new THREE.SphereGeometry(0.1);
var bullport1material = new THREE.MeshLambertMaterial({color: 0xFFCC00});
var bullport2geometry = new THREE.SphereGeometry(0.1);
var bullport2material = new THREE.MeshLambertMaterial({color: 0x00CCFF});
var bullrestoregeometry = new THREE.SphereGeometry(0.1);
var bullrestorematerial = new THREE.MeshLambertMaterial({color: 0x000000});
var bulldestroygeometry = new THREE.SphereGeometry(0.1);
var bulldestroymaterial = new THREE.MeshLambertMaterial({color: 0xFF0000});
var bullets = [];
var bullarrindexnum = 0;
var lastLoop = new Date;
var sensitivity = 0.005;
var fps;
var thisLoop = new Date;
var gravBool = false;
var jumpable = false;
var velocity = new THREE.Vector3(0, 0, 0);
var gravPressed = false;

//Placing objects around the scene
sun.position.set(0, 1, 0);
scene.add(sun);
sun.shadowCameraNear = 0.01;
sun.castShadow = true;
sun.shadowDarkness = 0.5;
sunneg.position.set(0, 1, 0);
scene.add(sunneg);
sunneg.shadowCameraNear = 0.01;
sunneg.castShadow = true;
sunneg.shadowDarkness = 0.5;
sunpos.position.set(0, 1, 0);
scene.add(sunpos);
sunpos.shadowCameraNear = 0.01;
sunpos.castShadow = true;
sunpos.shadowDarkness = 0.5;
initialRender();
camera.position.set(spawnx - 0.5, spawny + 1.75, spawnz - 0.5);

//Event Handlers
//Keyboard
var Key = {
_pressed: {},
	G: 71,
	E: 69,
	R: 82,	
   	A: 65,
	W: 87,
    D: 68,
    S: 83,
    LEFT: 37,
    UP: 38,
    RIGHT: 39,
    DOWN: 40,
    SPACE: 32,
    SHIFT: 16,
    ONE: 49,
    TWO: 50,
    THREE: 51,
    FOUR: 52,
    FIVE: 53,
    
    isDown: function(keyCode) {
return this._pressed[keyCode];
    },
  
    onKeydown: function(keyevent) {
      this._pressed[keyevent.keyCode] = true;
    },
  
    onKeyup: function(keyevent) {
      delete this._pressed[keyevent.keyCode];
    }
};

//Mouse motion
var onMouseMove = function ( event ) {

	var mouseDX = event.movementX || event.mozMovementX || event.webkitMovementX || 0;
	var mouseDY = event.movementY || event.mozMovementY || event.webkitMovementY || 0;

	camera.rotation.y -= mouseDX * sensitivity;
	camera.rotation.x -= mouseDY * sensitivity;
	
	if (camera.rotation.x < (-Math.PI/2)) {
		camera.rotation.x = (-Math.PI/2);
	}
	if (camera.rotation.x > (Math.PI/2)) {
		camera.rotation.x = (Math.PI/2);
	}

};

//Pointer Lock Implementation & Adding event listeners
canvas.requestPointerLock = canvas.requestPointerLock ||
        canvas.mozRequestPointerLock ||
        canvas.webkitRequestPointerLock;

document.exitPointerLock = document.exitPointerLock ||
        document.mozExitPointerLock ||
        document.webkitExitPointerLock;
window.onclick = function() {
  		canvas.requestPointerLock();
}
document.addEventListener('pointerlockchange', lockChangeAlert, false);
document.addEventListener('mozpointerlockchange', lockChangeAlert, false);
document.addEventListener('webkitpointerlockchange', lockChangeAlert, false);
function lockChangeAlert() {
  if(document.pointerLockElement === canvas ||
  document.mozPointerLockElement === canvas ||
  document.webkitPointerLockElement === canvas) {
    console.log('The pointer lock status is now locked');
    canvas.addEventListener( 'mousemove', onMouseMove, false );
    canvas.addEventListener( 'click', clickInteract, false );
    window.addEventListener('keyup', function(event) { Key.onKeyup(event); }, false);
	window.addEventListener('keydown', function(event) { Key.onKeydown(event); }, false);
  } else {
    console.log('The pointer lock status is now unlocked');  
    canvas.removeEventListener( 'mousemove', onMouseMove, false );
    canvas.removeEventListener( 'click', clickInteract, false );
    window.removeEventListener('keyup', function(event) { Key.onKeyup(event); }, false);
	window.removeEventListener('keydown', function(event) { Key.onKeydown(event); }, false);
  }
}

//Clicking & bullet declaring
function clickInteract() {
    if (mode == 'block') {
        bullets[bullarrindexnum] = new THREE.Mesh(bullblockgeometry, bullblockmaterial);
        scene.add(bullets[bullarrindexnum]);
        bullets[bullarrindexnum].rotation.copy(camera.rotation);
        bullets[bullarrindexnum].position.copy(camera.position);
        bullets[bullarrindexnum].castShadow = true;
		bullets[bullarrindexnum].receiveShadow = true;
        modes[bullarrindexnum] = 'block';
        bullarrindexnum++;
    }
    if (mode == 'port1') {
        bullets[bullarrindexnum] = new THREE.Mesh(bullport1geometry, bullport1material);
        scene.add(bullets[bullarrindexnum]);
        bullets[bullarrindexnum].rotation.copy(camera.rotation);
        bullets[bullarrindexnum].position.copy(camera.position);
        bullets[bullarrindexnum].castShadow = true;
		bullets[bullarrindexnum].receiveShadow = true;
        modes[bullarrindexnum] = 'port1';
        bullarrindexnum++;
    }
    if (mode == 'port2') {
    	bullets[bullarrindexnum] = new THREE.Mesh(bullport2geometry, bullport2material);
        scene.add(bullets[bullarrindexnum]);
        bullets[bullarrindexnum].rotation.copy(camera.rotation);
        bullets[bullarrindexnum].position.copy(camera.position);
        bullets[bullarrindexnum].castShadow = true;
		bullets[bullarrindexnum].receiveShadow = true;
        modes[bullarrindexnum] = 'port2';
        bullarrindexnum++;
    }
    if (mode == 'restore') {
        bullets[bullarrindexnum] = new THREE.Mesh(bullrestoregeometry, bullrestorematerial);
        scene.add(bullets[bullarrindexnum]);
        bullets[bullarrindexnum].rotation.copy(camera.rotation);
        bullets[bullarrindexnum].position.copy(camera.position);
        bullets[bullarrindexnum].castShadow = true;
		bullets[bullarrindexnum].receiveShadow = true;
        modes[bullarrindexnum] = 'restore';
        bullarrindexnum++;
    }
    if (mode == 'destroy') {
        bullets[bullarrindexnum] = new THREE.Mesh(bulldestroygeometry, bulldestroymaterial);
        scene.add(bullets[bullarrindexnum]);
        bullets[bullarrindexnum].rotation.copy(camera.rotation);
        bullets[bullarrindexnum].position.copy(camera.position);
        bullets[bullarrindexnum].castShadow = true;
		bullets[bullarrindexnum].receiveShadow = true;
        modes[bullarrindexnum] = 'destroy';
        bullarrindexnum++;
    }
}

//Render Loop
var render = function () {

//fps calculation
thisLoop = new Date;
fps = 1000 / (thisLoop - lastLoop);
lastLoop = thisLoop;

//rendering
requestAnimationFrame(render);
renderer.render(scene, camera);

//day/night cycle
sunAngle += (Math.PI/600)/fps;
sun.position.set(Math.sin(sunAngle), Math.cos(sunAngle), 0);
sunneg.position.set(Math.sin(sunAngle), Math.cos(sunAngle), -1);
sunpos.position.set(Math.sin(sunAngle), Math.cos(sunAngle), 1);

//keyboard input
//bullet modes
if (Key.isDown(Key.ONE)) {
	mode = "port1";
}
if (Key.isDown(Key.TWO)) {
	mode = "port2";
}
if (Key.isDown(Key.THREE)) {
	mode = "block";
}
if (Key.isDown(Key.FOUR)) {
	mode = "restore";
}
if (Key.isDown(Key.FIVE)) {
	mode = "destroy";
}

//player motion
if (Key.isDown(Key.W)) {
	if (testCol(camera.position.x - 2 * (Math.sin(this.camera.rotation.y) / fps), camera.position.y-1.75, camera.position.z - 2 * (Math.cos(this.camera.rotation.y) / fps)) && testCol(camera.position.x - 2 * (Math.sin(this.camera.rotation.y) / fps), camera.position.y, camera.position.z - 2 * (Math.cos(this.camera.rotation.y) / fps))) {
		this.camera.position.x -= 2 * Math.sin(this.camera.rotation.y) / fps;
		this.camera.position.z -= 2 * Math.cos(this.camera.rotation.y) / fps;
	}
}
if (Key.isDown(Key.A)) {
	if (testCol(camera.position.x - 2 * (Math.sin(this.camera.rotation.y + Math.PI/2) / fps), camera.position.y-1.75, camera.position.z - 2 * (Math.cos(this.camera.rotation.y + Math.PI/2) / fps)) && testCol(camera.position.x - 2 * (Math.sin(this.camera.rotation.y + Math.PI/2) / fps), camera.position.y, camera.position.z - 2 * (Math.cos(this.camera.rotation.y + Math.PI/2) / fps))) {
		this.camera.position.x -= 2 * Math.sin(this.camera.rotation.y + Math.PI/2) / fps;
		this.camera.position.z -= 2 * Math.cos(this.camera.rotation.y + Math.PI/2) / fps;
	}
}
if (Key.isDown(Key.S)) {
	if (testCol(camera.position.x + 2 * (Math.sin(this.camera.rotation.y) / fps), camera.position.y-1.75, camera.position.z + 2 * (Math.cos(this.camera.rotation.y) / fps)) && testCol(camera.position.x + 2 * (Math.sin(this.camera.rotation.y) / fps), camera.position.y, camera.position.z + 2 * (Math.cos(this.camera.rotation.y) / fps))) {
    	this.camera.position.x += 2 * Math.sin(this.camera.rotation.y) / fps;
		this.camera.position.z += 2 * Math.cos(this.camera.rotation.y) / fps;
	}
}
if (Key.isDown(Key.D)) {
	if (testCol(camera.position.x - 2 * (Math.sin(this.camera.rotation.y - Math.PI/2) / fps), camera.position.y-1.75, camera.position.z - 2 * (Math.cos(this.camera.rotation.y - Math.PI/2) / fps)) && testCol(camera.position.x - 2 * (Math.sin(this.camera.rotation.y - Math.PI/2) / fps), camera.position.y, camera.position.z - 2 * (Math.cos(this.camera.rotation.y - Math.PI/2) / fps))) {
    	this.camera.position.x -= 2 * Math.sin(this.camera.rotation.y - Math.PI/2) / fps;
		this.camera.position.z -= 2 * Math.cos(this.camera.rotation.y - Math.PI/2) / fps;
    }
}
if (Key.isDown(Key.SPACE)) {
	if (!gravBool) {
		if (testCol(camera.position.x, (camera.position.y + 2 / fps), camera.position.z)) {
			this.camera.position.y += 2 / fps;
		}
	}
	if (gravBool) {
		if (jumpable) {
			velocity.y += 25/fps;
			jumpable = false;
		}
	}
}
if (Key.isDown(Key.SHIFT)) {
	if (!gravBool) {
		if (testCol(camera.position.x, (camera.position.y - 2 / fps)-1.75, camera.position.z)) {
			this.camera.position.y -= 2 / fps;
		}
	}
}
if (gravBool) {
	if (velocity.y != 0) {
		console.log(velocity);
	}
	if (testCol(camera.position.x+(velocity.x), camera.position.y-1.75, camera.position.z)) {
		camera.position.x += velocity.x;
	}
	if (testCol(camera.position.x, camera.position.y-1.75, camera.position.z+(velocity.z/fps))) {
		camera.position.z += velocity.z;
	}
	if (testCol(camera.position.x, camera.position.y-1.75+(velocity.y), camera.position.z)) {
		camera.position.y += velocity.y;
	}
	if (!testCol(camera.position.x, camera.position.y-1.75+(velocity.y), camera.position.z)) {
		jumpable = true;
		velocity.y = 0;
	}
	if (testCol(camera.position.x, camera.position.y-1.75-(3.711/fps), camera.position.z)) {
		velocity.y -= 3.711/fps;
	}
}
if (Key.isDown(Key.G)) {
	if (!gravPressed) {
		gravBool = !gravBool;
		jumpable = false;
		velocity.set(0, 0, 0);
		gravPressed = true;
	}
}
if (!Key.isDown(Key.G)) {
	gravPressed = false;
}
//reset bullets and spawn
if (Key.isDown(Key.R)) {
    camera.rotation.set(0, 0, 0);
    var spawnz = map.length/2;
	var spawnx = map[Math.round(spawnz)].length/2;
	var spawny = map[Math.round(spawnz) - 1][Math.round(spawnx) - 1];
	camera.position.set(spawnx - 0.5, spawny + 1.75, spawnz - 0.5);
    for (bullremovecounter = 0; bullremovecounter <= bullets.length; bullremovecounter++) {
        scene.remove(bullets[bullremovecounter]);
    }
	bullets = [];
	modes = [];
	bullarrindexnum = 0;
	
}

//Nobody likes glitchy rotation, so I put this line in.
this.camera.rotation.order = "YXZ";

//Bullet Movement
for (counter = 0; counter < bullets.length; counter++) {
    if (testCol(bullets[counter].position.x - (5 * Math.sin(bullets[counter].rotation.y))/fps, bullets[counter].position.y + (5 * Math.tan(bullets[counter].rotation.x))/fps, bullets[counter].position.z - (5 * Math.cos(bullets[counter].rotation.y))/fps)) {
		bullets[counter].position.x -= (5 * Math.sin(bullets[counter].rotation.y))/fps;
    	bullets[counter].position.y += (5 * Math.tan(bullets[counter].rotation.x))/fps;
		bullets[counter].position.z -= (5 * Math.cos(bullets[counter].rotation.y))/fps;
    }
	else {
	
		//Collisions
    	if (modes[counter] == "port1") {
    		voxcolbulltempnum = findCol(bullets[counter].position.x - (5 * Math.sin(bullets[counter].rotation.y))/fps, bullets[counter].position.y + (5 * Math.tan(bullets[counter].rotation.x))/fps, bullets[counter].position.z - (5 * Math.cos(bullets[counter].rotation.y))/fps);
			voxels[voxcolbulltempnum].material = new THREE.MeshLambertMaterial( {color: 0xFFCC00} );
    		scene.remove(bullets[counter]);
    		bullets.splice(counter, 1);
    		modes.splice(counter, 1);
			bullarrindexnum--;
    	}
    	if (modes[counter] == "port2") {
			voxcolbulltempnum = findCol(bullets[counter].position.x - (5 * Math.sin(bullets[counter].rotation.y))/fps, bullets[counter].position.y + (5 * Math.tan(bullets[counter].rotation.x))/fps, bullets[counter].position.z - (5 * Math.cos(bullets[counter].rotation.y))/fps);
    		voxels[voxcolbulltempnum].material = new THREE.MeshLambertMaterial( {color: 0x00CCFF} );
    		scene.remove(bullets[counter]);
    		bullets.splice(counter, 1);
    		modes.splice(counter, 1);
			bullarrindexnum--;
    	}
		if (modes[counter] == "restore") {
    		voxcolbulltempnum = findCol(bullets[counter].position.x - (5 * Math.sin(bullets[counter].rotation.y))/fps, bullets[counter].position.y + (5 * Math.tan(bullets[counter].rotation.x))/fps, bullets[counter].position.z - (5 * Math.cos(bullets[counter].rotation.y))/fps);
			restoration(voxcolbulltempnum);
    		scene.remove(bullets[counter]);
    		bullets.splice(counter, 1);
    		modes.splice(counter, 1);
    		bullarrindexnum--;
		}
		if (modes[counter] == "destroy") {
    		voxcolbulltempnum = findCol(bullets[counter].position.x - (5 * Math.sin(bullets[counter].rotation.y))/fps, bullets[counter].position.y + (5 * Math.tan(bullets[counter].rotation.x))/fps, bullets[counter].position.z - (5 * Math.cos(bullets[counter].rotation.y))/fps);
    		scene.remove(voxels[voxcolbulltempnum]);
			voxels.splice(voxcolbulltempnum, 1);
			initColours.splice(voxcolbulltempnum, 1);
    		scene.remove(bullets[counter]);
    		bullets.splice(counter, 1);
    		modes.splice(counter, 1);
    		bullarrindexnum--;
		}
		if (modes[counter] == "block") {
			initColours[voxels.length] = 3;
			voxels[voxels.length] = new THREE.Mesh(voxgeometry, voxmaterial);
    		scene.add(voxels[voxels.length-1]);
    		voxels[voxels.length-1].castShadow = true;
			voxels[voxels.length-1].receiveShadow = true;
    		voxels[voxels.length-1].position.set(Math.round(bullets[counter].position.x), Math.round(bullets[counter].position.y), Math.round(bullets[counter].position.z));
			scene.remove(bullets[counter]);
    		bullets.splice(counter, 1);
    		modes.splice(counter, 1);
    		bullarrindexnum--;
		}
    }
}
};
render();

//Testing for collisions
function testCol(xcol, ycol, zcol) {
	for (voxcount = 0; voxcount < voxels.length; voxcount++) {
		if (zcol > (voxels[voxcount].position.z - 0.5) && zcol < (voxels[voxcount].position.z + 0.5)) {
			if (xcol > (voxels[voxcount].position.x - 0.5) && xcol < (voxels[voxcount].position.x + 0.5)) {
				if (ycol > (voxels[voxcount].position.y - 0.5) && ycol < (voxels[voxcount].position.y + 0.5)) {
					return(false);
				}
			}
		}
	}
	return(true);
}

//Finding which voxel point(xcol, ycol, zcol) collided with
function findCol(xcol, ycol, zcol) {
	for (voxcount = 0; voxcount < voxels.length; voxcount++) {
		if (zcol > (voxels[voxcount].position.z - 0.5) && zcol < (voxels[voxcount].position.z + 0.5)) {
			if (xcol > (voxels[voxcount].position.x - 0.5) && xcol < (voxels[voxcount].position.x + 0.5)) {
				if (ycol > (voxels[voxcount].position.y - 0.5) && ycol < (voxels[voxcount].position.y + 0.5)) {
					return(voxcount);
				}
			}
		}
	}
}

//Making the voxel map
function initialRender() {
	voxarrindexnum = 0;
	for (z = 0; z < map.length; z++) {
		for (x = 0; x < map[z].length; x++) {
			altitude = map[z][x];
			for (y = 0; y < altitude; y++) {
				specialColours();
				scene.add(voxels[voxarrindnum]);
				voxels[voxarrindnum].position.x = x;
				voxels[voxarrindnum].position.y = y;
				voxels[voxarrindnum].position.z = z;
				voxels[voxarrindnum].castShadow = true;
				voxels[voxarrindnum].receiveShadow = true;
				voxarrindnum++;
			}
		}
	}
}

//Blocks are special, and we should treat them like so
function specialColours() {
	if (colourOrder == 0) {
		voxels[voxarrindnum] = new THREE.Mesh(voxgeometry, voxmaterial1);
		colourOrder++;
		initColours[voxarrindnum] = 0;
		return null;
	}
	if (colourOrder == 1) {
		voxels[voxarrindnum] = new THREE.Mesh(voxgeometry, voxmaterial2);
		colourOrder++;
		initColours[voxarrindnum] = 1;
		return null;
	}
	if (colourOrder == 2) {
		voxels[voxarrindnum] = new THREE.Mesh(voxgeometry, voxmaterial3);
		colourOrder = 0;
		initColours[voxarrindnum] = 2;
		return null;
	}
}

//Let the block be cleansed of its impurities
function restoration(f) {
	if (initColours[f] == 0) {
		voxels[f].material = voxmaterial1;
	}
	if (initColours[f] == 1) {
		voxels[f].material = voxmaterial2;
	}
	if (initColours[f] == 2) {
		voxels[f].material = voxmaterial3;
	}
	if (initColours[f] == 3) {
		voxels[f].material = voxmaterial;
	}
}