import { Injectable } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { modalConfigOptions, modalTemplateOptions } from '../../models/modalOptions';
import { ModalStateService } from './modal-state.service';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  constructor(
    private modalService: NgbModal,
    private state: ModalStateService,
    private modalConfig: modalConfigOptions
  ) { }

  confirm(options: modalTemplateOptions): Promise<any> {
    this.state.options = options;

    this.state.modal = this.modalService.open(this.state.template, this.modalConfig.config);
    return this.state.modal.result;
  }
}
