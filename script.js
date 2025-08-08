import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-app.js";
import { getDatabase, ref, get } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyBSQW9I6W4Ld7PzYH6_goV8YBxto8Jr8EU",
  authDomain: "smart-bin-3bbd5.firebaseapp.com",
  databaseURL: "https://smart-bin-3bbd5-default-rtdb.firebaseio.com",
  projectId: "smart-bin-3bbd5",
  storageBucket: "smart-bin-3bbd5.appspot.com",
  messagingSenderId: "462784141488",
  appId: "1:462784141488:web:44ffdb8c61aa483fc54375",
  measurementId: "G-2ER40TLKNK"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

let bin1 = 0;

get(ref(db, 'bin')).then((snapshot) => {
  if (snapshot.exists()) {
    const data = snapshot.val();
    bin1 = data.fillPercent ?? 0;
    const distance = data.distanceCM ?? 0;
    document.getElementById("distanceDisplay").textContent = `Distance = ${distance} cm`;

  } else {
    console.warn("No data found at 'bin' path");
  }

  const data1 = [
    {
      type: "indicator",
      mode: "gauge+number+delta",
      value: bin1,
      title: { text: "Bin Full", font: { size: 24 } },
      delta: { reference: bin1, increasing: { color: "RebeccaPurple" } },
      gauge: {
        axis: { range: [null, 100], tickwidth: 1, tickcolor: "darkblue" },
        bar: { color: "darkblue" },
        bgcolor: "red",
        borderwidth: 2,
        bordercolor: "grey",
        steps: [
          { range: [0, 50], color: "lightgreen" },
          { range: [50, 75], color: "khaki" }
        ],
        threshold: {
          line: { color: "black", width: 4 },
          thickness: 0.75,
          value: 97
        }
      }
    }
  ];

  const layout1 = {
    width: 300,
    height: 250,
    margin: { t: 25, r: 25, l: 25, b: 25 },
    paper_bgcolor: "white",
    font: { color: "darkblue", family: "Arial" }
  };

  Plotly.newPlot('myDiv1', data1, layout1);

  const barData = [
    {
      x: ['Bin'],
      y: [bin1],
      type: 'bar',
      marker: {
        color: 'green'
      },
      width: 0.3  
    }
  ];

  const barLayout = {
    title: 'Bin Full',
    yaxis: {
      range: [0, 100],
      tick0: 0,
      dtick: 10,  
      tickfont: { size: 14 }
    },
    xaxis: {
      tickfont: { size: 14 }
    },
    width: 500,   
    height: 400,  
    paper_bgcolor: "white",
    plot_bgcolor: "white",
    font: { family: "Arial", color: "darkgreen" },
    margin: { t: 40, r: 20, l: 50, b: 20 }
  };

  Plotly.newPlot('barChartDiv', barData, barLayout);
}).catch((error) => {
  console.error("Firebase read failed:", error);
});

const today = new Date();
const dateString = today.toLocaleDateString("en-IN", {
  day: "2-digit",
  month: "short",
  year: "numeric"
});
document.getElementById("dateDisplay").textContent = `Date: ${dateString}`;

