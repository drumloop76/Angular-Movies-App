import { Injectable, TemplateRef } from '@angular/core';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { modalTemplateOptions } from '../../models/modalOptions';

@Injectable()
export class ModalStateService {
  modal!: NgbModalRef;
  template!: TemplateRef<any>;
  options!: modalTemplateOptions;
}
