let gridMap = [
    [0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0],
    [0, 2, 2, 2, 2, 0, 1, 3, 1, 3, 3, 3, 3, 3, 0],
    [0, 2, 2, 2, 2, 0, 1, 3, 1, 0, 3, 3, 3, 3, 0],
    [0, 2, 2, 2, 2, 0, 1, 3, 1, 0, 3, 3, 3, 3, 0],
    [0, 2, 2, 2, 2, 0, 1, 3, 1, 0, 3, 3, 3, 3, 0],
    [0, 2, 0, 0, 0, 0, 1, 3, 1, 0, 0, 0, 0, 0, 0],
    [1, 1, 1, 1, 1, 1, 0, 3, 0, 1, 1, 1, 1, 1, 1],
    [1, 2, 2, 2, 2, 2, 2, 0, 4, 4, 4, 4, 4, 4, 1],
    [1, 1, 1, 1, 1, 1, 0, 5, 0, 1, 1, 1, 1, 1, 1],
    [0, 0, 0, 0, 0, 0, 1, 5, 1, 0, 0, 0, 0, 4, 0],
    [0, 5, 5, 5, 5, 0, 1, 5, 1, 0, 4, 4, 4, 4, 0],
    [0, 5, 5, 5, 5, 0, 1, 5, 1, 0, 4, 4, 4, 4, 0],
    [0, 5, 5, 5, 5, 0, 1, 5, 1, 0, 4, 4, 4, 4, 0],
    [0, 5, 5, 5, 5, 5, 1, 5, 1, 0, 4, 4, 4, 4, 0],
    [0, 0, 0, 8, 0, 0, 1, 1, 1, 0, 0, 7, 0, 0, 0]
]

class gridTile {
    constructor(x, y, type, rectangle, text) {
        this.x = x;
        this.y = y;
        this.type = type;
        this.rectangle = rectangle;
        this.pieces = []
        this.text = text;
    }
}

class piece {
    constructor(id, x, y, type, sprite, pieceNo) {
        this.id = id;
        this.x = x;
        this.y = y;
        this.type = type;
        this.sprite = sprite;
        this.pieceNo = pieceNo;
    }
}







class gameScene extends Phaser.Scene {
    constructor() {
        super()
        this.gameGrid = [];
        this.piecesState = [];
        this.currentTurn = "green"
    }






    preload() {
        this.load.image('boardTexture', 'assets/boardTexture.jpg')
        this.load.image('greenPiece', 'assets/greenPiece.png')
        this.load.image('bluePiece', 'assets/bluePiece.png')
        this.load.image('redPiece', 'assets/redPiece.png')
        this.load.image('yellowPiece', 'assets/yellowPiece.png')
        this.load.image('mixBlueandGreen', 'assets/mixBlueandGreen.png')
        this.load.image('mixRedandYellow', 'assets/mixRedandYellow.png')

    }



    create() {

        this.add.image(0, 0, 'boardTexture').setOrigin(0, 0)

        function initState(add, piecesState, gameGrid) {
            for (let i = 0; i < 4; i++) {
                let newPiece = {}

                if (i === 0) {
                    newPiece = new piece(i, 128 , 128, 2, add.image(96, 96, 'greenPiece'), 1)
                }

                if (i === 1) {
                    newPiece = new piece(i, 192 , 128, 2, add.image(96, 96, 'greenPiece'), 2)
                }

                if (i === 2) {
                    newPiece = new piece(i, 128, 192, 2, add.image(96, 96, 'greenPiece'), 3)
                }

                if (i === 3) {
                    newPiece = new piece(i, 192, 192, 2, add.image(96, 96, 'greenPiece'), 4)
                }

                console.log(newPiece)
                newPiece.sprite.setInteractive();
                newPiece.sprite.setPosition(newPiece.x + 32, newPiece.y + 32)
                piecesState.push(newPiece)

            }

            for (let i = 0; i < 4; i++) {
                let newPiece = {}

                if (i === 0) {
                    newPiece = new piece(i + 10, 704, 704, 4, add.image(96, 96, 'bluePiece'), 1)
                }

                if (i === 1) {
                    newPiece = new piece(i + 10, 704, 768, 4, add.image(96, 96, 'bluePiece'), 2)
                }

                if (i === 2) {
                    newPiece = new piece(i + 10, 768, 704, 4, add.image(96, 96, 'bluePiece'), 3)
                }

                if (i === 3) {
                    newPiece = new piece(i + 10, 768, 768, 4, add.image(96, 96, 'bluePiece'), 4)
                }

                console.log(newPiece)

                newPiece.sprite.setInteractive();
                newPiece.sprite.setPosition(newPiece.x + 32, newPiece.y + 32)
                piecesState.push(newPiece)

            }

            for (let i = 0; i < 4; i++) {
                let newPiece = {}

                if (i === 0) {
                    newPiece = new piece(i + 20, 704, 128, 3, add.image(96, 96, 'yellowPiece'), 1)
                }

                if (i === 1) {
                    newPiece = new piece(i + 20, 768, 128, 3, add.image(96, 96, 'yellowPiece'), 2)
                }

                if (i === 2) {
                    newPiece = new piece(i + 20, 704, 192, 3, add.image(96, 96, 'yellowPiece'), 3)
                }

                if (i === 3) {
                    newPiece = new piece(i + 20, 768, 192, 3, add.image(96, 96, 'yellowPiece'), 4)
                }

                console.log(newPiece)

                newPiece.sprite.setInteractive();
                newPiece.sprite.setPosition(newPiece.x + 32, newPiece.y + 32)
                piecesState.push(newPiece)

            }

            for (let i = 0; i < 4; i++) {
                let newPiece = {}

                if (i === 0) {
                    newPiece = new piece(i + 30, 128, 704, 5, add.image(96, 96, 'redPiece'), 1)
                }

                if (i === 1) {
                    newPiece = new piece(i + 30, 192, 768, 5, add.image(96, 96, 'redPiece'), 2)
                }

                if (i === 2) {
                    newPiece = new piece(i + 30, 128, 768, 5, add.image(96, 96, 'redPiece'), 3)
                }

                if (i === 3) {
                    newPiece = new piece(i + 30, 192, 704, 5, add.image(96, 96, 'redPiece'), 4)
                }

                console.log(newPiece)

                newPiece.sprite.setInteractive();
                newPiece.sprite.setPosition(newPiece.x + 32, newPiece.y + 32)
                piecesState.push(newPiece)

            }


            gameGrid.forEach((row) => {
                row.forEach((gridTile) => {
                    piecesState.forEach((piece) => {
                        if (gridTile.x === piece.x && gridTile.y === piece.y) {
                            gridTile.pieces.push(piece);
                        }
                    })
                })
            })

        }



        gridMap.forEach((row, i) => {
            let rowArr = [];
            row.forEach((tile, j) => {
                if (tile === 1) {
                    let rectangle = this.add.rectangle(j * 64, i * 64, 64, 64, 0xFFFFFF).setOrigin(0, 0);
                    rectangle.setStrokeStyle(4, 0x000000)
                    rowArr.push(new gridTile(j * 64, i * 64, 1, rectangle))
                } else if (tile === 2) {
                    let rectangle = this.add.rectangle(j * 64, i * 64, 64, 64, 0x00FF00).setOrigin(0, 0);
                    rectangle.setStrokeStyle(4, 0x000000)
                    rowArr.push(new gridTile(j * 64, i * 64, 2, rectangle))
                } else if (tile === 3) {
                    let rectangle = this.add.rectangle(j * 64, i * 64, 64, 64, 0xFFFF00).setOrigin(0, 0);
                    rectangle.setStrokeStyle(4, 0x000000)
                    rowArr.push(new gridTile(j * 64, i * 64, 3, rectangle))
                } else if (tile === 4) {
                    let rectangle = this.add.rectangle(j * 64, i * 64, 64, 64, 0x0000FF).setOrigin(0, 0);
                    rectangle.setStrokeStyle(4, 0x000000)
                    rowArr.push(new gridTile(j * 64, i * 64, 4, rectangle))
                } else if (tile === 5) {
                    let rectangle = this.add.rectangle(j * 64, i * 64, 64, 64, 0xFF0000).setOrigin(0, 0);
                    rectangle.setStrokeStyle(4, 0x000000)
                    rowArr.push(new gridTile(j * 64, i * 64, 5, rectangle))
                } else if (tile === 7) {
                    let rectangle = this.add.rectangle(j * 64, i * 64, 64, 64, 0x808080).setOrigin(0, 0);
                    let rollText = this.add.text(j * 64, i * 64, "Roll", { fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif', fontSize: "32px" }).setOrigin(0, 0)
                    let dice1Text = this.add.text(j * 64 + 96, i * 64, "1", { fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif', fontSize: "32px" }).setOrigin(0, 0)
                    let dice2Text = this.add.text(j * 64 + 192, i * 64, "1", { fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif', fontSize: "32px" }).setOrigin(0, 0)

                    rectangle.setInteractive()
                    rollText.setPadding({ top: 10, left: 3 });
                    dice1Text.setPadding({ top: 10, left: 5 })
                    dice2Text.setPadding({ top: 10, left: 5 })
                    rectangle.setStrokeStyle(4, 0x000000)

                    let diceTextArr = [rollText, dice1Text, dice2Text]

                    rectangle.on("pointerdown", this.rollClick, this)


                    rowArr.push(new gridTile(j * 64, i * 64, 7, rectangle, diceTextArr))
                } else if (tile === 8) {
                    let rectangle = this.add.rectangle(j * 64, i * 64, 128, 64, 64, 0x808080).setOrigin(0, 0);
                    rectangle.setStrokeStyle(4, 0x000000)
                    rectangle.setInteractive()
                } else {
                    let rectangle = this.add.rectangle(j * 64, i * 64, 64, 64, 0x000000, 0).setOrigin(0, 0);
                    rowArr.push(new gridTile(j * 64, i * 64, 0, rectangle))
                } 
            })
            this.gameGrid.push(rowArr);
        })


        let turnText = this.add.text(0, 0 , "Green")


        initState(this.add, this.piecesState, this.gameGrid)
        this.input.on('pointerdown', this.startDrag, this);
    }

    checkGridandPieceType(piece, gridTile) {
        if (gridTile.type === piece.type ^ gridTile.type === 1) {
            return true
         }
         return false
     }

    rollClick() {
        let diceVals = [this.rollDice(), this.rollDice()]
        this.gameGrid.forEach((row) => {
            row.forEach((gridTile) => {
                if (gridTile.type === 7) {
                    let diceTextArr = gridTile.text;
                    diceTextArr[1].setText(diceVals[0].toString())
                    diceTextArr[2].setText(diceVals[1].toString())
                }
            })
        })

    }

    rollDice() {
        return Phaser.Math.Between(1, 6);
    }

    startDrag(pointer, targets) {
        if( targets[0] === undefined){
            return null
        }

        this.dragObj = targets[0];
        if (this.dragObj.type !== "Rectangle") {
            this.input.off('pointerdown', this.startDrag, this);

            console.log("dragObjis", this.dragObj)
            this.input.on('pointermove', this.doDrag, this);
            this.input.on('pointerup', this.stopDrag, this);
            this.originalX = this.dragObj.x - (this.dragObj.x % 64)
            this.originalY = this.dragObj.y - (this.dragObj.y % 64)
        }

    }

    doDrag(pointer) {

        this.dragObj.x = pointer.x;
        this.dragObj.y = pointer.y;
    }
    stopDrag(pointer) {
        this.input.on('pointerdown', this.startDrag, this);
        this.input.off('pointermove', this.doDrag, this);
        this.input.off('pointerup', this.stopDrag, this);
        this.dragObj.x = this.dragObj.x - (this.dragObj.x % 64) + 32;
        this.dragObj.y = this.dragObj.y - (this.dragObj.y % 64) + 32;



        let curPiece = {}



        this.gameGrid.forEach((row) => {
            row.forEach(gridTile => {

                if (gridTile.x === this.originalX && gridTile.y === this.originalY) {

                    curPiece = gridTile.pieces[gridTile.pieces.length - 1]

                }
            })
        })



        this.gameGrid.forEach((row) => {
            row.forEach((gridTile) => {
                if (gridTile.x === this.dragObj.x - 32 && gridTile.y === this.dragObj.y - 32) {

                    console.log("curPiece", curPiece)
                    let BlobType = this.isMixiBlob(gridTile)
                    let CheckIfBlobSameTeam = true

                    if (BlobType.type === "pureBlob") {

                        if ((curPiece.type === 4 || curPiece.type === 2) && (BlobType.redCount >= 1 || BlobType.yellowCount >= 1) ) {
                            CheckIfBlobSameTeam = false
                        }
                        if ((curPiece.type === 3 || curPiece.type === 5) && (BlobType.blueCount >= 1 || BlobType.greenCount >= 1)) {
                            CheckIfBlobSameTeam = false
                        }
                    }

                    if (this.checkGridandPieceType(curPiece, gridTile) && CheckIfBlobSameTeam) {
                        console.log()
                        this.clearPieceFromGameState(curPiece.id)
                        gridTile.pieces.push(curPiece);

                        if (this.isMixiBlob(gridTile).type === "mixBlueandGreen") {
                            if (this.checkPieceTeams(gridTile, curPiece)) {
                                if (curPiece.type === 3 || curPiece.type === 5) {

                                    for (let i = gridTile.pieces.length - 1; i >= 0; i--) {
                                        console.log("Gridtile Pieces", gridTile.pieces)
                                        if (gridTile.pieces[i].type === 2 || gridTile.pieces[i].type === 4) {
                                            console.log("Piece", gridTile.pieces[i])
                                            this.sendPieceToStart(gridTile.pieces[i])

                                            gridTile.pieces.splice(i, 1)
                                        }
                                    }


                                }
                            }
                        }
                        
                        this.setSpriteToTopOfStack(gridTile)

                       }
                    else {

                        console.log("Moving back data")
                           this.dragObj.x = this.originalX + 32;
                           this.dragObj.y = this.originalY + 32;
                           curPiece.x = this.dragObj.x - 32;
                           curPiece.y = this.dragObj.y - 32;

                        for (let i = 0; i < this.piecesState.length; i++) {
                            if (this.piecesState[i].id === curPiece.id) {
                                this.piecesState[i].x = curPiece.x;
                                this.piecesState[i].y = curPiece.y;
                            }
                        }


                    }
                }



            })


        })


        this.gameGrid.forEach(row => {
            row.forEach(gridTile => {
                if (gridTile.type != 7 && (gridTile.type === curPiece.type || gridTile.type === 1)) {
                    this.updatePieceUI(gridTile)
                }
            })
        })



        console.log(this.piecesState)
        console.log(this.gameGrid)
    }

    checkPieceTeams(gridTile, curPiece) {
        return gridTile.pieces.some((piece) => {
            if (curPiece.type === 2 || curPiece.type == 4) {
                if (piece.type === 5 || piece.type === 3) {
                    return true;
                }
            }

            if (curPiece.type === 5 || curPiece.type == 3) {
                if (piece.type === 2 || piece.type === 4) {
                    return true;
                }
            }

            return false;


        })


    }

    clearPieceFromGameState(pieceId) {

        this.gameGrid.forEach(row => row.forEach(gridTile => {
            for (let i = 0; i < gridTile.pieces.length; i++) {
                if (gridTile.pieces[i].id === pieceId) {
                    console.log("Deleting Piece", gridTile.pieces[i])
                    gridTile.pieces.splice(i, 1);
                    break;
                }
            }
        }))

    }

    sendPieceToStart(piece) {
        if (piece.type === 2) {
            if (piece.pieceNo === 1) {
                console.log("Sending Green Piece 1 to start", piece)
                piece.x = 128
                piece.y = 128
                let gameTile = this.findGridTileFromXandY(piece.x, piece.y)
                piece.sprite.setPosition(piece.x + 32, piece.y + 32)
                gameTile.pieces.push(piece)
                this.updatePieceUI(gameTile)
            }
            if (piece.pieceNo === 2) {
                console.log("Sending Green Piece 2 to start", piece)
                piece.x = 192
                piece.y = 128
                let gameTile = this.findGridTileFromXandY(piece.x, piece.y)
                piece.sprite.setPosition(piece.x + 32, piece.y + 32)
                gameTile.pieces.push(piece)
                this.updatePieceUI(gameTile)
            }
            if (piece.pieceNo === 3) {
                console.log("Sending Green Piece 3 to start", piece)
                piece.x = 128
                piece.y = 192
                let gameTile = this.findGridTileFromXandY(piece.x, piece.y)
                piece.sprite.setPosition(piece.x + 32, piece.y + 32)
                gameTile.pieces.push(piece)
                this.updatePieceUI(gameTile)
            }
            if (piece.pieceNo === 4) {
                console.log("Sending Green Piece 4 to start", piece)
                piece.x = 192
                piece.y = 192
                let gameTile = this.findGridTileFromXandY(piece.x, piece.y)
                piece.sprite.setPosition(piece.x + 32, piece.y + 32)
                gameTile.pieces.push(piece)
                this.updatePieceUI(gameTile)
            }

        }

        if (piece.type === 4) {
            if (piece.pieceNo === 1) {
                console.log("Sending Blue Piece 1 to start", piece)
                piece.x = 704
                piece.y = 704
                let gameTile = this.findGridTileFromXandY(piece.x, piece.y)
                piece.sprite.setPosition(piece.x + 32, piece.y + 32)
                gameTile.pieces.push(piece)
                this.updatePieceUI(gameTile)
            }
            if (piece.pieceNo === 2) {
                console.log("Sending Blue Piece 1 to start", piece)
                piece.x = 704
                piece.y = 768
                let gameTile = this.findGridTileFromXandY(piece.x, piece.y)
                piece.sprite.setPosition(piece.x + 32, piece.y + 32)
                gameTile.pieces.push(piece)
                this.updatePieceUI(gameTile)
            }
            if (piece.pieceNo === 3) {
                console.log("Sending Blue Piece 1 to start", piece)
                piece.x = 768
                piece.y = 704
                let gameTile = this.findGridTileFromXandY(piece.x, piece.y)
                piece.sprite.setPosition(piece.x + 32, piece.y + 32)
                gameTile.pieces.push(piece)
                this.updatePieceUI(gameTile)
            }
            if (piece.pieceNo === 4) {
                console.log("Sending Blue Piece 1 to start", piece)
                piece.x = 768
                piece.y = 768
                let gameTile = this.findGridTileFromXandY(piece.x, piece.y)
                piece.sprite.setPosition(piece.x + 32, piece.y + 32)
                gameTile.pieces.push(piece)
                this.updatePieceUI(gameTile)
            }

        }

    }

    findGridTileFromXandY(x, y) {
        for (let i = 0; i <= this.gameGrid.length - 1; i++) {
            for (let j = 0; j <= this.gameGrid[i].length - 1; j++) {
                if (this.gameGrid[i][j].x === x & this.gameGrid[i][j].y === y) {
                    return this.gameGrid[i][j]

                }
            }
        }
    }

    setSpriteToTopOfStack(gridTile) {
        gridTile.pieces.forEach(piece => {
            piece.sprite.setDepth(0)
        })
        let topPiece = gridTile.pieces[gridTile.pieces.length - 1]
        topPiece.sprite.setDepth(1)
    }

    updatePieceUI(gridTile) {
      
        let BlobType = this.isMixiBlob(gridTile)


        if (gridTile.text != undefined) {
            gridTile.text.destroy()

        }
        if (gridTile.pieces.length > 0) {
            this.clearMixiBlobsImage(gridTile.pieces[gridTile.pieces.length - 1])

        }

        if (BlobType.type === "mixBlueandGreen") {
            console.log("mixiBlob")
            this.changeMixiBlobsImage(gridTile.pieces[gridTile.pieces.length - 1], "mixBlueandGreen")
            this.putNumberOnPieceTwoColor(gridTile, BlobType.blueCount, BlobType.greenCount)
        } else if (BlobType.type === "mixRedandYellow") {
            this.changeMixiBlobsImage(gridTile.pieces[gridTile.pieces.length - 1], "mixRedandYellow")
            this.putNumberOnPieceTwoColor(gridTile, BlobType.redCount, BlobType.yellowCount)
        } else {
            if (BlobType.greenCount > 1) {
                this.putNumberOnPieceOneColor(gridTile, BlobType.greenCount)
            } else if (BlobType.blueCount > 1) {
                this.putNumberOnPieceOneColor(gridTile, BlobType.blueCount)
            } else if (BlobType.yellowCount > 1) {
                this.putNumberOnPieceOneColor(gridTile, BlobType.yellowCount)
            } else if (BlobType.redCount > 1) {
                this.putNumberOnPieceOneColor(gridTile, BlobType.redCount)
            }
        }




    }

    isMixiBlob(gridTile) {
        let noOfGreen = 0
        let noOfBlue = 0
        let noOfRed = 0
        let noOfYellow = 0

        gridTile.pieces.forEach((piece) => {
            console.log(piece)
            if (piece.type === 2) {
                noOfGreen++
            } else if (piece.type === 4) {
                noOfBlue++
            } else if (piece.type === 3) {
                noOfYellow++
            } else if (piece.type === 5) {
                noOfRed++
            }

            console.log(noOfBlue, noOfGreen)
        })

        if (noOfGreen >= 1 && noOfBlue >= 1) {
            return { type: "mixBlueandGreen", greenCount: noOfGreen, blueCount: noOfBlue, redCount: noOfRed, yellowCount: noOfYellow }
        } else if (noOfRed >= 1 && noOfYellow >= 1) {
            return { type: "mixRedandYellow", greenCount: noOfGreen, blueCount: noOfBlue, redCount: noOfRed, yellowCount: noOfYellow }
        } else if (noOfRed >= 2 || noOfYellow >= 2 || noOfGreen >= 2 || noOfBlue >= 2) {
            return { type: "pureBlob", greenCount: noOfGreen, blueCount: noOfBlue, redCount: noOfRed, yellowCount: noOfYellow }
        } else {
            return { type: "notBlob", greenCount: noOfGreen, blueCount: noOfBlue, redCount: noOfRed, yellowCount: noOfYellow }
        }

    }

    putNumberOnPieceOneColor(gridTile, no) {
        let pieceNo = this.add.text(gridTile.x, gridTile.y, no.toString() + "x", { fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif', fontSize: "32px" })
        pieceNo.setPadding({left: 12, top: 12})
        gridTile.text = pieceNo;
    }

    putNumberOnPieceTwoColor(gridTile, colNo1, colNo2) {

        let pieceNo = this.add.text(gridTile.x, gridTile.y, `${colNo1}x ${colNo2}x`, { fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif', fontSize: "24px" })
        pieceNo.setPadding({ left: 5, top: 12 })
        pieceNo.setDepth(1)
        gridTile.text = pieceNo;
    }

    changeMixiBlobsImage(piece, imgTag) {
        console.log("pieceImageToChange", piece)
        piece.sprite.setTexture(imgTag)
        piece.sprite.setDepth(0.9)
    }

    clearMixiBlobsImage(piece) {
        console.log("ChangeImageBackPiece", piece)
        if (piece.type === 2) {
            piece.sprite.setTexture("greenPiece")
        } else if (piece.type === 4) {
            piece.sprite.setTexture("bluePiece")
        } else if (piece.type === 3) {
            piece.sprite.setTexture("yellowPiece")
        } else if (piece.type === 5) {
            piece.sprite.setTexture("redPiece")
        }
        piece.sprite.setDepth(0)
    }

    update() {

    }

}


var config = {
    type: Phaser.AUTO,
    width: 960,
    height: 960,
    scene: [gameScene]
};

let game = new Phaser.Game(config);
