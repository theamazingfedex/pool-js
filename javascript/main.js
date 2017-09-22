let table_length = window.innerHeight;
let table_width = table_length/2;
let ball_diameter = table_length * 0.0225;

let corner_pocket_width = 1.75 * ball_diameter;
let side_pocket_width = 2.15 * ball_diameter;

// Setup Renderer
let renderer = PIXI.autoDetectRenderer(
  table_width, 
  table_length,
  { antialias: true, resolution: 2 }
);
let shadowRenderer = new PIXI.CanvasRenderer(100,100, {resolution: 2});
// shadowRenderer.view.style.visibility = "hidden";
// shadowRenderer.view.style.display = "none";

renderer.view.style.position = "absolute";
renderer.view.style.display = "block";
renderer.autoResize = true;
renderer.view.style.border = "2px solid black";
renderer.backgroundColor = 0x3A5F0B;
// renderer.resize(table_length, table_height);

// Create the stage container
let stage = new PIXI.Container();

// stage.filters = [new PIXI.filters.FXAAFilter()];
// Setup Textures
const ballTextures = [ 
  "images/ball_01.svg",
  "images/ball_02.svg",
  "images/ball_03.svg",
  "images/ball_04.svg",
  "images/ball_05.svg",
  "images/ball_06.svg",
  "images/ball_07.svg",
  "images/ball_08.svg",
  "images/ball_09.svg",
  "images/ball_10.svg",
  "images/ball_11.svg",
  "images/ball_12.svg",
  "images/ball_13.svg",
  "images/ball_14.svg",
  "images/ball_15.svg"
]
const textureCounter = ballTextures.length;
const Sprite = PIXI.Sprite, 
      Loader = PIXI.loader, 
      Graphics = PIXI.Graphics,
      Texture = PIXI.Texture,
      Container = PIXI.Container

let loadedCounter = 0;
let state = null;
let balls = [];
let ball01, ball02, ball03, ball04, ball05, ball06, ball07, ball08, ball09, ball10, ball11, ball12, ball13, ball14, ball15;

Loader.add(ballTextures).on("progress", loadProgressHandler).load(setup);

function loadProgressHandler() {
  let percentLoaded = Math.floor((++loadedCounter / textureCounter) * 100);
  //console.log("Loading: " + percentLoaded);
}

function setup() {
  state = play;
  for (let i = 0; i < ballTextures.length; i++) {
    let ball = getBallSprite(ball_diameter, ballTextures[i]);
    ball.position.set(ball_diameter,ball_diameter*(i+1));
    balls.push(ball);
    stage.addChild(ball);
  }
  // sprite2 = getBallSprite(32, "images/ball_02.jpg");
  // sprite2.position.set(32,64);
  // stage.addChild(sprite2);
  renderer.render(stage)
  //gameLoop();
}
function gameLoop() {
  requestAnimationFrame(gameLoop);

  state();

  renderer.render(stage);
}
function play() {
  sprite1.x += 1;
}

//Add the canvas to the HTML document
document.body.appendChild(renderer.view);
document.body.appendChild(shadowRenderer.view);

//Tell the `renderer` to `render` the `stage`
renderer.render(stage);