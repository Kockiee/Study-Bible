// Utilities functions
function logErrorIfTextInputIsNull() {
    window.alert("Erro:\nO valor digitado é nulo");
    console.log("Error: The text input is null")
}

function logErrorInAPI(exception) {
    window.alert("Erro:\nErro na requisição");
    console.log("Error: Error on return data from API: ", exception)
}

function removeAcent(text) {       
    text = text.toLowerCase();                                                         
    text = text.replace(new RegExp('[ÁÀÂÃ]','gi'), 'a');
    text = text.replace(new RegExp('[ÉÈÊ]','gi'), 'e');
    text = text.replace(new RegExp('[ÍÌÎ]','gi'), 'i');
    text = text.replace(new RegExp('[ÓÒÔÕ]','gi'), 'o');
    text = text.replace(new RegExp('[ÚÙÛ]','gi'), 'u');
    text = text.replace(new RegExp('[Ç]','gi'), 'c')
    text = text.replace(new RegExp('[ª°]','gi'), '');
    return text;             
}

function removeSpecialSymbols(text) {
    text = text.replace(new RegExp('[ª°#*=+-/&$@!^`]','gi'), '');
    return text;
}

function removeSpecialSymbolsAndSpaces(text) {
    text = text.replace(new RegExp('[ª°#*=+-/&$@!^`]','gi'), '');
    text = text.replace(new RegExp(' ','gi'), '');
    return text;
}

function removeAllSpecialCharacters(text) {
    text = text.replace(new RegExp('[ª°#*=+-/&$@!^`]','gi'), '');
    text = text.replace(new RegExp(' ','gi'), '');
    text = text.replace(new RegExp('[ÁÀÂÃ]','gi'), 'a');
    text = text.replace(new RegExp('[ÉÈÊ]','gi'), 'e');
    text = text.replace(new RegExp('[ÍÌÎ]','gi'), 'i');
    text = text.replace(new RegExp('[ÓÒÔÕ]','gi'), 'o');
    text = text.replace(new RegExp('[ÚÙÛ]','gi'), 'u');
    text = text.replace(new RegExp('[Ç]','gi'), 'c')
    return text;
}
//------------------------------------------------------------------------------//

// Get the txt-search element and store in a variable
const txt_search_input = document.getElementById("text-words-input");


// Set the value of the search_word value in the input text if search_word have a value
txt_search_input.value = search_word
        
// Create a list with the possibles words to search
let name_of_books = [];
fetch('https://www.abibliadigital.com.br/api/books', {
  headers: {"Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IlR1ZSBKYW4gMjQgMjAyMyAyMToyNToxMyBHTVQrMDAwMC5tZ3VlbGkxMjA4QGdtYWlsLmNvbSIsImlhdCI6MTY3NDU5NTUxM30.ATotDCPYjmzf8nREHCplGpS07sHMgH17yc6PeQVRjgg"}
})
.then(response => response.json())
.then(data => {
    // Store the possibles words to search on name_of_books list
    for (var i = 0; i < data.length; i++) {
        name_of_books.push(data[i].name);
        name_of_books.push((data[i].name).toLowerCase());
        name_of_books.push(removeAcent(data[i].name));
        name_of_books.push(removeSpecialSymbols(data[i].name));
        name_of_books.push(removeSpecialSymbolsAndSpaces(data[i].name));
        name_of_books.push(removeAllSpecialCharacters(data[i].name));
        name_of_books.push(removeAllSpecialCharacters(data[i].name).toLowerCase());
        name_of_books.push(removeSpecialSymbols(data[i].name).toLowerCase());
        name_of_books.push(removeSpecialSymbolsAndSpaces(data[i].name).toLowerCase());
        name_of_books.push(removeAcent(data[i].name).charAt(0).toUpperCase() + (data[i].name).substring(1));
        name_of_books.push(data[i].abbrev.pt);
        name_of_books.push((data[i].abbrev.pt).toUpperCase());
        name_of_books.push((data[i].abbrev.pt).charAt(0).toUpperCase() + (data[i].abbrev.pt).substring(1));
    }
})
.catch(error => {
    console.log(error);
});

txt_search_input.addEventListener("keydown", function(event) {
    // Verify if the enter key was pressed
    if (event.keyCode === 13) {
        searchWordInBible()
    }
});

function searchWordInBible() {
    // Get the txt_search_input value and store he in a variable
    var txt_search_input_value = txt_search_input.value;

    // Verify if the txt_search_input
    if (txt_search_input_value == "") {
        logErrorIfTextInputIsNull()
    }
    else {
        // Get a list of books with a api of the bible request
        fetch('https://www.abibliadigital.com.br/api/books', {
          headers: {"Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IlR1ZSBKYW4gMjQgMjAyMyAyMToyNToxMyBHTVQrMDAwMC5tZ3VlbGkxMjA4QGdtYWlsLmNvbSIsImlhdCI6MTY3NDU5NTUxM30.ATotDCPYjmzf8nREHCplGpS07sHMgH17yc6PeQVRjgg"}
        })
        .then(response => response.json())
        .then(data => {
            // Create a load spinner
            const content_container = document.getElementById("content-container")
            content_container.innerHTML = ""
            content_container.className = "d-flex justify-content-center flex-column align-items-center rounded-2 bg-dark-light w-75 text-center fs-5 p-2 mb-5"
            content_container.innerHTML = '<div class="spinner-border text-primary" style="width: 4rem; height: 4rem;" role="status"></div><h4 class="text-white-50">Buscando...</h4>'
            
            // Verify if the txt_search_input have a word that stay in the words list
            if (name_of_books.includes(txt_search_input_value)) {
                // Clean the html content of content_container
                content_container.innerHTML = ""

                // Verify the device type and set their styles
                if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
                  content_container.className = "mobile-layout-books rounded-2 bg-dark-light w-100 text-center fs-2 p-2 mb-5";
                } else {
                  content_container.className = "desktop-layout-books rounded-2 bg-dark-light w-75 text-center fs-5 p-2 mb-5";
                }

                // Create a loop to create the books list of the bible
                for (var i = 0; i < data.length; i++) {
                    let book_abbrev = data[i].abbrev.pt
                    let link_div = document.createElement("div")
                    content_container.appendChild(link_div)
                    link_div.innerHTML = '<a class="links-hover d-flex flex-column text-decoration-none" href="/books/' + book_abbrev + '">' + data[i].name + '</a>'
                }
            }
            else {
                // Post data (words that was written in txt_search_input) on api of the bible
                fetch("https://www.abibliadigital.com.br/api/verses/search", {
                    method: "POST",
                    headers: {"Accept": "application/json", "Content-Type": "application/json", "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IlR1ZSBKYW4gMjQgMjAyMyAyMToyNToxMyBHTVQrMDAwMC5tZ3VlbGkxMjA4QGdtYWlsLmNvbSIsImlhdCI6MTY3NDU5NTUxM30.ATotDCPYjmzf8nREHCplGpS07sHMgH17yc6PeQVRjgg"},
                    body: JSON.stringify({
                        "version": "acf",
                        "search": txt_search_input_value.toLowerCase()
                    })
                })
                .then(response => response.json())
                .then(data => {
                    // Set data return limit
                    const limitedData = data.verses.slice(0, 10);

                    // Clean the html content of content_container
                    content_container.innerHTML = ""

                    // Verify the results
                    var versepdiv = document.createElement("div");
                    content_container.appendChild(versepdiv);
                    if (data.verses.length == 0) {
                        versepdiv.innerHTML = '<h2 class="text-white">Nada Encontrado.</h2>'
                    } else {
                        // Verify the device type and set their styles
                        if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
                          content_container.className = "rounded-2 bg-dark-light w-100 fs-2 p-3 mb-5";
                        } else {
                          content_container.className = "rounded-2 bg-dark-light w-75 fs-5 p-3 mb-5";
                        }

                        // Getting verses with the limit
                        const verses = limitedData
                        verses.forEach(function(i) {
                            versepdiv.innerHTML = '<p class="text-white fs-5"><span class="text-secondary fs-4">' + i.number + '</span> ' + i.text + '</p>';
                        })
                    }
                })
                .catch(error => {
                    logErrorInAPI(error)
                });
            }
        })
        .catch(error => {
            logErrorInAPI(error)
        });
    }
}