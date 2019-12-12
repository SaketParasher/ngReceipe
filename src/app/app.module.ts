import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";

import { AppComponent } from "./app.component";
import { HeaderComponent } from "./header/header.component";
//import { ToggleDropdownDirective } from "./directives/toggle-dropdown.directive";
import { HighlightDirective } from "./directives/highlight.directive";
import { BetteHighlightDirective } from "./directives/bette-highlight.directive";
import { ReceipeService } from "./receipe/receipe.service";
import { ShoppingListService } from "./shoppingl-list/shopping-list.service";

import { AppRoutingModule } from "./app.routing.module";

import { AuthInterceptor } from './auth/auth/auth-interceptors.service';
import { AuthGuardService } from './auth/auth/auth.guard';

import { ReceipeModule } from './receipe.module';
import { ReceipeRoutingModule } from './receipe.routing.module';
//import { ShoppingListModule } from './shopping-list.module';
import { SharedModule } from './shared.module';
//import { AuthModule } from './auth.module';


// STORE MODULES AND REDUCERS
import { StoreModule } from "@ngrx/store";
import * as fromApp from './store/app.reducer';
//import { ShoppingListReducer } from './store/reducers/shopping-list.reducers';
//import { AuthReducer } from './store/reducers/auth.reducer';
import { EffectsModule } from "@ngrx/effects";
import { AuthEffects } from './store/effects/auth.effects';

import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from 'src/environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HighlightDirective,
    BetteHighlightDirective
  ],
  imports: [
    BrowserModule, AppRoutingModule,
    HttpClientModule, ReceipeModule,
    ReceipeRoutingModule,
    SharedModule,
    StoreModule.forRoot(fromApp.AppReducer),
    EffectsModule.forRoot([AuthEffects]),
    StoreDevtoolsModule.instrument({ logOnly: environment.production })
  ],

  providers: [
    ReceipeService, ShoppingListService,
    AuthGuardService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
