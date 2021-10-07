import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { GridService } from 'src/app/services/grid.service';
import GridInterface from 'src/app/types/grid';
import { side } from 'src/app/types/side';

@Component({
  selector: 'app-cell',
  templateUrl: './cell.component.html',
  styleUrls: ['./cell.component.css']
})
export class CellComponent implements OnInit {
  public content!: side | null;
  @Input() index!: keyof GridInterface;
  @Output() cellClick = new EventEmitter<void>();

  constructor(private gridService: GridService) { }

  ngOnInit(): void {
    this.gridService.gridSubject.subscribe(value => {
      this.content = value[this.index];
    });
  }

  onClick() {
    this.cellClick.emit();
  }

}
