import { Component, AfterViewInit, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';

@Component({
    selector: 'app-voip',
    templateUrl: './voip.component.html',
    styleUrl: './voip.component.scss'
})
export class VoipComponent implements OnInit, AfterViewInit {
    private onDestroy = new Subject<void>();

    phone: string;

    constructor(
        private activatedRoute: ActivatedRoute
    ) { }

    ngOnInit(): void {
        this.activatedRoute.params.pipe(takeUntil(this.onDestroy)).subscribe((params: any) => {
            if (params.phone) this.phone = `+52${params.phone}`;
        });
    }

    ngAfterViewInit() {
        // Esperar a que se cargue el script api.js
        const scriptElement = document.createElement('script');
        scriptElement.src = 'https://voipstudio.com/webphone/api.js';
        scriptElement.onload = () => {
            // Acceder al objeto __webphone directamente en el contexto global del documento
            const __webphone = window['__webphone'];
            // Accede al iframe utilizando el ID
            const iframe = document.getElementById('embedded-softphone') as HTMLIFrameElement;

            // Verificar si __webphone está definido y es una función
            if (__webphone && typeof __webphone.init == 'function') {
                // Inicializa el webPhone utilizando el objeto __webphone
                const webPhone = __webphone.init(iframe);
                // Utils
                var getById = document.getElementById.bind(document);
                var toggle = function (id, flag) {
                    var el = getById(id),
                        visible = el.tagName === 'DIV' ? 'block' : 'inline';
                    el.style.setProperty('display', flag ? visible : 'none');
                };

                // Interface
                var toggleLoginForm = function (flag) {
                    toggle('login-form', flag);
                    toggle('phone', !flag);
                };
                var toggleCallPanel = function (visible) {
                    toggle('dial', visible === 'dial');
                    toggle('ringing', visible === 'ringing');
                    toggle('connecting', visible === 'connecting');
                    toggle('connected', visible === 'connected');
                };
                var toggleHold = function (flag) {
                    toggle('hold', flag);
                    toggle('unhold', !flag);
                };
                var toggleMute = function (flag) {
                    toggle('mute', flag);
                    toggle('unmute', !flag);
                };
                var logEvent = function (event) {
                    var log = getById('log'),
                        entry = document.createElement('div'),
                        logWrapper = document.getElementById("log-wrapper"),
                        msg = document.createTextNode([
                            ' [' + (new Date()).toISOString() + '] ',
                            event.type + ': ',
                            (event.detail) ? JSON.stringify(event.detail) : ''
                        ].join(' '));
                    entry.appendChild(msg);
                    log.appendChild(entry);
                    logWrapper.scrollTop = logWrapper.scrollHeight;
                };

                // Actions
                const login = () => {
                    webPhone.login(
                        'trade@dakve.com',
                        'K.Tec.300',
                        credentials => {
                            toggleLoginForm(!credentials.logged);
                        },
                        error => {
                            alert(error.message);
                        }
                    );
                };

                var logout = () => webPhone.logout();
                var answer = () => webPhone.answer();
                var hangup = () => webPhone.hangup();
                var hold = () => webPhone.hold(() => toggleHold(false));
                var unhold = () => webPhone.unhold(() => toggleHold(true));
                var mute = () => webPhone.mute(() => toggleMute(false));
                var unmute = () => webPhone.unmute(() => toggleMute(true));
                var dialNumber = () => webPhone.call(getById('dial-number').value);

                // Bind events and actions to WebPhone
                webPhone.on('callstate', logEvent);

                webPhone.on('ready', function (event) {
                    logEvent(event);
                    toggleLoginForm(!event.detail.logged);
                });
                webPhone.on('login', function (event) {
                    logEvent(event);
                    toggleLoginForm(false);
                });
                webPhone.on('logout', function (event) {
                    logEvent(event);
                    toggleLoginForm(true);
                });
                webPhone.on('ringing', function (event) {
                    toggleCallPanel('ringing');
                });
                webPhone.on('initial', function (event) {
                    toggleCallPanel('connecting');
                });
                webPhone.on('accepted', function (event) {
                    toggleCallPanel('connected');
                    //AQUI DE DETECTA QUE UNA LLAMADA ESTÁ ACTIVA, DEBEMOS REGISTRAR LA ACTIVIDAD DE LLAMADA EN ESTE PUNTO
                });
                webPhone.on('hangup', function (event) {
                    toggleCallPanel('dial');
                    toggleHold(true);
                    toggleMute(true);
                });
                webPhone.on('hold', function (event) {
                    toggleHold(false);
                });
                webPhone.on('unhold', function (event) {
                    toggleHold(true);
                });
                webPhone.on('timeout', function () {
                    console.log('Error: softphone ready event timeout');
                });

                getById('login').addEventListener('click', login);
                getById('logout').addEventListener('click', logout);
                getById('call').addEventListener('click', dialNumber);
                getById('answer').addEventListener('click', answer);
                getById('reject').addEventListener('click', hangup);
                getById('cancel').addEventListener('click', hangup);
                getById('hold').addEventListener('click', hold);
                getById('unhold').addEventListener('click', unhold);
                getById('mute').addEventListener('click', mute);
                getById('unmute').addEventListener('click', unmute);
                getById('hangup').addEventListener('click', hangup);

                document.querySelector('#dial > form').addEventListener('submit', event => {
                    event.preventDefault();
                    dialNumber();
                });


            } else {
                console.error('No se pudo inicializar el webPhone. __webphone no está definido o no es una función.');
            }

        };

        document.head.appendChild(scriptElement);

    }

    ngOnDestroy(): void {
        this.onDestroy.next();
        this.onDestroy.unsubscribe();
    }
}