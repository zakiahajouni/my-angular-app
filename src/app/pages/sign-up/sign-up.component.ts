import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
  ValidatorFn,
  AbstractControl,
  ValidationErrors
} from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { TranslationService } from 'src/app/translation.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  currentLang: string;
  signUpForm: FormGroup;

  governorates: string[] = [
    'Ariana', 'Béja', 'Ben Arous', 'Bizerte', 'Gabès', 'Gafsa', 'Jendouba',
    'Kairouan', 'Kasserine', 'Kébili', 'Kef', 'Mahdia', 'Manouba',
    'Médenine', 'Monastir', 'Nabeul', 'Sfax', 'Sidi Bouzid', 'Siliana',
    'Sousse', 'Tataouine', 'Tozeur', 'Tunis', 'Zaghouan'
  ];

  filteredGovernorates!: Observable<string[]>;
  governorateControl = new FormControl();

  constructor(private translationService: TranslationService) {
    this.currentLang = 'en';

    this.signUpForm = new FormGroup({
      fullName: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[a-zA-Z\s]*$/)
      ]),
      governorate: new FormControl('', Validators.required),
      phoneNumber: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[9425]\d{7}$/)
      ]),
      cin: new FormControl('', [
        Validators.required,
        Validators.pattern(/^\d{8}$/)
      ]),
      email: new FormControl('', [
        Validators.required,
        Validators.email
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(12),
        Validators.pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).*$/)
      ]),
      confirmPassword: new FormControl('', Validators.required)
    });

     this.signUpForm.get('confirmPassword')?.setValidators([
      Validators.required,
      this.confirmPasswordValidator(this.signUpForm.get('password')!)
    ]);
  }

  ngOnInit(): void {
    this.filteredGovernorates = this.governorateControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filterGovernorates(value || ''))
    );

     this.signUpForm.get('password')?.valueChanges.subscribe(() => {
      this.signUpForm.get('confirmPassword')?.updateValueAndValidity();
    });
  }

  changeLanguage(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    const lang = selectElement.value;
    this.currentLang = lang;
    this.translationService.changeLanguage(lang);
  }

  translate(key: string) {
    return this.translationService.translate(key);
  }

  private _filterGovernorates(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.governorates.filter(governorate =>
      governorate.toLowerCase().includes(filterValue)
    );
  }

   confirmPasswordValidator(passwordControl: AbstractControl): ValidatorFn {
    return (confirmPasswordControl: AbstractControl): ValidationErrors | null => {
      if (!confirmPasswordControl.value || !passwordControl.value) {
        return null;
      }
      return passwordControl.value !== confirmPasswordControl.value
        ? { passwordMismatch: true }
        : null;
    };
  }
}
