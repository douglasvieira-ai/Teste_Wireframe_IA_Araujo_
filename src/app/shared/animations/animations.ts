import {
  trigger,
  transition,
  style,
  animate,
  query,
  stagger,
  state,
  AnimationTriggerMetadata
} from '@angular/animations';

/**
 * Painel lateral que desliza + fade ao entrar/sair (esconder/mostrar).
 */
export const slidePanel: AnimationTriggerMetadata = trigger('slidePanel', [
  transition(':enter', [
    style({ transform: 'translateX(-24px)', opacity: 0 }),
    animate('280ms cubic-bezier(0.22, 1, 0.36, 1)', style({ transform: 'translateX(0)', opacity: 1 }))
  ]),
  transition(':leave', [
    animate('220ms cubic-bezier(0.4, 0, 1, 1)', style({ transform: 'translateX(-24px)', opacity: 0 }))
  ])
]);

/**
 * Entrada do chat: fade + leve escala/subida.
 */
export const chatEnter: AnimationTriggerMetadata = trigger('chatEnter', [
  transition(':enter', [
    style({ opacity: 0, transform: 'translateY(12px) scale(0.99)' }),
    animate('320ms cubic-bezier(0.22, 1, 0.36, 1)', style({ opacity: 1, transform: 'translateY(0) scale(1)' }))
  ])
]);

/**
 * Fade + subida simples (para placeholder / preview).
 */
export const fadeInUp: AnimationTriggerMetadata = trigger('fadeInUp', [
  transition(':enter', [
    style({ opacity: 0, transform: 'translateY(10px)' }),
    animate('300ms cubic-bezier(0.22, 1, 0.36, 1)', style({ opacity: 1, transform: 'translateY(0)' }))
  ]),
  transition(':leave', [
    animate('180ms ease', style({ opacity: 0, transform: 'translateY(6px)' }))
  ])
]);

/**
 * Bolha de mensagem entrando (fade + subida).
 */
export const messageIn: AnimationTriggerMetadata = trigger('messageIn', [
  transition(':enter', [
    style({ opacity: 0, transform: 'translateY(10px)' }),
    animate('260ms cubic-bezier(0.22, 1, 0.36, 1)', style({ opacity: 1, transform: 'translateY(0)' }))
  ])
]);

/**
 * Lista com entrada escalonada dos itens (stagger).
 */
export const listStagger: AnimationTriggerMetadata = trigger('listStagger', [
  transition(':enter', [
    query('.stagger-item', [
      style({ opacity: 0, transform: 'translateY(12px)' }),
      stagger(50, [
        animate('300ms cubic-bezier(0.22, 1, 0.36, 1)', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ], { optional: true })
  ])
]);
