import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from "@angular/common/http";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { ContentComponent } from './content/content.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { EmployeesComponent } from './employees/employees.component';
import { PositionsComponent } from './positions/positions.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { EmployeeService } from './data/employee.service';
import { PositionService } from './data/position.service';
import { EmployeeComponent } from './employee/employee.component';
import { PositionComponent } from './position/position.component';
import { FormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    ContentComponent,
    FooterComponent,
    HomeComponent,
    EmployeesComponent,
    PositionsComponent,
    PagenotfoundComponent,
    EmployeeComponent,
    PositionComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [EmployeeService, PositionService],
  bootstrap: [AppComponent]
})
export class AppModule { }
