import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, of, switchMap, take, tap, throwError } from 'rxjs';
import { Mail, MailCategory, MailFilter, MailFolder, MailLabel } from './mailbox.types';
import { environment } from 'environments/environment.dev';

@Injectable({providedIn: 'root'})
export class MailboxService
{
    selectedMailChanged: BehaviorSubject<any> = new BehaviorSubject(null);
    private _category: BehaviorSubject<MailCategory> = new BehaviorSubject(null);
    private _filters: BehaviorSubject<MailFilter[]> = new BehaviorSubject(null);
    private _folders: BehaviorSubject<MailFolder[]> = new BehaviorSubject(null);
    private _labels: BehaviorSubject<MailLabel[]> = new BehaviorSubject(null);
    private _mails: BehaviorSubject<Mail[]> = new BehaviorSubject(null);
    private _mailsLoading: BehaviorSubject<boolean> = new BehaviorSubject(false);
    private _mail: BehaviorSubject<Mail> = new BehaviorSubject(null);
    private _pagination: BehaviorSubject<any> = new BehaviorSubject(null);

    constructor(private _httpClient: HttpClient) { 
        this.selectedMailChanged.subscribe(mail => {
            //console.log('Mail recibido en MailboxService:', mail);
        });
    }
    private apiUrl = `${environment.apiURL}mail/`;

    selectedMail$: Observable<any> = this.selectedMailChanged.asObservable();

    get category$(): Observable<MailCategory> {
        return this._category.asObservable();
    }

    get filters$(): Observable<MailFilter[]> {
        return this._filters.asObservable();
    }

    get folders$(): Observable<MailFolder[]> {
        return this._folders.asObservable();
    }

    get labels$(): Observable<MailLabel[]> {
        return this._labels.asObservable();
    }

    get mails$(): Observable<Mail[]> {
        return this._mails.asObservable();
    }

    get mailsLoading$(): Observable<boolean> {
        return this._mailsLoading.asObservable();
    }

    get mail$(): Observable<Mail> {
        return this._mail.asObservable();
    }

    get pagination$(): Observable<any> {
        return this._pagination.asObservable();
    }

    getFilters(): Observable<any> {
        return this._httpClient.get<MailFilter[]>('api/apps/mailbox/filters').pipe(
            tap((response: any) =>
            {
                this._filters.next(response);
            }),
        );
    }

    getFolders(): Observable<any> {
        return this._httpClient.get<MailFolder[]>('api/apps/mailbox/folders').pipe(
            tap((response: any) =>
            {
                this._folders.next(response);
            }),
        );
    }

    getLabels(): Observable<any> {
        return this._httpClient.get<MailLabel[]>('api/apps/mailbox/labels').pipe(
            tap((response: any) =>
            {
                this._labels.next(response);
            }),
        );
    }

    getMailsByFilter(filter: string, page: string = '1'): Observable<any> {
        this._mailsLoading.next(true);

        return this._httpClient.get<Mail[]>('api/apps/mailbox/mails', {
            params: {
                filter,
                page,
            },
        }).pipe(
            tap((response: any) =>
            {
                this._category.next({
                    type: 'filter',
                    name: filter,
                });
                this._mails.next(response.mails);
                this._pagination.next(response.pagination);
                this._mailsLoading.next(false);
            }),
            switchMap((response) =>
            {
                if ( response.mails === null )
                {
                    return throwError({
                        message   : 'Requested page is not available!',
                        pagination: response.pagination,
                    });
                }

                return of(response);
            }),
        );
    }

    getMailsByFolder(folder: string, page: string = '1'): Observable<any> {
        this._mailsLoading.next(true);

        return this._httpClient.get<Mail[]>('api/apps/mailbox/mails', {
            params: {
                folder,
                page,
            },
        }).pipe(
            tap((response: any) =>
            {
                this._category.next({
                    type: 'folder',
                    name: folder,
                });
                this._mails.next(response.mails);
                this._pagination.next(response.pagination);
                this._mailsLoading.next(false);
            }),
            switchMap((response) =>
            {
                if ( response.mails === null )
                {
                    return throwError({
                        message   : 'Requested page is not available!',
                        pagination: response.pagination,
                    });
                }

                return of(response);
            }),
        );
    }

    getMailsByLabel(label: string, page: string = '1'): Observable<any> {
        this._mailsLoading.next(true);

        return this._httpClient.get<Mail[]>('api/apps/mailbox/mails', {
            params: {
                label,
                page,
            },
        }).pipe(
            tap((response: any) =>
            {
                this._category.next({
                    type: 'label',
                    name: label,
                });
                this._mails.next(response.mails);
                this._pagination.next(response.pagination);
                this._mailsLoading.next(false);
            }),
            switchMap((response) =>
            {
                if ( response.mails === null )
                {
                    return throwError({
                        message   : 'Requested page is not available!',
                        pagination: response.pagination,
                    });
                }

                return of(response);
            }),
        );
    }

    getMailById(id: string): Observable<any> {
        return this._mails.pipe(
            take(1),
            map((mails) => {
                const mail = mails.find(item => item.id === id) || null;
                this._mail.next(mail);
                return mail;
            }),
            switchMap((mail) => {
                if ( !mail ) {
                    return throwError('Could not found mail with id of ' + id + '!');
                }

                return of(mail);
            }),
        );
    }

    updateMail(id: string, mail: Mail): Observable<any> {
        return this._httpClient.patch('api/apps/mailbox/mail', {
            id,
            mail,
        }).pipe(
            tap(() =>
            {
                this.getFolders().subscribe();
            }),
        );
    }

    resetMail(): Observable<boolean> {
        return of(true).pipe(
            take(1),
            tap(() =>
            {
                this._mail.next(null);
            }),
        );
    }

    addLabel(label: MailLabel): Observable<any> {
        return this.labels$.pipe(
            take(1),
            switchMap(labels => this._httpClient.post<MailLabel>('api/apps/mailbox/label', {label}).pipe(
                map((newLabel) => {
                    this._labels.next([...labels, newLabel]);
                    return newLabel;
                }),
            )),
        );
    }

    updateLabel(id: string, label: MailLabel): Observable<any> {
        return this.labels$.pipe(
            take(1),
            switchMap(labels => this._httpClient.patch<MailLabel>('api/apps/mailbox/label', {
                id,
                label,
            }).pipe(
                map((updatedLabel: any) => {
                    const index = labels.findIndex(item => item.id === id);
                    labels[index] = updatedLabel;
                    this._labels.next(labels);
                    return updatedLabel;
                }),
            )),
        );
    }

    deleteLabel(id: string): Observable<any> {
        return this.labels$.pipe(
            take(1),
            switchMap(labels => this._httpClient.delete('api/apps/mailbox/label', {params: {id}}).pipe(
                map((isDeleted: any) => {
                    const index = labels.findIndex(item => item.id === id);
                    labels.splice(index, 1);
                    this._labels.next(labels);
                    return isDeleted;
                }),
            )),
        );
    }

    getEmailList(): Observable<Mail[]> {
        const url = `${this.apiUrl}emails/?page=1&page_size=5`;
        return this._httpClient.get<any>(url).pipe(
            map((response: any) => response.results)
        );
    }

}
