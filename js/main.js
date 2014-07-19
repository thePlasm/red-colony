var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
var voxgeometry = new THREE.BoxGeometry(1, 1, 1);
var voxmaterial = new THREE.MeshBasicMaterial( {color: 0x888888} );
var voxarrindnum = 0;
var altitude = 0;
var map = [[10, 10, 10, 10, 10, 10, 10, 10, 10, 10], [10, 10, 10, 10, 10, 10, 10, 10, 10, 10], [10, 10, 10, 10, 10, 10, 10, 10, 10, 10], [10, 10, 10, 10, 10, 10, 10, 10, 10, 10], [10, 10, 10, 10, 10, 10, 10, 10, 10, 10], [10, 10, 10, 10, 10, 10, 10, 10, 10, 10], [10, 10, 10, 10, 10, 10, 10, 10, 10, 10], [10, 10, 10, 10, 10, 10, 10, 10, 10, 10], [10, 10, 10, 10, 10, 10, 10, 10, 10, 10], [10, 10, 10, 10, 10, 10, 10, 10, 10, 10]];
var voxels = [];
var bounds = [];
var modes = [];
var voxcolbulltempnum;
var x, y, z;
var mode = 'block';
initialRender();
var spawnz = map.length/2;
var spawnx = map[Math.round(spawnz)].length/2;
var spawny = map[Math.round(spawnz) - 1][Math.round(spawnx) - 1];
camera.position.set(spawnx - 0.5, spawny + 2, spawnz - 1.5);
camera.rotation.y = Math.PI;
camera.position.z -= 1;
var bullblockgeometry = new THREE.BoxGeometry(1, 1, 1);
var bullblockmaterial = new THREE.MeshBasicMaterial({color: 0xFFFFFF});
var bullport1geometry = new THREE.SphereGeometry(0.1);
var bullport1material = new THREE.MeshBasicMaterial({color: 0xFFCC00});
var bullport2geometry = new THREE.SphereGeometry(0.1);
var bullport2material = new THREE.MeshBasicMaterial({color: 0x00CCFF});
var bullrestoregeometry = new THREE.SphereGeometry(0.1);
var bullrestorematerial = new THREE.MeshBasicMaterial({color: 0x000000});
var bulldestroygeometry = new THREE.SphereGeometry(0.1);
var bulldestroymaterial = new THREE.MeshBasicMaterial({color: 0xFF0000});
var Key = {
_pressed: {},
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
  
    onKeydown: function(event) {
      this._pressed[event.keyCode] = true;
    },
  
    onKeyup: function(event) {
      delete this._pressed[event.keyCode];
    }
};
window.addEventListener('keyup', function(event) { Key.onKeyup(event); }, false);
window.addEventListener('keydown', function(event) { Key.onKeydown(event); }, false);
var bullets = [];
var bullarrindexnum = 0;
var lastLoop = new Date;
var render = function () {
var thisLoop = new Date;
var fps = 1000 / (thisLoop - lastLoop);
lastLoop = thisLoop;
requestAnimationFrame(render);
renderer.render(scene, camera);
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
if (Key.isDown(Key.W)) {
	if (testCol(camera.position.x - (Math.sin(this.camera.rotation.y) / fps), camera.position.y-1, camera.position.z - (Math.cos(this.camera.rotation.y) / fps)) && testCol(camera.position.x - (Math.sin(this.camera.rotation.y) / fps), camera.position.y, camera.position.z - (Math.cos(this.camera.rotation.y) / fps))) {
		this.camera.position.x -= 1 * Math.sin(this.camera.rotation.y) / fps;
		this.camera.position.z -= 1 * Math.cos(this.camera.rotation.y) / fps;
	}
}
if (Key.isDown(Key.A)) {
	if (testCol(camera.position.x - (Math.sin(this.camera.rotation.y + Math.PI/2) / fps), camera.position.y-1, camera.position.z - (Math.cos(this.camera.rotation.y + Math.PI/2) / fps)) && testCol(camera.position.x - (Math.sin(this.camera.rotation.y + Math.PI/2) / fps), camera.position.y, camera.position.z - (Math.cos(this.camera.rotation.y + Math.PI/2) / fps))) {
		this.camera.position.x -= 1 * Math.sin(this.camera.rotation.y + Math.PI/2) / fps;
		this.camera.position.z -= 1 * Math.cos(this.camera.rotation.y + Math.PI/2) / fps;
	}
}
if (Key.isDown(Key.S)) {
	if (testCol(camera.position.x + (Math.sin(this.camera.rotation.y) / fps), camera.position.y-1, camera.position.z + (Math.cos(this.camera.rotation.y) / fps)) && testCol(camera.position.x + (Math.sin(this.camera.rotation.y) / fps), camera.position.y, camera.position.z + (Math.cos(this.camera.rotation.y) / fps))) {
    	this.camera.position.x += 1 * Math.sin(this.camera.rotation.y) / fps;
		this.camera.position.z += 1 * Math.cos(this.camera.rotation.y) / fps;
	}
}
if (Key.isDown(Key.D)) {
	if (testCol(camera.position.x - (Math.sin(this.camera.rotation.y - Math.PI/2) / fps), camera.position.y-1, camera.position.z - (Math.cos(this.camera.rotation.y - Math.PI/2) / fps)) && testCol(camera.position.x - (Math.sin(this.camera.rotation.y - Math.PI/2) / fps), camera.position.y, camera.position.z - (Math.cos(this.camera.rotation.y - Math.PI/2) / fps))) {
    	this.camera.position.x -= 1 * Math.sin(this.camera.rotation.y - Math.PI/2) / fps;
		this.camera.position.z -= 1 * Math.cos(this.camera.rotation.y - Math.PI/2) / fps;
    }
}
    if (Key.isDown(Key.SPACE)) {
		if (testCol(camera.position.x, (camera.position.y + 1 / fps), camera.position.z)) {
			this.camera.position.y += 1 / fps;
		}
    }
    if (Key.isDown(Key.SHIFT)) {
		if (testCol(camera.position.x, (camera.position.y - 1 / fps)-1, camera.position.z)) {
			this.camera.position.y -= 1 / fps;
		}
	}
    if (Key.isDown(Key.LEFT)) {
    this.camera.rotation.y += 3 / fps;
    }
    if (Key.isDown(Key.RIGHT)) {
    this.camera.rotation.y -= 3 / fps;
    }
if (Key.isDown(Key.R)) {
    camera.rotation.set(0, 0, 0);
    camera.position.set(spawnx - 0.5, spawny + 2, spawnz - 0.5);
    for (bullremovecounter = 0; bullremovecounter <= bullets.length; bullremovecounter++) {
        scene.remove(bullets[bullremovecounter]);
    }
    for (voxremovecounter = 0; voxremovecounter <= bullets.length; voxremovecounter++) {
        scene.remove(voxels[voxremovecounter]);
        voxels.splice(voxremovecounter, 1);
    }
    initialRender();
	bullets = [];
	modes = [];
	bullarrindexnum = 0;
	
}
    if (Key.isDown(Key.UP)) {
    	this.camera.rotation.x += 3 / fps;
    	if (this.camera.rotation.x < (-Math.PI/2)) {
			this.camera.rotation.x = (-Math.PI/2);
		}
		if (this.camera.rotation.x > (Math.PI/2)) {
			this.camera.rotation.x = (Math.PI/2);
		}
    }
    if (Key.isDown(Key.DOWN)) {
    	this.camera.rotation.x -= 3 / fps;
    	if (this.camera.rotation.x < (-Math.PI/2)) {
			this.camera.rotation.x = (-Math.PI/2);
		}
		if (this.camera.rotation.x > (Math.PI/2)) {
			this.camera.rotation.x = (Math.PI/2);
		}
    }
    this.camera.rotation.order = "YXZ";
if (Key.isDown(Key.E)) {
    if (bullbool == true) {
    	if (mode == 'block') {
        	bullets[bullarrindexnum] = new THREE.Mesh(bullblockgeometry, bullblockmaterial);
        	scene.add(bullets[bullarrindexnum]);
        	bullets[bullarrindexnum].rotation.copy(camera.rotation);
        	bullets[bullarrindexnum].position.copy(camera.position);
        	modes[bullarrindexnum] = 'block';
        	bullarrindexnum++;
        	bullbool = false;
        }
        if (mode == 'port1') {
        	bullets[bullarrindexnum] = new THREE.Mesh(bullport1geometry, bullport1material);
        	scene.add(bullets[bullarrindexnum]);
        	bullets[bullarrindexnum].rotation.copy(camera.rotation);
        	bullets[bullarrindexnum].position.copy(camera.position);
        	modes[bullarrindexnum] = 'port1';
        	bullarrindexnum++;
        	bullbool = false;
        }
        if (mode == 'port2') {
        	bullets[bullarrindexnum] = new THREE.Mesh(bullport2geometry, bullport2material);
        	scene.add(bullets[bullarrindexnum]);
        	bullets[bullarrindexnum].rotation.copy(camera.rotation);
        	bullets[bullarrindexnum].position.copy(camera.position);
        	modes[bullarrindexnum] = 'port2';
        	bullarrindexnum++;
        	bullbool = false;
        }
        if (mode == 'restore') {
        	bullets[bullarrindexnum] = new THREE.Mesh(bullrestoregeometry, bullrestorematerial);
        	scene.add(bullets[bullarrindexnum]);
        	bullets[bullarrindexnum].rotation.copy(camera.rotation);
        	bullets[bullarrindexnum].position.copy(camera.position);
        	modes[bullarrindexnum] = 'restore';
        	bullarrindexnum++;
        	bullbool = false;
        }
        if (mode == 'destroy') {
        	bullets[bullarrindexnum] = new THREE.Mesh(bulldestroygeometry, bulldestroymaterial);
        	scene.add(bullets[bullarrindexnum]);
        	bullets[bullarrindexnum].rotation.copy(camera.rotation);
        	bullets[bullarrindexnum].position.copy(camera.position);
        	modes[bullarrindexnum] = 'destroy';
        	bullarrindexnum++;
        	bullbool = false;
        }
    }
}
if (Key.isDown(Key.E) != true) {
    bullbool = true;
}
for (counter = 0; counter < bullets.length; counter++) {
    if (testCol(bullets[counter].position.x - (0.5 * Math.sin(bullets[counter].rotation.y))/fps, bullets[counter].position.y + (0.5 * Math.tan(bullets[counter].rotation.x))/fps, bullets[counter].position.z - (0.5 * Math.cos(bullets[counter].rotation.y))/fps)) {
		bullets[counter].position.x -= (0.5 * Math.sin(bullets[counter].rotation.y))/fps;
    	bullets[counter].position.y += (0.5 * Math.tan(bullets[counter].rotation.x))/fps;
		bullets[counter].position.z -= (0.5 * Math.cos(bullets[counter].rotation.y))/fps;
    }
	else {
    	if (modes[counter] == "port1") {
    		voxcolbulltempnum = findCol(bullets[counter].position.x - (0.5 * Math.sin(bullets[counter].rotation.y))/fps, bullets[counter].position.y + (0.5 * Math.tan(bullets[counter].rotation.x))/fps - 0.5, bullets[counter].position.z - (0.5 * Math.cos(bullets[counter].rotation.y))/fps);
			voxels[voxcolbulltempnum].material = new THREE.MeshBasicMaterial( {color: 0xFFCC00} );
    		scene.remove(bullets[counter]);
    		bullets.splice(counter, 1);
			bullarrindexnum--;
    	}
    	if (modes[counter] == "port2") {
			voxcolbulltempnum = findCol(bullets[counter].position.x - (0.5 * Math.sin(bullets[counter].rotation.y))/fps, bullets[counter].position.y + (0.5 * Math.tan(bullets[counter].rotation.x))/fps - 0.5, bullets[counter].position.z - (0.5 * Math.cos(bullets[counter].rotation.y))/fps);
    		voxels[voxcolbulltempnum].material = new THREE.MeshBasicMaterial( {color: 0x00CCFF} );
    		scene.remove(bullets[counter]);
    		bullets.splice(counter, 1);
			bullarrindexnum--;
    	}
		if (modes[counter] == "restore") {
    		voxcolbulltempnum = findCol(bullets[counter].position.x - (0.5 * Math.sin(bullets[counter].rotation.y))/fps, bullets[counter].position.y + (0.5 * Math.tan(bullets[counter].rotation.x))/fps - 0.5, bullets[counter].position.z - (0.5 * Math.cos(bullets[counter].rotation.y))/fps);
			voxels[voxcolbulltempnum].material = new THREE.MeshBasicMaterial( {color: 0x888888} );
    		scene.remove(bullets[counter]);
    		bullets.splice(counter, 1);
    		bullarrindexnum--;
		}
		if (modes[counter] == "destroy") {
    		voxcolbulltempnum = findCol(bullets[counter].position.x - (0.5 * Math.sin(bullets[counter].rotation.y))/fps, bullets[counter].position.y + (0.5 * Math.tan(bullets[counter].rotation.x))/fps - 0.5, bullets[counter].position.z - (0.5 * Math.cos(bullets[counter].rotation.y))/fps);
    		scene.remove(voxels[voxcolbulltempnum]);
			voxels.splice(voxcolbulltempnum, 1);
    		scene.remove(bullets[counter]);
    		bullets.splice(counter, 1);
    		bullarrindexnum--;
		}
		if (modes[counter] == "block") {
			voxels[voxels.length] = new THREE.Mesh(voxgeometry, voxmaterial);
    		scene.add(voxels[voxels.length-1]);
    		voxels[voxels.length-1].position.copy(bullets[counter].position);
			scene.remove(bullets[counter]);
    		bullets.splice(counter, 1);
    		bullarrindexnum--;
		}
    }
}
};
render();
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
function initialRender() {
	voxarrindexnum = 0;
	for (z = 0; z < map.length; z++) {
		for (x = 0; x < map[z].length; x++) {
			altitude = map[z][x];
			for (y = 0; y < altitude; y++) {
				voxels[voxarrindnum] = new THREE.Mesh(voxgeometry, voxmaterial);
				scene.add(voxels[voxarrindnum]);
				voxels[voxarrindnum].position.x = x;
				voxels[voxarrindnum].position.y = y;
				voxels[voxarrindnum].position.z = z;
				voxarrindnum++;
			}
		}
	}
}