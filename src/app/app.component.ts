import { Component } from '@angular/core';
import {NQueensSolver} from './NQueensSolver';
import {isNumeric} from 'rxjs/internal-compatibility';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {

  count = 8;

  board : {type: number, color?: string}[][] = [];


  left = 8;

  colored = false;

  hideDots = false;

  constructor(){
    this.refresh()

  }

  solve(){
    this.refresh();

    let queens = new NQueensSolver(this.count);
    queens.solve();
    queens.board.forEach((row, i)=>{
      row.forEach((col, j)=>{
        if(col === 1){
          this.dotQueen(i, j)

        }
      });
    })
  }

  refresh(){
    //  checking if user input is a number
    if(!isNumeric(this.count)){
      alert("count must be a positive number");
      return
    }

    // just to make share squares are not too small to see
    if(this.count < 1 || this.count > 24){
      alert("max count 24 and min count 1");
      return;
    }

    // in case a float number is given
    this.count = Math.ceil(this.count);
    this.left = this.count;


    this.board = [];
    for(let i = 0; i < this.count; i++){
      this.board.push([]);
      for(let j = 0; j < this.count; j++){
        this.board[i].push({type: 0})
      }
    }

  }


  squareClicked(i, j){
    if(this.board[i][j].type === 0){
      this.board[i][j].type = 1;
      this.dotQueen(i, j)
    }

  }



  dotQueen(i, j){
    const board = this.board;
    const queen = board[i][j];
    queen.type = 1;
    if(this.colored){
      queen.color = randomColor();
    }
    this.left--;

    const setColor = (i, j)=>{
      this.board[i][j].color = queen.color ? queen.color : "";
    };

    this.findHitAreas(i,j).forEach((obj)=>{
      setColor(obj.i, obj.j);
      this.board[obj.i][obj.j].type = 2;
    });





  }



  colorChanged(){

    if(this.colored){
      this.board.forEach((row, i)=>{
        row.forEach((col, j) => {
          if(col.type === 1){
            this.dotQueen(i,j);
            this.left++;
          }
        })
      })

    } else {
      this.board.forEach((row)=>{
        row.forEach(c => c.color = "")
      })
    }

  }

  findHitAreas(i, j): {i,j}[]{
    let areas = [];
    for(let x = 0; x< this.count; x++){
      if(x !== i)
        areas.push({i: x, j: j});
      if(x !== j)
        areas.push({i: i, j: x});

    }
    let min = Math.min(i,j);
    let pointI = i-min;
    let pointJ = j-min;

    for(let x=0; x < this.count - pointI && x < this.count - pointJ; x++){
      if(i !== pointI + x)
        areas.push({i: pointI + x, j: pointJ + x})
    }

    min = Math.min(this.count - i -1,j);
    pointI = i + min;
    pointJ = j - min;

    for(let x=0; pointI - x >= 0 && x < this.count - pointJ; x++){
      if(j !== pointJ + x)
        areas.push({i: pointI - x, j: pointJ + x})
    }




    return areas;
  }



}

// generates a random dark color
function randomColor(){
  let lum = -0.25;
  let hex = String('#' + Math.random().toString(16).slice(2, 8).toUpperCase()).replace(/[^0-9a-f]/gi, '');
  if (hex.length < 6) {
    hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
  }
  let rgb = "#",
    c, i;
  for (i = 0; i < 3; i++) {
    c = parseInt(hex.substr(i * 2, 2), 16);
    c = Math.round(Math.min(Math.max(0, c + (c * lum)), 255)).toString(16);
    rgb += ("00" + c).substr(c.length);
  }
  return rgb;
}
