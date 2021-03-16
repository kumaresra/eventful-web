import React from "react";
import styles from "./EventListItem.module.scss";
import { addProduct, increase } from "../../actions/eventtActions";
import { useDispatch } from "react-redux";



const EventListItem = ({ event, cartItems }) => {
  const dispatch = useDispatch();

  const isInCart = (event) => {
    return !!cartItems.find((item) => item.id === event.id);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.card}>
          <img
            className={styles.top}
            src={event.photoUrl + "?v=" + event.id}
            alt=""
          />

          <div className={styles.temp}>
            <span style={{borderRadius:"50%", border:"solid black 1px",padding:"5px",backgroundColor:"red"}}>{event.temperature}</span>
          </div>
          <div className={styles.bottom}>
            <div className={styles.left}>
              <div className={styles.details}>
                <h3>{event.name}</h3>
              </div>
              <div id="123" className={styles.right}>
                <div>
                  <p>{event.category}</p>
                </div>
              </div>
            </div>

          </div>



        </div>
      </div>
    </div>
  );
};

export default EventListItem;
