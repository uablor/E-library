from django.db import models
from common.models.base_models import Base_model
from apps.accounts.models import User

class Categories(Base_model):
    name = models.CharField(max_length=255)
    description = models.TextField(blank=True)

    def __str__(self):
        return self.name


class BookType(Base_model):
    name = models.CharField(max_length=255)
    description = models.TextField(blank=True)

    def __str__(self):
        return self.name


class BookFiles(Base_model):
    file_url = models.URLField()
    file_type = models.CharField(max_length=50)
    def __str__(self):
        return self.file_url



class Books(Base_model):
    title = models.CharField(max_length=255)
    author = models.CharField(max_length=255)
    isbn = models.CharField(max_length=13)
    publisher = models.CharField(max_length=255)
    publication_date = models.DateField()
    view_count = models.IntegerField(default=0)

    categories_id = models.ForeignKey(Categories, on_delete=models.SET_NULL, null=True)
    book_type_id = models.ForeignKey(BookType, on_delete=models.SET_NULL, null=True)
    book_files_id = models.ManyToManyField(BookFiles, related_name='books', null=True, blank=True)

    image_urls = models.TextField(blank=True)
    description = models.TextField(blank=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    is_delected = models.BooleanField(default=False)
    deleted_at = models.DateTimeField(null=True, blank=True)

    def __str__(self):
        return self.title





class BookScore(Base_model):
    user_id = models.ForeignKey(User, on_delete=models.CASCADE, related_name="book_scores")
    book_id = models.ForeignKey("Books", on_delete=models.CASCADE, related_name="scores")

    comment = models.TextField(blank=True)
    scop_star = models.CharField(max_length=10)

    def __str__(self):
        return f"{self.user.username} - {self.books.title} ({self.scop_star})"



class BookViewHistory(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    book = models.ForeignKey(Books, on_delete=models.CASCADE)
    viewed_at = models.DateField(auto_now_add=True)

    class Meta:
        unique_together = ['user', 'book', 'viewed_at']