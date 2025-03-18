<template>
  <div class="w-full">
    <label v-if="isFilled(props.label)" class="text-xs mb-1 text-gray-600 inline-block uppercase" for="first-name">{{ props.label }}</label>
    <input
           class="bg-white border rounded-md outline-none w-full py-2 px-4 block md:bg-gray-50"
           id="first-name"
           v-model="model"
           :type="props.type"
    />
  </div>
</template>
<script setup lang="ts">
const {isFilled} = useHelpers();
interface IProps {
  id?:string;
  label?:string;
  type?:string;
}
const props = withDefaults(defineProps<IProps>(),{
  type:'text'
})
const model = defineModel()
</script>