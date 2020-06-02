import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { EnterComponent } from './components/enter/enter.component';
import { PageComponent } from './components/page/page.component';
import { route } from './routs';
import { RouterModule, Routes } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppendixAComponent } from './components/appendix-a/appendix-a.component';
import { NewComponent } from './components/new/new.component';
import { HttpClientModule } from '@angular/common/http';
import { ServerService } from '../../src/app/services/server.service';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';
import { BookDetailsComponent } from './components/book-details/book-details.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { UserPassComponent } from './components/user-pass/user-pass.component';
import { CongressRegistrationOneComponent } from './components/congress-registration-one/congress-registration-one.component';
import { CongressRegistrationSessionComponent } from './components/congress-registration-session/congress-registration-session.component';
import { InviteMembersComponent } from './components/invite-members/invite-members.component';
import { JudgesComponent } from './components/judges/judges.component';
import { SessionNameChairmanComponent } from './components/session-name-chairman/session-name-chairman.component';
import { SessionNameChairmanHebrewComponent } from './components/session-name-chairman-hebrew/session-name-chairman-hebrew.component';
import { InviteMembersHebrewComponent } from './components/invite-members-hebrew/invite-members-hebrew.component';
import { CongressRegistrationSessionHebrewComponent } from './components/congress-registration-session-hebrew/congress-registration-session-hebrew.component';
import { CongressRegistrationOneHebrewComponent } from './components/congress-registration-one-hebrew/congress-registration-one-hebrew.component';
import { EditPropComponent } from './components/edit-prop/edit-prop.component';
import { MessageComponent } from './components/message/message.component';
import { AllProposalsAdminComponent } from './components/all-proposals-admin/all-proposals-admin.component';
import { RegistrationOneEnglishComponent } from './components/registration-one-english/registration-one-english.component';
import { RegistrationOneHebrewComponent } from './components/registration-one-hebrew/registration-one-hebrew.component';
import { FirstPageEnglishComponent } from './components/first-page-english/first-page-english.component';
import { FirstPageHebrewComponent } from './components/first-page-hebrew/first-page-hebrew.component';
import { FirstNavigationComponent } from './components/first-navigation/first-navigation.component';
import { NewHebrewComponent } from './components/new-hebrew/new-hebrew.component';
import { ShopingCartHebrewComponent } from './components/shoping-cart-hebrew/shoping-cart-hebrew.component';
import { BookDetailsHebrewComponent } from './components/book-details-hebrew/book-details-hebrew.component';
import { TranzilaComponent } from './components/tranzila/tranzila.component';
import { DraftsComponent } from './components/drafts/drafts.component';
import { CookieService } from 'angular2-cookie/services/cookies.service';
import { CongressRegistrationSecondEnglishComponent } from './components/congress-registration-second-english/congress-registration-second-english.component';
import { CongressRegistrationSecondHebrewComponent } from './components/congress-registration-second-hebrew/congress-registration-second-hebrew.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Thank1Component } from './components/thank1/thank1.component';
import { Thank2Component } from './components/thank2/thank2.component';
import { Thank3Component } from './components/thank3/thank3.component';
//import { ModalModule, BsModalRef } from 'ngx-bootstrap';

//import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
//import { Observable } from 'rxjs/Observable';
import {
  MatFormFieldModule, MatAutocompleteModule,
    MatButtonModule, MatCheckboxModule, MatInputModule, MatPaginatorModule, MatProgressSpinnerModule, MatExpansionModule,
  MatSortModule, MatTableModule, MatIconModule, MatSelectModule, MatDatepickerModule, NativeDateModule, MAT_DATE_FORMATS
} from '@angular/material';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CongressRegistrationSingleComponent } from './components/congress-registration-single/congress-registration-single.component';


@NgModule({
  declarations: [
 

    AppComponent,
    EnterComponent,
    PageComponent,
    AppendixAComponent,
    NewComponent,
    ShoppingCartComponent,
    BookDetailsComponent,
    RegistrationComponent,
    WelcomeComponent,
    UserPassComponent,
    CongressRegistrationOneComponent,
    CongressRegistrationSessionComponent,
    InviteMembersComponent,
    JudgesComponent,
    SessionNameChairmanComponent,
    SessionNameChairmanHebrewComponent,
    InviteMembersHebrewComponent,
    CongressRegistrationSessionHebrewComponent,
    CongressRegistrationOneHebrewComponent,
    EditPropComponent,
    MessageComponent,
    AllProposalsAdminComponent,
    RegistrationOneEnglishComponent,
    RegistrationOneHebrewComponent,
    FirstPageEnglishComponent,
    FirstPageHebrewComponent,
    FirstNavigationComponent,
    NewHebrewComponent,
    ShopingCartHebrewComponent,
    BookDetailsHebrewComponent,
    TranzilaComponent,
    DraftsComponent,
    CongressRegistrationSecondEnglishComponent,
    CongressRegistrationSecondHebrewComponent,
    Thank1Component,
    Thank2Component,
    Thank3Component,
    CongressRegistrationSingleComponent
  ],
  imports: [
    MatAutocompleteModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    NgxMatSelectSearchModule,
    MatIconModule,
    MatInputModule,
    MatTableModule,
    MatSortModule,
    MatProgressSpinnerModule,
    MatPaginatorModule,
    MatButtonModule,
    MatSelectModule,
    MatCheckboxModule,
    BrowserAnimationsModule,
    MatExpansionModule,
    //MatButtonModule,
    //MatCheckboxModule, MatSelect, MatOption, MatFormField,
    BrowserModule,
    RouterModule.forRoot(route),
    FormsModule,
    HttpClientModule,
     NgbModule.forRoot()
   
  ],
  exports: [
    MatTableModule
  //  BrowserAnimationsModule,
  //  //MatButtonModule,
  //  //MatCheckboxModule, MatSelect, MatOption, MatFormField
  ],
  providers: [ServerService, CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
