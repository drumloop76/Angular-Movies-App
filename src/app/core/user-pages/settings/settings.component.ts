import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { ModalService } from 'src/app/shared/services/modal/modal.service';
import { createTemplateOptions } from 'src/app/shared/utils/modal-utils';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent {
  constructor(
    private confirmService: ModalService, 
    private toastr: ToastrService,
    private authService: AuthService
  ) {}
  
  onOpenDeleteModal() {
    const options = createTemplateOptions(
      'Delete account',
      'Are you sure you want to DELETE your account?',
      'YES, DELETE MY ACCOUNT',
      'DISMISS'
    );

    this.confirmService.confirm(options).then(
      () => {
        this.authService.deleteUserAccount();
        this.toastr.warning(
          'You have deleted your account', 
          'Warning'
        )
      },
      () => {}
    );
  }
}
