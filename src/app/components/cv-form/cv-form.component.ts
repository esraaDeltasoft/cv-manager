import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CvService } from '../../shared/services/cv.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CV } from '../../shared/models/cv';
import { CommonModule, NgClass } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ToastService } from '../../shared/services/ToastService';

@Component({
  selector: 'app-cv-form',
  standalone: true,
  imports: [HttpClientModule, NgClass, CommonModule,ReactiveFormsModule],
  templateUrl: './cv-form.component.html',
  styleUrl: './cv-form.component.scss',
  providers: [ ToastService],
})
export class CvFormComponent  implements OnInit{
  cvForm:FormGroup=new FormGroup({});
  isEditMode = false;
  cvId: number | null = null;
  constructor(  private fb: FormBuilder,
    private cvService: CvService,
    private route: ActivatedRoute,
    private router: Router,
    private toastService: ToastService)
  {
    this.cvForm = this.fb.group({
      id:[0],
      name: ['', Validators.required],
      personalInformationId:[0],
      personalInformation: this.fb.group({
        id:[0],
        fullName: ['', Validators.required],
        cityName: [''],
        email: ['', [Validators.required, Validators.email]],
        mobileNumber: ['', [Validators.required, Validators.pattern('^[0-9]*$')]]
      }),
      experienceInformationId:[0],
      experienceInformation: this.fb.group({
        id:[0],
        companyName: ['', [Validators.required, Validators.maxLength(20)]],
        city: [''],
        companyField: ['']
      })
    });
  }
  ngOnInit() {
    this.cvId = +this.route.snapshot.paramMap.get('id')!;
    if (this.cvId) {
      this.isEditMode = true;
      this.cvService.getCv(this.cvId).subscribe(
        (data: CV) => {
          this.cvForm.patchValue(data); // Patch data to the form
        },
        error => console.log('Error loading CV', error)
      );
    }
  }
  saveCV(): void {
    if (this.cvForm.invalid) {
      return; // If form is invalid, prevent submission
    }

    const formValue = this.cvForm.value;

    if (this.isEditMode && this.cvId !== null) {
      this.cvService.updateCv(this.cvId, formValue).subscribe(
        () => this.router.navigate(['/cv-list']),
        error =>
          {
            console.log('Error updating CV', error.error.text)
            if(error.status==200)
            {
              this.toastService.showSuccessToast(error.error.text);
              this.router.navigate(['/cv-list'])
            }
            else{
              this.toastService.showToast(error.error.text);
            }
          } 
      );
    } else {
      this.cvService.createCv(formValue).subscribe(
        () =>{
          this.toastService.showSuccessToast("نم اضافة السيرة الذاتية بنجاح");
          this.router.navigate(['/cv-list'])
        } ,
        error => {
          this.toastService.showToast(error.error.text);
          console.log('Error creating CV', error)}
      );
    }
  }
}
