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

            <div> 用餐日期與時間 </div>
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
                <div> 可預約時段 </div>
                <v-btn @click="openDialog()"> 12:00 </v-btn>

                <v-dialog
                    v-model="isOpenDialog"
                    fullscreen
                >
                    <v-card>
                        <div id="infoContainer">
                            <v-icon 
                                icon="mdi-close" 
                                @click="isOpenDialog = false"
                            />

                            <div id="infoContent">
                                <div id="infoTitle"> 訂位聯絡資訊 </div>
                                訂位人姓名
                                <v-text-field variant="outlined"></v-text-field>
                                訂位人手機號碼
                                <v-text-field variant="outlined"></v-text-field>

                                訂位人 Email
                                <v-text-field variant="outlined"></v-text-field>
                                備註
                                <v-textarea 
                                    variant="outlined"
                                    rows="2"
                                >

                                </v-textarea>
                                <v-checkbox label="將訂位人資訊儲存在此瀏覽器" />
                                <v-checkbox label="按下確認訂位代表我已閱讀並同意服務條款與隱私權條款" />
                                <div>
                                    <v-btn
                                        text="取消"
                                        @click="isOpenDialog = false"
                                    />
                                    <v-btn
                                        text="確認訂位"
                                        @click="isOpenDialog = false"
                                    />
                                </div>
                            </div>
                        </div>
                    </v-card>
                </v-dialog>
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
        adultNumber: 2,
        childNumber: 0,
        time: '12:00',
    });

    // 用餐時間相關
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

    // 訂位顧客資訊dialog
    let isOpenDialog = ref(false);
    const openDialog = () => {
        isOpenDialog.value = true;
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
@import '../assets/main.scss';

#booking {
    @include font-zh;
    display: flex;
    justify-content: center;
    padding: 120px 0 0 0;

    #booking_contant {
        width: 600px;
        padding: 10px;
        background-color: white;
        border-radius: 5px;
        box-shadow: 0 0 15px black;

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

        #bookTime {
            .v-btn {
                margin: 15px;
            }
        }
    }
}


#infoContainer {
    position: relative;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    width: 100%;
    padding: 40px 0 30px 0;

    .v-icon {
        position: absolute;
        top: 15px;
        right: 15px;
        font-size: 30px;
    }

    #infoContent {
        width: 650px;
        padding: 20px 60px;
        border: 1px solid rgb(131, 131, 131);
        border-radius: 5px;

        #infoTitle {
            margin-bottom: 15px;
            font-size: 22px;
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

#people_number .v-select,
#bookDate .v-select {
    width: 250px;
    margin: 15px;
}
</style>
