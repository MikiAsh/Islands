import { Observable } from 'rxjs/Observable';
import { IRow } from './../../Interfaces/irow.interface';
import { Component, OnInit } from '@angular/core';
import { MatrixService } from '../../Services/matrix.service';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

const increment = 50;

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.less']
})
export class MainComponent implements OnInit {

  private diplaySolveButton = false;
  private solution: number = null;
  // scroll
  private sum = increment;
  private array: IRow[] = [];

  constructor(private _matrixService: MatrixService) {}

  ngOnInit() {
    this._matrixService.matrixCreated$.subscribe(() => {
      this.diplaySolveButton = true;
      this.solution = null;
      this.array = [];
      this.appendItems(0, this.sum);
    });
  }

  addItems(startIndex, endIndex) {

    endIndex = Math.min(this._matrixService.dimensions.rows, startIndex + increment);
    const subArray = this._matrixService.matrix.slice(startIndex, endIndex);

    // console.log('endIndex', endIndex, subArray);
    Array.prototype.push.apply(this.array, subArray);
  }

  appendItems(startIndex, endIndex): void {
    this.addItems(startIndex, endIndex);
  }

  onScroll() {
    const start = this.sum;

    if (this._matrixService.matrix && this.sum < this._matrixService.dimensions.rows) {
      this.sum += increment;
      this.appendItems(start, this.sum);
    }
    // this.direction = 'down';
  }

  assignId(rowIndex, colIndex): string {
    // console.log('row', rowIndex, 'col:', colIndex);
    return `row${rowIndex}col${colIndex}`;
  }

  solve(): void {
    this.solution = this.solution || this._matrixService.solve();
  }

}
