class UserMapCh extends Phaser.Scene {
  constructor() {
    super
      ({
        key: 'UserMapCh'
      });
  }

  init() {
    //console.log("i am there");
    this.cameras.main.setBackgroundColor(0xffffff);
  }

  preload() {
    this.load.bitmapFont('MCF', './assets/font-text/minecraft/minecraft.png', './assets/font-text/minecraft/minecraft.xml');
  }


  create() {
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

    this.remake = this.add.dynamicBitmapText(dif_X, dif_Y - h, 'MCF', 'Rebuild', w).setTint(0x000);
    this.remake.setInteractive();
    this.remake.on('clicked', this.MapClear, this);
    this.batl = this.add.dynamicBitmapText(window.innerWidth - dif_X, dif_Y - h, 'MCF', 'Batle!', w).setOrigin(1, 0);//.setTint(0x000);
    this.batl.setTint(0x000);
    this.batl.setInteractive();
    this.batl.on('clicked', this.CreateEnemyMap, this);
    this.batl.setVisible(false);

    this.rectangles = new Array(10);
    for (let i = 0; i < this.rectangles.length; i++) this.rectangles[i] = new Array(10);


    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        this.rectangles[i][j] = this.add.rectangle(i * w + dif_X, j * h + dif_Y, w, h, 0xff6699).setOrigin(0, 0);
        this.rectangles[i][j].setStrokeStyle(4, 0x000);
        this.rectangles[i][j].setInteractive();
        this.rectangles[i][j].on('clicked', this.ChoiseBox, this);
      }
    }

    this.input.on('gameobjectdown', function (pointer, gameObject) {
      gameObject.emit('clicked', gameObject);
    }, this);


  }

  update() {

  }

  ChoiseBox(box) {
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        if (this.rectangles[i][j].x == box.getBounds().x && this.rectangles[i][j].y == box.getBounds().y) {
          //console.log("I: " + i + " J: " + j);
          Maps.SetValueU_Map(i + 1, j + 1); //чтобы не задевать рамку
        }
      }
    }

    //box.off('clicked', this.ChoiseBox);
    //box.input.enabled = false;
    //box.setFillStyle('f23e39');
    /////////////////////////////////////////////////////////////
    ////////////////////////DRAWING MAP//////////////////////////
    /////////////////////////////////////////////////////////////
    ////drawing map
    let numOfsh = 0;
    for (let i = 1; i < MapSize - 1; i++) {
      for (let j = 1; j < MapSize - 1; j++) {
        if (Maps.mapU_1[i][j] == '@') {
          this.rectangles[i - 1][j - 1].setFillStyle(0xfc0303);
          numOfsh++;
          (numOfsh == 20) ? this.batl.setVisible(true) : false;
        }
      }
    }
    /////////////////////////////////////////////////////////////
  }

  MapClear() {
    //console.log("there");
    Maps.MapsClear(MapSize);
    Maps.ships = [4, 3, 2, 1];
    Maps.amountS = [1, 2, 3, 4];
    Maps.lastPosX = [];
    Maps.lastPosY = [];
    for (let i = 1; i < MapSize - 1; i++) {
      for (let j = 1; j < MapSize - 1; j++) {
        this.rectangles[i - 1][j - 1].setFillStyle(0xff6699);
      }
    }
  }
  ////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////
  ////////NEXT CREATE ENEMY MAP///////////////////////////////
  ////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////

  getRndInteger(min, max) 
  {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
  }
  
  CreateEnemyMap() {
    console.log("in creating");
    let isCreating = true;
    let onRight,
        onLeft,
        Up,
        Down;
    let N, M;
    let test = 0;
    
    EnemyMaps.MapsClear(MapSize);
    EnemyMaps.ships = [4, 3, 2, 1];
    EnemyMaps.amountS = [1, 2, 3, 4];
    EnemyMaps.lastPosX = [];
    EnemyMaps.lastPosY = [];
    for (let i = 1; i < MapSize - 1; i++) {
      for (let j = 1; j < MapSize - 1; j++) {
        this.rectangles[i - 1][j - 1].setFillStyle(0xff6699);
      }
    }

    while (isCreating) 
    {
      test++;
      //console.log("test " + test);
      if(EnemyMaps.lastPosX.length == 0 && EnemyMaps.lastPosY.length == 0)
      {
        N = this.getRndInteger(1, 10); 
        M = this.getRndInteger(1, 10);
        onRight = true;
        onLeft = true;
        Up = true;
        Down = true;
        
        for(let i = 0; i < EnemyMaps.ships.length; i++)
        {
          if(EnemyMaps.ships[i] > 0)
          {
            for(let u = 0; u < EnemyMaps.ships[i]; u++) //<=
            {
              //if(onRight == true && (EnemyMaps.mapU_1[N+u][M] == '#' || EnemyMaps.mapU_1[N+u][M] == '$'  ) ) {onRight = true;} else {onRight = false;} //тут баги
              //if(onLeft == true  && (EnemyMaps.mapU_1[N-u][M] == '#' || EnemyMaps.mapU_1[N-u][M] == '$'  ) ) {onLeft  = true;} else {onLeft  = false;}
              //if(Up == true      && (EnemyMaps.mapU_1[N][M-u] == '#' || EnemyMaps.mapU_1[N][M-u] == '$'  ) ) {Up      = true;} else {Up      = false;}
              //if(Down == true    && (EnemyMaps.mapU_1[N][M+u] == '#' || EnemyMaps.mapU_1[N][M+u] == '$'  ) ) {Down    = true;} else {Down    = false;}

              //if(onRight == true && EnemyMaps.mapU_1[N+u][M] == '$' && u != EnemyMaps.ships[i]) onRight = false;
              //if(onLeft == true && EnemyMaps.mapU_1[N-u][M] == '$' && u != EnemyMaps.ships[i]) onLeft = false;
              //if(Up == true && EnemyMaps.mapU_1[N][M-u] == '$' && u != EnemyMaps.ships[i]) Up = false;
              //if(Down == true && EnemyMaps.mapU_1[N][M+u] == '$' && u != EnemyMaps.ships[i]) Down = false;
              //console.log(N +" && "+ M + " *** " + u);
              
              //if(onRight == true && (EnemyMaps.mapU_1[N+u][M] != '$') ) {onRight = true;} else {onRight = false;} 
              //if(onLeft == true  && (EnemyMaps.mapU_1[N-u][M] != '$') ) {onLeft  = true;} else {onLeft  = false;}
              //if(Up == true      && (EnemyMaps.mapU_1[N][M-u] != '$') ) {Up      = true;} else {Up      = false;}
              //if(Down == true    && (EnemyMaps.mapU_1[N][M+u] != '$') ) {Down    = true;} else {Down    = false;}
              
              if(onRight == true && N+u <= 10){   if(EnemyMaps.PermSet(N+u,M, EnemyMaps.ships[i])){onRight = true;} else {onRight = false;}  } else{onRight = false;}
              if(onLeft == true  && N-u >= 1 ){   if(EnemyMaps.PermSet(N-u,M, EnemyMaps.ships[i])){onLeft  = true;} else {onLeft  = false;}  } else{onLeft  = false;}
              if(Up == true      && M-u >= 1 ){   if(EnemyMaps.PermSet(N,M-u, EnemyMaps.ships[i])){Up      = true;} else {Up      = false;}  } else{Up      = false;}
              if(Down == true    && M+u <= 10){   if(EnemyMaps.PermSet(N,M+u, EnemyMaps.ships[i])){Down    = true;} else {Down    = false;}  } else{Down    = false;}
            }
            //console.log(N + " @@@ "+ M + "      R:" + onRight + "  L: " + onLeft + "  Up: " + Up + "  Down: " +  Down);
            if(onRight || onLeft || Up || Down) EnemyMaps.SetValueU_Map(N,M);
            break;
          }
        }
      }
      else
      {
        let randPos = this.getRndInteger(1,4);
        switch(randPos)
        {
          case 1:
            N = EnemyMaps.lastPosX[EnemyMaps.lastPosX.length - 1];
            M = EnemyMaps.lastPosY[EnemyMaps.lastPosY.length - 1] - 1;
            if(Up == true)EnemyMaps.SetValueU_Map(N,M);
            break;
          case 2:
            N = EnemyMaps.lastPosX[EnemyMaps.lastPosX.length - 1] + 1;
            M = EnemyMaps.lastPosY[EnemyMaps.lastPosY.length - 1];
            if(onRight == true)EnemyMaps.SetValueU_Map(N,M);
            break;
          case 3:
            N = EnemyMaps.lastPosX[EnemyMaps.lastPosX.length - 1];
            M = EnemyMaps.lastPosY[EnemyMaps.lastPosY.length - 1] + 1;
            if(Down == true)EnemyMaps.SetValueU_Map(N,M);
            break;
          case 4:
            N = EnemyMaps.lastPosX[EnemyMaps.lastPosX.length - 1] - 1;
            M = EnemyMaps.lastPosY[EnemyMaps.lastPosY.length - 1];
            if(onLeft == true)EnemyMaps.SetValueU_Map(N,M);
            break;
          default: break;        
        }
        //console.log(N + " ### " + M);
      } 
    
    let numOfsh = 0;
    for (let i = 1; i < MapSize - 1; i++) {
      for (let j = 1; j < MapSize - 1; j++) {
        if (EnemyMaps.mapU_1[i][j] == '@') {
          numOfsh++;
          //console.log("num: " + numOfsh);
          (numOfsh == 20) ? isCreating = false : isCreating = true;
        }
      }
    }  

    }

    console.log("Enemy map has been created");

    
    this.scene.start('WarZone');
  }
}
