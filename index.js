document.addEventListener("input", function(){
    debugger
    let startDateInput = document.querySelector('#start-date').value;
    let endDateInput = document.querySelector('#end-date').value;

    axios
        .get(`https://api.coindesk.com/v1/bpi/historical/close.json?start=${startDateInput}&end=${endDateInput}`)
        // .get("https://api.coindesk.com/v1/bpi/historical/close.json")
        .then((apiResponse) => {
            console.log(apiResponse.data.bpi);
            let bitcoinPriceObject = apiResponse.data.bpi;
            let dates = Object.keys(bitcoinPriceObject);
            let prices = Object.values(bitcoinPriceObject);

            var ctx = document.getElementById('myChart').getContext('2d');
            var myChart = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: dates, //dates go here
                    datasets: [{
                        label: 'Bitcoin Prices Per Day',
                        data: prices, //prices go here
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.2)',
                            'rgba(54, 162, 235, 0.2)',
                            'rgba(255, 206, 86, 0.2)',
                            'rgba(75, 192, 192, 0.2)',
                            'rgba(153, 102, 255, 0.2)',
                            'rgba(255, 159, 64, 0.2)'
                        ],
                        borderColor: [
                            'rgba(255, 99, 132, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(255, 206, 86, 1)',
                            'rgba(75, 192, 192, 1)',
                            'rgba(153, 102, 255, 1)',
                            'rgba(255, 159, 64, 1)'
                        ],
                        borderWidth: 1
                    }]
                },
                options: {
                    scales: {
                        yAxes: [{
                            ticks: {
                                beginAtZero: true
                            }
                        }]
                    }
                }
            });
        })
        .catch((error) => {
            console.log("Error in retrieving API data!");
        });

    //ChartJS Code

});