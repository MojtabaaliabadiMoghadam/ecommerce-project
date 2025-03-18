import { defineStore } from "pinia";
import { faker } from "@faker-js/faker";
import { useRoute, useRouter } from "vue-router";

export const useDataGlobal = defineStore("data", () => {
    const {getUrl, fetchData, showSuccessToast, showErrorToast,extractDate} = useHelpers()
    const isShowingCart = ref<boolean>(true)
    const route = useRoute();
    const router = useRouter();

    const products = ref<any[]>([]);
    const quantity = ref<number>(0);
    const lock = ref(true);

    // مقدار فیلترها
    const priceFilter = ref({ min: 0, max: 1000 });
    const categoryFilter = ref<string | null>(null);
    const orderby = ref<string>("date");
    const orders = ref([])
    const order = ref()
    const orderProduct = ref([])
    function generateProducts(count: number) {
        // if (!lock.value) return null;
        // products.value = Array.from({ length: count }, () => ({
        //     name: faker.commerce.productName(),
        //     databaseId: faker.number.int({ min: 1000, max: 9999 }),
        //     price: parseFloat(faker.commerce.price({ min: 0, max: 1000 })),
        //     slug: faker.lorem.slug(),
        //     rating: faker.number.float({ min: 1, max: 5, precision: 0.1 }),
        //     discount: faker.number.int({ min: 0, max: 50 }),
        //     category: faker.helpers.arrayElement(["لباس", "کفش", "لوازم الکترونیک", "کتاب"]),
        //     stockQuantity: faker.number.int({ min: 0, max: 100 }),
        //     stockStatus: faker.helpers.arrayElement(["IN_STOCK", "OUT_OF_STOCK"]),
        //     src: faker.image.url(),
        //     date: faker.date.past(),
        // }));
        // lock.value = false;
    }

    // list of category should be delete after add api
    const categories = ref([
        {src:'/images/category_1.webp',alt:'category_1',title:"category 1",slug:1,price:'20$'},
        {src:'/images/category_2.webp',alt:'category_2',title:"category 2",slug:2,price:'20$'},
        {src:'/images/category_3.webp',alt:'category_3',title:"category 3",slug:3,price:'20$'},
        {src:'/images/category_4.webp',alt:'category_4',title:"category 4",slug:4,price:'20$'},
        {src:'/images/category_2.webp',alt:'category_1',title:"category 1",slug:5,price:'20$'},
        {src:'/images/category_1.webp',alt:'category_2',title:"category 2",slug:6,price:'20$'}
    ])


    // this computed property set filter in products
    const filteredProducts = computed(() => {
        let result = products.value.filter(
            (product: any) =>
                product.price >= priceFilter.value.min &&
                product.price <= priceFilter.value.max
        );

        // مرتب‌سازی بر اساس نوع orderby و order
        if (orderby.value === "price") {
            result = result.sort((a, b) =>
                order.value === "ASC" ? a.price - b.price : b.price - a.price
            );
        } else if (orderby.value === "alphabetically") {
            result = result.sort((a, b) =>
                order.value === "ASC" ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)
            );
        } else if (orderby.value === "date") {
            // اگر نیاز به مرتب‌سازی بر اساس تاریخ دارید
            result = result.sort((a, b) =>
                order.value === "ASC" ? a.databaseId - b.databaseId : b.databaseId - a.databaseId
            );
        }

        return result;
    });

    // خواندن مقدار فیلترها از URL
    function setFiltersFromQuery() {
        priceFilter.value = { min: Number(route.query.minPrice) || 0, max: Number(route.query.maxPrice) || 1000 };
        categoryFilter.value = (route.query.category as string) || null;
        orderby.value = (route.query.orderby as string) || "date";
        order.value = (route.query.order as "ASC" | "DESC") || "DESC";
    }

    function setPriceFilter([min, max]: number[]) {
        priceFilter.value = { min, max };
        updateQuery();
    }

    // به‌روزرسانی کوئری هنگام تغییر دسته‌بندی
    function setCategoryFilter(category: string | null) {
        categoryFilter.value = category;
        updateQuery();
    }

    //this function clear all filter from query and variables
    function resetFilters() {
        priceFilter.value = { min: 0, max: 1000 };
        categoryFilter.value = null;
        orderby.value = "date";
        order.value = "DESC";

        // حذف کامل کوئری‌ها از آدرس
        router.replace({ path: route.path, query: {} });
    }


    function setOrderBy(value: string) {
        orderby.value = value;
        updateQuery();
    }

    function toggleOrder() {
        order.value = order.value === "ASC" ? "DESC" : "ASC";
        updateQuery();
    }

    function updateQuery() {
        router.push({
            query: {
                minPrice: priceFilter.value.min || undefined,
                maxPrice: priceFilter.value.max || undefined,
                category: categoryFilter.value || undefined,
                orderby: orderby.value || undefined,
                order: order.value || undefined,
            },
        });
    }

    async function GetProducts(){
        try {
            let url = getUrl('/web/product/voucher')
            const {status, data, message} = await fetchData({
                method: 'GET',
                url,
                parameters:{
                    with:['translations','category.translations','prices']
                },
                authorization:true
            })

            if (status == 200) {
                products.value = data
            } else {
                showErrorToast(message)
            }
        } catch (error) {
            showErrorToast(error)
        }finally {

        }
    }
    async function GetOrders(){
        try {
            let url = getUrl('/web/order')
            const {status, data, message} = await fetchData({
                method: 'GET',
                url,
                parameters:{
                    with:['orderItems.product.translations']
                },
                authorization:true
            })

            if (status == 200) {
                orders.value = data
            } else {
                showErrorToast(message)
            }
        } catch (error) {
            showErrorToast(error)
        }
    }
    async function GetOrder(id:number){
        try {
            let url = getUrl(`/web/order/${id}`)
            const {status, data, message} = await fetchData({
                method: 'GET',
                url,
                authorization:true
            })

            if (status == 200) {
                orderProduct.value = data
            } else {
                showErrorToast(message)
            }
        } catch (error) {
            showErrorToast(error)
        }
    }
    async function CreateOrder(){
        let pruduct = products.value[0]
        try {
            let url = getUrl('/web/order/create')
            const {status, data, message} = await fetchData({
                method: 'POST',
                url,
                data:{
                    items:[
                        {
                            product_id:pruduct?.id,
                            quantity:quantity.value
                        }
                    ]
                },
                authorization:true
            })

            if (status == 200) {
                navigateTo(`/orders/${data?.id}`)
                showSuccessToast(message)
            } else {
                showErrorToast(message)
            }
        } catch (error) {
            showErrorToast(error)
        }
    }

    return {
        CreateOrder,
        quantity,
        products,
        GetProducts,
        generateProducts,
        priceFilter,
        categoryFilter,
        orderby,
        order,
        filteredProducts,
        setFiltersFromQuery,
        setOrderBy,
        toggleOrder,
        setPriceFilter,
        setCategoryFilter,
        categories,
        resetFilters,
        isShowingCart,
        GetOrders,
        orders,
        GetOrder,
        orderProduct
    };
});

