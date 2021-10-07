import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import GridInterface from '../types/grid';
import { side } from '../types/side';

@Injectable({
  providedIn: 'root'
})
export class GridService {
  private readonly lines: number[][] = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  public sideToMove: side = "X";
  public grid: GridInterface = {
    0: null,
    1: null,
    2: null,
    3: null,
    4: null,
    5: null,
    6: null,
    7: null,
    8: null
  };
  public gridSubject = new Subject<GridInterface>();

  constructor() { }

  public changeSideToMove() {
    const isX = this.sideToMove === "X";
    this.sideToMove = isX ? "O" : "X";
    this.gridSubject.next(this.grid);
  }

  private getText(line: number[]) {
    return line.reduce((text, number) => {
      const index = number as unknown as keyof GridInterface;
      return text + this.grid[index];
    }, "");
  }

  public getWinner(): side | null {
    const texts = this.lines.map(this.getText);
    if (texts.includes("XXX"))
      return "X";
    if (texts.includes("OOO"))
      return "O";
    return null;
  }
}
