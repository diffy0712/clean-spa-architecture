type NotifierCallback = (message: string) => void;

class Notifier {
    subscribers: (NotifierCallback)[] = [];

    success(message: string): void
    {
        this.subscribers.forEach(subscriber => {
            subscriber(message);
        });
    }

    subscribe(notifier: NotifierCallback) {
        this.subscribers.push(notifier);
    }

    unsubscribe(notifier: NotifierCallback) {
        const index = this.subscribers.indexOf(notifier);
        if (index > -1) {
            this.subscribers.splice(index, 1);
        }
    }
}

export default new Notifier();