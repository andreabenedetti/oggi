console.log("ciao")

d3.csv("honeyproduction.csv", function(error, data) {
	if (error) throw error;

	console.log(JSON.stringify(data, null, "\t"));

})