class gameEnd extends Phaser.Scene
{
    constructor(string)
  {
    super
    ({
      key:'gameEnd'
    });
  }

  init()
  {

  }

  preload()
  {
    this.load.bitmapFont('MCF', './assets/font-text/minecraft/minecraft.png', './assets/font-text/minecraft/minecraft.xml');
  }

  create()
  {
    let x = window.innerWidth / 2
    let y_startB = window.innerHeight / 2
    let w = 50;
    if(window.innerWidth > window.innerHeight)
    {
      w = window.innerHeight / 10
    }
    if(window.innerHeight > window.innerWidth)
    {
      w = window.innerWidth / 10
    }
    this.message = "";
    
    if(stateGame == "user_win") this.message = "win";
    if(stateGame == "user_down") this.message = "lose"; 
    console.log("you" + this.message);
    this.cameras.main.setBackgroundColor(0xffffff);
    this.mes = this.add.dynamicBitmapText(x, y_startB - w, 'MCF', 'You ' + this.message , w).setOrigin(0.5, 0.5);
    this.mes.setTint(0x000);
    this.NG_button = this.add.dynamicBitmapText(x, y_startB, 'MCF', 'New Game' , w).setOrigin(0.5, 0.5);
    this.NG_button.setTint(0x000);
    this.NG_button.setInteractive();
    this.input.on('gameobjectdown', this.c_n_g, this);
  }

  update()
  {

  }

  c_n_g()
  {
    console.log("new game");
    stateGame = "game";
    Maps.MapsClear(MapSize);
    Maps.ships = [4, 3, 2, 1];
    Maps.amountS = [1, 2, 3, 4];
    Maps.lastPosX = [];
    Maps.lastPosY = [];

    EnemyMaps.MapsClear(MapSize);
    EnemyMaps.ships = [4, 3, 2, 1];
    EnemyMaps.amountS = [1, 2, 3, 4];
    EnemyMaps.lastPosX = [];
    EnemyMaps.lastPosY = [];
    this.scene.start('UserMapCh');
  }
}