$(function () {

    $('.event-form').attr('disabled', true)

    $('#new-event-button').on('click', () => {
        $(':input')
            .not(':button, :submit, :reset, :hidden')
            .val('')
            .prop('checked', false)
            .prop('selected', false);
        $('#new-event-text').text('')
        $('.event-form').attr('disabled', false)
        $('#event-name').focus()
        $('#create-event-button').show()
        $('#new-event-button').hide()
        console.log($('#new-event-button').trigger('log', ['eventStarted', { 'what': 'Started creating event' }]));
    })

    $("#event-end-date").prop("disabled", $("#event-start-date").val() ? false : true)
    startDate = ''
    $("#event-start-date").datetimepicker({
        minDate: '0',
        onChangeDateTime: function () {
            $('#event-start-date').css("border", "1px solid black")
            $('#start-time-error').text("")
            startDate = $("#event-start-date").val()
            $("#event-end-date").prop("disabled", startDate == '' ? true : false)


            if ($("#event-end-date").val() != '') {
                if ($("#event-end-date").val().slice(0, 10) < $("#event-start-date").val().slice(0, 10)) {
                    $("#event-end-date").css("border", "2px solid red")
                    $("#end-time-error").text("End time cannot be before start time")
                    $('#end-time-error').trigger('log', ['errorShown', { 'what': 'End time cannot be before start time' }]);
                }
                else if ($("#event-end-date").val().slice(0, 10) == $("#event-start-date").val().slice(0, 10)) {
                    if ($("#event-end-date").val().slice(11) < $("#event-start-date").val().slice(11)) {
                        $("#event-end-date").css("border", "2px solid red")
                        $("#end-time-error").text("End time cannot be before start time")
                        $('#end-time-error').trigger('log', ['errorShown', { 'what': 'End time cannot be before start time' }]);
                    }
                    else {
                        $("#event-end-date").css("border", "1px solid black")
                        $("#end-time-error").text("")
                        $('#end-time-error').trigger('log', ['errorRemoved', { 'what': 'Legitimate end time chosen' }]);
                    }
                }
                else {
                    $("#event-end-date").css("border", "1px solid black")
                    $("#end-time-error").text("")
                    $('#end-time-error').trigger('log', ['errorRemoved', { 'what': 'Legitimate end time chosen' }]);
                }
            }
        }
    });
    $("#event-end-date").datetimepicker({
        onShow: function () {
            this.setOptions({
                minDate: $('#event-start-date').val() ? $('#event-start-date').val() : false,
                minTime: $('#event-start-date').val().slice(11) ? $('#event-start-date').val() : false,
                formatDate: 'Y-m-d H:i'
            })
        },
        onChangeDateTime: function (dp, $input) {
            $('#event-end-date').css("border", "1px solid black")
            $('#end-time-error').text("")
            if ($("#event-end-date").val().slice(0, 10) < $("#event-start-date").val().slice(0, 10)) {
                $("#event-end-date").css("border", "2px solid red")
                $("#end-time-error").text("End time cannot be before start time")
                $('#end-time-error').trigger('log', ['errorShown', { 'what': 'End time cannot be before start time' }]);
            }
            else if ($("#event-end-date").val().slice(0, 10) == $("#event-start-date").val().slice(0, 10)) {
                if ($("#event-end-date").val().slice(11) < $("#event-start-date").val().slice(11)) {
                    $("#event-end-date").css("border", "2px solid red")
                    $("#end-time-error").text("End time cannot be before start time")
                    $('#end-time-error').trigger('log', ['errorShown', { 'what': 'End time cannot be before start time' }]);
                }
                else {
                    $("#event-end-date").css("border", "1px solid black")
                    $("#end-time-error").text("")
                    $('#end-time-error').trigger('log', ['errorRemoved', { 'what': 'Legitimate end time chosen' }]);
                }
            }
            else {
                $("#event-end-date").css("border", "1px solid black")
                $("#end-time-error").text("")
                $('#end-time-error').trigger('log', ['errorRemoved', { 'what': 'Legitimate end time chosen' }]);
            }
        }
    });
    $("#all-day-event-date").datetimepicker({
        timepicker: false,
        minDate: '0',
        onChangeDateTime: function (dp, $input) {
            var datetime = $input.val();
            var date = datetime.split(" ")[0];
            $input.val(date);
        }
    });
    $("#recurrent-event-end-date").datetimepicker({
        minDate: '0'
    });

    $('#all-day-event-checkbox').change(function () {
        if (this.checked) {
            showAllDayEventOptions();
        } else {
            hideAllDayEventOptions();
        }
    });

    $('#recurrent-event-type-selector').change(function () {
        var val = $("#recurrent-event-type-selector option:selected").val();
        hideRecurrentEventOptions();
        hideRecurrentEventDetails();

        if (val == "custom") {
            showRecurrentEventOptions();
        } else {
            resetAllRecurrentEventDetails();
        }

        if (val == ("none")) {
            hideRecurrentEventEndDetails();
        } else {
            showRecurrentEventEndDetails();
        }
    });

    $('#recurrent-event-time-selector').change(function () {
        var val = $("#recurrent-event-time-selector option:selected").val();
        hideRecurrentEventDetails();

        if (val == "daily") {
            $('#daily-recurrent-details').show();
        } else if (val == "weekly") {
            $('#weekly-recurrent-details').show();
        } else if (val == "monthly") {
            $('#monthly-recurrent-details').show();
        } else if (val == "yearly") {
            $('#yearly-recurrent-details').show();
        }
    });

    $('input[type=text]').focus(function () {
        $(this).select();
    });
});

// Functions to reset recurrent event interface
function hideRecurrentEventDetails() {
    $('#daily-recurrent-details').hide();
    $('#weekly-recurrent-details').hide();
    $('#monthly-recurrent-details').hide();
    $('#yearly-recurrent-details').hide();
}
function hideRecurrentEventOptions() {
    $('#recurrent-event-details-line').hide();
    $('#recurrent-event-details').hide();
}
function showRecurrentEventOptions() {
    $('#recurrent-event-details-line').show();
    $('#recurrent-event-details').show();
    $('#daily-recurrent-details').show();
}
function resetAllRecurrentEventDetails() {
    $('#recurrent-event-time-selector').val('daily');
    $('.weekday-checkbox').prop('checked', false);
    $('.day-checkbox').prop('checked', false);
    $('.month-checkbox').prop('checked', false);
}
function showAllDayEventOptions() {
    $('#start-time-row').hide();
    $('#end-time-row').hide();
    $('#all-day-event-row').show();
}
function hideAllDayEventOptions() {
    $('#all-day-event-row').hide();
    $('#start-time-row').show();
    $('#end-time-row').show();
    $('#all-day-event-date').val('');
}
function showRecurrentEventEndDetails() {
    $('#recurrent-event-end-date-row').show();
}
function hideRecurrentEventEndDetails() {
    $('#recurrent-event-end-date-row').hide();
    $('#recurrent-event-end-date').val('');
}

// hacky way to get the button to accommodate size of hidden divs in Safari
function hideAndShowCreateEventButtom() {
    $('#create-event-button').hide();
    $('#create-event-button').show();
}