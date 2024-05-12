// Function to process uploaded CSV file
// function processCSV(event) {
//   const file = event.target.files[0];
//   Papa.parse(file, {
//     header: true,
//     dynamicTyping: true,
//     complete: function (results) {
//       const data = results.data;
//       plotData1(data);
//       plotData2(data);
//       generateAnalysis(data);
//     },
//   });
// }

// Base OUTLET UNITS

var customerValue = 50000;
var intervalTime = 2000;

// Dynamic graph - line plot
function plotData1() {
  const ctx = document.getElementById("plot1").getContext("2d");
  const chart = new Chart(ctx, {
    type: "line",
    data: {
      labels: [],
      datasets: [
        {
          label: "Frequency of Purchase",
          data: [],
          backgroundColor: "white",
          borderColor: "red",
          borderWidth: 1,
          fill: false, // Disable fill to see lines more clearly
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
      animation: {
        duration: 0, // Disable animation for immediate updates
      },
    },
  });

  let dataIndex = 0; // Start index for data update

  function updateChart() {
    if (dataIndex < customerValue) {
      // Generating 50 random data points
      const randomCustomerID = "CID" + (Math.floor(Math.random() * 1000) + 1); // Random CustomerID
      const randomFrequency = Math.random(); // Random Frequency between 0 and 1
      chart.data.labels.push(randomCustomerID);
      chart.data.datasets[0].data.push(randomFrequency);
      chart.update();
      generateAnalysis(chart.data); // Call generateAnalysis with updated chart data
      dataIndex++;
    } else {
      clearInterval(interval); // Stop updating when all data is used
    }
  }

  const interval = setInterval(updateChart, intervalTime); // Update every 1 second
}

plotData1(); // Call the function to start updating the chart and analysis

// Dynamic graph for plot 2
function plotData2() {
  const ctx = document.getElementById("plot2").getContext("2d");
  const chart = new Chart(ctx, {
    type: "polarArea",
    data: {
      labels: [],
      datasets: [
        {
          label: "Frequency of Purchase",
          data: [],
          backgroundColor: "#00000059",
          borderColor: "lime",
          borderWidth: 1,
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });

  let dataIndex = 0; // Start index for data update

  function updateChart() {
    if (dataIndex < customerValue) {
      // Generating 50 random data points
      const randomCustomerID = "CID" + (Math.floor(Math.random() * 1000) + 1); // Random CustomerID
      const randomFrequency = Math.random(); // Random Frequency between 0 and 1
      chart.data.labels.push(randomCustomerID);
      chart.data.datasets[0].data.push(randomFrequency);
      chart.update();
      generateAnalysis(chart.data); // Call generateAnalysis with updated chart data
      dataIndex++;
    } else {
      clearInterval(interval); // Stop updating when all data is used
    }
  }

  const interval = setInterval(updateChart, intervalTime); // Update every 1 second
}

plotData2(); // Call the function to start updating the chart and analysis

// Dynamic graph for plot 3
function plotData3() {
  const ctx = document.getElementById("plot3").getContext("2d");
  const chart = new Chart(ctx, {
    type: "radar",
    data: {
      labels: [],
      datasets: [
        {
          label: "Frequency of Purchase",
          data: [],
          backgroundColor: "#f2ff006b",
          borderColor: "black",
          borderWidth: 1,
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });

  let dataIndex = 0; // Start index for data update

  function updateChart() {
    if (dataIndex < customerValue) {
      // Generating 50 random data points
      const randomCustomerID = "CID" + (Math.floor(Math.random() * 1000) + 1); // Random CustomerID
      const randomFrequency = Math.random(); // Random Frequency between 0 and 1
      chart.data.labels.push(randomCustomerID);
      chart.data.datasets[0].data.push(randomFrequency);
      chart.update();
      generateAnalysis(chart.data); // Call generateAnalysis with updated chart data
      dataIndex++;
    } else {
      clearInterval(interval); // Stop updating when all data is used
    }
  }

  const interval = setInterval(updateChart, intervalTime); // Update every 1 second
}

plotData3(); // Call the function to start updating the chart and analysis

// dynamic analysis

function generateAnalysis(chartData) {
  const totalCustomers = chartData.labels.length;

  let totalPurchases = 0;
  const overallPurchases = {};
  chartData.labels.forEach((customerId, index) => {
    const frequency = chartData.datasets[0].data[index];
    if (!isNaN(frequency)) {
      overallPurchases[customerId] = overallPurchases[customerId]
        ? overallPurchases[customerId] + frequency
        : frequency;
      totalPurchases += frequency;
    }
  });

  const customerIds = Object.keys(overallPurchases);
  const maxPurchasedCustomer = customerIds.reduce((a, b) =>
    overallPurchases[a] > overallPurchases[b] ? a : b
  );
  const minPurchasedCustomer = customerIds.reduce((a, b) =>
    overallPurchases[a] < overallPurchases[b] ? a : b
  );
  const averagePurchasedCustomer = totalPurchases / totalCustomers;

  // Find the actual customer ID for maximum and minimum purchased customers
  const maxPurchasedCustomerID = maxPurchasedCustomer;
  const minPurchasedCustomerID = minPurchasedCustomer;

  // Generate analysis report in a table-like structure
  const analysisHTML = `
    <h2>Customer Pulse Analysis</h2>
    <div class="analysis-table">
      <div class="table-row">
        <div class="table-cell title-table">Total Customers Frequency:</div>
        <div class="table-cell value-table">${totalCustomers}</div>
      </div>
      <div class="table-row">
        <div class="table-cell title-table">Total Purchases Frequency:</div>
        <div class="table-cell value-table">${totalPurchases.toFixed(2)}</div>
      </div>
      <div class="table-row">
        <div class="table-cell title-table">Overall Frequency Cheat-Sheet:</div>
        <div class="table-cell value-table">${JSON.stringify(
          overallPurchases
        )}</div>
      </div>
      <div class="table-row">
        <div class="table-cell title-table">High Frequent Customer:</div>
        <div class="table-cell value-table">${maxPurchasedCustomerID}</div>
      </div>
      <div class="table-row">
        <div class="table-cell title-table">Low Frequent Customer:</div>
        <div class="table-cell value-table">${minPurchasedCustomerID}</div>
      </div>
      <div class="table-row">
        <div class="table-cell title-table">Average RFM Value:</div>
        <div class="table-cell value-table">${averagePurchasedCustomer.toFixed(
          2
        )}</div>
      </div>
      <div class="table-row">
        <div class="table-cell title-table">Nominated Customer:</div>
        <div class="table-cell value-table markedResult">${maxPurchasedCustomerID}</div>
      </div>
    </div>
  `;

  document.getElementById("analysis").innerHTML = analysisHTML;
}
