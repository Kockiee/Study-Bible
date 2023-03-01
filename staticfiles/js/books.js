window.onload = function() {
  const books = document.getElementById("books");

  // Get a list of all books the bible
  fetch('https://www.abibliadigital.com.br/api/books', {
    headers: {"Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IlR1ZSBKYW4gMjQgMjAyMyAyMToyNToxMyBHTVQrMDAwMC5tZ3VlbGkxMjA4QGdtYWlsLmNvbSIsImlhdCI6MTY3NDU5NTUxM30.ATotDCPYjmzf8nREHCplGpS07sHMgH17yc6PeQVRjgg"}
  })
  .then(response => response.json())
  .then(data => {
    // Does a List of books
    for (var i = 0; i < data.length; i++) {

      // Verify the device type and set their styles
      if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
        document.getElementById("books").className = "mobile-layout-books rounded-2 bg-dark-light w-100 text-center fs-2 p-2";
      } else {
        document.getElementById("books").className = "desktop-layout-books rounded-2 bg-dark-light w-100 text-center fs-5 p-2";
      }

      // Does a List of books with 'a' element
      for (var i = 0; i < data.length; i++) {
        let book_abbrev = data[i].abbrev.pt
        let link_div = document.createElement("div")
        books.appendChild(link_div)
        link_div.innerHTML = '<a class="links-hover d-flex flex-column text-decoration-none" href="/books/' + book_abbrev + '">' + data[i].name + '</a>'
      }
    }
  })
  .catch(error => {
    console.error('Erro ao recuperar dados da API:', error);
  });
}