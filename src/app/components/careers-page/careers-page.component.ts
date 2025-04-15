import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from "../navbar/navbar.component";
import { FooterComponent } from "../footer/footer.component";
import { Router } from '@angular/router';

@Component({
  selector: 'app-careers-page',
  standalone: true,
  imports: [CommonModule, NavbarComponent, FooterComponent],
  templateUrl: './careers-page.component.html',
  styleUrls: ['./careers-page.component.scss']
})
export class CareersPageComponent {

  constructor(private router: Router) {}

  selectedJob: any = null;
  showModal: boolean = false;

  viewJobDetails(job: any) {
    this.selectedJob = job;
    this.showModal = true;
  }
  
  closeModal() {
    this.showModal = false;
    this.selectedJob = null;
  }

  openApplyInNewTab() {
    const jobTitle = encodeURIComponent(this.selectedJob?.title || '');
    const url = `/apply?title=${jobTitle}`;
    window.open(url, '_blank');
  }
  
  // goToApply() {
  //   this.closeModal();
  //   this.router.navigateByUrl('/apply', {
  //     state: { jobTitle: this.selectedJob?.title }
  //   });
  // }
  


  jobs = [
    {
      title: 'Frontend Developer',
      location: 'Remote',
      package: '$70,000 - $90,000/year',
      experience: '2+ years',
      deadline: 'April 30, 2025',
      description: 'We are looking for a skilled Frontend Developer to join our growing team and create dynamic, user-focused web applications.',
      responsibilities: [
        'Develop responsive UI using Angular and Tailwind CSS',
        'Collaborate with backend developers and designers',
        'Optimize applications for speed and scalability',
        'Participate in code reviews and team discussions'
      ],
      requirements: [
        '2+ years of frontend development experience',
        'Proficiency in Angular and TypeScript',
        'Strong understanding of HTML, CSS, and REST APIs',
        'Good problem-solving and communication skills'
      ]
    },
    {
      title: 'Backend Developer',
      location: 'New York, NY',
      package: '$85,000 - $110,000/year',
      experience: '3+ years',
      deadline: 'May 10, 2025'
    },
    {
      title: 'UI/UX Designer',
      location: 'Los Angeles, CA',
      package: '$60,000 - $80,000/year',
      experience: '1-3 years',
      deadline: 'May 5, 2025'
    }
    ,
    {
      title: 'UI/UX Designer',
      location: 'Los Angeles, CA',
      package: '$60,000 - $80,000/year',
      experience: '1-3 years',
      deadline: 'May 5, 2025'
    }
  ];
}
