let gridMap = [
  [0,0,0,0,0,0,1,1,1,0,0,0,0,0,0],
  [0,2,2,2,2,0,1,3,1,3,3,3,3,3,0],
  [0,2,2,2,2,0,1,3,1,0,3,3,3,3,0],
  [0,2,2,2,2,0,1,3,1,0,3,3,3,3,0],
  [0,2,2,2,2,0,1,3,1,0,3,3,3,3,0],
  [0,2,0,0,0,0,1,3,1,0,0,0,0,0,0],
  [1,1,1,1,1,1,0,3,0,1,1,1,1,1,1],
  [1,2,2,2,2,2,2,0,4,4,4,4,4,4,1],
  [1,1,1,1,1,1,0,5,0,1,1,1,1,1,1],
  [0,0,0,0,0,0,1,5,1,0,0,0,0,4,0],
  [0,5,5,5,5,0,1,5,1,0,4,4,4,4,0],
  [0,5,5,5,5,0,1,5,1,0,4,4,4,4,0],
  [0,5,5,5,5,0,1,5,1,0,4,4,4,4,0],
  [0,5,5,5,5,5,1,5,1,0,4,4,4,4,0],
  [0,0,0,0,0,0,1,1,1,0,0,0,0,0,0]
]

class gridTile {
  constructor(x,y,type,rectangle){
    this.x = x;
    this.y = y;
    this.type = type;
    this.rectangle = rectangle;
  }
}

class piece {
  constructor(x,y, type, sprite, location){
    this.x = x;
    this.y = y;
    this.type = type;
    this.sprite = sprite;
    this.location = [];
  }
}



class gameScene extends Phaser.Scene{
  constructor(){
    super()
    this.gameGrid = [];
  }

  preload(){
    this.load.image('boardTexture', 'assets/boardTexture.jpg')
    this.load.image('greenPiece', 'assets/greenPiece.png')
  }



  create(){

    this.add.image(0,0, 'boardTexture').setOrigin(0,0)

    gridMap.forEach((row, i) => {
      let rowArr = [];
      row.forEach((tile, j) => {
        if(tile === 1){
          let rectangle = this.add.rectangle( j * 64, i * 64, 64, 64, 0xFFFFFF).setOrigin(0,0);
          rectangle.setStrokeStyle(4, 0x000000)
          rowArr.push(new gridTile(j * 64,i * 64, 1, rectangle))
        }else if (tile === 2) {
          let rectangle = this.add.rectangle( j * 64, i * 64, 64, 64, 0x00FF00).setOrigin(0,0);
          rectangle.setStrokeStyle(4, 0x000000)
          rowArr.push(new gridTile(j * 64,i * 64, 2, rectangle))
        }else if (tile === 3) {
          let rectangle = this.add.rectangle( j * 64, i * 64, 64, 64, 0xFFFF00).setOrigin(0,0);
          rectangle.setStrokeStyle(4, 0x000000)
          rowArr.push(new gridTile(j * 64,i * 64, 3, rectangle))
        }
        else if (tile === 4) {
          let rectangle = this.add.rectangle( j * 64, i * 64, 64, 64, 0x0000FF).setOrigin(0,0);
          rectangle.setStrokeStyle(4, 0x000000)
          rowArr.push(new gridTile(j * 64,i * 64, 4, rectangle))
        }else if (tile === 5) {
          let rectangle = this.add.rectangle( j * 64, i * 64, 64, 64, 0xFF0000).setOrigin(0,0);
          rectangle.setStrokeStyle(4, 0x000000)
          rowArr.push(new gridTile(j * 64,i * 64, 5, rectangle))
        }else{
          let rectangle = this.add.rectangle( j * 64, i * 64, 64, 64, 0x000000, 0).setOrigin(0,0);
          rowArr.push(new gridTile(j * 64,i * 64, 0, rectangle))
        }
      })
      this.gameGrid.push(rowArr);
    })

    console.log(this.gameGrid)
    this.greenPiece = new piece(64,64,2,this.add.image(96,96,'greenPiece'), [64, 64]);
    this.greenPiece.sprite.setInteractive();

    this.input.on('pointerdown', this.startDrag, this);
  }

  startDrag(pointer, targets){
    this.input.off('pointerdown', this.startDrag, this);
    this.dragObj = targets[0];
    console.log(this.dragObj)
    this.input.on('pointermove', this.doDrag, this);
    this.input.on('pointerup', this.stopDrag, this);
  }

  doDrag(pointer){
    this.dragObj.x = pointer.x;
    this.dragObj.y = pointer.y;
  }
  stopDrag(pointer){
    this.input.on('pointerdown', this.startDrag, this);
    this.input.off('pointermove',this.doDrag, this);
    this.input.off('pointerup', this.stopDrag, this);
    this.dragObj.x = this.dragObj.x - (this.dragObj.x % 64) + 32;
    this.dragObj.y = this.dragObj.y - (this.dragObj.y % 64) + 32;
    this.greenPiece.x = this.dragObj.x - 32;
    this.greenPiece.y = this.dragObj.x - 32;

    console.log(this.greenPiece);
    console.log("gamegrid", this.gameGrid)
    this.gameGrid.forEach((row) => {
      row.forEach((square) => {
        if(this.dragObj.x - 32  === square.x && this.dragObj.y - 32 === square.y ){
          console.log("square is", square)
          this.greenPiece.location = [square.x, square.y]
          console.log("greenPiece", this.greenPiece)
          return
        }
      })
    })
  }

  update(){

  }

}


var config = {
    type: Phaser.AUTO,
    width: 960,
    height: 960,
    scene: [ gameScene ]
};

let game = new Phaser.Game(config);
