import { Component,Input } from '@angular/core';

@Component({
  selector: 'app-form-header',
  imports: [],
  template: `
     <div class="head text-center mb-3">
        <h1>{{formTitle}}</h1>
        <p>{{formDesc}}</p>
    </div>
  `,
  styles: `
     .head h1 {
      font-size: 24px;
      font-weight: 600;
      color: #1A2238;
      margin-bottom: 8px;
     }
     .head p {
      font-size: 14px;
      color: #6D7379;
     }
  `,
})
export class FormHeader {
    @Input() formTitle!: string;
    @Input() formDesc!: string;
}
