class Menu extends Phaser.Scene
{

  init()
  {
    this.scaleMode = Phaser.Scale.RESIZE;
    this.cameras.main.setBackgroundColor(0xffffff);
  }

  preload()
  {
    this.load.image('water', './assets/images/water.png');
    this.start = this.load.image('start', './assets/images/start-button.jpg')
    this.load.bitmapFont('MCF', './assets/font-text/minecraft/minecraft.png', './assets/font-text/minecraft/minecraft.xml');
  }



  create()
  {
    //this.background = this.add.image(window.innerWidth/2,window.innerHeight/2, 'water').setDisplaySize(window.innerWidth, window.innerHeight);
    //this.start = this.add.image(window.innerWidth/2,window.innerHeight/2, 'start').setDisplaySize(window.innerWidth/5, window.innerHeight/6);
    //this.start.setInteractive();
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
    this.start_button = this.add.dynamicBitmapText(x,y_startB,'MCF', 'Start', w).setOrigin(0.5,0.5);
    this.start_button.setTint(0x000);
    this.start_button.setInteractive();
    this.input.on('gameobjectdown',this.onObjectClicked, this);

    window.addEventListener('resize', this.resize);
    this.resize();
    //this.scale.on('resize', this.resize, this);

  }

  onObjectClicked(pointer)
  {
    this.scene.start('UserMapCh');
  }

  update()
  {

  }

  resize()
  {
    var canvas = game.canvas, width = window.innerWidth, height = window.innerHeight;
    var wratio = width / height, ratio = canvas.width / canvas.height;

    if (wratio < ratio) {
        canvas.style.width = width + "px";
        canvas.style.height = (width / ratio) + "px";
    } else {
        canvas.style.width = (height * ratio) + "px";
        canvas.style.height = height + "px";
    }
  }

}
