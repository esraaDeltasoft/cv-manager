import { Component } from '@angular/core';
import { CvService } from '../../shared/services/cv.service';
import { CV } from '../../shared/models/cv';
import { Router } from '@angular/router';
import { CommonModule, NgClass } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ToastService } from '../../shared/services/ToastService';

@Component({
  selector: 'app-cv-list',
  standalone: true,
  imports: [HttpClientModule, NgClass, CommonModule,ReactiveFormsModule],
  templateUrl: './cv-list.component.html',
  styleUrl: './cv-list.component.scss',
  providers: [ ToastService],
})

export class CvListComponent {
  cvs: CV[] = [];
  errorMessage: string = '';
  constructor(private cvService: CvService, private router: Router,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.loadCvs();
  }

  // Load all CVs
  loadCvs(): void {
    this.cvService.getCvs()
    .subscribe({
      next: (data) => {this.cvs = data;console.log(data)},
      error: (err) => (console.log(err))
    });
  }

  // Delete a CV by ID
  deleteCv(id: number): void {
    if (confirm('Are you sure you want to delete this CV?')) {
      this.cvService.deleteCv(id)
      .subscribe({
        next: () => {
          this.toastService.showSuccessToast("تم حذف السيرة الذاتية بنجاح");
          this.loadCvs()},
        error: (err) => {
          if(err.status==200){
            this.toastService.showSuccessToast("تم حذف السيرة الذاتية بنجاح");
          this.loadCvs()
          }
          else{
            this.toastService.showToast(err.error.text);
          }
        }
        
      });
    }
  }
  editCv(id: number): void {
    this.router.navigate(['/cv-form', id]);
  }
}
