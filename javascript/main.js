let table_length = 1024;
let table_width = table_length/2;
let ball_diameter = 32;

let corner_pocket_width = 1.75 * ball_diameter;
let side_pocket_width = 2.15 * ball_diameter;

// Setup Renderer
let renderer = PIXI.autoDetectRenderer(table_width, table_length);
renderer.view.style.border = "2px solid black";
renderer.backgroundColor = 0x3A5F0B;
renderer.autoResize = false;

// Setup Textures
const ballTextures = [ 
  "images/ball_01.jpg",
  "images/ball_02.jpg",
  "images/ball_03.jpg",
  "images/ball_04.jpg",
  "images/ball_05.jpg",
  "images/ball_06.jpg",
  "images/ball_07.jpg",
  "images/ball_08.jpg",
  "images/ball_09.jpg",
  "images/ball_10.jpg",
  "images/ball_11.jpg",
  "images/ball_12.jpg",
  "images/ball_13.jpg",
  "images/ball_14.jpg",
  "images/ball_15.jpg"
]
const textureCounter = ballTextures.length;
const Sprite = PIXI.Sprite, 
      Loader = PIXI.loader, 
      Graphics = PIXI.Graphics

let loadedCounter = 0;
let state = null;
let ball01, ball02, ball03, ball04, ball05, ball06, ball07, ball08, ball09, ball10, ball11, ball12, ball13, ball14, ball15;

PIXI.loader.add(ballTextures).on("progress", loadProgressHandler).load(setup);

//let ballTextures = [
  //PIXI.utils.TextureCache["images/ball_01.jpg"]
//];
//let ball_01_sprite = new PIXI.Sprite(ballTextures[0]);
function loadProgressHandler() {
  let percentLoaded = Math.floor((++loadedCounter / textureCounter) * 100);
  //console.log("Loading: " + percentLoaded);
}
function setup() {
  state = play;
  sprite1 = new Sprite(
    Loader.resources["images/ball_01.jpg"].texture
  );
  sprite1.height = 64;
  sprite1.width = 128;
  sprite1.vx = 0;
  sprite1.vy = 0;
  let circle = new Graphics();
  circle.beginFill(0x9966FF);
  circle.drawCircle(32,32,16);
  circle.endFill();
  circle.pivot.set(circle.height/2,circle.width/2);
  circle.x = 0;
  circle.y = 0;
  
  sprite1.mask = circle;
  ballStage.addChild(sprite1);
  renderer.render(ballStage)
  //gameLoop();
}
function gameLoop() {
  requestAnimationFrame(gameLoop);

  state();

  renderer.render(ballStage);
}
function play() {
  sprite1.x += 1;
}

//Add the canvas to the HTML document
document.body.appendChild(renderer.view);

//Create a container object called the `stage`
let ballStage = new PIXI.Container();

//Tell the `renderer` to `render` the `stage`
renderer.render(ballStage);