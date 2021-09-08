import { makeObservable, observable, computed, action, flow } from "mobx"


export default class Store {
    constructor(userData) {
        makeObservable(this, {
            user: observable,
            fetch: flow
        });
        this.user = userData
    }
    *fetch() {
        const response = yield fetch("")
        this.value = response.json()
    }
}