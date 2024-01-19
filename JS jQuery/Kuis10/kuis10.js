$('button').click(function() {
    $('.loading-icon').show();
    $('button').attr('disabled', 'disabled');

    $.ajax({
        url: 'https://dog.ceo/api/breeds/image/random',
        type: 'GET',
        success: function(res) {
            setTimeout(() => {
                $('.loading-icon').hide();
                $('button').removeAttr('disabled');
            }, 1200);

            $('img.dog-img').attr('src', res.message);
        }
    });
});