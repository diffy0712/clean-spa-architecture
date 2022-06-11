import Notifier from "../../../System/Models/Notifier";

class NotificationsViewModel {
  protected notifier = Notifier;

  init() {
    this.notifier.notify({
      title: 'View Model mounted',
      type: 'info'
    })
  }

  update() {
    this.notifier.notify({
      title: 'View Model updated',
      type: 'info'
    })
  }

  dispose() {
    this.notifier.notify({
      title: 'View Model disposed',
      type: 'info'
    })
  }

  onMessage() {
    this.notifier.notify({
      title: 'Notification message',
      type: 'success'
    });
  }
}

export default NotificationsViewModel;
