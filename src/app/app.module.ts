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
import { CookieOptions } from 'ngx-cookie';
//import { CookieOptions } from 'ngx-cookie';
//import { CookieService } from 'ngx-cookie-service';
import { CookieModule, CookieService as ngxCookieService } from 'ngx-cookie';
import { CookieOptions as ngxCookieOptions } from 'ngx-cookie';
import { CookieOptionsProvider as ngxCookieOptionsProvider } from 'ngx-cookie';


//import { CookieService, CookieOptions } from 'ngx-cookie';
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
  MatFormFieldModule, MatAutocompleteModule,MatDividerModule,MatCardModule,
    MatButtonModule, MatCheckboxModule, MatInputModule, MatPaginatorModule, MatProgressSpinnerModule, MatExpansionModule,
  MatSortModule, MatTableModule, MatIconModule, MatSelectModule, MatDatepickerModule, NativeDateModule, MAT_DATE_FORMATS, MatPaginatorIntl
} from '@angular/material';
// import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CongressRegistrationSingleComponent } from './components/congress-registration-single/congress-registration-single.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { MembershipInformationComponent } from './components/membership-information/membership-information.component';
import { NewMemberAccountCompponent } from './components/new-member-account/new-member-account.component';
import { notifyComponent } from './components/notify/notify.component';
import { failComponent } from './components/fail/fail.component';
import { ResetPassSuccessComponent } from './components/reset-pass-success/reset-pass-success.component';
import { successComponent } from './components/success/success.component';
import { NavigatetosinglepropComponent } from './components/navigatetosingleprop/navigatetosingleprop.component';
import { CongressRegistrationSingleHebrewComponent } from './components/congress-registration-single-hebrew/congress-registration-single-hebrew.component';
import { NavigatetosinglepropHerbewComponent } from './components/navigatetosingleprop-herbew/navigatetosingleprop-herbew.component';
import { UserPassHebrewComponent } from './components/user-pass-hebrew/user-pass-hebrew.component';
import { NewMemberAccountHebrewComponent } from './components/new-member-account-hebrew/new-member-account-hebrew.component';
import { ShoppingCartOnlyOneComponent } from './components/shopping-cart-only-one/shopping-cart-only-one.component';
import { ShoppingCartOnlyOneHebrewComponent } from './components/shopping-cart-only-one-hebrew/shopping-cart-only-one-hebrew.component';
import { ReserPassSuccessHebrewComponent } from './components/reser-pass-success-hebrew/reser-pass-success-hebrew.component';
import { UserPassHebrewFromStoreComponent } from './components/user-pass-hebrew-from-store/user-pass-hebrew-from-store.component';
import { UserPassFromStoreComponent } from './components/user-pass-from-store/user-pass-from-store.component';
import { NewMemberAccountFromStoreComponent } from './components/new-member-account-from-store/new-member-account-from-store.component';
import { NewMemberAccountHebrewFromStoreComponent } from './components/new-member-account-hebrew-from-store/new-member-account-hebrew-from-store.component';
import { CheckoutServiceService } from './services/checkout-service.service';
import { InformationDromStoreComponent } from './components/information-drom-store/information-drom-store.component';
import { InformationFromStoreComponent } from './components/information-from-store/information-from-store.component';
import { InformationHebrewFromStoreComponent } from './components/information-hebrew-from-store/information-hebrew-from-store.component';
import { MembershipInformationHebrewComponent } from './components/membership-information-hebrew/membership-information-hebrew.component';

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
    MembershipInformationComponent,
    NewMemberAccountCompponent,
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
    notifyComponent,
    failComponent,
    successComponent,
    CongressRegistrationSingleComponent,
    ResetPassSuccessComponent,
    NavigatetosinglepropComponent,
    CongressRegistrationSingleHebrewComponent,
    NavigatetosinglepropHerbewComponent,
    UserPassHebrewComponent,
    NewMemberAccountHebrewComponent,
    ShoppingCartOnlyOneComponent,
    ShoppingCartOnlyOneHebrewComponent,
    ReserPassSuccessHebrewComponent,
    UserPassHebrewFromStoreComponent,
    UserPassFromStoreComponent,
    NewMemberAccountFromStoreComponent,
    NewMemberAccountHebrewFromStoreComponent,
    InformationDromStoreComponent,
    InformationFromStoreComponent,
    InformationHebrewFromStoreComponent,
    MembershipInformationHebrewComponent
  ],
  imports: [
    MatAutocompleteModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatDividerModule,
    MatCardModule,
    // NgxMatSelectSearchModule,
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
    NgxPaginationModule,
    //MatButtonModule,
    //MatCheckboxModule, MatSelect, MatOption, MatFormField,
    BrowserModule,
    RouterModule.forRoot(route),
    FormsModule,
    HttpClientModule,
    NgbModule.forRoot(),
    CookieModule.forRoot() 
   
  ],
  exports: [
    MatTableModule
  //  BrowserAnimationsModule,
  //  //MatButtonModule,
  //  //MatCheckboxModule, MatSelect, MatOption, MatFormField
  ],
  providers: [ServerService, MatPaginatorIntl, CheckoutServiceService
    //{ provide: CookieOptions, useValue: {} },
    //{ provide: ngxCookieOptionsProvider, useValue: {} },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
