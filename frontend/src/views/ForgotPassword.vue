<template lang="pug">
.row
  .center-container.col-10.offset-1.col-sm-8.offset-sm-2.col-md-6.offset-md-3.col-xl-4.offset-xl-4
    .px-5.py-5
      h4.h4.title(data-test-id='title') Enter your email address
      form(@submit.prevent='createResetPasswordToken')
        input.input(
          type='text',
          placeholder='Email address',
          v-model='email',
          data-test-id='forgot-password-email-input'
        )
        .red(data-test-id='forgot-password-email-error') {{ emailError }}
        button.button.mt-5(type='submit') Reset Password
      .form-message
        p Remembered your password?
          router-link(:to='{ name: "Login" }') Log in
</template>

<script>
import { useField, useForm } from 'vee-validate';
import { emailValidation } from '../utils/validations';
import { resetPasswordService } from '@/services/resetPasswordService';

export default {
  setup() {
    const { handleSubmit } = useForm();

    const { errorMessage: emailError, value: email } = useField(
      'email',
      emailValidation
    );

    const createResetPasswordToken = handleSubmit(async (email) => {
      try {
        await resetPasswordService.createResetPasswordToken(email);
      } catch (error) {
        console.log(error);
      }
    });

    return {
      email,
      emailError,
      createResetPasswordToken
    };
  }
};
</script>


