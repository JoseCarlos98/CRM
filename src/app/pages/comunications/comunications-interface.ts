import * as entityGeneral from '../../shared/interfaces/general-interface';

export interface DataSlackChat {
    user_id         : string;
    text            : string;
    user_name       : string;
    message_date    : string;
}

export interface DataSlackChatView{
    id      : string;
    chatId  : string;
    contactId   : string;
    value       : string;
    createdAt   : string;
    isMine      : boolean;
}