import React from 'react'
import Card from '../ui/Card';
import classes from "./MeetupDetail.module.css"

const MeetupDetail = (props) => {
    return (
        <Card>
        <section className={classes.detail}>
          <img
            src={props.image}
            alt={props.title}
          />
          <h1>{props.title}</h1>
          <address>{props.address}</address>
          <p>{props.description}</p>
        </section>
        </Card>
      );
}

export default MeetupDetail