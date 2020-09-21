//// Set new default font family and font color to mimic Bootstrap's default styling
//Chart.defaults.global.defaultFontFamily = '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
//Chart.defaults.global.defaultFontColor = '#292b2c';

//// Bar Chart Example
//var ctx = document.getElementById("myBarChart");
//var myLineChart = new Chart(ctx, {
//  type: 'bar',
//  data: {
//    labels: ["Thứ hai", "Thứ ba", "Thứ tư", "Thứ năm", "Thứ sáu", "Thứ bảy", "Chủ nhật"],
//    datasets: [{
//      label: "Revenue",
//      backgroundColor: "rgba(2,117,216,1)",
//      borderColor: "rgba(2,117,216,1)",
//      data: [4215, 5312, 6251, 7841, 9821, 14984],
//    }],
//  },
//  options: {
//    scales: {
//      xAxes: [{
//        time: {
//          unit: 'month'
//        },
//        gridLines: {
//          display: false
//        },
//        ticks: {
//          maxTicksLimit: 6
//        }
//      }],
//      yAxes: [{
//        ticks: {
//          min: 0,
//          max: 15000,
//          maxTicksLimit: 5
//        },
//        gridLines: {
//          display: true
//        }
//      }],
//    },
//    legend: {
//      display: false
//    }
//  }
//});

// Create the chart
Highcharts.chart('myBarChart', {
    chart: {
        type: 'pie'
    },
    title: {
        text: `Top sản phẩm bán chạy nhất trong hôm nay ${moment().format("DD-MM-YYYY")}`,
        align: 'center',
        x: -10
    },

    accessibility: {
        announceNewData: {
            enabled: true
        },
        point: {
            valueSuffix: ''
        }
    },

    plotOptions: {
        series: {
            dataLabels: {
                enabled: true,
                format: '{point.name}: {point.y:.1f}%'
            }
        }
    },

    tooltip: {
        headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
        pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}%</b> of total<br/>'
    },

    series: [
        {
            colorByPoint: true,
            data: [
                {
                    name: "Chrome",
                    y: 62.74
                },
                {
                    name: "Firefox",
                    y: 10.57
                },
                {
                    name: "Internet Explorer",
                    y: 7.23
                },
                {
                    name: "Safari",
                    y: 5.58
                },
                {
                    name: "Edge",
                    y: 4.02
                },
                {
                    name: "Opera",
                    y: 1.92
                },
                {
                    name: "Other",
                    y: 7.62,
                }
            ]
        }
    ]
});

