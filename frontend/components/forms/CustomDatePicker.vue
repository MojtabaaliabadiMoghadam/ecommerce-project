<template>
  <div ref="datepickerWrapper">
    <div class="w-full">
      <label class="text-xs text-gray-600 inline-block uppercase" :for="props.name">{{ props.label }}</label>
      <input
          :placeholder="props.placeholder"
          :class="props.class"
          class="bg-white border rounded-md outline-none w-full py-2 px-4 block md:bg-gray-50"
          :id="props.id"
          @change="change"
          :name="props.name"
          id="first-name"
          v-model="model"
          autocomplete="given-name"
          type="text"
      />
    </div>
<!--    <input type="text" class="example1" />-->
  </div>
</template>

<script setup lang="ts">
import {ref, onMounted, watch} from 'vue';


const {locale} = useI18n();
const {getDateToday, isRtl} = useHelpers();
import DateConverter from "@/helpers/DateConverter";

interface PropsInterface {
  type?: string;
  label?: string | null;
  disabled?: boolean;
  icon?: string | null;
  placeholder?: string;
  name?: string;
  id?: string;
  class?: string;
  readonly?: boolean;
  showOnlyClock?: boolean
  showDefaultDate?: boolean
  minDate?: string
  errorBackend?: string
}

const emit = defineEmits(['onSelect']);

// Set default values for the props using withDefaults
const props = withDefaults(defineProps<PropsInterface>(), {
  type: 'text',
  label: null,
  disabled: false,
  readonly: false,
  icon: null,
  placeholder: '',
  name: '',
  class: '',
  id: '',
  showOnlyClock: false,
  showDefaultDate: false,
  minDate: '',
  errorBackend: ''
});

const model = defineModel();
const datepickerWrapper = ref<HTMLElement | null>(null);

function formatDate(timestamp: number): string {
  if (locale.value == 'fa') {
    const date = new persianDate(timestamp);
    return date.format('YYYY/MM/DD');
  } else {
    const date = new Date(timestamp);
    const year = date.getFullYear();
    let month: string | number = date.getMonth() + 1;
    let day: string | number = date.getDate();
    if (month < 10) month = `0${month}`;
    if (day < 10) day = `0${day}`;
    return `${year}-${month}-${day}`;
  }
}

function formatTime(unixTimestamp: any) {
  let date = new Date(unixTimestamp);
  let hours = date.getHours().toString().padStart(2, '0');
  let minutes = date.getMinutes().toString().padStart(2, '0');
  return `${hours}:${minutes}`;
}

var pd = null
onMounted(() => {
  if (props.showDefaultDate) {
    if (isRtl.value) {
      model.value = DateConverter.convertDateFormat(getDateToday(), 'yyyy/MM/dd', 'jalali');
    } else {
      model.value = DateConverter.convertDateFormat(getDateToday(), 'yyyy-MM-dd', 'gregorian');
    }
  }

  pd = $(`#${props.id}`).pDatepicker({
    onlyTimePicker: props.showOnlyClock,
    observer: true,
    autoClose: true,
    initialValue: false,
    responsive: false,
    initialValueType: isRtl.value ? 'persian' : 'gregorian',
    calendarType: isRtl.value ? 'persian' : 'gregorian',
    secondPicker: false,
    navigator: {
      text: {
        btnNextText: '', // آیکون دلخواه,
        btnPrevText: '' // آیکون دلخواه
      }
    },
    toolbox: {
      todayButton: {
        text: {
          fa: "برو به امروز"
        }
      },
    },
    minDate: props.minDate ? props.minDate : '',
    format: props.showOnlyClock ? 'HH:mm' : locale.value == 'fa' ? 'YYYY/MM/DD' : 'YYYY-MM-DD',
    onSelect: function (unix: any) {
      const formattedDate = props.showOnlyClock ? formatTime(unix) : formatDate(unix)
      model.value = formattedDate;
      emit('onSelect', formattedDate);
    }
  });

  // Masking logic based on locale
  // @ts-ignore
  $(`#${props.id}`).mask(locale.value == 'fa' ? '0000/00/00' : '0000-00-00', {
    placeholder: props.placeholder ? props.placeholder : locale.value == 'fa' ? '____/__/__' : '____-__-__'
  });

});

watch(() => locale.value, () => {
  if (isRtl.value) {
    model.value = DateConverter.convertDateFormat(getDateToday(), 'yyyy/MM/dd', 'jalali');
  } else {
    model.value = DateConverter.convertDateFormat(getDateToday(), 'yyyy-MM-dd', 'gregorian');
  }
  pd = $(`#${props.id}`).pDatepicker({
    onlyTimePicker: props.showOnlyClock,
    observer: true,
    autoClose: true,
    initialValue: false,
    initialValueType: isRtl.value ? 'persian' : 'gregorian',
    calendarType: isRtl.value ? 'persian' : 'gregorian',
    secondPicker: false,
    navigator: {
      text: {
        btnNextText: '', // آیکون دلخواه,
        btnPrevText: '' // آیکون دلخواه
      }
    },
    toolbox: {
      todayButton: {
        text: {
          fa: "برو به امروز"
        }
      },
    },
    minDate: props.minDate ? props.minDate : '',
    format: props.showOnlyClock ? 'HH:mm' : locale.value == 'fa' ? 'YYYY/MM/DD' : 'YYYY-MM-DD',
    onSelect: function (unix: any) {
      const formattedDate = props.showOnlyClock ? formatTime(unix) : formatDate(unix)
      model.value = formattedDate;
      emit('onSelect', formattedDate);
    }
  });

  // Masking logic based on locale
  // @ts-ignore
  $(`#${props.id}`).mask(locale.value == 'fa' ? '0000/00/00' : '0000-00-00', {
    placeholder: props.placeholder ? props.placeholder : locale.value == 'fa' ? '____/__/__' : '____-__-__'
  });
})

let debounceTimer: any;


watch(model, () => {
  if (isValidDate(model.value)) {
    if (pd) {
      pd.setDate(new Date(DateConverter.convertDateFormat(model.value, 'yyyy-MM-dd')));
    }
  }
});

function isValidDate(dateString) {
  const regex = /^\d{4}\/\d{2}\/\d{2}$/;
  return regex.test(dateString);
}

function change(e: Event) {
  // Clear any existing debounce timer
  clearTimeout(debounceTimer);

  debounceTimer = setTimeout(() => {
    // model.value = e.target?.value
    if (isValidDate(e.target?.value)) {
      pd.setDate(new Date(DateConverter.convertDateFormat(e.target?.value, 'yyyy-MM-dd')));
    }
    emit('onSelect', e.target?.value);
  }, 600); // Adjust debounce delay as needed
}
</script>


