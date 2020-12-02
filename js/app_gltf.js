// these need to be accessed inside more than one function so we'll declare them first
let container;
let camera;
let controls;
let renderer;
let scene;

let newMaterial, Standard, newStandard, pointsMaterial;

const mixers = [];
const clock = new THREE.Clock();

function init() {

  container = document.querySelector( '#scene-container' );

  scene = new THREE.Scene();
  scene.background = new THREE.Color( 0x8FBCD4 );

  createCamera();
  createControls();
  createLights();
  //materials();
  loadModels();
  createRenderer();
  renderer.setAnimationLoop( () => {

    update();
    render();

  } );

}

/*function createMaterials(){

     let diffuseColor = "#9E4300";
     newMaterial = new THREE.MeshBasicMaterial( { color: "#9E4300", skinning: true} );

     Standard = new THREE.MeshStandardMaterial( { color: "#9E4300", skinning: true} );

     const loadTexture = new THREE.TextureLoader();
     const texture = loadTexture.load("textures/SupernumeraryRainbows_Entwistle_1362.jpg");

     // set the "color space" of the texture
       texture.encoding = THREE.sRGBEncoding;

       // reduce blurring at glancing angles
       texture.anisotropy = 16;

     const imgTexture = new THREE.TextureLoader().load( "textures/water.JPG" );
     				imgTexture.wrapS = imgTexture.wrapT = THREE.RepeatWrapping;
     				imgTexture.anisotropy = 16;


     newStandard = new THREE.MeshStandardMaterial( {
										map: imgTexture,
										bumpMap: imgTexture,
										bumpScale: 1,
										//color: diffuseColor,
										metalness: 0.5,
										roughness: 0.1,
										//envMap: imgTexture,
                    displacementMap: imgTexture,
                    displacementScale: 1,
                    skinning: true
									} );

    pointsMaterial = new THREE.PointsMaterial( {
      color: diffuseColor,
      sizeAttenuation: true,
      size: 0.1
    } );
}*/

/*function materials() {
  var geo = new THREE.SphereGeometry( 260, 32, 32,6 );
  var mat = new THREE.MeshPhongMaterial( { color: 7040624,

          side: THREE.DoubleSide,
          transparent: true,
          opacity:0.4,
          metalness:1.0,
          roughness:0.1,
          clearCoat:0.1,
          shininess:90,
          clearCoatRoughness: 0.2,
          reflectivity: 1,
          shading: THREE.SmoothShading } );

var globe= new THREE.Mesh(geo,mat);
scene.add(globe);
}*/

function createCamera() {

  camera = new THREE.PerspectiveCamera( 35, container.clientWidth / container.clientHeight, 1, 100 );
  camera.position.set( -1.5, 1.5, 6.5 );

}

function createControls() {

  controls = new THREE.OrbitControls( camera, container );

}

function createLights() {

  const ambientLight = new THREE.HemisphereLight( 0xddeeff, 0x0f0e0d, 5 );

  const mainLight = new THREE.DirectionalLight( 0xffffff, 5 );
  mainLight.position.set( 10, 10, 10 );

  scene.add( ambientLight, mainLight );

}

function loadModels() {

  const loader = new THREE.GLTFLoader();

  // A reusable function to set up the models. We're passing in a position parameter
  // so that they can be individually placed around the scene
  const onLoad = ( gltf, position ) => {

    const model = gltf.scene.children[ 0 ];
    model.position.copy( position );

    //const animation = gltf.animations[ 0 ];

    //const mixer = new THREE.AnimationMixer( model );
    //mixers.push( mixer );

    //const action = mixer.clipAction( animation );
    //action.play();

    scene.add( model );

  };

  // the loader will report the loading progress to this function
  const onProgress = () => {};

  // the loader will send any error messages to this function, and we'll log
  // them to to console
  const onError = ( errorMessage ) => { console.log( errorMessage ); };

  // load the first model. Each model is loaded asynchronously,
  // so don't make any assumption about which one will finish loading first
  //const parrotPosition = new THREE.Vector3( 0, 0, 2.5 );
  //loader.load( 'models/Parrot.glb', gltf => onLoad( gltf, parrotPosition ), onProgress, onError );

  //const flamingoPosition = new THREE.Vector3( 7.5, 0, -10 );
  //loader.load( 'models/Flamingo.glb', gltf => onLoad( gltf, flamingoPosition ), onProgress, onError );

  const storkPosition = new THREE.Vector3( 0, 0, 0 );
  loader.load( 'models/The_Obama_Prism.glb', gltf => onLoad( gltf, storkPosition ), onProgress, onError );

}

function createRenderer() {

  // create a WebGLRenderer and set its width and height
  renderer = new THREE.WebGLRenderer( { antialias: true } );
  renderer.setSize( container.clientWidth, container.clientHeight );

  renderer.setPixelRatio( window.devicePixelRatio );

  renderer.gammaFactor = 2.2;
  renderer.gammaOutput = true;

  renderer.physicallyCorrectLights = true;

  container.appendChild( renderer.domElement );

}

function update() {

  const delta = clock.getDelta();

  //for ( const mixer of mixers ) {

    //mixer.update( delta );

  }

//}

function render() {

  //newStandard.reflectivity += 0.01;

  renderer.render( scene, camera );

}

function onWindowResize() {

  camera.aspect = container.clientWidth / container.clientHeight;

  // update the camera's frustum
  camera.updateProjectionMatrix();

  renderer.setSize( container.clientWidth, container.clientHeight );

}

window.addEventListener( 'resize', onWindowResize );

//materials();
init();
