import { Injectable } from '@angular/core';
import { IMatrixDimensions } from '../Interfaces/imatrix-dimensions.interface';
import { ICell } from '../Interfaces/icell.interface';
import { IRow } from '../Interfaces/irow.interface';
import { Subject } from 'rxjs/Subject';

const black = '#000';
const white = '#fff';

@Injectable()
export class MatrixService {

  public matrix: IRow[];
  public dimensions: IMatrixDimensions;
  public matrixCreated$: Subject<any> = new Subject();
  private solved = false;

  constructor() {}

  public generateMatrix(): void {
    this.matrix = [];
    this.solved = false;

    for (let m = 0; m < this.dimensions.rows; m++) {
      this.matrix.push(<IRow>{cells: []});
      for (let n = 0; n < this.dimensions.cols; n++) {
        this.matrix[m].cells.push(<ICell>{col: n, row: m, color: this.getRandomBlackOrWhite(), visited: false});
      }
    }

    this.matrixCreated$.next();
    // console.log('final matrix:', this.matrix);
  }

  private getRandomBlackOrWhite(): string {
    const rand = Math.floor(Math.random() * 2);
    return rand ? black : white;
  }

  public solve(): number {

    if (this.solved) { return null; }

    let counter = 0;
    for (let row = 0; row < this.matrix.length; row++) {
      for (let cell = 0; cell < this.matrix[row].cells.length; cell++) {
        const current = this.matrix[row].cells[cell];
        if (!current.visited && current.color === black) {
          current.color = this.generateRandomColor();
          this.searchNeighbors(current);
          counter++;
        }
          // console.log('for this cell', this.matrix[row].cells[cell], 'Neighbors:', this.getNeighbors(this.matrix[row].cells[cell]));
      }
    }

    this.solved = true;
    return counter;
  }

  private searchNeighbors(cell: ICell, color?: string): void {

    const queue = [cell];
    let current: ICell;

    while (queue.length > 0) {
      current = queue.shift();

      this.getNeighbors(current).forEach(c => {
        if (!c.visited && c.color === black) {
          c.visited = true;
          c.color = current.color;
          queue.push(c);
        }
      });
    }

    const neighbors: ICell[] = this.getNeighbors(cell);
    cell.visited = true;

  }

  // This function is UNUSED. It is the previous version of searchNeighbors
  private searchNeighborsRecursive(cell: ICell, color?: string): void {

    const neighbors: ICell[] = this.getNeighbors(cell);
    cell.visited = true;

    cell.color = color || this.generateRandomColor();
    for (let i = 0; i < neighbors.length; i++) {
      if (!neighbors[i].visited && neighbors[i].color === black) {
        this.searchNeighborsRecursive(neighbors[i], cell.color);
      }
    }
  }

  // nw   north  ne
  // west        east
  // sw   south  se
  private getNeighbors(cell: ICell): ICell[] {

    const result: ICell[] = [];
    const north: ICell = cell.row > 0 ? this.matrix[cell.row - 1].cells[cell.col] : null;
    const south: ICell = cell.row < this.dimensions.rows - 1 ? this.matrix[cell.row + 1].cells[cell.col] : null;
    const west: ICell = cell.col > 0 ? this.matrix[cell.row].cells[cell.col - 1] : null;
    const east: ICell = cell.col < this.dimensions.cols - 1 ? this.matrix[cell.row].cells[cell.col + 1] : null;

    if (north !== null) { result.push(north); }
    if (south !== null) { result.push(south); }
    if (west !== null)  { result.push(west); }
    if (east !== null)  { result.push(east); }
    if (north !== null && west !== null) { result.push(this.matrix[cell.row - 1].cells[cell.col - 1]); }// nw
    if (north !== null && east !== null) { result.push(this.matrix[cell.row - 1].cells[cell.col + 1]); }// ne
    if (south !== null && west !== null) { result.push(this.matrix[cell.row + 1].cells[cell.col - 1]); }// sw
    if (south !== null && east !== null) { result.push(this.matrix[cell.row + 1].cells[cell.col + 1]); }// se

    return result;
  }

  private generateRandomColor(): string {

    let color = '#';
    const letters = '0123456789ABCDEF'.split('');

    for (let i = 0; i < 6; i++ ) {
        color += letters[Math.round(Math.random() * 15)];
    }
    return color;
  }

}
