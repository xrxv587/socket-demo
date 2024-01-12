import { defineStore } from "pinia";

export const useSocketStore = defineStore("socketStore", {
	state: () => ({
		instance: null
	}),
	actions: {
		setInstance(socketInstance: any) {
			this.instance = socketInstance;
		}
	}
})