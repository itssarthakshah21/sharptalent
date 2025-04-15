import { Component } from '@angular/core';
import { Router, NavigationEnd, RouterModule } from '@angular/router';
import { filter, pairwise, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private router: Router) {
    this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd),
        startWith(null), // helps with initial load
        pairwise() // compare previous and current route
      )
      .subscribe(([prev, curr]: any) => {
        const prevUrl = prev?.urlAfterRedirects || '';
        const currUrl = curr?.urlAfterRedirects || '';

        // Only scroll to top if we navigated to a different route (not just hash change)
        const prevBase = prevUrl.split('#')[0];
        const currBase = currUrl.split('#')[0];

        if (prevBase !== currBase) {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      });
  }
}
