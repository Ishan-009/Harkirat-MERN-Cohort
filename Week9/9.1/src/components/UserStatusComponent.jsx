import useStatus from "../hooks/useStatus";
function UserStatusComponent() {
  const status = useStatus();

  if (status === true) {
    return <div>ONline yeah</div>;
  } else {
    return <div>Offline off</div>;
  }
}

export default UserStatusComponent;
