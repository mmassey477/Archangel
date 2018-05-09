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
	document.getElementById("dropdown").onclick = dropdown;
	document.getElementById("rotate").onclick = rotate;
	document.getElementById("home").onclick = gohome;
	document.getElementById("signout").onclick = gosignout;

	function render() {
		checkRotate();
		renderer.render(scene, camera)
		requestAnimationFrame(render);
	}

	function gohome() {
		console.log("test")
	}

	function checkRotate() {
		if(rotation == true){
			mesh.rotation.y += 0.001;
		}
		else{
			mesh.rotation.y = 0
		}
	}

	function rotate() {
		rotation = true;
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
		const lat = '40.0150'
		const long = '-105.2705'
		getAir(lat, long)
		var a = document.getElementById("na").classList
		stoprotate()
		inputX = Math.round(camera.position.x)
		inputY = Math.round(camera.position.y)
		inputZ = Math.round(camera.position.z)
		finalX = -45
		finalY = 260
		finalZ = 325
		diffx = inputX - finalX
		diffy = inputY - finalY
		diffz = inputZ - finalZ
		var mag = getMag(diffx, diffy, diffz)
		xscale = diffx / Math.abs(diffx)
		yscale = diffy / Math.abs(diffy)
		zscale = diffz / Math.abs(diffz)
		//console.log(xscale, yscale, zscale)
		x = inputX
		y = inputY
		z = inputZ
		var zoomFastna = window.setInterval(zoomZoomna, 1)
		function zoomZoomna() {
			if (diffx == 0 && diffy == 0 && diffz == 0) {
				window.clearInterval(zoomFastna)
				window.setTimeout(function () {
					popup('North America')
				}, 500)
				return
			}
			if (diffx != 0) {
				x -= xscale
				diffx -= xscale
			}
			if (diffy != 0) {
				y -= yscale
				diffy -= yscale
			}	
			if (diffz != 0) {
				z -= zscale
				diffz -= zscale
			}
			camera.position.set(x, y, z)
			camera.lookAt(new THREE.Vector3(0,0,0));
		}
		
	}

	function southAmerica() {
		const lat = '-22.9068'
		const long = '-43.1729'
		getAir(lat, long)
		stoprotate()
		inputX = Math.round(camera.position.x)
		inputY = Math.round(camera.position.y)
		inputZ = Math.round(camera.position.z)
		finalX = 218
		finalY = -168
		finalZ = 421
		diffx = inputX - finalX
		diffy = inputY - finalY
		diffz = inputZ - finalZ
		var mag = getMag(diffx, diffy, diffz)
		xscale = diffx / Math.abs(diffx)
		yscale = diffy / Math.abs(diffy)
		zscale = diffz / Math.abs(diffz)
		x = inputX
		y = inputY
		z = inputZ
		var zoomFastsa = window.setInterval(zoomZoomsa, 1)
		function zoomZoomsa() {
			if (diffx == 0 && diffy == 0 && diffz == 0) {
				window.clearInterval(zoomFastsa)
				window.setTimeout(function () {
					popup('South America')
				}, 500)
				return
			}
			if (diffx != 0) {
				x -= xscale
				diffx -= xscale
			}
			if (diffy != 0) {
				y -= yscale
				diffy -= yscale
			}	
			if (diffz != 0) {
				z -= zscale
				diffz -= zscale
			}
			camera.position.set(x, y, z)
			camera.lookAt(new THREE.Vector3(0,0,0));
		}
	}

	function africa() {
		const lat = '-33.9249'
		const long = '18.4241'
		getAir(lat, long)
		stoprotate()
		inputX = Math.round(camera.position.x)
		inputY = Math.round(camera.position.y)
		inputZ = Math.round(camera.position.z)
		finalX = 508
		finalY = 31
		finalZ = -185
		diffx = inputX - finalX
		diffy = inputY - finalY
		diffz = inputZ - finalZ
		var mag = getMag(diffx, diffy, diffz)
		xscale = diffx / Math.abs(diffx)
		yscale = diffy / Math.abs(diffy)
		zscale = diffz / Math.abs(diffz)
		//console.log(xscale, yscale, zscale)
		x = inputX
		y = inputY
		z = inputZ
		var zoomFasta = window.setInterval(zoomZooma, 1)
		function zoomZooma() {
			if (diffx == 0 && diffy == 0 && diffz == 0) {
				window.clearInterval(zoomFasta)
				window.setTimeout(function () {
					popup('Africa')
				}, 500)
				return
			}
			if (diffx != 0) {
				x -= xscale
				diffx -= xscale
			}
			if (diffy != 0) {
				y -= yscale
				diffy -= yscale
			}	
			if (diffz != 0) {
				z -= zscale
				diffz -= zscale
			}
			camera.position.set(x, y, z)
			camera.lookAt(new THREE.Vector3(0,0,0));
		}
	}

	function asia() {
		const lat = '39.9042'
		const long = '116.4074'
		getAir(lat, long)
		stoprotate()
		inputX = Math.round(camera.position.x)
		inputY = Math.round(camera.position.y)
		inputZ = Math.round(camera.position.z)
		finalX = 19
		finalY = 258
		finalZ = -385
		diffx = inputX - finalX
		diffy = inputY - finalY
		diffz = inputZ - finalZ
		var mag = getMag(diffx, diffy, diffz)
		xscale = diffx / Math.abs(diffx)
		yscale = diffy / Math.abs(diffy)
		zscale = diffz / Math.abs(diffz)
		//console.log(xscale, yscale, zscale)
		x = inputX
		y = inputY
		z = inputZ
		var zoomFastas = window.setInterval(zoomZoomas, 1)
		function zoomZoomas() {
			if (diffx == 0 && diffy == 0 && diffz == 0) {
				window.clearInterval(zoomFastas)
				window.setTimeout(function () {
					popup('Asia')
				}, 500)
				return
			}
			if (diffx != 0) {
				x -= xscale
				diffx -= xscale
			}
			if (diffy != 0) {
				y -= yscale
				diffy -= yscale
			}	
			if (diffz != 0) {
				z -= zscale
				diffz -= zscale
			}
			camera.position.set(x, y, z)
			camera.lookAt(new THREE.Vector3(0,0,0));
		}
		//camera.position.set(finalX, finalY, finalZ)
		camera.lookAt(new THREE.Vector3(0,0,0));

	}

	function getMag(diffx, diffy, diffz){
		var mag = Math.round(Math.sqrt(Math.pow(diffx, 2) + Math.pow(diffy, 2) + Math.pow(diffz, 2)))
		return mag
	}

  	function europe() {
  		const lat = '46.8182'
		const long = '8.2275'
		getAir(lat, long)
		stoprotate()
		inputX = Math.round(camera.position.x)
		inputY = Math.round(camera.position.y)
		inputZ = Math.round(camera.position.z)
		finalX = 265
		finalY = 288
		finalZ = -147
		diffx = inputX - finalX
		diffy = inputY - finalY
		diffz = inputZ - finalZ
		var mag = getMag(diffx, diffy, diffz)
		xscale = diffx / Math.abs(diffx)
		yscale = diffy / Math.abs(diffy)
		zscale = diffz / Math.abs(diffz)
		//console.log(xscale, yscale, zscale)
		x = inputX
		y = inputY
		z = inputZ
		var zoomFaste = window.setInterval(zoomZoome, 1)
		function zoomZoome() {
			if (diffx == 0 && diffy == 0 && diffz == 0) {
				window.clearInterval(zoomFaste)
				window.setTimeout(function () {
					popup('Europe')
				}, 500)
				return
			}
			if (diffx != 0) {
				x -= xscale
				diffx -= xscale
			}
			if (diffy != 0) {
				y -= yscale
				diffy -= yscale
			}	
			if (diffz != 0) {
				z -= zscale
				diffz -= zscale
			}
			camera.position.set(x, y, z)
			camera.lookAt(new THREE.Vector3(0,0,0));
		}
	}

	function dropdown() {
		document.getElementById("myDropdown").classList.toggle("show");
	}

	window.onmousedown = function(event) {
	  if (!event.target.matches('.ham')) {

	    var dropdowns = document.getElementsByClassName("dropdown-content");
	    var i;
	    for (i = 0; i < dropdowns.length; i++) {
	      var openDropdown = dropdowns[i];
	      if (openDropdown.classList.contains('show')) {
	        openDropdown.classList.remove('show');
	      }
	    }
	  }

	  if (!event.target.matches('.popup') && !event.target.matches('#northAmerica')) {
	    var popup = document.getElementById("na");
	      if (popup.style.display == 'block') {
	      	popup.style.display = 'none'
	      }
	  }
	}
}

function popup(cont) {
	var id = 'na'
	var x = document.getElementById(id);
	x.style.display = "none";
    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
    $('#cont').text(cont)
}

function getAir(lat, long) {
	var url = 'https://api.breezometer.com/baqi/?lat=' + lat + '&lon=' + long + '&key=3d92ee43a9a840268c1a9f8b7c32864a'
	$.ajax({url: url}).then(function(data) {
		console.log(data)
			$('#score').text(data.breezometer_aqi)
			$('#quality').text(data.breezometer_description)
			$('#info').text(data.dominant_pollutant_text.causes + ' ' + data.dominant_pollutant_text.effects + ' ' + data.dominant_pollutant_text.main)
		})
}