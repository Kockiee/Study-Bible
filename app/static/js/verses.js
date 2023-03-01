function verifyIfChapterNumDidNotExceedTheLimit() {
    fetch('https://www.abibliadigital.com.br/api/books/' + book_id, {
       headers: {"Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IlR1ZSBKYW4gMjQgMjAyMyAyMToyNToxMyBHTVQrMDAwMC5tZ3VlbGkxMjA4QGdtYWlsLmNvbSIsImlhdCI6MTY3NDU5NTUxM30.ATotDCPYjmzf8nREHCplGpS07sHMgH17yc6PeQVRjgg"}
    })
    .then(response => response.json())
    .then(data => {
        const total_of_chapters = data.chapters
        if(chapter_num > total_of_chapters) {
            getVersesFromChapterNum("https://www.abibliadigital.com.br/api/verses/acf/" + book_id + "/1");
            window.history.replaceState("replace", "replace", "/books/" + book_id + "/1");
        } 
        else if(chapter_num < 1) {
            getVersesFromChapterNum("https://www.abibliadigital.com.br/api/verses/acf/" + book_id + "/" + total_of_chapters);
            window.history.replaceState("replace", "replace", "/books/" + book_id + "/" + total_of_chapters)
        }
    })
    .catch(error => {
        console.error('Erro ao recuperar dados da API:', error);
    });
}

function goToNextChapter() {
    // Add 1 for actualy chapter number
    let new_chapter_num = chapter_num + 1;
    chapter_num = new_chapter_num
    getVersesFromChapterNum("https://www.abibliadigital.com.br/api/verses/acf/" + book_id + "/" + new_chapter_num);
    // Verify if chapters_num did not exceed the limit
    verifyIfChapterNumDidNotExceedTheLimit()
    window.history.replaceState("chapter_num new value", "New value for chapter_num", "/books/" + book_id + "/" + new_chapter_num);
}

function goToPreviousChapter() {
    let new_chapter_num = chapter_num - 1;
    chapter_num = new_chapter_num
    getVersesFromChapterNum("https://www.abibliadigital.com.br/api/verses/acf/" + book_id + "/" + new_chapter_num);
    // Verify if chapters_num did not exceed the limit
    verifyIfChapterNumDidNotExceedTheLimit()
    window.history.replaceState("chapter_num new value", "New value for chapter_num", "/books/" + book_id + "/" + new_chapter_num);
}

function getVersesFromChapterNum(url) {
    fetch(url,  {
        headers: {"Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IlR1ZSBKYW4gMjQgMjAyMyAyMToyNToxMyBHTVQrMDAwMC5tZ3VlbGkxMjA4QGdtYWlsLmNvbSIsImlhdCI6MTY3NDU5NTUxM30.ATotDCPYjmzf8nREHCplGpS07sHMgH17yc6PeQVRjgg"}
    })
    .then(response => response.json())
    .then(data => {
        // Get Verses from chapter
        const verses = data.verses;

        // Chapter that have the verses
        const chaptertitlediv = document.getElementById("chapter-title");
        chaptertitlediv.innerHTML = '<h2>' + data.book.name + ' ' + data.chapter.number + '</h2>';
        
        // Get the verses text
        const verses_div = document.getElementById("verses-div");
        verses_div.innerHTML = '';
        verses.forEach(function(i) {
            const versepdiv = document.createElement("div");
            verses_div.appendChild(versepdiv);
            versepdiv.innerHTML = '<p class="text-white fs-5"><span class="text-secondary fs-4">' + i.number + '</span> ' + i.text + '</p>';
        })
    })
    .catch(error => {
        console.error('Erro ao recuperar dados da API:', error);
    });
}

//-----------------------------------------------------------------------------------------------------------------------------------------------------------//

window.onload = function() {
    if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
        document.getElementById("verses").className = "bg-dark-light d-flex flex-column justify-content-center w-100 align-items-center p-2 rounded-2";
        document.getElementById("chapters").className = "mobile-layout-verses rounded-2 bg-dark-light w-100 p-2 d-flex justify-content-lg-between flex-wrap";
        document.getElementById("div-1").className = "container-sm d-flex flex-column align-items-center w-75 m-0";
        document.getElementById("div-2").className = "container d-flex flex-column align-items-center w-25 h-25 p-0 m-0 me-2 pt-5 mt-2";
    } else {
        document.getElementById("verses").className = "bg-dark-light d-flex flex-column justify-content-center p-3 rounded-2 w-100";
        document.getElementById("chapters").className = "rounded-2 bg-dark-light w-100 p-2 d-flex flex-wrap justify-content-center";
        document.getElementById("div-1").className = "container-sm d-flex flex-column align-items-center w-50 m-0";
        document.getElementById("div-2").className = "container d-flex flex-column align-items-center w-25 h-25 p-0 m-0 pt-5 mt-2";
    }

    // Get Verse from chapter_num
    getVersesFromChapterNum("https://www.abibliadigital.com.br/api/verses/acf/" + book_id + "/" + chapter_num)

    // Get chapters of the current book_id
    const chapters = document.getElementById("chapters")

    fetch('https://www.abibliadigital.com.br/api/books/' + book_id, {
      headers: {"Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IlR1ZSBKYW4gMjQgMjAyMyAyMToyNToxMyBHTVQrMDAwMC5tZ3VlbGkxMjA4QGdtYWlsLmNvbSIsImlhdCI6MTY3NDU5NTUxM30.ATotDCPYjmzf8nREHCplGpS07sHMgH17yc6PeQVRjgg"}
    })
    .then(response => response.json())
    .then(data => {
      const chapters_response = data.chapters;
      const chapters_list = [];

      for (var i = 0; i <= chapters_response; i++) {
        chapters_list.push(i);
      }

      for (var i = 1; i <= chapters_response; i++) {
        const link = document.createElement("a");
        chapters.appendChild(link);
        
        link.innerText = i;

        // Verify the device type and set their styles
        if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
          link.className = "btn btn-primary bg-blue-dark text-white fs-5 m-2 w-100 m-1 d-flex justify-content-center";
        } else {
          link.className = "btn btn-primary bg-blue-dark text-white hover-grow fs-5 m-1 w-10 d-flex justify-content-center";
        }

        const book_abbrev = data.abbrev.pt;
        const chapter_num_context = i;

        link.onclick = () => {
            getVersesFromChapterNum("https://www.abibliadigital.com.br/api/verses/acf/" + book_id + "/" + chapter_num_context);
            window.history.replaceState("chapter_num new value", "New value for chapter_num" ,"/books/" + book_abbrev + "/" + chapter_num_context);
            chapter_num = chapter_num_context
        }
      }
    })
    .catch(error => {
        console.error('Erro ao recuperar dados da API:', error);
    });
}