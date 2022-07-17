class WarZone extends Phaser.Scene
{
  constructor()
  {
    super
    ({
      key:'WarZone'
    }); 
  }

  init()
  {
   this.UserPoint = 0;
   this.EnemyPoint = 0;
   this.E_last_posX = [];
   this.E_last_posY = [];
   this.UnumCell = [4,3,2,1];
   this.UnumShip = [1,2,3,4];
  }

  preload()
  {
    this.load.bitmapFont('MCF', './assets/font-text/minecraft/minecraft.png', './assets/font-text/minecraft/minecraft.xml');
  }

  create()
  {
    ///////////////CREATING ENEMY FIELD//////////////////////////////////////////////
    this.cameras.main.setBackgroundColor(0xffffff);
    var w, h;
    var dif_X,
      dif_Y;
    if (window.innerHeight > window.innerWidth) {
      dif_X = window.innerWidth / 10;
      dif_Y = (window.innerHeight - (window.innerWidth - dif_X * 2)) / 2;
      w = h = (window.innerWidth - dif_X * 2) / 10;
    }
    else if (window.innerWidth > window.innerHeight) {
      dif_Y = window.innerHeight / 10;
      dif_X = (window.innerWidth - (window.innerHeight - dif_Y * 2)) / 2;
      w = h = (window.innerHeight - dif_Y * 2) / 10;
    }
    
    this.rectangles = new Array(10);
    for (let i = 0; i < this.rectangles.length; i++) this.rectangles[i] = new Array(10);


    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        this.rectangles[i][j] = this.add.rectangle(i * w + dif_X, j * h + dif_Y * 1.75, w, h, 0xff6699).setOrigin(0, 0);
        this.rectangles[i][j].setStrokeStyle(4, 0x000);
        this.rectangles[i][j].setInteractive();
        this.rectangles[i][j].on('clicked', this.shot, this);
      }
    }

    this.input.on('gameobjectdown', function (pointer, gameObject) {
      gameObject.emit('clicked', gameObject);
    }, this);

    
    /////////////////////////////////////////////////////////////////////////////////

    ///////////CREATING USER FIELD///////////////////////////////////////////////////
    var user_width = w * 2,
        user_height = h * 2;
    var user_rectW = user_width/10,
        user_rectH = user_height/10;
        
    this.user_rect = new Array(10);
    for (let i = 0; i < this.user_rect.length; i++) this.user_rect[i] = new Array(10);
    
    
    for (let i = 0; i < 10; i++) 
    {
      for (let j = 0; j < 10; j++) 
      {
        this.user_rect[i][j] = this.add.rectangle(i * user_rectW + dif_X, j * user_rectH + dif_Y * 1.70 - user_height, user_rectW, user_rectH, 0xffffff).setOrigin(0, 0);
        this.user_rect[i][j].setStrokeStyle(1, 0x000);
      }
    }
    
    for (let i = 1; i < MapSize - 1; i++) {
      for (let j = 1; j < MapSize - 1; j++) {
        if (Maps.mapU_1[i][j] == '@') {
          this.user_rect[i - 1][j - 1].setFillStyle(0x29f716);
        }
      }
    }  
    ////////////////////////////////////////////////////////////////////////////////////
    this.usP = this.add.bitmapText(dif_X + user_width + user_rectW, dif_Y * 1.70 - user_height + user_rectW, 'MCF', '', w);
    this.usP.setTint(0x000);
    this.enP = this.add.bitmapText(dif_X + user_width + user_rectW, dif_Y * 1.70 - user_height + w + user_rectW, 'MCF', '', w);
    this.enP.setTint(0x000);
  }

  update()
  {  
      this.usP.text = 'You points: ' + this.UserPoint;
      this.enP.text = 'Enemy points: ' + this.EnemyPoint;
      if(this.UserPoint == 20) {stateGame = "user_win"; this.scene.start('gameEnd'); }
      if(this.EnemyPoint == 20) {stateGame = "user_down"; this.scene.start('gameEnd', "lose"); }
  }

  shot(box)
  {
    let flag = false;
    for (let i = 0; i < 10; i++) 
    {
      for (let j = 0; j < 10; j++) 
      {
        if (this.rectangles[i][j].x == box.getBounds().x && this.rectangles[i][j].y == box.getBounds().y) 
        {
          if(EnemyMaps.mapU_1[i+1][j+1] == '@' && ( EnemyMaps.mapU_1[i+1][j+1] != '!' && EnemyMaps.mapU_1[i+1][j+1] != '?')) {EnemyMaps.mapU_1[i + 1][j + 1] = '!'; this.rectangles[i][j].setFillStyle(0xff7b00); this.UserPoint++; flag = true;} 
          if(EnemyMaps.mapU_1[i+1][j+1] == '#' && ( EnemyMaps.mapU_1[i+1][j+1] != '!' && EnemyMaps.mapU_1[i+1][j+1] != '?')) {EnemyMaps.mapU_1[i + 1][j + 1] = '?'; this.rectangles[i][j].setFillStyle(0x001aff); flag = true;} //чтобы не задевать рамку
        }
      }
    }
    
    
    (flag) ? this.Enemy_Shot() : flag = false;

  }

  Enemy_Shot()
  {
    let X, Y;
    if(this.E_last_posX.length == 0 && this.E_last_posY.length == 0){
      let sh = false;
      while(!sh)
      {
      X = this.getRndInteger(1, 10);
      Y = this.getRndInteger(1, 10);
      if(Maps.mapU_1[X][Y] != '?' && Maps.mapU_1[X][Y] != '!'){sh = true} else sh = false;
      }
    }
    else
    {
      let sh = false;
      while(!sh)
      {
        if(this.E_last_posX.length == 1 && this.E_last_posY.length == 1)
        {
          let dir = this.getRndInteger(1,4);
          switch(dir)
            {
              case 1:
                X = this.E_last_posX[0];
                Y = this.E_last_posY[0] - 1;
                break;
              case 2:
                X = this.E_last_posX[0] + 1;
                Y = this.E_last_posY[0];
                break;
              case 3:
                X = this.E_last_posX[0];
                Y = this.E_last_posY[0] + 1;
                break;
              case 4:
                X = this.E_last_posX[0] - 1;
                Y = this.E_last_posY[0];
                break;
              default: 
                break;        
            }
          if( (X <= 10)&&(X >= 1)&&(Y <= 10)&&(Y >= 1 ) && Maps.mapU_1[X][Y] != '?' && Maps.mapU_1[X][Y] != '!'){sh = true; } else {sh = false;}
        }

        if(this.E_last_posX.length > 1 && this.E_last_posY.length > 1)
        {
          if(this.E_last_posX[0] == this.E_last_posX[1])
          {
            let Max_y = Math.max.apply(null, this.E_last_posY);
            let Min_y = Math.min.apply(null, this.E_last_posY);
            let rand = this.getRndInteger(1,2);
            if(rand == 1)
            {
              X = this.E_last_posX[0];
              Y = Min_y - 1;
            }
            if(rand == 2)
            {
              X = this.E_last_posX[0];
              Y = Max_y + 1;
            }
          }

          if(this.E_last_posY[0] == this.E_last_posY[1])
          {
            let Max_x = Math.max.apply(null, this.E_last_posX);
            let Min_x = Math.min.apply(null, this.E_last_posX);
            let rand = this.getRndInteger(1,2);
            if(rand == 1)
            {
              X = Min_x - 1;
              Y = this.E_last_posY[0];
            }
            if(rand == 2)
            {
              X = Max_x + 1;
              Y = this.E_last_posY[0]
            }
          }
          if( (X <= 10)&&(X >= 1)&&(Y <= 10)&&(Y >= 1 ) && Maps.mapU_1[X][Y] != '?' && Maps.mapU_1[X][Y] != '!'){sh = true;} else {sh = false;}
        }
      }
    }
    if(Maps.mapU_1[X][Y] == '@') 
    {
      Maps.mapU_1[X][Y] = '!'; 
      this.user_rect[X-1][Y-1].setFillStyle(0xff7b00); 
      this.EnemyPoint++; 
      this.E_last_posX.push(X); 
      this.E_last_posY.push(Y);
      }

      if(Maps.mapU_1[X][Y] == '#') {Maps.mapU_1[X][Y] = '?'; this.user_rect[X-1][Y-1].setFillStyle(0x001aff);}

      /////////////////////////////////////////////////////
      if(this.E_last_posX.length == 1 && this.E_last_posY.length == 1)
      {
        if
        ( 
          (Maps.mapU_1[this.E_last_posX[0] + 1][this.E_last_posY[0]] == '$' || Maps.mapU_1[this.E_last_posX[0] + 1][this.E_last_posY[0]] == '?') 
          && 
          (Maps.mapU_1[this.E_last_posX[0] - 1][this.E_last_posY[0]] == '$' || Maps.mapU_1[this.E_last_posX[0] - 1][this.E_last_posY[0]] == '?') 
          && 
          (Maps.mapU_1[this.E_last_posX[0]][this.E_last_posY[0] + 1] == '$' || Maps.mapU_1[this.E_last_posX[0]][this.E_last_posY[0] + 1] == '?') 
          && 
          (Maps.mapU_1[this.E_last_posX[0]][this.E_last_posY[0] - 1] == '$' || Maps.mapU_1[this.E_last_posX[0]][this.E_last_posY[0] - 1] == '?') 
        )
        {
        this.E_last_posX = [];
        this.E_last_posY = [];
        } 
      }
      else if(this.E_last_posX.length > 1 && this.E_last_posY.length > 1)
      {
        
        if(this.E_last_posX[0] == this.E_last_posX[1])
        {
          let Max_y = Math.max.apply(null, this.E_last_posY);
          let Min_y = Math.min.apply(null, this.E_last_posY);
          if
          (
            (Maps.mapU_1[X][Min_y - 1] == '$' || Maps.mapU_1[X][Min_y - 1] == '?')
            &&
            (Maps.mapU_1[X][Max_y + 1] == '$' || Maps.mapU_1[X][Max_y + 1] == '?')
          )
          {
            this.E_last_posX = [];
            this.E_last_posY = [];
          }

        }

        else if(this.E_last_posY[0] == this.E_last_posY[1])
        {
          let Max_x = Math.max.apply(null, this.E_last_posX);
          let Min_x = Math.min.apply(null, this.E_last_posX);
          if
          (
            (Maps.mapU_1[Min_x - 1][Y] == '$' || Maps.mapU_1[Min_x - 1][Y] == '?')
            &&
            (Maps.mapU_1[Max_x + 1][Y] == '$' || Maps.mapU_1[Max_x + 1][Y] == '?')
          )
          {
            this.E_last_posX = [];
            this.E_last_posY = [];

          }
        }
        
      }
      /////////////////////////////////////////////////////
      console.log("###########");
      console.log("u: " + this.UserPoint);
      console.log("e: " + this.EnemyPoint);
      console.log("##############");
    }

    

    
  

  getRndInteger(min, max) 
  {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
  }


}