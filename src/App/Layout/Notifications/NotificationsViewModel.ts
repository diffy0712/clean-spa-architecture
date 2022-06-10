import { action, makeObservable, observable } from "mobx";
import Notifier from "../../../System/Models/Notifier";

class NotificationsViewModel {
    @observable
    notifications: string[] = [];

    protected notifier = Notifier;

    constructor() {
        makeObservable(this);
        Notifier.subscribe(this.notify.bind(this));
    }

    dispose() {
        Notifier.unsubscribe(this.notify.bind(this));
    }

    @action
    protected notify(message: string) {
        this.notifications.push(message);
        this.scheduleDeleteNotification(message);
    }

    protected deleteTimeouts: Record<string, ReturnType<typeof setTimeout>> = {};

    protected scheduleDeleteNotification(message: string) {
        this.deleteTimeouts[message] = setTimeout(() => {
            this.deleteNotification(message);
        }, 2000);
    }

    @action
    deleteNotification(message: string) {
        const index = this.notifications.indexOf(message);
        if (index > -1) {
            this.notifications.splice(index, 1);
        }

        clearTimeout(this.deleteTimeouts[message]);
    }
}

export default NotificationsViewModel;