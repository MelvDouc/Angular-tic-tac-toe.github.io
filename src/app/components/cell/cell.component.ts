import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { GridService } from 'src/app/services/grid.service';
import Side from 'src/app/types/side';

@Component({
  selector: 'app-cell',
  templateUrl: './cell.component.html',
  styleUrls: ['./cell.component.css']
})
export class CellComponent implements OnInit {
  public text!: Side | null;
  public isWinningCell: boolean = false;
  @Input() index!: number;
  @Output() cellClick = new EventEmitter<void>();

  constructor(private gridService: GridService) { }

  ngOnInit(): void {
    this.gridService.gridSubject.subscribe(value => {
      const text = value.get(this.index);
      if (text === undefined)
        return;
      this.text = text;
    });
    this.gridService.winningLineSubject.subscribe(value => {
      this.isWinningCell = value.includes(this.index);
    });
  }

  get isDraw(): boolean {
    return this.gridService.isDraw;
  }

  onClick(): void {
    this.cellClick.emit();
  }

}
