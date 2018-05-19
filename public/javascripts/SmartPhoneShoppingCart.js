$(document).on('click', '.image-next', function(e){
    var thumbnails = $('.thumbnail-image');
    var index = 0;
    var matchedIndex = 0;

    $('.thumbnail-image').each(function(){
        if($('#product-title-image').attr('src') === $(this).attr('src')){
            if(index + 1 === thumbnails.length || index + 1 < 0){
                matchedIndex = 0;
            }else{
                matchedIndex = index + 1;
            }
        }
        index++;
    });
    $('#product-title-image').attr('src', $(thumbnails).eq(matchedIndex).attr('src'));
});

$(document).on('click', '.image-prev', function(e){
    var thumbnails = $('.thumbnail-image');
    var index = 0;
    var matchedIndex = 0;

    $('.thumbnail-image').each(function(){
        if($('#product-title-image').attr('src') === $(this).attr('src')){
            if(index - 1 === thumbnails.length || index - 1 < 0){
                matchedIndex = thumbnails.length - 1;
            }else{
                matchedIndex = index - 1;
            }
        }
        index++;
    });
     $('#product-title-image').attr('src', $(thumbnails).eq(matchedIndex).attr('src'));
});
	
$('.thumbnail-image').on('click', function(){
    $('#product-title-image').attr('src', $(this).attr('src'));
});

$('.qty-btn-minus').on('click', function(){
    $('#product_quantity').val(parseInt($('#product_quantity').val()) - 1);
});

$('.qty-btn-plus').on('click', function(){
    $('#product_quantity').val(parseInt($('#product_quantity').val()) + 1);
});
$('#loginForm').on('click', function(e){
    if(!e.isDefaultPrevented()){
        e.preventDefault();
        $.ajax({
            method: 'POST',
            url: '/users/signin',
            data: {
                username: $('#username').val(),
                password: $('#password').val()
            }
        })
            .done(function(msg){
                showNotification(msg.message, 'success');
                if (msg.url)
                    window.location = msg.url;
            })
            .fail(function(msg){
                showNotification(msg.responseJSON.message, 'danger');
            });
    }
    e.preventDefault();
});
function showNotification(msg, type, reloadPage){
    // defaults to false
    reloadPage = reloadPage || false;

    $('#notify_message').removeClass();
    $('#notify_message').addClass('alert-' + type);
    $('#notify_message').html(msg);
    $('#notify_message').slideDown(600).delay(2500).slideUp(600, function(){
        if(reloadPage === true){
            location.reload();
        }
    });
}
