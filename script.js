import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-app.js";
import { getDatabase, ref, get } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-database.js";

const firebaseConfig = {
apiKey: "AIzaSyC1ge2doGpievT-1OWjHYHNuZPkEWwrvGk",
  authDomain: "sortyx-dashboard.firebaseapp.com",
  databaseURL: "https://sortyx-dashboard-default-rtdb.firebaseio.com",
  projectId: "sortyx-dashboard",
  storageBucket: "sortyx-dashboard.firebasestorage.app",
  messagingSenderId: "210617994358",
  appId: "1:210617994358:web:1b42ec772783d17a102357",
  measurementId: "G-3XCYZZVZMZ"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);


let bin1 = 24;


get(ref(db, 'bins')).then((snapshot) => {
  if (snapshot.exists()) {
    const data = snapshot.val();
    bin1 = data.bin1 ?? bin1;
  }

var data1 = [
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

var layout1 = {
  width: 300,
  height: 250,
  margin: { t: 25, r: 25, l: 25, b: 25 },
  paper_bgcolor: "white",
  font: { color: "darkblue", family: "Arial" }
};

Plotly.newPlot('myDiv1', data1, layout1);

var barData = [
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
    
var barLayout = {
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

});
