import { Storage, IonicStorageModule } from '@ionic/storage';
import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';

import { UsernameValidator } from '../../lib/username.validator';
// import { PhoneValidator } from '../../lib/phone.validator';
import { PasswordValidator  } from '../../lib/password.validator';
import { JsonPipe } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  validations_country = new FormGroup({
    // country: new FormControl('VietNam', Validators.required),
    phone: new FormControl('', Validators.compose([
      Validators.required,
      // PhoneValidator.validCountryPhone(country)
    ])),
  });
  validations_username = new FormGroup({
    username: new FormControl('', Validators.compose([
      UsernameValidator.validUsername,
      Validators.maxLength(25),
      Validators.minLength(5),
      Validators.pattern('^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]+$'),
      Validators.required
    ])),
  });
  validations_email = new FormGroup({
    email: new FormControl('', Validators.compose([
      Validators.required,
      Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
    ])),
  });
  validations_password = new FormGroup({
    password: new FormControl('', Validators.compose([
        Validators.minLength(5),
        Validators.required,
        Validators.pattern('^(?=.*[a-z])(?=.*[0-9])[a-zA-Z0-9]+$')
        // Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$') //this is for the letters (both uppercase and lowercase) and numbers validation
    ])),
    confirm_password: new FormControl('', Validators.required),
  }, (formGroup: FormGroup) => {
    return PasswordValidator.areEqual(formGroup);
  }
  );
  validation_messages = {
    'username': [
        { type: 'required', message: 'Username is required.' },
        { type: 'minlength', message: 'Username must be at least 5 characters long.' },
        { type: 'maxlength', message: 'Username cannot be more than 25 characters long.' },
        { type: 'pattern', message: 'Your username must contain only numbers and letters.' },
        { type: 'validUsername', message: 'Your username has already been taken.' }
      ],
    'name': [
      { type: 'required', message: 'Name is required.' }
    ],
    'email': [
      { type: 'required', message: 'Chưa nhập email.' },
      { type: 'pattern', message: 'Email sai định dạng.' },
    ],
    'password': [
      { type: 'minlength', message: 'Mật khẩu từ 5 ký tự trở lên.' },
      { type: 'required', message: 'Chưa nhập mật khẩu.' },
      { type: 'pattern', message: 'Mật khẩu bao gồm cả số và chữ.' },
    ],
    'confirm_password': [
      { type: 'areEqual', message: 'Xác nhận mật khẩu sai.' },
    ],
  };

  constructor(private storage: Storage, private router: Router) { 
    
  }

  ngOnInit() {
  }



  register(form){
    var authUser = {
      email : this.validations_email.value.email,
      phone : this.validations_country.value.phone,
      fullName : '',
      password : this.validations_password.value.password,
    }
    this.storage.set('authUser', JSON.stringify(authUser)).then((val) => {
      console.log('result', val);
      this.router.navigateByUrl('/tabs/account');
    });
  }

}
