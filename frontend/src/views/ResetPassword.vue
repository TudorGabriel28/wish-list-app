<template lang="pug">
.row.align-items-center
  .col-10.offset-1.col-sm-8.offset-sm-2.col-md-6.offset-md-3.col-xl-4.offset-xl-4
    .center-container.mx-lg-5.mx-xl-0
      h4.h4.title(data-test-id='title') Choose your new password
      form(@submit.prevent='updatePassword')
        span.red(data-test-id="reset-password-password-error") {{passwordError}}
        input.input(type='password', placeholder='New password', v-model='password', data-test-id="reset-password-password-input")
        span.red(data-test-id="reset-password-confirm-password-error") {{confirmPasswordError}}
        input.input.last-input(type='password', placeholder='Confirm password', v-model='confirmPassword', data-test-id="reset-password-confirm-password-input")
        button.button(type='submit') Update Password
</template>

<script>
import { onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { accountService } from '../services/accountService'
import { useField, useForm } from 'vee-validate';
import {passwordValidation} from '../utils/validations'

export default {
  setup() {
    const router = useRouter();
    const route = useRoute();
    const { handleSubmit } = useForm();

    onMounted(async () => {
      try{
        await accountService.validateResetPasswordToken({userId: route.params.id, token: route.params.token})
      } catch(error) {
        router.push({ name: 'Login', params: { alert: true, alertMessage: 'Link has expired.', alertIcon: 'error' } });
      }

    })

    const { errorMessage: passwordError, value: password } = useField(
      'password', passwordValidation
    );

    const { errorMessage: confirmPasswordError, value: confirmPassword } = useField(
      'confirmPassword', function(value) {
        if(value !== password.value) {
          return 'Passwords are not the same.'
        }
        return true
      }
    );

    const updatePassword = handleSubmit(async (password) => {
      try {
        await accountService.updatePassword({userId: route.params.id, token: route.params.token}, password)
      } catch(error) {
        console.log(error)
      }

    })

    return {
      password,
      passwordError,
      confirmPassword,
      confirmPasswordError,
      updatePassword
    }
  }
};
</script>


