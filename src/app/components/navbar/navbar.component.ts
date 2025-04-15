import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { RouterModule, Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  activeSection: string = 'home';
  currentRoute: string = '/';
  private ticking = false;
  private scrollSpyEnabled = true; // ✅ Used to temporarily disable scroll tracking

  constructor(private router: Router) {
    this.currentRoute = window.location.pathname;

    this.router.events
      .pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.currentRoute = event.urlAfterRedirects;
        if (this.currentRoute === '/') {
          setTimeout(() => this.checkVisibleSection(), 300);
        } else {
          this.activeSection = ''; // Clear section highlighting on other routes
        }
      });
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    if (this.currentRoute !== '/' || !this.scrollSpyEnabled) return;

    if (!this.ticking) {
      window.requestAnimationFrame(() => {
        this.checkVisibleSection();
        this.ticking = false;
      });
      this.ticking = true;
    }
  }

  scrollToSection(sectionId: string) {
    this.scrollSpyEnabled = false;
    this.activeSection = sectionId; // ✅ Highlight instantly
  
    if (this.currentRoute !== '/') {
      this.router.navigateByUrl('/').then(() => {
        setTimeout(() => {
          this.scrollAndHighlight(sectionId);
        }, 300); // wait for home to render
      });
    } else {
      this.scrollAndHighlight(sectionId);
    }
  }
  


  private scrollAndHighlight(sectionId: string) {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
  
      // Wait for scroll animation to complete before enabling scroll spy
      const scrollDuration = 800; // Match this to scroll behavior
      setTimeout(() => {
        this.scrollSpyEnabled = true;
      }, scrollDuration);
    } else {
      this.scrollSpyEnabled = true;
    }
  }
  

  checkVisibleSection() {
    const sections = ['home', 'about', 'services', 'whychoose', 'contact'];
    const offset = 150;
    let closestSection = '';
    let minDistance = Number.POSITIVE_INFINITY;

    for (const sectionId of sections) {
      const element = document.getElementById(sectionId);
      if (element) {
        const top = Math.abs(element.getBoundingClientRect().top - offset);
        if (top < minDistance) {
          minDistance = top;
          closestSection = sectionId;
        }
      }
    }

    if (closestSection && closestSection !== this.activeSection) {
      this.activeSection = closestSection;
    }
  }
}
