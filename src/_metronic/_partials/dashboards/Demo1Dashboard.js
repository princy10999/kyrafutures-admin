import React from "react";
// import { Button } from "react-bootstrap";
// import { useHistory } from "react-router-dom";
// import Avatar from "../../../../src/images/7309682.png";

// export function Demo1Dashboard() {
//   const history = useHistory();

//   const data = [
//     {
//       img: Avatar,
//       title: "Kyra futures",
//       subTitle: "SubTitle",
//       buttonText: "Button",
//     },
//   ];
//   return (
//     <>
//       <div className="container">
//         <div className="row">
//           {data?.map((item) => {
//             return (
//               <div className="col-lg-4 col-xxl-4 col-md-4 col-12">
//                 <div className="card">
//                   <img
//                     className="m-auto"
//                     src={item?.img}
//                     alt="Card image cap"
//                     height={'100px'}
//                     width={'100px'}
//                   />
//                   <div className="card-body">
//                     <h5 className="card-title">{item?.title}</h5>
//                     <p className="card-text">{item?.subTitle}</p>
//                     <Button
//                       style={{
//                         background:
//                           " linear-gradient(88.72deg, #3AB5F4 0%, #814EB7 100%)",
//                       }}
//                       type="primary"
//                     >
//                       {item?.buttonText}
//                     </Button>
//                   </div>
//                 </div>
//               </div>
//             );
//           })}
//         </div>
//       </div>
//     </>
//   );
// }

import { Card, CardBody, CardSubtitle, CardTitle } from "reactstrap";
import Chart from "react-apexcharts";

export function Demo1Dashboard() {
  const chartoptions = {
    series: [
      {
        name: "Iphone 13",
        data: [0, 31, 40, 28, 51, 42, 109, 100],
      },
      {
        name: "Oneplue 9",
        data: [0, 11, 32, 45, 32, 34, 52, 41],
      },
    ],
    options: {
      chart: {
        type: "area",
      },
      dataLabels: {
        enabled: false,
      },
      grid: {
        strokeDashArray: 3,
      },

      stroke: {
        curve: "smooth",
        width: 1,
      },
      xaxis: {
        categories: [
          "Jan",
          "Feb",
          "March",
          "April",
          "May",
          "June",
          "July",
          "Aug",
        ],
      },
    },
  };
  return (
    <div className="container">
      <div className="row">
        <div className="col-lg-6 col-md-6 col-12 mt-4">
          <Card>
            <CardBody>
              <CardTitle tag="h5">Sales Summary</CardTitle>
              <CardSubtitle className="text-muted" tag="h6">
                Yearly Sales Report
              </CardSubtitle>
              <Chart
                type="area"
                width="100%"
                height="390"
                options={chartoptions.options}
                series={chartoptions.series}
              ></Chart>
            </CardBody>
          </Card>
        </div>
        <div className="col-lg-6 col-md-6 col-12 mt-4">
          <Card>
            <CardBody>
              <CardTitle tag="h5">Sales Summary</CardTitle>
              <CardSubtitle className="text-muted" tag="h6">
                Yearly Sales Report
              </CardSubtitle>
              <Chart
                type="area"
                width="100%"
                height="390"
                options={chartoptions.options}
                series={chartoptions.series}
              ></Chart>
            </CardBody>
          </Card>
        </div>
        <div className="col-lg-6 col-md-6 col-12 mt-4">
          <Card>
            <CardBody>
              <CardTitle tag="h5">Sales Summary</CardTitle>
              <CardSubtitle className="text-muted" tag="h6">
                Yearly Sales Report
              </CardSubtitle>
              <Chart
                type="area"
                width="100%"
                height="390"
                options={chartoptions.options}
                series={chartoptions.series}
              ></Chart>
            </CardBody>
          </Card>
        </div>
        <div className="col-lg-6 col-md-6 col-12 mt-4">
          <Card>
            <CardBody>
              <CardTitle tag="h5">Sales Summary</CardTitle>
              <CardSubtitle className="text-muted" tag="h6">
                Yearly Sales Report
              </CardSubtitle>
              <Chart
                type="area"
                width="100%"
                height="390"
                options={chartoptions.options}
                series={chartoptions.series}
              ></Chart>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
}
