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

$('input[type=date]').on('change', function() {
    if (this.value !== '') {
        this.setAttribute(
            'data-date',
            moment(this.value, 'YYYY-MM-DD')
                .format(this.getAttribute('data-date-format'))
        )
    }
}).trigger('change');

$('#imagesUpload').on('change', function () {
    var listName = '';
    var i = 0;
    for (i ; i < this.files.length; i++) {
        listName += '<p>' + this.files.item(i).name + '</p>';
    }
    $('#filesResult').html(listName);
});

$('#uploadForm').submit(function() {
    $("#status").empty().text("Đang tải ảnh lên ...");
    $(this).ajaxSubmit({
        error: function(err, res) {
            $("#status").empty().text(err.responseText);
        },
        success: function(response) {
            $("#status").empty();
            $("#filesResult").empty();
            $("#imagesUpload").val(null);
            $("#product-images").html(response);
            $('#cancelButton').trigger('click')
        }
    });
    return false;
});