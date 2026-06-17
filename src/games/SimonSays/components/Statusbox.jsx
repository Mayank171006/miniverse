const Statusbox = ({ status, message }) => {
  return <div className={`status-box ${status}`}>{message}</div>;
};
export default Statusbox;
