<template>
    <div id="booking">
        <Toolbar></Toolbar>
        <div id="booking_contant">
            <div> 用餐人數 </div>
            <div id="people_number">
                <v-select
                    v-model="bookingInfo.adultNumber"
                    :items="adultNumberList"
                    item-title="title"
                    item-value="value"
                />
                <v-select
                    v-model="bookingInfo.childNumber"
                    :items="childNumberList"
                    item-title="title"
                    item-value="value"
                />
            </div>

            <div> 用餐日期 </div>
            <div id="bookDate">
                <v-select
                    v-model="formatDate"
                    @click="toggleDatePicker()"
                    readonly
                />
                <v-select
                    v-model="bookingInfo.time"
                    :items="timeList"
                />
            </div>
            <div id="datePickerContainer">
                <v-date-picker
                    id="datePicker"
                    v-model="dateFromPicker"
                    show-adjacent-months
                    :class="isShowDatePicker ? 'show' : 'noshow'"
                    :allowed-dates="allowedDates"
                />
            </div>

            <div id="bookTime">
                <div>可預約時段</div>
                <v-btn>12:00</v-btn>

            </div>
        </div>
    </div>
</template>
<script setup>
import { computed, ref, watch } from 'vue';
import moment from 'moment';
import Toolbar from './toolbar.vue';
import { useBookingStore } from '../stores/booking';

    const bookStore = useBookingStore();
    const setAdultNumber = bookStore.setAdultNumber;
    const setChildNumber = bookStore.setChildNumber;

    const adultNumberList = [
        {title: '1 位大人', value: 1},
        {title: '2 位大人', value: 2},
        {title: '3 位大人', value: 3},
        {title: '4 位大人', value: 4},
        {title: '5 位大人', value: 5},
        {title: '6 位大人', value: 6},
        {title: '7 位大人', value: 7},
        {title: '8 位大人', value: 8}
    ];
    const childNumberList = [
        {title: '0 位小孩', value: 0},
        {title: '1 位小孩', value: 1},
        {title: '2 位小孩', value: 2},
        {title: '3 位小孩', value: 3},
        {title: '4 位小孩', value: 4},
        {title: '5 位小孩', value: 5}
    ];
    const timeList = [
        '11:00', '11:30',
        '12:00', '12:30',
        '13:00', '13:30',
        '14:00', '14:30',
        '17:00', '17:30',
        '18:00', '18:30',
        '19:00', '19:30',
        '20:00', '20:30'
    ];

    let bookingInfo = ref({
        adultNumber: 1,
        childNumber: 0,
        time: '12:00',
    });

    const today = computed(() => new Date());
    const getTomorrow = () => {
        const today = new Date();
        const tomorrow = new Date(today);
        return new Date(tomorrow.setDate(today.getDate() + 1));
    };

    let dateFromPicker = ref(getTomorrow());
    let formatDate = computed(() => formatDateTitle(dateFromPicker.value));

    let isShowDatePicker = ref(false);
    const toggleDatePicker = () => {
        isShowDatePicker.value = !isShowDatePicker.value;
    };
    const allowedDates = (date) => {
        return date > today.value;
    }
    const formatDateTitle = (date) => {
        const dayMap = {
            'Sunday': '週日', 
            'Monday': '週一', 
            'Tuesday': '週二', 
            'Wednesday': '週三',
            'Thursday': '週四', 
            'Friday': '週五', 
            'Saturday': '週六'
        };
        const newDate = moment(date);
        const dddd = newDate.format('dddd');
        return newDate.format(`YYYY/MM/DD ${dayMap[dddd]}`)
    };

    watch(() => bookingInfo.value.adultNumber, (newValue) => {
        setAdultNumber(newValue);
    });

    watch(() => bookingInfo.value.childNumber, (newValue) => {
        setChildNumber(newValue);
    });

    watch(dateFromPicker, () => {
        toggleDatePicker();
    });

</script>
<style lang='scss' scoped>
#booking {
    display: flex;
    justify-content: center;
    padding: 80px 0 0 0;

    #booking_contant {
        width: 600px;
        background-color: white;

        #people_number {
            display: flex;
        }

        #bookDate {
            display: flex;
        }

        #datePickerContainer {
            display: flex;
            justify-content: center;
        }
    }
}

.show {
    display: block;
}
.noshow {
    display: none;
}
</style>
<style>
/* 修改 vuetify component 的 css 要放在沒有 scoped 的 <script> */
#datePicker .v-picker-title,
#datePicker .v-picker__header {
    display: none;
}
</style>
