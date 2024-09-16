import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
    selector       : 'chat-empty-conversation',
    templateUrl    : './empty-conversation.component.html',
})
export class EmptyConversationComponent
{
    /**
     * Constructor
     */
    constructor()
    {
    }
}
