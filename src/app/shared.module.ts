import { NgModule } from '@angular/core';
import { PlaceholderDirective } from "./shared/placeholder/placeholder.directive";
import { LoadingspinnerComponent } from './shared/loadingspinner/loadingspinner.component';
import { AlertComponent } from './shared/alert/alert.component';
import { CommonModule } from '@angular/common';


@NgModule({
  declarations: [
    LoadingspinnerComponent,
    AlertComponent,
    PlaceholderDirective
  ],
  exports: [
    LoadingspinnerComponent,
    AlertComponent,
    PlaceholderDirective,
    CommonModule
  ],
  entryComponents: [AlertComponent]
})
export class SharedModule {

}
