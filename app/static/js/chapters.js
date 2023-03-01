window.onload = function () {
    const chapters = document.getElementById("chapters")
    const title_div_primary = document.getElementById("title-book");

    fetch('https://www.abibliadigital.com.br/api/books/' + book_id, {
      headers: {"Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IlR1ZSBKYW4gMjQgMjAyMyAyMToyNToxMyBHTVQrMDAwMC5tZ3VlbGkxMjA4QGdtYWlsLmNvbSIsImlhdCI6MTY3NDU5NTUxM30.ATotDCPYjmzf8nREHCplGpS07sHMgH17yc6PeQVRjgg"}
    })
    .then(response => response.json())
    .then(data => {

      // Verify Device Type
      if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
        document.getElementById("chapters").className = "rounded-2 bg-dark-light w-100 p-2 d-flex justify-content-center flex-wrap";
      } else {
        document.getElementById("chapters").className = "rounded-2 bg-dark-light w-75 p-2 d-flex flex-wrap justify-content-center";
      }

      // Title of the book and the chapter number
      const title = document.createElement("h2");
      title_div_primary.appendChild(title);
      title.innerText = "Capítulos de " + data.name + ":";

      // Create a list with the chapters of a book
      const chapters_response = data.chapters;
      let chapters_list = [];
      for (var i = 0; i <= chapters_response; i++) {
        chapters_list.push(i);
      }

      // Create a list of the chapters
      for (var i = 1; i <= chapters_response; i++) {
        // Get the actualy chapter in the loop
        let chapter_num = i;

        const link = document.createElement("a");
        chapters.appendChild(link);

        // Verify the device type and set their styles
        if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
          link.className = "btn btn-primary hover-grow bg-blue-dark text-white fs-5 m-2 w-100 m-1";
        } else {
          link.className = "btn btn-primary hover-grow bg-blue-dark text-white fs-5 m-2 w-10";
        }

        link.innerText = chapter_num;
        const book_abbrev = data.abbrev.pt;
        link.href = "/books/" + book_abbrev + "/" + chapter_num
      }
    })
    .catch(error => {
      console.error('Erro ao recuperar dados da API:', error);
    });
}