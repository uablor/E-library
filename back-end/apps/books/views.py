from rest_framework import viewsets
from .models import Books, BookScore, BookType, BookFiles, Categories, BookViewHistory
from .serializers import (
    BookSerializer,
    CategoriesSerializer,
    BookTypeSerializer,
    BookFilesSerializer,
    BookViewHistorySerializer,
    BookScoreSerializer,
    )
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import BookScore
from common.mixins.SoftDeleteMixin import SoftDeleteMixin

from django.utils import timezone
from django.db import IntegrityError



class BookViewSet(SoftDeleteMixin, viewsets.ModelViewSet):
    queryset = Books.objects.all()
    serializer_class = BookSerializer
    
    def retrieve(self, request, *args, **kwargs):
        book = self.get_object()
        user = request.user

        today = timezone.now().date()
        viewed_today = BookViewHistory.objects.filter(user=user, book=book, viewed_at=today).exists()

        if not viewed_today:
            book.view_count += 1
            book.save()

            try:
                BookViewHistory.objects.create(user=user, book=book, viewed_at=today)
            except IntegrityError:
                return Response({'message': 'You can only view the book once per day.'}, status=status.HTTP_400_BAD_REQUEST)

        serializer = self.get_serializer(book)
        return Response(serializer.data)



class CetagoriesViewSet(SoftDeleteMixin, viewsets.ModelViewSet):
    queryset = Categories.objects.all()
    serializer_class = CategoriesSerializer
    
    
    
class BooktypeViewSet(SoftDeleteMixin, viewsets.ModelViewSet):
    queryset = BookType.objects.all()
    serializer_class = BookTypeSerializer
    
    
    
class BookFilesViewSet(SoftDeleteMixin, viewsets.ModelViewSet):
    queryset = BookFiles.objects.all()
    serializer_class = BookFilesSerializer



class BookScoreViewSet(viewsets.ModelViewSet):
    queryset = BookScore.objects.all()
    serializer_class = BookScoreSerializer

    # Optional: To filter by specific book or user
    def get_queryset(self):
        book_id = self.kwargs.get('book_id')
        if book_id:
            return BookScore.objects.filter(books_id=book_id)
        return super().get_queryset()

class BookScoreAPIView(APIView):
    serializer_class = BookScoreSerializer
    def post(self, request, book_id):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            # Set the book for this score
            serializer.save(books_id=book_id)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    
    
    
class BookHistoryViewSet(viewsets.ModelViewSet):
    queryset = BookViewHistory.objects.all()
    serializer_class = BookViewHistorySerializer
