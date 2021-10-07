import { Component, OnInit } from '@angular/core';
import { GridService } from 'src/app/services/grid.service';
import { side } from 'src/app/types/side';

@Component({
  selector: 'app-move-indicator',
  templateUrl: './move-indicator.component.html',
  styleUrls: ['./move-indicator.component.css']
})
export class MoveIndicatorComponent implements OnInit {

  constructor(private gridService: GridService) { }

  ngOnInit(): void {
  }

  get sideToMove(): side {
    return this.gridService.sideToMove;
  }

}
