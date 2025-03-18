<template>
  <div class="bg-white rounded-lg flex shadow min-h-[250px] p-4 md:p-12 justify-center items-center">
    <div v-if="dataGlobal.orders && dataGlobal.orders.length" class="w-full">
      <DataTable :value="formattedOrders" tableStyle="min-width: 50rem">
        <Column field="id" header="شناسه سفارش" style="width: 10%"></Column>
        <Column field="productName" header="نام محصول" style="width: 20%"></Column>
        <Column field="quantity" header="تعداد" style="width: 10%"></Column>
        <Column field="amount" header="قیمت واحد" style="width: 15%"></Column>
        <Column field="total" header="مجموع قیمت" style="width: 15%"></Column>
        <Column field="userMobile" header="موبایل کاربر" style="width: 15%"></Column>

        <Column field="status" header="وضعیت" style="width: 15%">
          <template #body="slotProps">
            <span :class="getStatusClass(slotProps.data.status)" class="px-2 py-1 rounded text-nowrap text-white">
              {{ slotProps.data.status }}
            </span>
          </template>
        </Column>

        <Column header="جزئیات" style="width: 10%">
          <template #body="slotProps">
            <button @click="goToOrder(slotProps.data.id)" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded">
              جزئیات
            </button>
          </template>
        </Column>
      </DataTable>

<!--      &lt;!&ndash; PAGINATION &ndash;&gt;-->
<!--      <div class="flex justify-center mt-4 space-x-2 rtl:space-x-reverse">-->
<!--        <button-->
<!--            class="px-3 py-1 rounded bg-gray-300 hover:bg-gray-400"-->
<!--            :disabled="pagination.currentPage === 1"-->
<!--            @click="changePage(pagination.currentPage - 1)"-->
<!--        >-->
<!--          قبلی-->
<!--        </button>-->

<!--        <button-->
<!--            v-for="page in totalPages"-->
<!--            :key="page"-->
<!--            class="px-3 py-1 rounded"-->
<!--            :class="pagination.currentPage === page ? 'bg-blue-500 text-white' : 'bg-gray-300 hover:bg-gray-400'"-->
<!--            @click="changePage(page)"-->
<!--        >-->
<!--          {{ page }}-->
<!--        </button>-->

<!--        <button-->
<!--            class="px-3 py-1 rounded bg-gray-300 hover:bg-gray-400"-->
<!--            :disabled="pagination.currentPage === totalPages.length"-->
<!--            @click="changePage(pagination.currentPage + 1)"-->
<!--        >-->
<!--          بعدی-->
<!--        </button>-->
<!--      </div>-->
    </div>

    <div v-else-if="dataGlobal.orders && dataGlobal.orders.length === 0" class="min-h-[250px] flex items-center justify-center text-gray-500 text-lg">سفارشی یافت نشد.</div>
    <LoadingIcon v-else size="24" stroke="2" />
  </div>
</template>

<script setup lang="ts">
import LoadingIcon from "~/components/generalElements/LoadingIcon.vue";
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import { useDataGlobal } from "~/stores/globalStore";
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";

const dataGlobal = useDataGlobal();
const router = useRouter();

// اطلاعات صفحه‌بندی
const pagination = ref({
  currentPage: 1,
  perPage: 10,
  total: 0
});

// محاسبه تعداد کل صفحات
const totalPages = computed(() => {
  return Array.from({ length: Math.ceil(pagination.value.total / pagination.value.perPage) }, (_, i) => i + 1);
});

// پردازش اطلاعات سفارشات
const formattedOrders = computed(() => {
  return dataGlobal.orders.map(order => ({
    id: order.id,
    productName: order.orderItems?.[0]?.product?.translations?.fa?.title || "نامشخص",
    quantity: order.orderItems?.[0]?.quantity || 0,
    amount: formatPrice(order.orderItems?.[0]?.amount || 0),
    total: formatPrice(order.total || 0),
    userMobile: order.user?.mobile || "نامشخص",
    status: formatStatus(order.status)
  }));
});

// دریافت سفارشات با شماره صفحه
const fetchOrders = async (page = 1) => {
  await dataGlobal.GetOrders(page);
  if (dataGlobal.meta) {
    pagination.value.currentPage = dataGlobal.meta.current_page;
    pagination.value.perPage = dataGlobal.meta.per_page;
    pagination.value.total = dataGlobal.meta.total;
  }
};

// تغییر صفحه
const changePage = (page: number) => {
  if (page >= 1 && page <= totalPages.value.length) {
    fetchOrders(page);
  }
};

// تابع فرمت قیمت
const formatPrice = (price: number) => {
  return price.toLocaleString('fa-IR') + " تومان";
};

// تبدیل وضعیت سفارش به فارسی
const formatStatus = (status: string) => {
  const statusMap: Record<string, string> = {
    pending: "در انتظار",
    processing: "در حال پردازش",
    completed: "تکمیل شده",
    canceled: "لغو شده"
  };
  return statusMap[status] || "نامشخص";
};

// تعیین کلاس رنگی برای وضعیت‌ها
const getStatusClass = (status: string) => {
  const statusColors: Record<string, string> = {
    "در انتظار": "bg-yellow-500",
    "در حال پردازش": "bg-blue-500",
    "تکمیل شده": "bg-green-500",
    "لغو شده": "bg-red-500"
  };
  return statusColors[status] || "bg-gray-500";
};

// رفتن به صفحه جزئیات سفارش
const goToOrder = (orderId: number) => {
  router.push(`/orders/${orderId}`);
};

// دریافت سفارشات هنگام لود شدن صفحه
onMounted(() => {
  fetchOrders();
});
</script>

<style lang="postcss" scoped>
tbody tr:nth-child(odd) {
  background-color: #fafafa;
}

tbody tr {
  @apply text-sm text-gray-500 hover:text-gray-800;
}

td,
th {
  @apply py-2 px-3;
}
</style>
