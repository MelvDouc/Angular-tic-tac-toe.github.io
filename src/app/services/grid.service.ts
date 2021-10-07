import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import Grid from "src/app/types/grid";
import Side, { optionalSide } from "src/app/types/side";

@Injectable({
  providedIn: 'root'
})
export class GridService {
  public winner: optionalSide = null;
  public isDraw: boolean = false;
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
  public sideToMove: Side = Side.first;
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

  private get isGameOver(): boolean {
    return Boolean(this.winner) || this.isDraw;
  }

  private changeSideToMove(): void {
    const isFirst = this.sideToMove === Side.first;
    this.sideToMove = (isFirst) ? Side.second : Side.first;
    this.gridSubject.next(this.grid);
  }

  private emitGrid(): void {
    this.gridSubject.next(this.grid);
  }

  private emitWinningLine(line: number[]): void {
    this.winningLineSubject.next(line);
  }

  private getText(line: number[]): string {
    return line.reduce((text, number) => {
      return text + this.grid.get(number);
    }, "");
  }

  private isWinningText(str: string) {
    return str === Side.first.repeat(3)
      || str === Side.second.repeat(3);
  }

  private isGameFilled(): boolean {
    return [...this.grid.values()].every(val => val !== null);
  }

  private checkWin(): void {
    for (const line of this.lines) {
      const text = this.getText(line);
      if (this.isWinningText(text)) {
        this.emitWinningLine(line);
        this.winner = text[0] as Side;
        return;
      }
    }

    if (this.isGameFilled())
      this.isDraw = true;
  }

  public markCell(key: number): void {
    if (this.isGameOver || this.grid.get(key) !== null)
      return;
    this.grid.set(key, this.sideToMove);
    this.checkWin();
    this.emitGrid();
    this.changeSideToMove();
  }

  public newGame(): void {
    this.winner = null;
    this.isDraw = false;
    this.sideToMove = Side.first;
    this.grid.forEach((_, key, map) => {
      map.set(key, null);
    });
    this.emitGrid();
    this.emitWinningLine([]);
  }
}
