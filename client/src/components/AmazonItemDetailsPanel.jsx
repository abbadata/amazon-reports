import React from "react";
import Button from "react-bootstrap/Button";
import { Line } from "react-chartjs-2";

const AmazonItemDetailsPanel = ({ itemDetail, clickGetItemDetails }) => {
  let minDate = undefined;
  let history = !itemDetail.data.history
    ? []
    : itemDetail.data.history.map(item => {
      let price = "";
      if (typeof item.price == "string") {
        price = parseInt(item.price) / 100;
      } else {
        price = item.price / 100;
      }
      let dt = item.dt ? item.dt : item.date;
      if (!minDate) {
        minDate = new Date(dt);
      }
      return { x: new Date(dt), y: price };
    });
  const millisInMonth = 2629800000;
  const options = {
    maintainAspectRatio: false,
    legend: { display: false },
    defaultFontSize: 6,
    scales: {
      xAxes: [
        {
          type: "time",
          time: {
            unit: "month"
          }
        }
      ],
      yAxes: [
        {
          scaleLabel: {
            display: true,
            labelString: "Price $"
          },
          type: "linear"
        }
      ]
    }
  };
  const data = {
    labels: [
      new Date(minDate ? minDate.getTime() - millisInMonth : Date.now()),
      new Date(Date.now() + millisInMonth)
    ],
    datasets: [
      {
        label: "Price",
        fill: false,
        lineTension: 0.1,
        backgroundColor: "rgba(75,192,192,0.4)",
        borderColor: "rgba(75,192,192,1)",
        borderCapStyle: "butt",
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: "miter",
        pointBorderColor: "rgba(75,192,192,1)",
        pointBackgroundColor: "#fff",
        pointBorderWidth: 5,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: "rgba(75,192,192,1)",
        pointHoverBorderColor: "rgba(220,220,220,1)",
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: history
      }
    ]
  };

  if (itemDetail.data._id) {
    return (
      <div className="item-panel">
        <div className="item-name">
          <a
            target="_blank"
            rel="noopener noreferrer"
            href={"https://www.amazon.com/Amazon/dp/" + itemDetail.data._id}
          >
            {itemDetail.data.name}
          </a>
        </div>
        <div className="item-asin">ASIN: {itemDetail.data._id}</div>
        <div className="item-min">Min: {itemDetail.data.max}</div>
        <div className="item-max">Max: {itemDetail.data.min}</div>
        <div
          style={{
            width: "600px",
            height: "100px"
          }}
        >
          <Line data={data} width={150} height={50} options={options}></Line>
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <Button
          variant="primary"
          size="sm"
          onClick={() => clickGetItemDetails("B00USAP29Q")}
        >
          Go
        </Button>
        None
      </div>
    );
  }
};

export default AmazonItemDetailsPanel;
