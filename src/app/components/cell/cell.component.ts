import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { GridService } from 'src/app/services/grid.service';
import { side } from 'src/app/types/side';

@Component({
  selector: 'app-cell',
  templateUrl: './cell.component.html',
  styleUrls: ['./cell.component.css']
})
export class CellComponent implements OnInit {
  public text!: side | null;
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
      if (value.includes(this.index))
        this.isWinningCell = true;
    });
  }

  onClick() {
    this.cellClick.emit();
  }

}
