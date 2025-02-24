import NotificationBox from "components/notifications/NotificationBox";
import AuthContext from "context/AuthContext";
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { db } from "firebaseApp";
import useTranslation from "hooks/useTranslation";
import { useContext, useEffect, useState } from "react";

export interface notificationsProps {
  id: string;
  uid: string;
  url: string;
  isRead: boolean;
  content: string;
  createdAt: string;
}
const NotificationsPage = () => {
  const { user } = useContext(AuthContext);
  const [notifications, setNotifications] = useState<notificationsProps[]>([]);

  const t = useTranslation();

  useEffect(() => {
    if (user) {
      let ref = collection(db, "notifications");
      let notificationQuery = query(
        ref,
        where("uid", "==", user?.uid),
        orderBy("createdAt", "desc")
      );

      onSnapshot(notificationQuery, (snapShot) => {
        let dataObj = snapShot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setNotifications(dataObj as notificationsProps[]);
      });
    }
  }, [user]);

  return (
    <div className='home'>
      <div className='home__top'>
        <div className='home__title'>
          <div className='home__title-text'>{t("MENU_NOTI")}</div>
        </div>
      </div>
      <div className='post'>
        {notifications?.length > 0 ? (
          notifications?.map((noti) => (
            <NotificationBox notification={noti} key={noti.id} />
          ))
        ) : (
          <div className='post__no-posts'>
            <div className='post__text'>{t("NO_NOTIFICATIONS")}</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationsPage;
