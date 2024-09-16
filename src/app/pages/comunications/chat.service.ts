import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, filter, map, Observable, of, switchMap, take, tap, throwError } from 'rxjs';
import { environment } from 'environments/environment.dev';
import * as entityChatSlack from './comunications-interface';
import * as quickChat from '../../shared/layout/common/quick-chat/quick-chat.types'
import CryptoJS from 'crypto-js';

@Injectable({providedIn: 'root'})
export class ChatService
{
    private _chat: BehaviorSubject<any> = new BehaviorSubject(null);
    private _chats: BehaviorSubject<any[]> = new BehaviorSubject(null);
    private _contact: BehaviorSubject<any> = new BehaviorSubject(null);
    private _contacts: BehaviorSubject<any[]> = new BehaviorSubject(null);
    private _profile: BehaviorSubject<any> = new BehaviorSubject(null);

    constructor(private http: HttpClient) { }
    private apiUrl = `${environment.apiURL}communication/`;
    
    public getSlackChatList(): Observable<quickChat.Chat> {
        const url = `${this.apiUrl}slack/`;
        const user_data = localStorage.getItem('UserAbrevia')
        let user_slack_id = null

        if (user_data) {
            const bytes = CryptoJS.AES.decrypt(user_data, 'secretKey');
            const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
            user_slack_id = decryptedData.user_id_slack !=  undefined || decryptedData.user_id_slack != '' ?  decryptedData.user_id_slack : null;
        }

        return this.http.get<any>(url).pipe(
            map((response: any) => {
            const chat: quickChat.Chat = {
                id: "39944b00-1ffe-4ffb-8ca6-13c292812e06", // Asigna un ID de chat si es necesario
                contactId: "", // Asigna un ID de contacto si es necesario
                unreadCount: null, // Asigna el recuento de mensajes no leídos si es necesario
                muted: false, // Asigna si el chat está silenciado si es necesario
                lastMessage: null, // Asigna el último mensaje si es necesario
                lastMessageAt: null, // Asigna la fecha del último mensaje si es necesario
                messages: [] // Inicializa el arreglo de mensajes
            };

            response['data'].forEach((data: any) => {
                const message = {
                    id: "39944b00-1ffe-4ffb-8ca6-13c292812e06", // Asigna un ID de mensaje si es necesario
                    chatId: "f73a5a34-a723-4b35-8439-5289e0164c83", // Asigna un ID de chat si es necesario
                    contactId: data.user_id,
                    isMine: user_slack_id != null && data.user_id == user_slack_id ? true : false,
                    value: data.text,
                    createdAt: data.message_date,
                    userName:  data.user_name
                };
                chat.messages.push(message);
            });

            return chat; // Devuelve el chat en un arreglo
            })
        );
    }

    public postDataSlack(data:any): Observable<any> {
		const url = `${this.apiUrl}slack/`;
        return this.http.post<any>(url, data)
	}

    public getTawktoChatList(): Observable<quickChat.Chat[]> {
        const url = `${this.apiUrl}tawkto/`;
    
        return this.http.get<any>(url).pipe(
            map((response: any) => {
                const chats: quickChat.Chat[] = []; // Inicializa el arreglo de conversaciones
    
                response['chats']['data'].forEach((data: any) => {
                    const chat: quickChat.Chat = {
                        id: data.id, // Utiliza el ID del chat de la respuesta
                        contactId: data.visitor.id, // Utiliza el ID del visitante como ID de contacto
                        unreadCount: null, // Asigna el recuento de mensajes no leídos si es necesario
                        muted: false, // Asigna si el chat está silenciado si es necesario
                        lastMessage: null, // Asigna el último mensaje si es necesario
                        lastMessageAt: null, // Asigna la fecha del último mensaje si es necesario
                        messages: [] // Inicializa el arreglo de mensajes
                    };

                    // Construye el objeto de contacto
                    const contact = {
                        id: data.visitor.id,
                        name: data.visitor.name,
                        details: {
                        emails: [{ email: data.visitor.email, label: 'Email' }],
                        phoneNumbers: [], // Puedes agregar los números de teléfono si están disponibles
                        title: '', // Ajusta esto según la lógica de tu aplicación
                        company: '', // Ajusta esto según la lógica de tu aplicación
                        birthday: '', // Ajusta esto según la lógica de tu aplicación
                        address: '' // Ajusta esto según la lógica de tu aplicación
                        }
                    };

                    // Agrega el contacto al chat
                    chat.contact = contact;
    
                    data.messages.forEach((messageData: any) => {
                        const message = {
                            id: messageData.id, // Utiliza el ID del mensaje de la respuesta
                            chatId: data.id, // Utiliza el ID del chat actual como ID de chat del mensaje
                            contactId: data.visitor.id, // Utiliza el ID del visitante como ID de contacto del mensaje
                            isMine: false, // Marca el mensaje como no propio
                            value: messageData.msg, // Utiliza el contenido del mensaje de la respuesta
                            createdAt: messageData.time, // Utiliza la fecha de creación del mensaje de la respuesta
                            userName: data.visitor.name // Utiliza el nombre del visitante como nombre de usuario
                        };
                        chat.messages.push(message); // Agrega el mensaje al arreglo de mensajes del chat
                    });
    
                    chats.push(chat); // Agrega el chat al arreglo de conversaciones
                });
    
                return chats; // Devuelve el arreglo de conversaciones
            })
        );
    }


    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    /**
     * Getter for chat
     */
    get chat$(): Observable<any>
    {
        return this._chat.asObservable();
    }

    /**
     * Getter for chats
     */
    get chats$(): Observable<any[]>
    {
        return this._chats.asObservable();
    }

    /**
     * Getter for contact
     */
    get contact$(): Observable<any>
    {
        return this._contact.asObservable();
    }

    /**
     * Getter for contacts
     */
    get contacts$(): Observable<any[]>
    {
        return this._contacts.asObservable();
    }

    /**
     * Getter for profile
     */
    get profile$(): Observable<any>
    {
        return this._profile.asObservable();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Get chats
     */
    getChats(): Observable<any>
    {
        return this.http.get<any[]>('api/apps/chat/chats').pipe(
            tap((response: any[]) =>
            {
                this._chats.next(response);
            }),
        );
    }

    /**
     * Get contact
     *
     * @param id
     */
    getContact(id: string): Observable<any>
    {
        return this.http.get<any>('api/apps/chat/contacts', {params: {id}}).pipe(
            tap((response: any) =>
            {
                this._contact.next(response);
            }),
        );
    }

    /**
     * Get contacts
     */
    getContacts(): Observable<any>
    {
        return this.http.get<any[]>('api/apps/chat/anys').pipe(
            tap((response: any[]) =>
            {
                this._contacts.next(response);
            }),
        );
    }

    /**
     * Get profile
     */
    getProfile(): Observable<any>
    {
        return this.http.get<any>('api/apps/chat/profile').pipe(
            tap((response: any) =>
            {
                this._profile.next(response);
            }),
        );
    }

    /**
     * Get chat
     *
     * @param id
     */
    getChatById(id: string): Observable<any>
    {
        return this.http.get<any>('api/apps/chat/chat', {params: {id}}).pipe(
            map((chat) =>
            {
                // Update the chat
                this._chat.next(chat);

                // Return the chat
                return chat;
            }),
            switchMap((chat) =>
            {
                if ( !chat )
                {
                    return throwError('Could not found chat with id of ' + id + '!');
                }

                return of(chat);
            }),
        );
    }

    /**
     * Update chat
     *
     * @param id
     * @param chat
     */
    updateChat(id: string, chat: any): Observable<any>
    {
        return this.chats$.pipe(
            take(1),
            switchMap(chats => this.http.patch<any>('api/apps/chat/chat', {
                id,
                chat,
            }).pipe(
                map((updatedChat) =>
                {
                    // Find the index of the updated chat
                    const index = chats.findIndex(item => item.id === id);

                    // Update the chat
                    chats[index] = updatedChat;

                    // Update the chats
                    this._chats.next(chats);

                    // Return the updated contact
                    return updatedChat;
                }),
                switchMap(updatedChat => this.chat$.pipe(
                    take(1),
                    filter(item => item && item.id === id),
                    tap(() =>
                    {
                        // Update the chat if it's selected
                        this._chat.next(updatedChat);

                        // Return the updated chat
                        return updatedChat;
                    }),
                )),
            )),
        );
    }

    /**
     * Reset the selected chat
     */
    resetChat(): void
    {
        this._chat.next(null);
    }
}
