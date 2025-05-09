from rest_framework import serializers
from .models import Books, BookScore, Categories, BookType, BookFiles, BookViewHistory
from apps.accounts.models import User
from apps.accounts.serializers import UserSerializer



class BookFilesSerializer(serializers.ModelSerializer):
    class Meta:
        model = BookFiles
        fields = [
            'file_url',
            'file_type',
            'created_at',
            'updated_at',
            'is_delected',
            'deleted_at'
            ]



class CategoriesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Categories
        fields = [
            'id',
            'name',
            'description',
            'created_at',
            'updated_at',
            'is_delected',
            'deleted_at'
            ]



class BookTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = BookType
        fields = [
            'id',
            'name', 
            'description', 
            'created_at', 
            'updated_at', 
            'is_delected', 
            'deleted_at'
            ]



class BookSerializer(serializers.ModelSerializer):
    categories_id = CategoriesSerializer(read_only=True)
    book_type_id = BookTypeSerializer(read_only=True)
    book_files_id = BookFilesSerializer(many=True, read_only=True)
    image_urls = serializers.ListField(child=serializers.URLField(), read_only=True)

    categories = serializers.PrimaryKeyRelatedField(queryset=Categories.objects.all(), write_only=True, source='categories_id')
    book_type = serializers.PrimaryKeyRelatedField(queryset=BookType.objects.all(), write_only=True, source='book_type_id')
    book_files = serializers.PrimaryKeyRelatedField(queryset=BookFiles.objects.all(), write_only=True, source='book_files_id', many=True)

    class Meta:
        model = Books
        fields = [
            'id',
            'title',
            'author',
            'view_count',
            'isbn',
            'publisher',
            'image_urls',
            'description',
            'publication_date',
            'categories_id',
            'book_type_id',
            'book_files_id'
            'categories',
            'book_type',
            'book_files',
            'created_at',
            'updated_at',
            'is_deleted',
            'deleted_at',

        ]

    def create(self, validated_data):
        categories_data = validated_data.pop('categories', None)
        book_type_data = validated_data.pop('book_type', None)
        book_files_data = validated_data.pop('book_files', None)
        
        book = super().create(validated_data)
        
        if categories_data:
            book.categories_id = categories_data
        if book_type_data:
            book.book_type_id = book_type_data

        if book_files_data:
            for file_data in book_files_data:
                book_file = BookFiles.objects.create(**file_data)
                book.book_files_id.add(book_file)
        
        book.save()
        return book

    def update(self, instance, validated_data):
        categories_data = validated_data.pop('categories', None)
        book_type_data = validated_data.pop('book_type', None)
        book_files_data = validated_data.pop('book_files', None)
        
        instance = super().update(instance, validated_data)
        
        if categories_data:
            instance.categories = categories_data
        if book_type_data:
            instance.book_type = book_type_data
        
        if book_files_data:
            for file_data in book_files_data:
                book_file = BookFiles.objects.create(**file_data)
                instance.book_files.add(book_file)
        instance.save()
        return instance



class BookReviewSerializer(serializers.ModelSerializer):
    user_id = User
    class Meta:
        model = BookViewHistory
        fields = [
            'user_id', 
            'comment', 
            'scop_star',
            'created_at', 
            'updated_at', 
            'is_delected', 
            'deleted_at'
            ]



class BookScoreSerializer(serializers.ModelSerializer):

    user_id = UserSerializer(read_only=True)
    user = serializers.PrimaryKeyRelatedField(
        queryset=User.objects.all(), write_only=True, source='user_id'
    )
    book_id = BookSerializer(read_only=True)
    book = serializers.PrimaryKeyRelatedField(
        queryset=Books.objects.all(), write_only=True, source='book_id'
    )
    class Meta:
        model = BookScore
        fields = [
            'id',
            'user_id',
            'user',
            'book_id',
            'book',
            'comment',
            'scop_star',
            'created_at', 
            'updated_at', 
            'is_delected',
            'deleted_at'
            ]
        
        
        
class BookViewHistorySerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    book = BookSerializer(read_only=True)

    class Meta:
        model = BookViewHistory
        fields = ['user', 'book', 'viewed_at']
        read_only_fields = ['viewed_at']
        