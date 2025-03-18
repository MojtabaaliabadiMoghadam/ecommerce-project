<template>
  <div class="grid gap-8 account-form">
    <PersonalInformation />
<!--    <BillingAndShipping />-->
    <ChangePassword />
  </div>
</template>
<script setup lang="ts">
import PersonalInformation from "~/components/forms/PersonalInformation.vue";
import BillingAndShipping from "~/components/forms/BillingAndShipping.vue";
import ChangePassword from "~/components/forms/ChangePassword.vue";
</script>
<style lang="postcss">
</style>
