import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { CellComponent } from './components/cell/cell.component';
import { GridComponent } from './components/grid/grid.component';
import { MoveIndicatorComponent } from './components/move-indicator/move-indicator.component';

@NgModule({
  declarations: [
    AppComponent,
    CellComponent,
    GridComponent,
    MoveIndicatorComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
