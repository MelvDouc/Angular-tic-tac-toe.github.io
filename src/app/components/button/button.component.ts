import { Component, OnInit } from '@angular/core';
import { GridService } from "src/app/services/grid.service";

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css']
})
export class ButtonComponent implements OnInit {

  constructor(private gridService: GridService) { }

  ngOnInit(): void {
  }

  newGame(): void {
    this.gridService.newGame();
  }

}
