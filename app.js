$(function () {

    var $days = $('#days');

    $.ajax({
        type: 'GET',
        dataType: 'json';
        url: success: function (days) {
            $.each(days, function (i, day) {
                $days.append('<h3>Watering</h3>')
            })
        }
    })
})