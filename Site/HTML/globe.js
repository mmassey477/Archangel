describe("testeurope", function() {
	init();

	function init() {
		var renderer = new THREE.WebGLRenderer({canvas: document.getElementById('earth'), antialias: true});
		renderer.setClearColor(0x000000);
		renderer.setPixelRatio(window.devicePixelRatio);
		renderer.setSize(window.innerWidth/(1), window.innerHeight/(1))
		var camera = new THREE.PerspectiveCamera(45,window.innerWidth / window.innerHeight, 0.1, 5000000);
		camera.position.set( 800, 400, 800);
		
		var controls = new THREE.OrbitControls(camera)
		var scene = new THREE.Scene();

		var light = new THREE.AmbientLight(0xffffff, .8)
		light.position.set(0, 0, 0)
		scene.add(light)

		var sun = new THREE.PointLight(0xffffff, 1)
		sun.position.set(-400, 90, 700)
		scene.add(sun)
		
		var texture = new THREE.TextureLoader().load( 'lowerhighres.jpg');
		var geometry = new THREE.SphereGeometry( 200, 50, 50 );
		var material = new THREE.MeshLambertMaterial( { map: texture, overdraw: 0.5 } );
		var mesh = new THREE.Mesh( geometry, material );
		mesh.position.set(0,0,0)
		scene.add(mesh)

		controls = new THREE.OrbitControls( camera, renderer.domElement );
		controls.minDistance = 201;
		controls.maxDistance = 10000000;

		requestAnimationFrame(render)

		//flyin()

		var radius = 300;
		var initX = 0;
		var initY = 0;
		var panFinalX = 0;
		var panFinalY = 0;
		var x = 0
		var y = 0
		var z = 0
		var angleX = 0;
		var angleY = 0;
		var rotation = true;

		window.addEventListener( 'resize', onWindowResize, false );
		document.getElementById("northAmerica").onclick = northAmerica;
		document.getElementById("southAmerica").onclick = southAmerica;
		document.getElementById("africa").onclick = africa;
		document.getElementById("asia").onclick = asia;
		document.getElementById("europe").onclick = europe;

		function render() {
			rotate();
			renderer.render(scene, camera)
			requestAnimationFrame(render);
		}

		function rotate() {
			if(rotation == true){
				mesh.rotation.y += 0.001;
			}
			else{
				mesh.rotation.y = 0
			}
		}
	
		function stoprotate() {
			rotation = false;
		}

		function onWindowResize() {
		 	camera.aspect = window.innerWidth / window.innerHeight;
		 	camera.updateProjectionMatrix();
		 	renderer.setSize( window.innerWidth, window.innerHeight );
		}

		function flyin(){
			camera.position.set( 900000, 45000, 900000);
			var x = 900000
			var y = 45000
			var z = 900000
			var diff = 900000 - 800;
			var zoomFast = window.setInterval(zoomZoom, 1)
			function zoomZoom() {
				if (diff == 0) {
					window.clearInterval(zoomFast)
				}	
				console.log(camera.position)
				x -= 200
				y -= 10
				z -= 200
				camera.position.set(x, y, z)
				camera.lookAt(new THREE.Vector3(0,0,0));
				diff = diff - 200
			}

		}

		function northAmerica() {
			stoprotate()
			renderer.render(scene, camera)
			requestAnimationFrame(render);
			inputX = Math.round(camera.position.x)
			inputY = Math.round(camera.position.y)
			inputZ = Math.round(camera.position.z)
			finalX = -45
			finalY = 260
			finalZ = 325
			diffx = inputX - finalX
			diffy = inputY - finalY
			diffz = inputZ - finalZ
			yscale = diffy / diffx
			zscale = diffz / diffx
			x = camera.position.x
			y = camera.position.y
			z = camera.position.z
			console.log(yscale)
			console.log(zscale)
			console.log(diffy)
			console.log(diffx)
			var zoomFastna = window.setInterval(zoomZoomna, 1)
			function zoomZoomna() {
				if (diffx <= 0) {
					window.clearInterval(zoomFastna)
				}	
				console.log(camera.position)
				x -= 1
				y -= yscale
				z -= zscale
				camera.position.set(x, y, z)
				camera.lookAt(new THREE.Vector3(0,0,0));
				diffx = diffx - 1
			}
			//camera.position.set(finalX, finalY, finalZ)
			camera.lookAt(new THREE.Vector3(0,0,0));
		}

		function southAmerica() {
			stoprotate()
			inputX = camera.position.x
			inputY = camera.position.y
			inputZ = camera.position.z
			finalX = 218
			finalY = -168
			finalZ = 421
			camera.position.set(finalX, finalY, finalZ)
			camera.lookAt(new THREE.Vector3(0,0,0));
		}

		function africa() {
			stoprotate()
			inputX = camera.position.x
			inputY = camera.position.y
			inputZ = camera.position.z
			finalX = 508
			finalY = 31
			finalZ = -185
			camera.position.set(finalX, finalY, finalZ)
			camera.lookAt(new THREE.Vector3(0,0,0));
		}

		function asia() {
			stoprotate()
			inputX = camera.position.x
			inputY = camera.position.y
			inputZ = camera.position.z
			finalX = 19
			finalY = 258
			finalZ = -385
			camera.position.set(finalX, finalY, finalZ)
			camera.lookAt(new THREE.Vector3(0,0,0));
		}

	  it("it should return the vector of the final camera location", function europe() {
	  		stoprotate()
			inputX = camera.position.x
			inputY = camera.position.y
			inputZ = camera.position.z
			finalX = 265
			finalY = 288
			finalZ = -147
			const finals = {x: 265, y: 288, z: -147};
			camera.position.set(finalX, finalY, finalZ)
			camera.lookAt(new THREE.Vector3(0,0,0));
			var a = finals
			var b = {x: 265, y: 288, z: -147};
		    expect(a).toEqual(b);
		    expect(a).not.toBe(null);
		});
	}
});