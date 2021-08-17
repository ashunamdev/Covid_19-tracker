import React from "react";
import { Card, CardContent, Typography } from "@material-ui/core";
import "./InfoBox.css";

function InfoBox({ title, cases, total, active, isRed, ...props }) {
  console.log(title, active);
  return (
    <Card
      onClick={props.onClick}
      className={`infoBox ${active && "infoBox--selected"} ${
        isRed && "infoBox--red"
      }`}
    >
      <CardContent>
        <Typography color="textSecondary" gutterBottom>
          {title}
        </Typography>
        <h2 className={`infoBox__cases ${!isRed && "infoBox__cases--green"}`}>
          {cases}
        </h2>

        <Typography className="infoBox__total" color="textSecondary">
          {total} Total
        </Typography>
      </CardContent>
    </Card>
  );
}

export default InfoBox;



// import React from 'react'
// import { Card, CardContent,Typography } from '@material-ui/core'

// function InfoBox({ title, cases, total }) {
//     return (
//         <Card className="infoBox">
//             <CardContent>
//                {/*Title ie. CoronaVirusCases */} 
//                 <Typography className="InfoBox__title"color="textSecondary">
//                     {title}
//                 </Typography>
//                {/*120k Number of Cases */} 
//                 <h2 className="InfoBox__cases">{cases}</h2>
//                {/*1.2M Total */} 
//                 <Typography className="InfoBox__total" color="textSecondary">
//                     {total} Total
//                 </Typography>
//             </CardContent>
//         </Card>
//     )
// }

// export default InfoBox