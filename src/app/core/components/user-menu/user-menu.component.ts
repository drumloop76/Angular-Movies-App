import { Component } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ModalService } from 'src/app/shared/services/modal/modal.service';
import { createTemplateOptions } from 'src/app/shared/utils/modal-utils';

@Component({
  selector: 'app-user-menu',
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.scss']
})
export class UserMenuComponent {
  
  constructor(private confirmService: ModalService, private toastr: ToastrService) {}
  
  onOpenModalClick() {
    const options = createTemplateOptions(
      'Confirm Logout',
      'Are you sure you want to log out?',
      'Logout',
      'Dismiss'
    );

    this.confirmService.confirm(options).then(
      () => {
        // console.log('yes')
        this.toastr.info('You are successfully loged out', 'Info')
      },
      () => {
        // console.log('not')
      }
    );

  }

}
