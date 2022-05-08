<template lang="pug">
.row
  .col-10.offset-1.col-sm-8.offset-sm-2.col-md-6.offset-md-3.col-xl-4.offset-xl-4.px-xxl-5
    .center-container.mx-lg-5.mx-xl-0
      h3.h3.title.pb-3(data-test-id='title') Sign In
      form(data-test-id='login-form', @submit.prevent='loginUser')
        input.input(
          type='text',
          placeholder='Email address',
          v-model='email',
          data-test-id='login-email-input'
        )
        .red(data-test-id='login-email-error') {{ emailError }}
        input.input.input-mt(
          type='password',
          placeholder='Password',
          v-model='password',
          data-test-id='login-password-input'
        )
        .red(data-test-id='login-password-error') {{ passwordError }}
        .row.pt-5
          .col-sm-6.text-center.text-sm-start
            button.button Log in
          .col-sm-6.text-center.text-sm-start
            p.mb-0 New around here?
            router-link.register-now-link(:to='{ name: "Register" }') Register now
      .form-message
        p Forgot your password?
          router-link.reset-password-link(:to='{ name: "ForgotPassword" }') Reset your password
</template>

<script>
import { useField, useForm } from 'vee-validate';
import { useRoute, useRouter } from 'vue-router';
import { useStore } from 'vuex';
import { emailValidation, passwordValidation } from '../utils/validations';
import { Toast } from '../utils/toastAlert';
export default {
  setup() {
    const route = useRoute();
    const router = useRouter();
    const store = useStore();
    const { handleSubmit } = useForm();

    const loginUser = handleSubmit(async ({ email, password }) => {
      try {
        await store.dispatch('loginUser', {
          email,
          password
        });
        router.push({ name: 'HomePage' });
      } catch (error) {
        const statusCode = error.response.data.statusCode;
        if (statusCode == '409') {
          Toast.fire({
            icon: 'info',
            title: error.response.data
          });
        } else {
          Toast.fire({
            icon: 'error',
            title: error.response.data
          });
        }
      }
    });

    const { errorMessage: emailError, value: email } = useField(
      'email',
      emailValidation
    );

    const { errorMessage: passwordError, value: password } = useField(
      'password',
      passwordValidation
    );

    return {
      email,
      emailError,
      password,
      passwordError,
      loginUser
    };
  }
};
</script>

<style lang="stylus" scoped>

@require "../assets/styles/colors.styl"

.reset-password-link, .register-now-link
  color: $primary-purple !important

</style>
