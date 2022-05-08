<template lang="pug">
.row.align-items-center
  .col-10.offset-1.col-sm-8.offset-sm-2.col-md-6.offset-md-3.col-xl-4.offset-xl-4
    .center-container.mx-lg-5.mx-xl-0
      h4.h4.title(data-test-id='title') Choose your new password
      form(@submit.prevent='updatePassword')
        input.input(type='password', placeholder='New password', v-model='password', data-test-id="reset-password-password-input")
        .red(data-test-id="reset-password-password-error") {{passwordError}}
        input.input.input-mt(type='password', placeholder='Confirm password', v-model='passwordConfirmation', data-test-id="reset-password-confirm-password-input")
        .red(data-test-id="reset-password-confirm-password-error") {{passwordConfirmationError}}
        button.button.mt-5(type='submit') Update Password
</template>

<script>
import { useRoute, useRouter } from 'vue-router'
import { useField, useForm } from 'vee-validate';
import {passwordValidation} from '../utils/validations'
import { resetPasswordService } from '@/services/resetPasswordService';
import { Toast } from '../utils/toastAlert';

export default {
  setup() {
    const router = useRouter();
    const route = useRoute();
    const { handleSubmit } = useForm();

    const { errorMessage: passwordError, value: password } = useField(
      'password', passwordValidation
    );

    const { errorMessage: passwordConfirmationError, value: passwordConfirmation } = useField(
      'passwordConfirmation', function(value) {
        if(value !== password.value) {
          return 'Passwords are not the same.'
        }
        return true
      }
    );

    const updatePassword = handleSubmit(async (password) => {
      try {
        await resetPasswordService.validateResetPasswordToken(route.params.token, password)
        Toast.fire({
          icon: 'success',
          title: 'Password changed successfully. You can now login'
        });
        router.push({
          name: 'Login'
        });
      } catch(error) {
        Toast.fire({
          icon: 'error',
          title: 'Link has expired'
        });
        router.push({
          name: 'Login'
        });
      }

    })

    return {
      password,
      passwordError,
      passwordConfirmation,
      passwordConfirmationError,
      updatePassword
    }
  }
};
</script>


