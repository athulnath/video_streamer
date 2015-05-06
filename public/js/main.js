$(document).on('change', '.btn-file :file', function() {

    var input = $(this),
        label = input.val().replace(/\\/g, '/').replace(/.*\//, '');
        $('#videofile').val(label);
});

$(document).ready( function() {
    $('.btn-file :file').on('fileselect', function(event, numFiles, label) {
        console.log(numFiles);
        console.log(label);
    });
});