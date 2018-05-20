import { Component, OnInit } from '@angular/core';
import { IMatrixDimensions } from '../../Interfaces/imatrix-dimensions.interface';
import { MatrixService } from '../../Services/matrix.service';
@Component({
  selector: 'app-setup',
  templateUrl: './setup.component.html',
  styleUrls: ['./setup.component.less']
})
export class SetupComponent implements OnInit {

  userInput: string;

  constructor(private _matrixService: MatrixService) {}

  ngOnInit() {
  }

  private generateMatrix(): void {
    this._matrixService.dimensions = this.getSize();

    if (this._matrixService.dimensions === null) {
      return;
    }
    this._matrixService.generateMatrix();
  }

  private getSize(): IMatrixDimensions {
    const arrInput: string[] = this.userInput ? this.userInput.replace(/ /g, '').split(',') : [''];

    if (this.isValid(arrInput)) {
      return {cols: parseInt(arrInput[0], 10), rows: parseInt(arrInput[1], 10)};
    } else {
      return null; // TODO: display 'invalid input' message
    }
  }

  private isValid(arrInput: string[]): boolean {
    if (arrInput.length === 2 && this.isNumeric(arrInput[0]) && arrInput[0] !== '0' && this.isNumeric(arrInput[1]) && arrInput[1] !== '0') {
      return true;
    } else { return false; }
  }

  private isNumeric(n: any) {
    return !isNaN(parseFloat(n)) && isFinite(n);
  }

}


