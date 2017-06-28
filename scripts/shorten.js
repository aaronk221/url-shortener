//Send a POST request to our server with the provided URL
$('.btn-shorten').on('click', function(){

  console.log("Made it to the client js");

    $.ajax({

        url: '/new/url',
        type: 'POST',
        dataType: 'JSON',
        data: { url: $('#url-field').val() },
        success: function(data){

            var resultHTML = '<a class="result" href="' + data.shortUrl + '">'
                + data.shortUrl + '</a>';
            $('#link').html(resultHTML);
            $('#link').hide().fadeIn('slow');

        }

    });

});
