
var config = {
    type: Phaser.AUTO,
    height: window.innerHeight,
    width: window.innerWidth,
    scene:
    [
      Menu,
      UserMapCh,
      WarZone,
      gameEnd
    ]
};


var game = new Phaser.Game(config);

class DataUsers
{
  constructor(n)
  {
    this.mapU_1 = new Array(n);
    this.mapU_2 = new Array(n);
    this.ships = [4,3,2,1];
    this.amountS = [1,2,3,4];
    this.lastPosX = [];
    this.lastPosY = [];

    for(let i = 0; i < n; i++) 
    {
      this.mapU_1[i] = new Array(n);
      this.mapU_2[i] = new Array(n);
    }
    this.MapsClear(n);
  }

  MapsClear(n)
  {
    for(let i = 0; i < n; i++)
    {
      for(let j = 0; j < n; j++)
      {
        if(i == 0 || j == 0 || i == n - 1 || j == n - 1){this.mapU_1[i][j] = '$'; this.mapU_2[i][j] = '$';}
        else
        { 
        this.mapU_1[i][j] = '#';
        this.mapU_2[i][j] = "#";
        }
      }
    }

  }

  /*Внутри квадрата располагают корабли. Нужно вместить:

    4 однопалубных судна размером в 1 клетку;
    3 двухпалубных эсминца по 2 клетки;
    2 трехпалубных крейсера по 3 клетки;
    1 четырехпалубный линкор, занимающий 4 клеточки.
  */


  SetValueU_Map(N, M)
  {
    //console.log("last positions: " + this.lastPosX + ' ' + this.lastPosY);
    //console.log(N +  "    UUUIUIUUIIUIU     " + M);
    //console.log(this.mapU_1);
    for(let i = 0; i < this.ships.length; i++)
    {
      if(this.ships[i] > 0)
      {    
        if(this.PermSet(N, M, this.ships[i]))
          {
            this.ships[i]--;
            if(this.ships[i] <= 0)
            {
              this.lastPosX = [];
              this.lastPosY = [];
              this.amountS[i]--;
              //console.log("end " + this.ships + " *** " + this.amountS);
              let num = [4,3,2,1];
              if(this.amountS[i] > 0)
              {
               this.ships[i] = num[i];
              }
            }else{
              this.lastPosX.push(N); 
              this.lastPosY.push(M);
            }   
            this.mapU_1[N][M] = '@';
            break;
          }
      }
      
    }
  }

  PermSet(N, M, numShips)
  {
    ///////////////////////////////////////////////////////////////////////
    if
    (
              (this.lastPosX.length == 0 && this.lastPosY.length == 0) 
              &&
              (this.mapU_1[N][M] != '@')
              &&
              (this.mapU_1[N-1][M] != '@')
              &&
              (this.mapU_1[N+1][M] != '@')
              &&
              (this.mapU_1[N][M-1] != '@')
              &&
              (this.mapU_1[N][M+1] != '@')
              &&
              (this.mapU_1[N+1][M+1] != '@')
              &&
              (this.mapU_1[N-1][M+1] != '@')
              &&
              (this.mapU_1[N+1][M-1] != '@')
              &&
              (this.mapU_1[N-1][M-1] != '@')
    )
    {
      return true;
    }
    /////////////////////////////////////////////////////////////////////////
    else{
      var onpositionX = true;
      var onpositionY = true;
      for(let i = 0, Xj = true, Yj = true; (i < this.lastPosX.length && i < this.lastPosY.length) ;i++ )
      {
        if(N == this.lastPosX[i] && Xj == true) {onpositionX = true;}else{onpositionX = false; Xj = false;}
        if(M == this.lastPosY[i] && Yj == true) {onpositionY = true;}else{onpositionY = false; Yj = false;}
      }
      const comp = true;
      let chek = false;
      switch(comp)
      {
        case onpositionY:
          let right = false,
              left = false;
          for(let i = 0; i < this.lastPosX.length && chek == false ; i++)
          {
            if( (N+1 == this.lastPosX[i])||(N-1 == this.lastPosX[i]) )
            {
              (N+1 == this.lastPosX[i]) ? left = true: (N-1 == this.lastPosX[i]) ? right = true: false;
              chek = true;
            }
          }
          //console.log(chek );
          //console.log(right + "  " + left);
          if(right == true)
          {
            if
            (
              (this.mapU_1[N][M] != '@')
              &&
              (this.mapU_1[N+1][M] != '@')
              &&
              (this.mapU_1[N][M-1] != '@')
              &&
              (this.mapU_1[N][M+1] != '@')
              &&
              (this.mapU_1[N+1][M+1] != '@')
              &&
              (this.mapU_1[N-1][M+1] != '@')
              &&
              (this.mapU_1[N+1][M-1] != '@')
              &&
              (this.mapU_1[N-1][M-1] != '@')
            )
            {
              return true;
            }else return false;
          }
          else if(left == true)
          {
            if
            (
              (this.mapU_1[N][M] != '@')
              &&
              (this.mapU_1[N-1][M] != '@')
              &&
              (this.mapU_1[N][M-1] != '@')
              &&
              (this.mapU_1[N][M+1] != '@')
              &&
              (this.mapU_1[N+1][M+1] != '@')
              &&
              (this.mapU_1[N-1][M+1] != '@')
              &&
              (this.mapU_1[N+1][M-1] != '@')
              &&
              (this.mapU_1[N-1][M-1] != '@')
            )
            {
              return true;
            }else return false;
          }else return false;
          break;
        case onpositionX:
          let up = false,
              down = false;
          for(let i = 0; i < this.lastPosY.length && chek == false; i++)
          {
            if( (M+1 == this.lastPosY[i])||(M-1 == this.lastPosY[i]) )
            {
              (M+1 == this.lastPosY[i]) ? down = true: (M-1 == this.lastPosY[i]) ? up = true: false;
              chek = true;
            }
          }
          //console.log(chek);
          //console.log(up + "  " + down);
          if(up == true)
          {
            if
            (
              (this.mapU_1[N][M] != '@')
              &&
              (this.mapU_1[N-1][M] != '@')
              &&
              (this.mapU_1[N+1][M] != '@')
              &&
              (this.mapU_1[N][M+1] != '@')
              &&
              (this.mapU_1[N+1][M+1] != '@')
              &&
              (this.mapU_1[N-1][M+1] != '@')
              &&
              (this.mapU_1[N+1][M-1] != '@')
              &&
              (this.mapU_1[N-1][M-1] != '@')
            )
            {
              return true;
            }else return false;
          }
          else if(down == true)
          {
            if
            (
              (this.mapU_1[N][M] != '@')
              &&
              (this.mapU_1[N-1][M] != '@')
              &&
              (this.mapU_1[N+1][M] != '@')
              &&
              (this.mapU_1[N][M-1] != '@')
              &&
              (this.mapU_1[N+1][M+1] != '@')
              &&
              (this.mapU_1[N-1][M+1] != '@')
              &&
              (this.mapU_1[N+1][M-1] != '@')
              &&
              (this.mapU_1[N-1][M-1] != '@')
            )
            {
              return true;
            }else return false;
          }else return false;
          break;
        default: return false;    
      } 
    }
   

  }
}

//карта 10 на 10, но нужна рамка, поэтому размер 12 на 12
var MapSize = 12;
var stateGame = "game";
var Maps = new DataUsers(MapSize);
var EnemyMaps = new DataUsers(MapSize);
