import { FormGroup } from '@angular/forms';

export function applyServerErrors(
  form: FormGroup,
  errors: any
): void {
  Object.keys(errors).forEach(field => {
    const control = form.get(field);

    if (control) {
      control.setErrors({
        ...control.errors,
        server: errors[field][0]
      });
    }
  });
}
