var animals = ['bat', 'cat', 'bear', 'lion'];

	
	function renderButtons() { 

		
		$('#buttonsView').empty();

		
		for (var i = 0; i < animals.length; i++) {
			
			var button = $('<button>', {
				text: animals[i],
				class: 'animalButton'
			});

			$('#buttonsView').append(button);
		}

	}

	$('#addAnimal').on('click', function() {
		var value = $('#animal-input').val();
		animals.push(value);
		 $('#animal-input').val("");
		renderButtons();
		return false;
	});

	$(document).on('click', '.animalButton', function() {
		
        var animal = $(this).text();
        var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + animal + "&api_key=dc6zaTOxFJmzC&limit=15";
       $('#animalsView').empty();

       $.ajax({
                url: queryURL,
                method: 'GET'
            })
            .done(function(response) {
               $("body").animate({ scrollTop: $(document).height() }, "slow");
                var results = response.data;
                    for (var i = 0; i < results.length; i++) {
                        
                        var animalDiv = $('<span id="animalDiv">');
                        var p = $('<p id="rating">');
                        p.text("Ratings: " + results[i].rating);
                        var animalImage = $('<img>', {
                        	class: 'animalImage',
                        	attr: { 'data-state': 'active',
                        			'data-still': results[i].images.original_still.url,
                        			'data-animate': results[i].images.original.url,
                        			'src': results[i].images.fixed_width.url
                        		}
                        });
                        
                        $(p).appendTo(animalDiv); // or animalDiv.append(p)
                        $(animalImage).appendTo(animalDiv);

                        $('#animalsView').prepend(animalDiv);
                    }
            });
    });

    $(document).on('click', '.animalImage', function(){
	    var state = $(this).data('state'); // or var state = $(this).attr('data-state');
	    if(state == 'still'){
                $(this).attr('src', $(this).data('animate'));
                $(this).data('state', 'animate');
            }else{
                $(this).attr('src', $(this).data('still'));
                $(this).data('state', 'still');
            }
    });

	renderButtons();