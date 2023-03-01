const txt_search = document.getElementById("txt-search")

function redirectToSearchView() {
    let txt_search_word = txt_search.value;
    if (txt_search_word == "") {
        alert("Digite algo primeiro")
    } else {
        window.location.href = "/search/" + txt_search_word;
    }  
}

txt_search.addEventListener("keydown", function(event) {
    // Verifica se a tecla pressionada foi Enter
    if (event.keyCode === 13) {
        redirectToSearchView()
    }
});