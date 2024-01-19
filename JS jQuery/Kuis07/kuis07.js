$(document).ready(function() {
    $('#clickButton').click(function() {
        alert('Tombol diklik!');
    });
});

$(document).ready(function() {
    $('#hoverDiv').hover(function() {
        alert('Mouse hover!');
    });
});

$(document).ready(function() {
    $('#keypressInput').keypress(function() {
        alert('Tombol keyboard ditekan!');
    });
});

$(document).ready(function() {
    $('#dbl').dblclick(function() {
        alert('Tombol Ganda Diklik!');
    });
});

$(document).ready(function() {
    $('#leav').mouseleave(function() {
        alert('Mouse Meninggalkan!');
    });
});