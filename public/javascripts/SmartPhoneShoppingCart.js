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

$('input[type=date]').on('change', function () {
    if (this.value !== '') {
        this.setAttribute(
            'data-date',
            moment(this.value, 'YYYY-MM-DD').
            format(this.getAttribute('data-date-format'))
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

$('.glyphicon-remove').on('click', removeImage);

$('#uploadForm').submit(function() {
    $("#status").empty().text('Đang tải ảnh lên ...');
    $(this).ajaxSubmit({
        error: function(err, res) {
            $('#status').empty().text(err.responseText);
        },
        success: function(response) {
            if ($('#noImageText').remove().length > 0)
                $('#product-images-list').html('');
            var htmlArray = $(response).find('img');
            var nameList = $('#imagePath').val();
            for (var i=0;i<htmlArray.length;i++) {
                if (nameList.length > 0)
                    nameList += ',';
                nameList += $(htmlArray[i]).attr('src');
            }
            $('#imagePath').val(nameList);
            $('#product-images-list').append(response);
            $('#cancelButton').trigger('click');
            $('.glyphicon-remove').unbind('click');
            $('.glyphicon-remove').on('click', removeImage);
        }
    });
    return false;
});
$('#cancelButton').on('click', function () {
    $('#status').empty();
    $('#filesResult').empty();
    $('#imagesUpload').val(null);
});

function removeImage() {
    var imageName = $(this).closest('.thumbnail-small').find('img').attr('src');
    var imageList = $('#imagePath').val();
    imageList = imageList.replace(imageName, '').replace(',,', ',');
    if (imageList[imageList.length - 1] === ',')
        imageList = imageList.substring(0, imageList.length - 1);
    $('#imagePath').val(imageList);
    this.parentNode.parentNode.remove();
    if (imageList === '')
        $('#product-images-list').append('<h4 id="noImageText" class="text-warning">Chưa có hình ảnh nào cho sản phẩm này</h4>');
}

$('input[type=week]').on('change', function () {
    if (this.value !== '') {
        this.setAttribute(
            'data-date',
            'Tuần ' + moment(this.value, 'YYYY-W').
            format(this.getAttribute('data-date-format'))
        )
    }
}).trigger('change');
$('input[type=month]').on('change', function () {
    if (this.value !== '') {
        this.setAttribute(
            'data-date',
            moment(this.value, 'YYYY-MM').
            format(this.getAttribute('data-date-format'))
        )
    }
}).trigger('change');

$('input[name=startDate]').on('change',function () {
    $('input[name=endDate]').attr('min', this.value);
});
$('input[name=endDate]').on('change',function () {
    $('input[name=startDate]').attr('max', this.value);
});

$('input[name=startWeek]').on('change',function () {
    $('input[name=endWeek]').attr('min', this.value);
});
$('input[name=endWeek]').on('change',function () {
    $('input[name=startWeek]').attr('max', this.value);
});

$('input[name=startMonth]').on('change',function () {
    $('input[name=endMonth]').attr('min', this.value);
});
$('input[name=endMonth]').on('change',function () {
    $('input[name=startMonth]').attr('max', this.value);
});

$(document).ready(function() {
    if (window.location.pathname === '/admin/statistics') {
        $('#quarter').hide();
        $('input[type=week]').hide().prop('required',false);
        $('input[type=month]').hide().prop('required', false);
        $('input[type=number]').hide().prop('required', false);
    }
});


$('#statisticGroupBy').on('change', function () {
    switch (this.value){
        case '1':
            $('#normalStatistic').show();
            $('#quarter').hide();
            $('input[type=date]').show().prop('required',true);
            $('input[type=week]').hide().prop('required',false);
            $('input[type=month]').hide().prop('required',false);
            $('input[type=number]').hide().prop('required',false);
            break;
        case '7':
            $('#normalStatistic').show();
            $('#quarter').hide();
            $('input[type=date]').hide().prop('required',false);
            $('input[type=week]').show().prop('required',true);
            $('input[type=month]').hide().prop('required',false);
            $('input[type=number]').hide().prop('required',false);
            break;
        case '30':
            $('#normalStatistic').show();
            $('#quarter').hide();
            $('input[type=date]').hide().prop('required',false);
            $('input[type=week]').hide().prop('required',false);
            $('input[type=month]').show().prop('required',true);
            $('input[type=number]').hide().prop('required',false);
            break;
        case '365':
            $('#normalStatistic').show();
            $('#quarter').hide();
            $('input[type=date]').hide().prop('required',false);
            $('input[type=week]').hide().prop('required',false);
            $('input[type=month]').hide().prop('required',false);
            $('input[type=number]').show().prop('required',true);
            break;
        case '90':
            $('#normalStatistic').hide();
            $('#quarter').show();
            $('input[type=date]').prop('required',false);
            $('input[type=week]').prop('required',false);
            $('input[type=month]').prop('required',false);
            $('input[type=number]').prop('required',false);
            break;
    }
}).trigger('change');

var chartColors = {
    red: 'rgb(255, 99, 132)',
    orange: 'rgb(255, 159, 64)',
    yellow: 'rgb(255, 205, 86)',
    green: 'rgb(75, 192, 192)',
    blue: 'rgb(54, 162, 235)',
    purple: 'rgb(153, 102, 255)',
    grey: 'rgb(201, 203, 207)'
};

function loadChart(){
    var chartArea = document.getElementById('chart');
    if (chartArea != null && chartArea != undefined){
        chartArea = chartArea.getContext('2d');
        var labelCharts = $('#labelCharts').val().split(',');
        var dataCharts = $('#dataCharts').val().split(',');
        var title = $('#title-chart').val();
        var color = Chart.helpers.color;
        var barChartData = {
            labels: labelCharts,
            datasets: [{
                label: title,
                backgroundColor: color(window.chartColors.red).alpha(1).rgbString(),
                borderColor: window.chartColors.red,
                borderWidth: 1,
                data: dataCharts
            }]
        };
        var barChart = new Chart(chartArea, {
            type: 'bar',
            data: barChartData,
            options: {
                responsive: true,
                legend: {
                    position: 'top',
                },
                title: {
                    display: true,
                    text: 'Biểu đồ thống kê doanh thu'
                }
            }
        });
    }
}

function loadComment(page){
    if ($('.comments-list').html() !== undefined){
        $('.comments-list').html('<div class="col-md-offset-5 loader"></div>');
        var id = $('input[name=productId]').val();
        $.ajax({
            url: '/product/' + id + '/' + page,
            success: function(result){
                $('.comments-list').html(result);
                $('input[name=name]').val('');
                $('textArea[name=comment]').val('');
                $('.pagination li a').on('click', function (e) {
                    if ($(this).attr('class') !== 'disabled'){
                        var page = $(this).attr('href');
                        loadComment(page);
                    }
                    return false;
                });
            },
            error: function (err) {
                console.log(err);
                $('.comments-list').html('<p class="message-error">Đã xảy ra lỗi khi tải bình luận</p>');
            }
        });
    }
}

window.onload = function() {
    loadChart();
    loadComment(1);
    loadSearchForm();
};

$('#comment-post').submit(function() {
    $(this).ajaxSubmit({
        error: function(err) {
            console.log(err);
            alert('Đã xảy ra lỗi. Không đăng được bình luận. Vui lòng thử lại sau');
        },
        success: function(response) {
            console.log(response);
            loadComment(1);
        }
    });
    return false;
});

function loadSearchForm() {
    if ($('.search-form').html() !== undefined){
        $('#slider-range-price').slider({
            range: true,
            min: 1000000,
            max: 50000000,
            values: [ $('#priceStart').val(), $('#priceEnd').val() ],
            slide: function( event, ui ) {
                $('#amountPrice').val(ui.values[0] + ' VNĐ - ' + ui.values[1] + ' VNĐ' );
                $('#priceStart').val(ui.values[0]);
                $('#priceEnd').val(ui.values[1]);
            }
        });
        $('#amountPrice').val($('#slider-range-price').slider( "values", 0) + ' VNĐ' +
            ' - ' + $('#slider-range-price').slider('values', 1 ) + ' VNĐ');

        $('#slider-range-ram').slider({
            range: true,
            min: 1,
            max: 16,
            values: [ $('#detailRamStart').val(), $('#detailRamEnd').val() ],
            slide: function( event, ui ) {
                $('#amountRam').val(ui.values[0] + ' GB - ' + ui.values[1] + ' GB');
                $('#detailRamStart').val(ui.values[0]);
                $('#detailRamEnd').val(ui.values[1]);
            }
        });
        $('#amountRam').val($('#slider-range-ram').slider('values', 0) + ' GB' +
            ' - ' + $('#slider-range-ram').slider( 'values', 1) + ' GB' );

        $( "#slider-range-memory" ).slider({
            range: true,
            min: 1,
            max: 256,
            values: [ $('#detailMemoryStart').val(), $('#detailMemoryEnd').val() ],
            slide: function( event, ui ) {
                $('#amountMemory').val(ui.values[0] + ' GB - ' + ui.values[1] + ' GB');
                $('#detailMemoryStart').val(ui.values[0]);
                $('#detailMemoryEnd').val(ui.values[1]);
            }
        });
        $('#amountMemory').val($('#slider-range-memory').slider('values', 0) + ' GB' +
            ' - ' + $('#slider-range-memory').slider('values', 1 ) + ' GB' );
    }
}