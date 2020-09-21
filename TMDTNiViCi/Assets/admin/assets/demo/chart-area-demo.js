//// Set new default font family and font color to mimic Bootstrap's default styling
//Chart.defaults.global.defaultFontFamily = '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
//Chart.defaults.global.defaultFontColor = '#292b2c';

//// Area Chart Example
//var ctx = document.getElementById("myAreaChart");
//var myLineChart = new Chart(ctx, {
//  type: 'line',
//  data: {
//    labels: ["Thứ hai", "Thứ ba", "Thứ tư", "Thứ năm", "Thứ sáu", "Thứ bảy", "Chủ nhật"],
//    datasets: [{
//      label: "Sessions",
//      lineTension: 0.3,
//      backgroundColor: "rgba(2,117,216,0.2)",
//      borderColor: "rgba(2,117,216,1)",
//      pointRadius: 5,
//      pointBackgroundColor: "rgba(2,117,216,1)",
//      pointBorderColor: "rgba(255,255,255,0.8)",
//      pointHoverRadius: 5,
//      pointHoverBackgroundColor: "rgba(2,117,216,1)",
//      pointHitRadius: 50,
//      pointBorderWidth: 2,
//      data: [10000, 30162, 26263, 18394, 18287, 28682, 31274],
//    }],
//  },
//  options: {
//    scales: {
//      xAxes: [{
//        time: {
//          unit: 'date'
//        },
//        gridLines: {
//          display: false
//        },
//        ticks: {
//          maxTicksLimit: 7
//        }
//      }],
//      yAxes: [{
//        ticks: {
//          min: 0,
//          max: 50000,
//          maxTicksLimit: 5
//        },
//        gridLines: {
//          color: "rgba(0, 0, 0, .125)",
//        }
//      }],
//    },
//    legend: {
//      display: false
//    }
//  }
//});

var year = moment().year();
var month = moment().month();
var today = 24;
var weekOrder = 1;
var startDate = null, endDate = null;

if (today < 8) {
    startDate = new Date(year, month, 1);
    endDate = new Date(year, month, 7);
} else if (today < 15) {
    weekOrder = 2;
    startDate = new Date(year, month, 8);
    endDate = new Date(year, month, 14);
} else if (today < 22) {
    weekOrder = 3;
    startDate = new Date(year, month, 15);
    endDate = new Date(year, month, 21);
} else {
    weekOrder = 4;
    startDate = new Date(year, month, 22);
    endDate = new Date(year, month + 1, 0);
}

startDate = moment(startDate).format("DD-MM-YYYY");
endDate = moment(endDate).format("DD-MM-YYYY");

Highcharts.chart('myAreaChart', {
    chart: {
        renderTo: 'myAreaChart',
        type: 'column'
    },
    title: {
        text: `Các ngày trong tuần ${weekOrder} từ ${startDate} đến ${endDate}`
    },
    tooltip: {
        shared: true
    },
    xAxis: {
        categories: [
            'Thứ hai',
            'Thứ ba',
            'Thứ tư',
            'Thứ năm',
            'Thứ sáu',
            'Thứ bảy',
            'Chủ nhật'
        ],
        crosshair: true
    },
    yAxis: [{
        title: {
            text: 'Doanh thu'
        },
        max: 1000000000,
        min: 0
    }, {
        title: {
            text: 'Hóa đơn'
        },
        minPadding: 0,
        maxPadding: 0,
        max: 100000,
        min: 0,
        opposite: true,
        labels: {
            format: "{value}"
        }
    }],
    series: [{
        type: 'pareto',
        name: 'Tổng hóa đơn',
        yAxis: 1,
        zIndex: 10,
        data: [50000, 12000, 5000, 75000, 90000, 45000, 75000]
    }, {
        name: 'Doanh thu',
        type: 'column',
        zIndex: 2,
        tooltip: {
            valueSuffix: 'đ'
        },
        data: [50000000, 55000000, 22000000, 11000000, 700000000, 440000000, 510000000]
    }]
});
