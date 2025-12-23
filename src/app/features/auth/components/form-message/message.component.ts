import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-success-message',
  standalone: true,
  template: `
    <div class="alert alert-success d-flex align-items-center" role="alert">
      <i class="bi bi-check-circle-fill me-2"></i>
      <span>{{ message }}</span>
    </div>
  `,
  styles: [`
    .alert {
      border-radius: 12px;
    }
  `]
})
export class SuccessMessageComponent {
  @Input() message = 'Success';
}
