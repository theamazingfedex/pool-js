function getBallSprite(diameter, imagePath) {
  let container = new Container();
  let circle = new Graphics();
  let sprite = new Sprite(
   Loader.resources[imagePath].texture
  );

  sprite.height = diameter * 1.5;
  sprite.width = diameter * 3;
  sprite.x = diameter/4;
  sprite.y = diameter/4;
  sprite.vx = 0;
  sprite.vy = 0;

  circle.beginFill(0x9966FF);
  circle.drawCircle(diameter,diameter,diameter/2);
  circle.endFill();
  circle.pivot.set(circle.height/2,circle.width/2);
  circle.x = diameter/2;
  circle.y = diameter/2;

  container.addChild(circle);
  sprite.mask = circle;
  container.addChild(sprite);
  container.mass = 1;
  
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


