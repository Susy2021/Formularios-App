import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmailValidatorService } from 'src/app/shared/validator/email-validator.service';

//import { emailPattern, nombreApellidoPattern, noPuedeSerStrider } from 'src/app/shared/validator/validaciones';
import { ValidatorService } from '../../../shared/validator/validator.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styles: [
  ]
})
export class RegistroComponent implements OnInit {


  miFormulario : FormGroup = this.fb.group({
    nombre : [ '' , [ Validators.required , Validators.pattern( this.validatorService.nombreApellidoPattern ) ] ],
    email : [ '' , [ Validators.required , Validators.pattern( this.validatorService.emailPattern ) ], [this.emailValidator] ],
    usuario : [ '' , [ Validators.required , this.validatorService.noPuedeSerStrider ] ],
    contraseña: [ '' , [ Validators.required , Validators.minLength(6) ] ],
    confirmar : [ '' , [ Validators.required ] ],
  }, {
    validators : [ this.validatorService.camposIguales('contraseña','confirmar') ]
  });

  get emailErrorMsg () : string {

    const errors = this.miFormulario.get('email')?.errors;

    if ( errors?.['required'] ) {
      return 'Email es obligatorio';
    } else if ( errors?.['pattern'] ) {
      return 'El formato no es válido';
    } else if ( errors?.['emailTomado'] ) {
      return 'El correo ya existe';
    }

    return '';

  };

  constructor( private fb : FormBuilder ,
              private validatorService : ValidatorService ,
              private emailValidator : EmailValidatorService ) { }

  ngOnInit(): void {
    this.miFormulario.reset({
      nombre : 'Hola Mundo',
      email : 'test1@test.com',
      usuario : 'ejemplo',
      contraseña : '123456',
      confirmar : '123456'

    })
  }

  campoNoValido ( campo : string ) {
    return this.miFormulario.get(campo)?.invalid
            && this.miFormulario.get(campo)?.touched ;
  }



  submitFormulario() {
    console.log( this.miFormulario.value );
    this.miFormulario.markAllAsTouched();
  }

}
