var handleLogin = function (){
	//Get form element
	var loginForm = $('#loginForm');
	
	// Add Submit event listener to login for
	loginForm.on('submit', function(e){
		e.preventDefault();
		$(this).parsley({
			errorsWrapper: '<div class="text-danger"></div>',
			errorTemplate: '<span></span>'
		}).validate();
	if($(this).parsley().isValid()){
		//var data = $(this).serialize();
		var data = $(this).serializeArray();
		data = JSON.stringify(data); 
		$.ajax({
			type: "GET",
			url: "data/login.json",
			data: data,
			beforeSend: function(){
				$('.alert').remove();
			},
			success: function(result){
				if(result.isSuccess){
					//korisnik se uspiješno autorizirao
					location.assign("http://localhost:3000/dashboard.html");
			  } else {
					var alertError = alertBox('danger', 'Korisnički podatci su neispravni. Pokušajte ponovno!');
					$('.modal-body').prepend(alertError);
					$('#email').val('');
					$('#password').val('');
				}
			},
			error: function(){
				
			},
			complete: function(){
				setTimeout(function(){
					$('.alert').remove();
				}, 5000);
			}
			
		});
		}
	});
	function alertBox(type, message){
	var html = '';
	html += '<div class="alert alert-' + type + ' fade show" role="alert">'
	html += message;
	html += '</div>';
	
	return html;
}
};


var App = function(){
	return{
		init: function(){
			handleLogin(); // Jedna komponenta //
		}
	}
}(); 