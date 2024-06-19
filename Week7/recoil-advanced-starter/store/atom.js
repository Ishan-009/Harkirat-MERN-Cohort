import { atom, selector } from "recoil";

export const networkAtom = atom({
  key: "network",
  default: 101,
});
export const notificationsAtom = atom({
  key: "notifications",
  default: 101,
});
export const jobsAtom = atom({
  key: "jobs",
  default: 101,
});
export const messagingAtom = atom({
  key: "messaging",
  default: 101,
});

export const allNotificationSelector = selector({
  key: "allNotificationSelector",
  get: ({ get }) => {
    const messageNotificationCount = get(messagingAtom);
    const jobsNotificationCount = get(jobsAtom);
    const generalNotificationCount = get(notificationsAtom);
    const networkNotificationCount = get(networkAtom);

    return (
      messageNotificationCount +
      jobsNotificationCount +
      generalNotificationCount +
      networkNotificationCount
    );
  },
});
