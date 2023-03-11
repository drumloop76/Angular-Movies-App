import { Component } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { ModalService } from 'src/app/shared/services/modal/modal.service';
import { createTemplateOptions } from 'src/app/shared/utils/modal-utils';

@Component({
  selector: 'app-user-menu',
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.scss']
})
export class UserMenuComponent {
  
  constructor(
    private confirmService: ModalService, 
    private toastr: ToastrService,
    private authService: AuthService,
  ) {}
  
  onOpenModalClick() {
    const options = createTemplateOptions(
      'Confirm Logout',
      'Are you sure you want to LOGOUT?',
      'Logout',
      'Dismiss'
    );

    this.confirmService.confirm(options).then(
      () => {
        this.authService.logout();
      },
      () => {}
    );

  }

}
