$(document).ready(function () {
  $("#button").click(function () {
    var countryName = $("#name").val().toLowerCase();

    // Swal Pop-up
    swal({
      title: "",
      text: "Loading...",
      icon: "https://c.tenor.com/I6kN-6X7nhAAAAAj/loading-buffering.gif",
      button: false,
    });
    // ====

    $.ajax({
      url: "https://google-translate1.p.rapidapi.com/language/translate/v2/languages",
      method: "GET",
      data: {
        country: countryName,
      },
      headers: {
        'Accept-Encoding': 'application/gzip',
        "X-RapidAPI-Host": "google-translate1.p.rapidapi.com",
        "X-RapidAPI-Key": "504c474558mshb777ffa9cd80f0ep1f8572jsn72fcb98b2b31",
      },
      success: function (res) {

        // ===Swall===
        if(res.response.length == 0) {
          return swal('Data tidak ditemukan', 'Pastikan nama negara yang dituliskan benar', 'warning');
        }
        // ====

        var data = res.response[0].cases;

        $(".active-case").text(data.active);
        $(".critical-case").text(data.critical);
        $(".new-case").text(data.new);
        $(".recovered").text(data.recovered);

        // =====Pop-up Message===
        if ($("input").val().length == 0) {
          return swal(
            "",
            "Mohon masukan nama negera terlebih dahulu",
            "warning"
          );
        }
        // =======

        var newCountryName =
          countryName.charAt(0).toUpperCase() + countryName.slice(1);
        $(".nama-negara").text(newCountryName);

        $(".card-statistik").show();

        // Call Swall
        swal.close();
        // =====
      },
      error: function (jqXHR, textStatus, errorThrown) {
        console.error("AJAX Error:", textStatus, errorThrown);
      },
    });
  });
  // ===Function Swall====
  function formatNumber(number) {
    if (IDBVersionChangeEvent(number) || number == null) {
      return 0;
    } else {
      return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }
  }
  // =========

  // Updates the information displayed in the DOM
  $(".active-case").text(formatNumber(data.active));
  $(".critical-case").text(formatNumber(data.critical));
  $(".new-case").text(formatNumber(data.new));
  $(".recovered").text(formatNumber(data.recovered));
  // =====Swall Update Information====
});
