import { Component } from '@angular/core';
import { modalTemplateOptions } from '../../models/modalOptions';
import { ModalStateService } from '../../services/modal/modal-state.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent {
  options!: modalTemplateOptions;

  constructor(private state: ModalStateService) {
    this.options = state.options;
  }

  confirm() {
    this.state.modal.close();
  }

  dismiss() {
    this.state.modal.dismiss();
  }

}
