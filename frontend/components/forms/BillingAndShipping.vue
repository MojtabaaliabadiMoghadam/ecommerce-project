<template>
  <form class="bg-white rounded-lg shadow" @submit.prevent="saveChanges">
    <div class="grid p-8 gap-6 md:grid-cols-2">
      <h3 class="font-semibold text-xl col-span-full">{{ $t('messages.billing.billing') }}</h3>

      <div class="w-full">
        <label for="billing-first-name">{{ $t('messages.billing.firstName') }}</label>
        <input id="billing-first-name"  placeholder="John" autocomplete="given-name" type="text" required />
      </div>

      <div class="w-full">
        <label for="billing-last-name">{{ $t('messages.billing.lastName') }}</label>
        <input id="billing-last-name"  placeholder="Doe" autocomplete="family-name" type="text" required />
      </div>

      <div class="w-full">
        <label for="billing-phone">{{ $t('messages.billing.phone') }}</label>
        <input id="billing-phone"  placeholder="+1 234 567 8901" autocomplete="tel" type="tel" />
      </div>

      <div class="w-full">
        <label for="billing-company">Company ({{ $t('messages.general.optional') }})</label>
        <input id="billing-company"  placeholder="Company Name" autocomplete="organization" type="text" />
      </div>

      <div class="w-full">
        <label for="billing-address">{{ $t('messages.billing.address1') }}</label>
        <input id="billing-address"  placeholder="123 Main St" autocomplete="address-line1" type="text" />
      </div>

      <div class="w-full">
        <label for="billing-address-2">{{ $t('messages.billing.address2') }} ({{ $t('messages.general.optional') }})</label>
        <input id="billing-address-2"  placeholder="Apartment, studio, or floor" autocomplete="address-line2" type="text" />
      </div>

      <div class="w-full">
        <label for="billing-city">{{ $t('messages.billing.city') }}</label>
        <input id="billing-city"  placeholder="New York" autocomplete="address-level2" type="text" />
      </div>

<!--      <div class="w-full">-->
<!--        <label for="billing-state">{{ $t('messages.billing.state') }} ({{ $t('messages.general.optional') }})</label>-->
<!--        <StateSelect id="billing-state" />-->
<!--      </div>-->

<!--      <div class="w-full">-->
<!--        <label for="billing-country">{{ $t('messages.billing.country') }}</label>-->
<!--        <CountrySelect id="billing-country"   />-->
<!--      </div>-->

      <div class="w-full">
        <label for="billing-zip">{{ $t('messages.billing.zip') }}</label>
        <input id="billing-zip"  placeholder="10001" autocomplete="postal-code" type="text" />
      </div>

      <div class="w-full col-span-full">
        <label for="billing-email">{{ $t('messages.billing.email') }}</label>
        <input id="billing-email"  placeholder="johndoe@email.com" autocomplete="email" type="email" required />
      </div>
    </div>

    <div class="grid p-8 gap-6 md:grid-cols-2">
      <h3 class="font-semibold text-xl col-span-full">{{ $t('messages.general.shipping') }}</h3>

      <div class="w-full">
        <label for="shipping-first-name">{{ $t('messages.billing.firstName') }}</label>
        <input id="shipping-first-name"  placeholder="John" autocomplete="given-name" type="text" required />
      </div>

      <div class="w-full">
        <label for="shipping-last-name">{{ $t('messages.billing.lastName') }}</label>
        <input id="shipping-last-name"  placeholder="Doe" autocomplete="family-name" type="text" required />
      </div>

      <div class="w-full">
        <label for="shipping-phone">{{ $t('messages.billing.phone') }}</label>
        <input id="shipping-phone"  placeholder="+1 234 567 8901" autocomplete="tel" type="tel" />
      </div>

      <div class="w-full">
        <label for="shipping-company">Company ({{ $t('messages.general.optional') }})</label>
        <input id="shipping-company"  placeholder="Company Name" autocomplete="organization" type="text" />
      </div>

      <div class="w-full">
        <label for="shipping-address">{{ $t('messages.billing.address1') }}</label>
        <input id="shipping-address"  placeholder="O'Connell Street 47" autocomplete="address-line1" type="text" />
      </div>

      <div class="w-full">
        <label for="shipping-address-2">{{ $t('messages.billing.address2') }} ({{ $t('messages.general.optional') }})</label>
        <input
          id="shipping-address-2"

          placeholder="Apartment, studio, or floor"
          autocomplete="address-line2"
          type="text" />
      </div>

      <div class="w-full">
        <label for="shipping-city">{{ $t('messages.billing.city') }}</label>
        <input id="shipping-city"  placeholder="New York" autocomplete="address-level2" type="text" />
      </div>

<!--      <div class="w-full">-->
<!--        <label for="shipping-state">{{ $t('messages.billing.state') }} ({{ $t('messages.general.optional') }})</label>-->
<!--        <StateSelect id="shipping-state"  :default-value="customer.shipping.state" :country-code="customer.shipping.country" />-->
<!--      </div>-->

<!--      <div class="w-full">-->
<!--        <label for="shipping-country">{{ $t('messages.billing.country') }}</label>-->
<!--        <CountrySelect id="shipping-country"  :default-value="customer.shipping?.country" />-->
<!--      </div>-->

      <div class="w-full">
        <label for="shipping-zip">{{ $t('messages.billing.zip') }}</label>
        <input id="shipping-zip" placeholder="10001" autocomplete="postal-code" type="text" />
      </div>
    </div>

    <div class="bg-white backdrop-blur-sm bg-opacity-75 border-t col-span-full p-4 sticky bottom-0 rounded-b-lg">
      <button
        class="rounded-md flex font-semibold ml-auto text-white py-2 px-4 gap-4 items-center disabled:bg-gray-400 disabled:cursor-not-allowed"
        :class="button.color"
        :disabled="loading">
        <LoadingIcon v-if="loading" color="#fff" size="20" />
        <span>{{ button.text }}</span>
      </button>
    </div>
  </form>
</template>

<script setup lang="ts">
import CountrySelect from "~/components/shopElements/CountrySelect.vue";
import StateSelect from "~/components/shopElements/StateSelect.vue";
import LoadingIcon from "~/components/generalElements/LoadingIcon.vue";

const { t } = useI18n();

const loading = ref<boolean>(false);
const button = ref<{ text: string; color: string }>({ text: t('messages.account.updateDetails'), color: 'bg-primary hover:bg-primary-dark' });

</script>
