
import { Routes } from '@angular/router'
import { EnterComponent } from './components/enter/enter.component'
import { PageComponent } from './components/page/page.component'
import { AppendixAComponent } from './components/appendix-a/appendix-a.component'
import { NewComponent } from './components/new/new.component';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';
import { BookDetailsComponent } from './components/book-details/book-details.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { UserPassComponent } from './components/user-pass/user-pass.component';
// import { MembershipInformationComponent } from './components/membership-information/membership-information.component';
import { CongressRegistrationOneComponent } from './components/congress-registration-one/congress-registration-one.component';
import { CongressRegistrationSessionComponent } from './components/congress-registration-session/congress-registration-session.component';
import { InviteMembersComponent } from './components/invite-members/invite-members.component';
import { JudgesComponent } from './components/judges/judges.component';
import { CongressRegistrationOneHebrewComponent } from './components/congress-registration-one-hebrew/congress-registration-one-hebrew.component';
import { CongressRegistrationSessionHebrewComponent } from './components/congress-registration-session-hebrew/congress-registration-session-hebrew.component';
import { InviteMembersHebrewComponent } from './components/invite-members-hebrew/invite-members-hebrew.component';
import { SessionNameChairmanHebrewComponent } from './components/session-name-chairman-hebrew/session-name-chairman-hebrew.component';
import { AllProposalsAdminComponent } from './components/all-proposals-admin/all-proposals-admin.component';
import { RegistrationOneEnglishComponent } from './components/registration-one-english/registration-one-english.component';
import { RegistrationOneHebrewComponent } from './components/registration-one-hebrew/registration-one-hebrew.component';
import { FirstPageHebrewComponent } from './components/first-page-hebrew/first-page-hebrew.component';
import { FirstPageEnglishComponent } from './components/first-page-english/first-page-english.component';
import { NewHebrewComponent } from './components/new-hebrew/new-hebrew.component';
import { ShopingCartHebrewComponent } from './components/shoping-cart-hebrew/shoping-cart-hebrew.component';
import { BookDetailsHebrewComponent } from './components/book-details-hebrew/book-details-hebrew.component';
import { DraftsComponent } from './components/drafts/drafts.component';
import { TranzilaComponent } from './components/tranzila/tranzila.component';
import { CongressRegistrationSecondEnglishComponent } from './components/congress-registration-second-english/congress-registration-second-english.component';
import { CongressRegistrationSecondHebrewComponent } from './components/congress-registration-second-hebrew/congress-registration-second-hebrew.component';
import { Thank1Component } from './components/thank1/thank1.component';
import { Thank2Component } from './components/thank2/thank2.component';
import { Thank3Component } from './components/thank3/thank3.component';
import { CongressRegistrationSingleComponent } from './components/congress-registration-single/congress-registration-single.component';
import { MembershipInformationComponent } from './components/membership-information/membership-information.component';
import { NewMemberAccountCompponent } from './components/new-member-account/new-member-account.component';
import { notifyComponent } from './components/notify/notify.component';
import { failComponent } from './components/fail/fail.component';
import { ResetPassSuccessComponent } from './components/reset-pass-success/reset-pass-success.component';
import { successComponent } from './components/success/success.component';
export const route: Routes = [
  {
    path: 'Welcome/:Rout',
    component: WelcomeComponent,
  },
  //{
  //  path: 'page',
  //  component: PageComponent,
  //},
  //{
  //  path: 'appendixA',
  //  component: AppendixAComponent,
  //},
  {
    path: 'new',
    component: NewComponent,
  },
  {
    path: 'ShoppingCart',
    component: ShoppingCartComponent,
  },
  {
    path: 'newHebrew',
    component: NewHebrewComponent,
  },
  {
    path: 'ShoppingCartHebrew',
    component: ShopingCartHebrewComponent,
  },

  {
    path: 'BookDetails/:Id',
    component: BookDetailsComponent,
  }, {
    path: 'BookDetailsHebrew/:Id',
    component: BookDetailsHebrewComponent,
  },
  {
    path: 'Registration/:Rout/:User',
    component: RegistrationComponent,
  },
  {
    path: 'UserPass/:Rout',
    component: UserPassComponent,
  },
  {
    path: 'NewMemberAccount/:Rout',
    component: NewMemberAccountCompponent,
   // pathMatch: 'full'
  },
  {
    path: 'MembershipInformation/:Rout',
    component: MembershipInformationComponent,
  },
  {
    path: 'CongressRegistrationOneComponent',
    component: CongressRegistrationOneComponent,
  }
  ,
  {
    path: 'CongressRegistrationSession',
    component: CongressRegistrationSessionComponent,
  }
  ,
  {
    path: 'InviteMembers',
    component: InviteMembersComponent,
  }
  ,
  {
    path: 'Judges',
    component: JudgesComponent,
  },
  {
    path: 'CongressRegistrationOneHebrew',
    component: CongressRegistrationOneHebrewComponent,
  },
  {
    path: 'CongressRegistrationSessionHebrew',
    component: CongressRegistrationSessionHebrewComponent,
  }
  ,
  {
    path: 'InviteMembersHebrew',
    component: InviteMembersHebrewComponent,
  }
  ,
  {
    path: 'SessionNameChairmanHebrew',
    component: SessionNameChairmanHebrewComponent,
  },
  {
    path: 'RegistrationOneEnglish',
    component: RegistrationOneEnglishComponent,
  },
  {
    path: 'RegistrationOneHebrew',
    component: RegistrationOneHebrewComponent,
  },
  {
    path: 'AllProposalsAdmin',
    component: AllProposalsAdminComponent,
  },
  {
    path: 'FirstPageEnglish',
    component: FirstPageEnglishComponent,
  },
  {
    path: 'FirstPageHebrew',
    component: FirstPageHebrewComponent,
  },
  {
    path: 'Drafts',
    component: DraftsComponent,
  },
  {
    path: 'CongressRegistrationSecondHebrew',
    component: CongressRegistrationSecondHebrewComponent,
  },
  {
    path: 'CongressRegistrationSecondEnglish',
    component: CongressRegistrationSecondEnglishComponent,
  },
  {
    path: 'Pay/:Total',
    component: TranzilaComponent,
  },
  {
    path: 'Thank1',
    component: Thank1Component,
  },
  {
    path: 'Thank2',
    component: Thank2Component,
  },
  {
    path: 'Thank3',
    component: Thank3Component,
  },
  {
    path: 'CongressRegistrationSingle',
    component: CongressRegistrationSingleComponent,
  },
  {
    path: 'notify',
    component: notifyComponent,
  },
  {
    path: 'fail',
    component: failComponent,
  },
  {
     path: 'ResetPassSuccess',
    component: ResetPassSuccessComponent,
  },
  {
    path: 'notify.html',
   component: notifyComponent,
 },
  {
    path: 'fail.html',
   component: failComponent,
 },
  {
    path: 'success.html',
   component: successComponent,
 }
]
