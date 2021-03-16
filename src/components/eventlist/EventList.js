import React from "react";
import styles from "./EventList.module.scss";
import EventListItem from "../eventlistitem/EventListItem";
import { makeStyles } from "@material-ui/core/styles";



const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120
  },
  selectEmpty: {
    marginTop: theme.spacing(2)
  }
}));

const EventList = ({ events, cartItems }) => {
  const classes = useStyles();

  

  return (
    <div className={styles.container}>
      <div className="row">
        <div className={styles.headerCont}>
          <div className={styles.events}>{events.length} Events</div>
        </div>
      </div>

      <div className={styles.p__grid}>
        {

         events.map((product) => {
              return <EventListItem
                key={product.id}
                event={product}
                cartItems={cartItems}
              />

            })

        }
      </div>
    </div>
  );
};

export default EventList;
