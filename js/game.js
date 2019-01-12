
      var game = new Phaser.Game(16*32, 600, Phaser.AUTO, document.getElementById('game'));
            var Game = {};
      Game.preload = function() {
        //WARNING, MAKE FILES HERE
          game.load.tilemap('map', 'Pictures/map.png', null, Phaser.Tilemap.TILED_JSON); // IT'S SET TO A WEIRD THINGY AND IT'S 1000 X 1000 px
          game.load.spritesheet('tileset', 'assets/map/tilesheet.png',32,32);
          game.load.image('sprite','assets/sprites/sprite.png'); // the player sprite
          };
Game.create = function(){
    Game.playerMap = {};
    var map = game.add.tilemap('map');
    map.addTilesetImage('tilesheet', 'tileset'); // tilesheet is the key of the tileset in map's JSON file
    var layer;
    for(var i = 0; i < map.layers.length; i++) {
        layer = map.createLayer(i);
    }
    layer.inputEnabled = true; // Allows clicking on the map
    Client.askNewPlayer();
    layer.events.onInputUp.add(Game.getCoordinates, this);
};
Game.addNewPlayer = function(id,x,y){
    Game.playerMap[id] = game.add.sprite(x,y,'sprite');
};
Game.removePlayer = function(id){
    Game.playerMap[id].destroy();
    delete Game.playerMap[id];
};
Game.getCoordinates = function(layer,pointer){
    Client.sendClick(pointer.worldX,pointer.worldY);
};
Game.movePlayer = function(id,x,y){
    var player = Game.playerMap[id];
    var distance = Phaser.Math.distance(player.x,player.y,x,y);
    var duration = distance*10;
    var tween = game.add.tween(player);
    tween.to({x:x,y:y}, duration);
    tween.start();
};
      game.state.add('Game',Game);
      game.state.start('Game');

      console.log('the game.js code just loaded biiitch yee');