import { NgModule } from "@angular/core";
import { AddUserComponent } from "./add-user/add-user.component";
import { DetailUserComponent } from "./detail-user/detail-user.component";
import { EditUserComponent } from "./edit-user/edit-user.component";
import { ListUserComponent } from "./list-user/list-user.component";
import { UserRoutingModule } from "./user.routing.module";
import { MatButtonModule, MatCardModule, MatCheckboxModule, MatChipsModule, MatExpansionModule, MatFormFieldModule, MatIconModule, MatInputModule, MatListModule, MatMenuModule, MatNativeDateModule, MatOptionModule, MatPaginatorModule, MatProgressSpinnerModule, MatSelectModule, MatSlideToggleModule, MatSortModule, MatStepperModule, MatTabsModule, MatToolbarModule, MatTreeModule } from "@angular/material";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { MatTableModule } from '@angular/material/table'
import { AgmCoreModule } from "@agm/core";
import { environment } from "src/environments/environment";
import { MatDatepickerModule } from '@angular/material/datepicker';

@NgModule({
  declarations: [
    AddUserComponent,
    EditUserComponent,
    ListUserComponent,
    DetailUserComponent,
  ],
  imports: [
    CommonModule,
    AgmCoreModule.forRoot({
      apiKey: environment.googleApiKey
    }),
    MatInputModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatSortModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatSelectModule,
    MatOptionModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatSlideToggleModule,
    MatCheckboxModule,
    MatChipsModule,
    MatMenuModule,
    MatToolbarModule,
    MatExpansionModule,
    MatListModule,
    MatStepperModule,
    MatTabsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTreeModule,
    UserRoutingModule,

  ],
  entryComponents: [],
})
export class UserModule {}
