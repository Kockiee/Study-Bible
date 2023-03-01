from django.shortcuts import render, redirect
import requests
import json

# Create your views here.

#Tokens
#------------------------------#
headers_ABD = {"Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IlR1ZSBKYW4gMjQgMjAyMyAyMToyNToxMyBHTVQrMDAwMC5tZ3VlbGkxMjA4QGdtYWlsLmNvbSIsImlhdCI6MTY3NDU5NTUxM30.ATotDCPYjmzf8nREHCplGpS07sHMgH17yc6PeQVRjgg"}
#------------------------------#

def index(request):
    return render(request, 'app/index.html')

def  studies(request):
    return render(request, 'app/studies.html')

def books(request):
    return render(request, 'app/books.html', {'headers_ABD': headers_ABD})

def show_chapters(request, book_id):
    context = {
        'book_id': json.dumps(book_id),
        'headers_ABD': headers_ABD
    }

    return render(request, 'app/chapters.html', context)

def show_verses(request, book_id, chapter_num):
    context = {
        'book_id': json.dumps(book_id),
        'chapter_num': json.dumps(chapter_num),
        'headers_ABD': headers_ABD
    }
    
    return render(request, 'app/verses.html', context)

def search(request):
    view_id = "0"
    context = {
        'view_id': view_id,
    }
    return render(request, 'app/search.html', context)

def search_word(request, search_word):
    view_id = "1"
    context = {
        'search_word': json.dumps(search_word),
        'headers_ABD': headers_ABD,
        'view_id': view_id
    }
    return render(request, 'app/search.html', context)

def handler404(request, exception):
    return render(request, '404.html')