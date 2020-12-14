import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { AuthService, SnackBarService } from '@core/services';
import { BaseComponent } from '@shared/components';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  form:FormGroup;

  public editorForm = new FormGroup({
    emailFormControl: new FormControl('', Validators.required),
    passwordFormControl: new FormControl('', Validators.required)
  });

  constructor(private authService: AuthService, 
               private snackBar: SnackBarService,
               public dialogRef: MatDialogRef<LoginComponent>) {

    //test
    this.editorForm.controls.emailFormControl.setValue('test.user@mail.com');
    this.editorForm.controls.passwordFormControl.setValue('test_test');
  }

  login() {
      if (this.editorForm.controls.emailFormControl && this.editorForm.controls.passwordFormControl) {
          this.authService.login(this.editorForm.controls.emailFormControl.value, this.editorForm.controls.passwordFormControl.value)
              .then(
                  (res) => {
                      if(res['status']  == '200' && res['logged']){
                        this.authService.setSession(res);
                        this.dialogRef.close();
                      }else{
                        this.snackBar.open(res['message'], 'ERROR');
                      }
                  }
              );
      }
  }

  close(){
    this.dialogRef.close();
  }
}
