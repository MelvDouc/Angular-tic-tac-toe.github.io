import { Component, OnInit } from '@angular/core';
import { GridService } from 'src/app/services/grid.service';
import GridInterface from 'src/app/types/grid';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css']
})
export class GridComponent implements OnInit {
  public keys!: (keyof GridInterface)[];

  constructor(private gridService: GridService) { }

  ngOnInit(): void {
    this.keys = Object.keys(this.gridService.grid) as unknown as (keyof GridInterface)[];
  }

  mark(key: keyof GridInterface) {
    if (this.gridService.grid[key])
      return;
    this.gridService.grid[key] = this.gridService.sideToMove;
    this.gridService.changeSideToMove();
  }
}
