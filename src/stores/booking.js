import { defineStore } from 'pinia'

export const useBookingStore = defineStore('booking', {
    state: () => ({
        bookingInfo: {
            adultNumber: 2,
            childNumber: 0,
            time: '12:00',
            name: '',
            countryCode: '+886',
            phone: '',
            email: '',
            note: '',
            isSetLocalStorage: false
        },
    }),

    getters: {
    },

    actions: {
        setBookingInfo(newBookingInfo) {
            this.bookingInfo = newBookingInfo;
        },
    },
})