import { defineStore } from 'pinia'

export const useBookingStore = defineStore('booking', {
    state: () => ({
        adultNumber: 1,
        childNumber:0,
        isAdmin: true,
    }),

    getters: {
    },

    actions: {
        setAdultNumber(newAdultNumber) {
            this.adultNumber = newAdultNumber;
        },

        setChildNumber(newChildNumber) {
            this.childNumber = newChildNumber;
        },
    },
})