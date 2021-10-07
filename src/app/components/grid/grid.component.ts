import { Component, OnInit } from '@angular/core';
import { GridService } from 'src/app/services/grid.service';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css']
})
export class GridComponent implements OnInit {
  public keys!: number[];

  constructor(private gridService: GridService) { }

  ngOnInit(): void {
    this.keys = [...this.gridService.grid.keys()];
  }

  mark(key: number) {
    this.gridService.markCell(key);
  }
}
