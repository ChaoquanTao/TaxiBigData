var gaugeElement = document.getElementsByTagName('canvas')[0];
console.log(gaugeElement)
var t =0
setInterval(function(){
	document.gauges.forEach(function(gauge) {
				gauge.value = Math.random() *
					(gauge.options.maxValue - gauge.options.minValue) +
					gauge.options.minValue;
			});
	// var gauge =document.gauges.get('radial')
	
	// gauge.value = 100;
		
},5000)