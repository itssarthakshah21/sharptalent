// job-application.component.ts
import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { NavbarComponent } from "../navbar/navbar.component";
import { FooterComponent } from "../footer/footer.component";

@Component({
  selector: 'app-job-application',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NavbarComponent, FooterComponent],
  templateUrl: './job-application.component.html',
})
export class JobApplicationComponent {
  applicationForm: FormGroup;
  jobTitle: string = '';

  constructor(private fb: FormBuilder, private route: ActivatedRoute, private router: Router) {
    this.route.queryParamMap.subscribe(params => {
      this.jobTitle = params.get('title') || '';
      this.applicationForm.get('jobTitle')?.setValue(this.jobTitle);
    });
    // const state = this.router.getCurrentNavigation()?.extras.state as { jobTitle: string };
    // this.jobTitle = state?.jobTitle || '';
    const title = this.route.snapshot.queryParamMap.get('title') || '';
    this.jobTitle = title;

    this.applicationForm = this.fb.group({
      jobTitle: [title, Validators.required],
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      linkedIn: [''],
      github: [''],
      education: this.fb.array([this.createEducation()]),
      experience: this.fb.array([this.createExperience()]),
      skills: [''],
      resume: [null]
    });
  }

  get educationControls() {
    return this.applicationForm.get('education') as FormArray;
  }

  get experienceControls() {
    return this.applicationForm.get('experience') as FormArray;
  }

  createEducation(): FormGroup {
    return this.fb.group({
      university: ['', Validators.required],
      degree: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required]
    });
  }

  addEducation() {
    this.educationControls.push(this.createEducation());
  }

  createExperience(): FormGroup {
    return this.fb.group({
      company: ['', Validators.required],
      title: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      responsibilities: ['', Validators.required]
    });
  }

  addExperience() {
    this.experienceControls.push(this.createExperience());
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.applicationForm.patchValue({ resume: file });
    }
  }

  removeEducation(index: number) {
    this.educationControls.removeAt(index);
  }
  
  removeExperience(index: number) {
    this.experienceControls.removeAt(index);
  }
  

  submitForm() {
    if (this.applicationForm.valid) {
      console.log(this.applicationForm.value);
      alert('Application submitted!');
      this.applicationForm.reset();
    } else {
      alert('Please fill all required fields');
    }
  }
}
