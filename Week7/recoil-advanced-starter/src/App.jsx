import { useState } from "react";
import { useRecoilValue, useRecoilState, useSetRecoilState } from "recoil";
import "./index.css";
import {
  notificationsAtom,
  jobsAtom,
  networkAtom,
  messagingAtom,
  allNotificationSelector,
} from "../../react-7-1/src/store/atom";

function App() {
  const notificationValue = useRecoilValue(notificationsAtom);
  const messageValue = useRecoilValue(messagingAtom);
  const networkValue = useRecoilValue(networkAtom);
  const jobsValue = useRecoilValue(jobsAtom);

  const allNotificationSumValue = useRecoilValue(allNotificationSelector);
  return (
    <div>
      <button>Home </button>
      <button>My network({messageValue})</button>
      <button>Jobs({networkValue})</button>
      <button>Messaging({jobsValue})</button>
      <button>Notification({notificationValue})</button>
      <button>Me({allNotificationSumValue})</button>
    </div>
  );
}

export default App;
