var chart;

function loadChart () {
    chart = new CanvasJS.Chart("chartContainer", {
		title:{
			text: "My First Chart in CanvasJS"              
		},
		axisX:{
			labelAngle: 270,
		  },
		data: [              
		{
			// Change type to "doughnut", "line", "splineArea", etc.
			type: "column",
			dataPoints: images,
		}
		]
	});
	chart.render();
}
// loadChart();

function loadChartTwo () {
	chart = new CanvasJS.Chart("chartContainerTotals", {
	title:{
		text: "Total Votes"              
	},
	axisX:{
		labelAngle: 270,
		},
	data: [              
	{
		// Change type to "doughnut", "line", "splineArea", etc.
		type: "column",
		dataPoints: votesData,
	}
	]
});
chart.render();
}
// loadChart();