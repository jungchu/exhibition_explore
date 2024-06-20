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
                                <div id="bookInfo">
                                    <div class="bookInfoTitle"> 訂位日期與時間 </div>
                                    <div class="bookInfoText"> {{ `${formatDate}&nbsp;&nbsp;&nbsp;${bookingInfo.time}` }} </div>
                                    <div class="bookInfoTitle"> 位數 </div>
                                    <div class="bookInfoText"> 
                                        <div v-if="bookingInfo.adultNumber">
                                            {{ bookingInfo.adultNumber }} 位大人 
                                        </div>
                                        <div v-if="bookingInfo.childNumber">
                                            {{ bookingInfo.childNumber }} 位小孩 
                                        </div>
                                    </div>
                                </div>
                                <div id="infoTitle"> 訂位聯絡資訊 </div>
                                
                                <div class="infoSubtitle"> 
                                    訂位人姓名 <span class="starSign"> * </span>
                                </div>
                                <v-text-field 
                                    variant="outlined"
                                    :rules="[rules.required, rules.counter]"
                                />

                                <div class="infoSubtitle"> 
                                    手機號碼  <span class="starSign"> * </span>
                                </div>
                                <div id="infoPhone">
                                    <v-select
                                        v-model="bookingInfo.countryCode"
                                        :items="countryCodeList"
                                        item-title="title"
                                        item-value="value"
                                        variant="outlined"
                                    >
                                        <template v-slot:selection="data" >
                                            {{ data.item.value }}
                                        </template>
                                    </v-select>
                                    <v-text-field 
                                        variant="outlined"
                                        :rules="[rules.required, rules.phone, rules.phoneLength]"
                                    />
                                </div>

                                <div class="infoSubtitle"> Email </div>
                                <v-text-field 
                                    variant="outlined"
                                    :rules="[rules.email]"
                                />

                                <div class="infoSubtitle"> 備註 </div>
                                <v-textarea 
                                    variant="outlined"
                                    rows="2"
                                    :rules="[rules.counterTextarea]"
                                />

                                <v-checkbox 
                                    class="infoCheckbox"
                                    label="將訂位人資訊儲存在此瀏覽器" 
                                />
                                <v-checkbox 
                                    class="infoCheckbox"
                                    label="按下確認訂位代表我已閱讀並同意服務條款與隱私權條款" 
                                />
                                <div class="infoBtn">
                                    <v-btn
                                        class="cancelBtn"
                                        text="取消"
                                        @click="isOpenDialog = false"
                                    />
                                    <v-btn
                                        class="confirmBtn"
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
import { computed, onMounted, ref, watch } from 'vue';
import moment from 'moment';

import Toolbar from './toolbar.vue';
import { useBookingStore } from '../stores/booking';
import { get_country_code_ajax } from '../js/utils/data';

    onMounted(() => {
        getCountryCodeList();
    });

    const bookStore = useBookingStore();
    const setAdultNumber = bookStore.setAdultNumber;
    const setChildNumber = bookStore.setChildNumber;

    let bookingInfo = ref({
        adultNumber: 2,
        childNumber: 0,
        time: '12:00',
        bookingName: '',
        countryCode: '+886'
    });

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

    const countryCodeList = ref([]);
    const getCountryCodeList = async() => {
        countryCodeList.value = await get_country_code_ajax();
    };
    // 輸入框驗證規則
    const rules = {
        required: value => !!value || '必填欄位',
        counter: value => value.length <= 20 || '輸入文字請少於20個',
        counterTextarea: value => value.length <= 150 || '輸入文字請少於150個',
        email: value => {
            const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            return pattern.test(value) || 'e-mail 格式有誤'
        },
        phone: value => {
            const pattern = /^09\d{2}-?\d{3}-?\d{3}$|^9\d{2}-?\d{3}-?\d{3}$/
            return pattern.test(value) || '手機格式有誤'
        },
        phoneLength: value => (9 <= value.length && value.length <= 10) || '手機格式有誤',
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
    @include font-zh;
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

        #bookInfo {
            margin: 15px 0 25px 0;

            .bookInfoTitle {
                font-weight: 600;
            }

            .bookInfoText {
                display: flex;
                margin-bottom: 5px;
                color: rgb(90, 90, 90);

                div {
                    margin-right: 20px;
                }
            }
        }

        #infoTitle {
            margin-bottom: 15px;
            font-size: 22px;
            font-weight: 600;
        }

        .infoSubtitle {
            margin-bottom: 5px;
            .starSign {
                color: red;
            }
        }
        
        .infoCheckbox {
            max-height: 40px;
        }

        .infoBtn {
            display: flex;
            justify-content: center;
            margin-top: 25px;

            .v-btn {
                margin: 0 30px;
            }

            .cancelBtn {
                background-color: rgb(226, 226, 226);
            }

            .confirmBtn {
                background-color: rgb(231, 184, 122);
            }
        }

        #infoPhone {
            display: flex;
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
<style lang='scss'>
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
#infoPhone .v-select{
    max-width: 100px;
    margin-right: 10px;
}


#infoContent .v-messages__message {
    text-align: end;
}

</style>
