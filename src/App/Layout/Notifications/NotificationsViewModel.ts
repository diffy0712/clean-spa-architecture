import { action, makeObservable, observable } from "mobx";
import Notifier, { Notification } from "../../../System/Models/Notifier";

type IDNotification = Notification & { id: number };

class NotificationsViewModel {
    @observable
    notifications: IDNotification[] = [];

    protected notifier = Notifier;

    constructor() {
        makeObservable(this);
        Notifier.subscribe(this.notify.bind(this));
    }

    dispose() {
        Notifier.unsubscribe(this.notify.bind(this));
    }

    @action
    protected notify(notification: Notification) {
        const IDNotification: IDNotification = {
            id: Math.random(),
            ...notification
        };
        this.notifications.push(IDNotification);
        // Since once we pushed the notification it becomes an observer
        // and the method will delete by instance, hence it needs the observer instance
        this.scheduleDeleteNotification(this.notifications[this.notifications.length - 1]);
    }

    protected deleteTimeouts: Record<number, ReturnType<typeof setTimeout>> = {};

    protected scheduleDeleteNotification(notification: IDNotification) {
        this.deleteTimeouts[notification.id] = setTimeout(() => {
            this.deleteNotification(notification);
        }, 2000);
    }

    @action
    deleteNotification(notification: IDNotification) {
        const index = this.notifications.indexOf(notification);
        if (index > -1) {
            this.notifications.splice(index, 1);
        }

        clearTimeout(this.deleteTimeouts[notification.id]);
    }
}

export default NotificationsViewModel;