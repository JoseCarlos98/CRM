import { TextFieldModule } from '@angular/cdk/text-field';
import { CommonModule, DatePipe, NgClass, NgFor, NgIf, NgTemplateOutlet } from '@angular/common';
import { NgModule} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { RouterLink } from '@angular/router';
import { SlackComponent } from './slack/slack.component';
import { TawkComponent } from './tawk/tawk.component';
import { ComunicationsComponent } from './comunications.component';
import { COMUNICATIONS_ROUTES } from './comunications.routes';
import { MaterialModule } from 'app/shared/material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { VoipComponent } from './voip/voip.component';
import { ProfileComponent } from './tawk/profile/profile.component';
import { NewChatComponent } from './tawk/new-chat/new-chat.component';
import { ContactInfoComponent } from './tawk/contact-info/contact-info.component';
import { ConversationComponent } from './tawk/conversation/conversation.component';
import { EmptyConversationComponent } from './tawk/empty-conversation/empty-conversation.component';

@NgModule({
  declarations: [
    SlackComponent,
    TawkComponent,
    ComunicationsComponent,
    VoipComponent,
    ProfileComponent,
    NewChatComponent,
    ContactInfoComponent,
    ConversationComponent,
    EmptyConversationComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    COMUNICATIONS_ROUTES,
    NgIf, MatSidenavModule, 
    MatButtonModule, 
    RouterLink, 
    MatIconModule, 
    MatMenuModule, 
    NgFor, 
    NgClass, 
    NgTemplateOutlet, 
    MatFormFieldModule, 
    MatInputModule, 
    TextFieldModule, 
    DatePipe
  ],
})
export class ComunicationsModule { }
