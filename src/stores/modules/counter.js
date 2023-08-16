import { defineStore } from 'pinia';

export const useCounterStore = defineStore('counter', {
  state: () => ({
    counter: 666
  }),
  getters: {
    doubleCounter(state) {
      return state.counter * 2;
    }
  },
  actions: {
    changeCounter(newValue) {
      this.counter = newValue;
    }
  }
});
