import { animate, state, style, transition, trigger } from "@angular/animations";

export const Animations = {
    openCloseSidebar: trigger('openCloseSidebar', [
        state('true', 
            style({ 
                left: '0px' 
            })),
        state('false', 
            style({ 
                left: '-350px' 
            })),
        transition('false <=> true', animate('.3s ease-out'))
    ]),
    openCloseDropdown: trigger('openCloseDropdown', [
        state('true', 
            style({ 
                height: '*' 
            })),
        state('false', 
            style({ 
                height: '0px' 
            })),
        transition('false <=> true', animate('.3s ease-out'))
    ]),
    rotateCaret: trigger('rotateCaret', [
        state('true', style({ 
            transform: 'rotateX(0deg)' 
        })),
        state('false', style({ 
            transform: 'rotateX(-180deg)' 
        })),
        transition('false <=> true', animate('.3s ease'))
    ]),
    toggleNavSearch: trigger('toggleNavSearch', [
        state('true', 
            style({ 
                transform: 'translateY(0px)' 
            })),
        state('false', 
            style({ 
                transform: 'translateY(-80px)' 
            })),
        transition('false <=> true', animate('.3s ease-out'))
    ]),
}