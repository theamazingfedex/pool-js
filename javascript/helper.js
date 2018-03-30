function getBallSprite(diameter, imagePath) {
  let container = new Container();
  let circle = new Graphics();
  let texture = new Texture.fromImage(imagePath, undefined, undefined, 2.5);
  let sprite = new Sprite(
    texture
   //Loader.resources[imagePath].texture
  );

  sprite.height = diameter * 1.5;
  sprite.width = diameter * 3;
  sprite.x = diameter/4;
  sprite.y = diameter/4;

  circle.beginFill(0x9966FF);
  circle.drawCircle(diameter,diameter,diameter/2);
  circle.endFill();
  circle.pivot.set(circle.height/2,circle.width/2);
  circle.x = diameter/2;
  circle.y = diameter/2;

  // gradient mask:
  // let ctx = shadowRenderer.context;
  let canvas = document.createElement('canvas');
  let ctx = canvas.getContext('2d');
  let ctxGradient = ctx.createRadialGradient(diameter, diameter, ball_diameter*2, diameter, diameter, ball_diameter +32);
  ctxGradient.addColorStop(0, "transparent");
  ctxGradient.addColorStop(0.4, "#333");
  ctxGradient.addColorStop(1, "transparent");
  ctx.fillStyle = ctxGradient;
  ctx.fillRect(0, 0, 250, 250);
  let gradientTexture = Texture.fromCanvas(canvas);
  let gradient = new Sprite(gradientTexture);
  gradient.height = sprite.height;
  gradient.width = sprite.width;
  gradient.pivot.set(gradient.height/2, gradient.width/2);
  gradient.x = sprite.x - sprite.x/2;
  gradient.y = sprite.y * 2;
  

  circle.isMask = true;
  container.addChild(circle);
  sprite.mask = circle;
  container.addChild(sprite);
  container.addChild(gradient);
  // container.addChild(gradientTexture);
  container.mass = 1;
  container.vx = 0;
  container.vy = 0;
  
  return container;
}

function keyboard(keyCode) {
  var key = {};
  key.code = keyCode;
  key.isDown = false;
  key.isUp = true;
  key.press = undefined;
  key.release = undefined;
  //The `downHandler`
  key.downHandler = function(event) {
    if (event.keyCode === key.code) {
      if (key.isUp && key.press) key.press();
      key.isDown = true;
      key.isUp = false;
    }
    event.preventDefault();
  };

  //The `upHandler`
  key.upHandler = function(event) {
    if (event.keyCode === key.code) {
      if (key.isDown && key.release) key.release();
      key.isDown = false;
      key.isUp = true;
    }
    event.preventDefault();
  };

  //Attach event listeners
  window.addEventListener(
    "keydown", key.downHandler.bind(key), false
  );
  window.addEventListener(
    "keyup", key.upHandler.bind(key), false
  );
  return key;
}


