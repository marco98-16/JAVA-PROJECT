window.onload = function(){
	getWeatherByCity("Palermo");
}

$(function(){
	$("#request").submit(function(){
		getWeatherByCity( $("#city").val() );
		return false;
	});

	$("#state-icon").attr( "onerror", "$(this).hide()" );
});

function getWeatherByCity( request ){
	var key = "763c47b4c778a072616e99ffe22cf58b";
	var apiUrl = "https://api.openweathermap.org/data/2.5/weather?appid=" + key + "&units=metric&lang=it&q=";

	$.ajax({
		dataType: "json",
		url: apiUrl + request,
		data: "",
		success: function(){ console.log("Meteoline@> Request Completed") },
		statusCode: {
			400: function(){
				swal({
					title: "Ops..",
					text: "A quanto pare la tua richiesta non è valida. Inserisci una città!",
					icon: "error"
				});
			},

			404: function(){
				swal({
					title: "Non ho capito",
					text: "Non credo esista quella città, prova a digitare meglio!",
					icon: "error"
				});
			}
		}
	});

	$.getJSON( apiUrl + request,  function( data ){
		assign(data);
	});
}

function assign( data ){
	$("#city-name").html( data.name );
	$("#country").html( data.sys.country );
	$("#city-id").html( data.sys.id );

	$("#state-icon").attr( "src", "icons/" + data.weather[0].icon + ".png" );
	$("#state-icon").attr( "title", data.weather[0].main );

	$("#state").html( data.weather[0].description );
	$("#temp").html( data.main.temp + "°C" );

	$("#temp-max").html( data.main.temp_max + "°C" );
	$("#temp-min").html( data.main.temp_min + "°C" );


	var sunrise = new Date( data.sys.sunrise * 1000 ) ;
	var sunset = new Date( data.sys.sunset * 1000 );

	$("#sunrise").html( sunrise.getHours() + ":" + sunrise.getMinutes() + ":" + sunrise.getSeconds() );
	$("#sunset").html( sunset.getHours() + ":" + sunset.getMinutes() + ":" + sunrise.getSeconds() );

	$("#speed").html( data.wind.speed + " m/s" );

}
