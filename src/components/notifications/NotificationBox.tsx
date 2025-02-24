import { doc, updateDoc } from "firebase/firestore";
import { db } from "firebaseApp";
import { notificationsProps } from "pages/notifications";
import { useNavigate } from "react-router-dom";
import styles from "./Notification.module.scss";

const NotificationBox = ({
  notification,
}: {
  notification: notificationsProps;
}) => {
  const navigate = useNavigate();
  const onClickNotification = async (url: string) => {
    // isRead 업데이트
    const ref = doc(db, "notifications", notification.id);
    await updateDoc(ref, { isRead: true });
    navigate(url);
  };
  return (
    <div className={styles.notification}>
      <div className='' onClick={() => onClickNotification(notification.url)}>
        <div className={styles.notification__flex}>
          <div className={styles.notification__createdAt}>
            {notification.createdAt}
          </div>
          {notification?.isRead === false && (
            <div className={styles.notification__unread}></div>
          )}
        </div>
        <div className={styles.notification__content}>
          {notification?.content}
        </div>
      </div>
    </div>
  );
};

export default NotificationBox;
