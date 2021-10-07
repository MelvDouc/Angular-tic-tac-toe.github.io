import { Component, OnInit } from '@angular/core';
import { GridService } from 'src/app/services/grid.service';

@Component({
  selector: 'app-move-indicator',
  templateUrl: './move-indicator.component.html',
  styleUrls: ['./move-indicator.component.css']
})
export class MoveIndicatorComponent implements OnInit {

  constructor(private gridService: GridService) { }

  ngOnInit(): void {
  }

  get text(): string {
    if (this.gridService.winner)
      return `${this.gridService.winner} wins.`;
    if (this.gridService.isDraw)
      return `Draw.`;
    return `${this.gridService.sideToMove} to move.`;
  }

}
