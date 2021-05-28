const prompt = require('prompt-sync')({sigint: true});

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';

class Field {
  constructor(field, player){
    this._field = field;
    this._player = player;
  }
  get field() {
    return this._field;
  }
  print() {
    let grid = this.field.join('\n').replace(/,/g,'')
    return grid;
  }
  playGame() {
    let alive = true
    let win = false
    let x = 0
    let y = 0
    let field = this.field
    for(let i = 0; i < field.length; i++){
      if(field[i].includes('*'))
      {
        x = i
        y = field[i].indexOf('*') 
        }
    }
    while (alive == true || win == false){
    console.log(x,y)
    console.log(myField.print())
    const direction = prompt('Please pick a direction (N,S,E or W) ' )
    if (direction.toUpperCase() == 'N'){
      if (x == 0){
        console.log('You cannot move this direction, please choose another!');
      } else if (field[x-1][y] == 'O'){console.log('You fell into a hole! You lose!'), process.exit(1)
        } else if (field[x-1][y] == '^'){console.log('You found the Hat! You Win!'), process.exit(1)
          } else {field[x-1][y] = '*';
            x--;}

    } else if (direction.toUpperCase() == 'S'){
      if (x == field.length - 1){
        console.log('You cannot move this direction, please choose another!');
      } else if (field[x+1][y] == 'O'){console.log('You fell into a hole! You lose!'), process.exit(1)
        } else if (field[x+1][y] == '^'){console.log('You found the Hat! You Win!'), process.exit(1)
          } else {field[x+1][y] = '*';
            x++;}

    } else if (direction.toUpperCase() == 'W'){
      if (y == 0){
        console.log('You cannot move this direction, please choose another!');
      } else if (field[x][y-1] == 'O'){console.log('You fell into a hole! You lose!'), process.exit(1)
        } else if (field[x][y-1] == '^'){console.log('You found the Hat! You Win!'), process.exit(1)
          } else {field[x][y-1] = '*';
            y--;}

    } else if (direction.toUpperCase() == 'E'){
      console.log(y)
      if (y == field[x].length - 1){
        console.log('You cannot move this direction, please choose another!');
      } else if (field[x][y+1] == 'O'){console.log('You fell into a hole! You lose!'), process.exit(1)
        } else if (field[x][y+1] == '^'){console.log('You found the Hat! You Win!'), process.exit(1)
          } else {field[x][y+1] = '*';
            y++;}

      } 
    }
  }
  static generateField(){
    let blankField = [];
    let finalField = [];
    let max = 10
    let min = 3

    // Random width generator
    const randomWidth = () => {
      return Math.floor(Math.random() * 7) + 3;
    }

    // Random height generator
    const randomHeight = () => {
      return Math.floor(Math.random() * 7) + 3;
    }

    // Declared functions for ease of use
    let height = randomHeight();
    let width = randomWidth();

    // Creates an array filled with ░ using width to determine how many to push
    for (let i = 0; i < width; i++){
      blankField.push('░')
    }

    // Copys the blankField array and pushes individual arrays into a finalField array
    for (let j = 0; j < height; j++){
      let pusher = blankField.slice()
      finalField.push(pusher)
    }

    // Random number generator used to get a random number of width
    const randomHoleGen = () => {
      return Math.floor(Math.random() * width);
    }

    // This for block is what puts the holes into the arrays, depending on the size of the width it will generate more holes
    for (let i = 0; i < height; i++){
      let holes = finalField[i]
      holes.splice(randomHoleGen(), 1, 'O')
      if (width >= 5 && height >= 5){
        holes.splice(randomHoleGen(), 1, 'O')
        if (width >= 7 && height >= 7){
          holes.splice(randomHoleGen(), 1, 'O')
        }
      } 
    } 

    // This block of code is what puts the player start icon in the index of [0][0]
    let shifter = finalField[0];
    shifter.shift();
    shifter.unshift('*');

    // This for loop gets the last array and using the hole gen code, places the hat on a random index in the last line
    for (let i = 0; i < height; i++)
      if (i == height - 1){
        finalField[i].splice(randomHoleGen(), 1, '^')
    }
    return finalField
  }
}
let myField = new Field(Field.generateField())
/*const myField = new Field([
  ['*', '░', 'O'],
  ['░', 'O', '░'],
  ['░', '^', '░'],
]); */
myField.playGame()
