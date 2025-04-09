from django_elasticsearch_dsl import Document, fields
from django_elasticsearch_dsl.registries import registry
from .models import Course 

@registry.register_document
class CourseDocument(Document):
    id = fields.TextField(attr='id')  

    class Index:
        name = 'courses'  

    class Django:
        model = Course  
        fields = [
            'title',
            'description',
            'category', 
        ]
