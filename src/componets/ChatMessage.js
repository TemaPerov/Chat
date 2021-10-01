import styles from "./ChatMessage.module.css";
import classNames from "classnames";
const ChatMessage = ({ msg, user }) => {

  const myMessBool = msg.uid === user.uid
  const messIng = () => {
    if (msg.photoUrl) {
      return msg.photoUrl;
    } else {
      return "https://socpartnerstvo.org/img/avatar_male.png";
    }
  };

  const timeFunk = (time) => {
    const timeOfMess = new Date(time.seconds * 1000);
    const dateOfMess = `${timeOfMess
      .toLocaleString("en-GB", { hour12: true })
      .replace(/:\d+ /, " ")}`;
    return <p className={classNames(styles.pTime,`${myMessBool ? styles.timeMy: styles.timeChuck}`)}>{dateOfMess}</p>;
  };

 
  return (

    <>
    <div className={classNames(styles.box,`${msg.uid === user.uid ? styles.boxMy: styles.boxChack}`)}>
    {msg.uid === user.uid ? null : (
      <img src={messIng()} className={styles.iconImg} alt="photos" />
    )}
    <p className={classNames( styles.par, `${myMessBool ? styles.parMy: styles.parChack}`)}>{msg.text}</p>
       
  </div>
      {msg.createAt &&  timeFunk(msg.createAt)}
  </>
  );
};

export default ChatMessage;
