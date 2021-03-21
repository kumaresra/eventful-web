import React from "react";
import styles from "./EventListItem.module.scss";
import { addProduct, increase } from "../../actions/eventtActions";
import { useDispatch } from "react-redux";
import { format } from "date-fns";


const EventListItem = ({ event }) => {
  const dispatch = useDispatch();


  return (

    <div>

      <div style={{ display: "grid" , gridGap:'10px' }}>
        <div className={styles.card}>
          <div className={styles.city}>{event.name}</div>
          <div className={styles.location}>{event.location}</div>
          <div className={styles.date}>{format(new Date(event.fromDatetime), "yyyy-MM-dd HH:MM a")}</div>
          <div className={styles.weather}>
            <div className={styles.sun}>
              <div className={styles.temp}>5°C</div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default EventListItem;
