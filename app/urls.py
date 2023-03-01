from django.urls import path
from . import views

app_name = 'app'

urlpatterns = [
    path('', views.index, name='index'),
    path('studies/', views.studies, name='studies'),
    path('books/', views.books, name='books'),
    path('books/<str:book_id>', views.show_chapters, name='show_chapters'),
    path('books/<str:book_id>/<int:chapter_num>', views.show_verses, name='show_verses'),
    path('search/', views.search, name='search'),
    path('search/<str:search_word>', views.search_word, name='search_word')
]