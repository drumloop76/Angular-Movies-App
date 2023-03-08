import { Directive, TemplateRef } from '@angular/core';
import { ModalStateService } from '../services/modal/modal-state.service';

@Directive({
  selector: '[appModalTemplate]'
})
export class ModalTemplateDirective {

  constructor(modalTemplate: TemplateRef<any>, state: ModalStateService) {
    state.template = modalTemplate;
  }

}
