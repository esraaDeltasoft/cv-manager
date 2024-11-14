import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class ToastService {
  constructor(private toastr: ToastrService) {}

  showToast(message: string, time = 5000) {
    const config = {
      closeButton: true,
      timeOut: time,
      progressBar: true,
      positionClass: 'toast-top-right', 
    };

    this.toastr.error(message, 'خطأ', config);
  }

  showSuccessToast(message: string, time = 5000) {
    const config = {
      closeButton: true,
      timeOut: time,
      progressBar: true,
      positionClass: 'toast-top-right', 
      preventDuplicates: true,
    };

    this.toastr.success(message, 'Success', config);
  }
}

