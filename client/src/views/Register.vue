<template lang="pug">
.row.align-items-center
  .col-10.offset-1.col-sm-8.offset-sm-2.col-md-6.offset-md-3.col-xl-4.offset-xl-4.px-xxl-5
    .center-container.mx-lg-5.mx-xl-0
      h3.h3.title(data-test-id='title') Sign Up
      form(@submit.prevent='registerAccount')
        input.input(
          type='text',
          placeholder='First Name',
          v-model='firstName',
          data-test-id='register-first-name-input'
        )
        span.red(data-test-id='register-first-name-error') {{ firstNameError }}
        input.input.input-mt(
          type='text',
          placeholder='Last Name',
          v-model='lastName',
          data-test-id='register-last-name-input'
        )
        span.red(data-test-id='register-last-name-error') {{ lastNameError }}
        input.input.input-mt(
          type='text',
          placeholder='Nickname',
          v-model='nickname',
          data-test-id='register-nickname-input'
        )
        input.input.input-mt(
          type='text',
          placeholder='Email address',
          v-model='email',
          data-test-id='register-email-input'
        )
        span.red(data-test-id='register-email-error') {{ emailError }}
        input.input.input-mt(
          type='password',
          placeholder='Password',
          v-model='password',
          data-test-id='register-password-input'
        )
        span.red(data-test-id='register-password-error') {{ passwordError }}
        input.input.input-mt(
          type='password',
          placeholder='Confirm password',
          v-model='confirmPassword',
          data-test-id='register-confirm-password-input'
        )
        span.red(data-test-id='register-confirm-password-error') {{ confirmPasswordError }}
        .pt-5
          button.button(type='submit') Sign Up
      .form-message
        p Already signed up? Use your email and password to
          router-link.log-in-link(:to='{ name: "Login" }') log in
</template>

<script>
import { ref } from 'vue';
import { accountService } from '../services/accountService';
import { useField, useForm } from 'vee-validate';
import {
  nameValidation,
  emailValidation,
  passwordValidation
} from '../utils/validations';
import { Toast } from '../utils/toastAlert';

export default {
  setup() {
    const nickname = ref('');
    const { handleSubmit } = useForm();

    const { errorMessage: firstNameError, value: firstName } = useField(
      'firstName',
      nameValidation
    );
    const { errorMessage: lastNameError, value: lastName } = useField(
      'lastName',
      nameValidation
    );
    const { errorMessage: emailError, value: email } = useField(
      'email',
      emailValidation
    );
    const { errorMessage: passwordError, value: password } = useField(
      'password',
      passwordValidation
    );

    const { errorMessage: confirmPasswordError, value: confirmPassword } =
      useField('confirmPassword', function (value) {
        if (value !== password.value) {
          return 'Passwords are not the same.';
        }
        return true;
      });

    const registerAccount = handleSubmit(
      async ({ firstName, lastName, email, password }) => {
        try {
          await accountService.registerAccount({
            firstName,
            lastName,
            nickname: nickname.value,
            email,
            password
          });

          Toast.fire({
            icon: 'success',
            title: 'Register complete'
          });
        } catch (error) {
          Toast.fire({
            icon: 'error',
            title: 'Something went wrong'
          });
        }
      }
    );

    return {
      registerAccount,
      firstName,
      lastName,
      nickname,
      email,
      password,
      confirmPassword,
      firstNameError,
      lastNameError,
      emailError,
      passwordError,
      confirmPasswordError
    };
  }
};
</script>
<style lang="stylus" scoped>
@require "../assets/styles/colors.styl"

.log-in-link
  color: $primary-purple !important

</style>
