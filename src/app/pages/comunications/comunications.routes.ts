import { RouterModule, Routes } from '@angular/router';
import { ComunicationsComponent } from './comunications.component';
import { SlackComponent } from './slack/slack.component';
import { TawkComponent } from './tawk/tawk.component';
import { VoipComponent } from './voip/voip.component';
import { ConversationComponent } from './tawk/conversation/conversation.component';
import { MailboxComponent } from './mailbox/mailbox.component';

const comunicationsRoutes: Routes = [
	{
		path: '',
		component: ComunicationsComponent,
		children: [
			{
				path: 'slack',
				component: SlackComponent,
			},
			{
				path: 'tawk',
				component: TawkComponent,
			},
			{
				path: 'voip',
				component: VoipComponent,
			},
			{
				path: 'voip/:phone',
				component: VoipComponent,
			},
			{
				path     : 'tawk/:id',
				component: ConversationComponent,
			},
			{
				path     : 'correos',
				component: MailboxComponent,
			},
		]
	
	}
];

export const COMUNICATIONS_ROUTES = RouterModule.forChild(comunicationsRoutes);