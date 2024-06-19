import "./App.css";
import {
  RecoilRoot,
  useRecoilState,
  useRecoilValue,
  useSetRecoilState,
} from "recoil";
import { notifications, totalNotificationSelector } from "./atoms";

function App() {
  return (
    <RecoilRoot>
      <MainApp />
    </RecoilRoot>
  );
}

function MainApp() {
  // const [notificationCount,setNotificationCount] = useRecoilState(notifications);

  const notificationCount = useRecoilValue(notifications);
  const totalNotificationCount = useRecoilValue(totalNotificationSelector);
  return (
    <>
      <button>Home</button>

      <button>
        My network (
        {notificationCount.networks >= 100 ? "99+" : notificationCount.networks}
        )
      </button>
      <button>Jobs {notificationCount.jobs}</button>
      <button>Messaging ({notificationCount.messaging})</button>
      <button>Notifications ({notificationCount.notifications})</button>

      <button>Me ({totalNotificationCount})</button>
    </>
  );
}

export default App;
