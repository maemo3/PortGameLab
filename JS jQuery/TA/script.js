function handleEnter(event) {
    if (event.key === "Enter") {
        event.preventDefault(); // Mencegah perilaku default formulir
        searchBooks();
    }
}


function searchBooks() {
    var searchInput = document.getElementById("searchInput").value;

    // Pemeriksaan apakah input tidak kosong
    if (!searchInput.trim()) {
        showInputWarning();
        return;
    }

    showLoadingAlert();

    var apiUrl = "https://openlibrary.org/search.json?q=" + encodeURIComponent(searchInput);

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            if (data.docs.length > 0) {
                displayBookList(data.docs);
            } else {
                showNoBooksFoundAlert();
            }
        })
        .catch(error => {
            console.error('Error fetching book list:', error);
            showErrorAlert("Error fetching book list");
        });
}

function showInputWarning() {
    Swal.fire({
        icon: 'warning',
        title: 'Input Kosong',
        text: 'Anda belum menginput Judul Buku',
        confirmButtonText: 'OK'
    });
}


// Menampilkan Loading
function showLoadingAlert() {
  Swal.fire({
    title: "Loading...",
    allowOutsideClick: false,
    confirmButton: false,
    onBeforeOpen: () => {
      Swal.showLoading();
    },
    // Menghilangkan Button
    showConfirmButton: false,
  });
}

function displayBookList(bookList) {
  var bookListContainer = document.getElementById("bookList");
  bookListContainer.innerHTML = "";

  bookList.forEach((book) => {
    var bookCard = document.createElement("div");
    bookCard.classList.add("book-card");
    bookCard.innerHTML = `<h2>${book.title}</h2>
                             <p>Author: ${
                               book.author_name
                                 ? book.author_name.join(", ")
                                 : "Unknown"
                             }</p>
                             <p>Published Year: ${
                               book.first_publish_year || "Unknown"
                             }</p>`;

    bookListContainer.appendChild(bookCard);

    // Menambahkan event listener untuk menampilkan lebih banyak informasi saat kartu diklik
    bookCard.addEventListener("click", function () {
      showBookDetails(book);
    });
  });

  Swal.close(); // Menutup SweetAlert setelah menampilkan daftar buku.
}

//Function Alert Not Found
function showNoBooksFoundAlert() {
  Swal.fire({
    icon: "info",
    title: "No Books Found",
    text: "Sorry, no books found for the given search term.",
    confirmButtonText: "OK",
  });
}

function showErrorAlert(message) {
  Swal.fire({
    icon: "error",
    title: "Error",
    text: message,
    confirmButtonText: "OK",
  });
}
// ===============
