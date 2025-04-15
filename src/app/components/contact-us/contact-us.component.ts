import { Component } from '@angular/core';
import { NgForm, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-contact-us',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss'],
})
export class ContactUsComponent {
  form = {
    name: '',
    email: '',
    phone: '',
    message: '',
    resume: null as File | null,
  };

  submitted = false;
  showErrors = false;

  onFileChange(event: any) {
    const file = event.target.files[0];
    this.form.resume = file || null;
  }

  submitForm(contactForm: NgForm) {
    this.showErrors = true;

    if (contactForm.invalid) {
      return;
    }

    console.log('Form submitted:', this.form);

    this.submitted = true;
    this.showErrors = false;

    // Reset form
    this.form = {
      name: '',
      email: '',
      phone: '',
      message: '',
      resume: null,
    };

    contactForm.resetForm(); // Also clears validation
  }
}
