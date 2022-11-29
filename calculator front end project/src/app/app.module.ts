import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClient, HttpClientModule } from '@angular/common/http'
import { AppComponent } from './app.component';
import { CalculatorComponent } from './calculator/calculator.component';
import { CalcServiceService } from './calc-service.service';

@NgModule({
  declarations: [
    AppComponent,
    CalculatorComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
  ],
  providers: [CalcServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
