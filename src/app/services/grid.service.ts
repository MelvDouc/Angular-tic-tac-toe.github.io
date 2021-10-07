import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Grid } from "../types/grid";
import { side } from '../types/side';

@Injectable({
  providedIn: 'root'
})
export class GridService {
  public isGameOver: boolean = false;
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
  public grid: Grid = new Map([
    [0, null],
    [1, null],
    [2, null],
    [3, null],
    [4, null],
    [5, null],
    [6, null],
    [7, null],
    [8, null]
  ]);
  public gridSubject = new Subject<Grid>();
  public winningLineSubject = new Subject<number[]>();

  constructor() { }

  public changeSideToMove(): void {
    const isX = this.sideToMove === "X";
    this.sideToMove = isX ? "O" : "X";
    this.gridSubject.next(this.grid);
  }

  private getText(line: number[]): string {
    return line.reduce((text, number) => {
      return text + this.grid.get(number);
    }, "");
  }

  private checkWin(): void {
    for (const line of this.lines) {
      const text = this.getText(line);
      if (text === "XXX" || text === "OOO") {
        this.winningLineSubject.next(line);
        this.isGameOver = true;
        return;
      }
    }
  }

  public markCell(key: number): void {
    this.checkWin();
    if (this.isGameOver)
      return;
    this.grid.set(key, this.sideToMove);
    this.changeSideToMove();
    this.gridSubject.next(this.grid);
  }
}
