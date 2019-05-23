export class NQueensSolver {

  board: number[][] = [];

  constructor(private n: number){
    for(let i=0;i<n;i++){
      this.board[i] = [];
      for(let j=0; j<n; j++)
        this.board[i].push(0)
    }
  }

  private isSafe(row: number, col: number) {
    let i;
    let j;

    /* Check this row on left side */
    for (i = 0; i < col; i++) {
      if (this.board[row][i] === 1) {
        return false;
      }
    }

    for (i = row, j = col; i >= 0 && j >= 0; i--, j--) {
      if (this.board[i][j] == 1) {
        return false;
      }
    }

    /* Check lower diagonal on left side */
    for (i = row, j = col; j >= 0 && i < this.n; i++, j--) {
      if (this.board[i][j] == 1) {
        return false;
      }
    }


    return true;
  }

  private solveNQUtil(col) {

    if (col >= this.n) {
      return true;
    }

    /* Consider this column and try placing
       this queen in all rows one by one */
    for (let i = 0; i < this.n; i++) {
      /* Check if the queen can be placed on
         board[i][col] */
      if (this.isSafe(i, col)) {
        /* Place this queen in board[i][col] */
        this.board[i][col] = 1;

        /* recur to place rest of the queens */
        if (this.solveNQUtil(col + 1) == true) {
          return true;
        }

        /* If placing queen in board[i][col]
           doesn't lead to a solution then
           remove queen from board[i][col] */
        this.board[i][col] = 0; // BACKTRACK
      }
    }

    /* If the queen can not be placed in any row in
       this colum col, then return false */
    return false;
  }
  solve(){
    this.solveNQUtil(0);
    return this.board;
  }
}
