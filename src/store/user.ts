import { defineStore } from 'pinia';

const useUser = defineStore('user', {
  state: () => {
    return {
      token: '',
      name: '',
      avatar: ''
    }
  },
  actions: {
    getToken() {
      this.token = localStorage.token ? JSON.parse(localStorage.token) : '';

      return this.token;
    }
  }
});

export default useUser;