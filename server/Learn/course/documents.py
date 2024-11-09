from django_elasticsearch_dsl import Document, fields
from django_elasticsearch_dsl.registries import registry
from .models import Course 

@registry.register_document
class CourseDocument(Document):
    id = fields.TextField(attr='id')  

    class Index:
        name = 'courses'  # Name of the Elasticsearch index

    class Django:
        model = Course  # The model associated with this Document
        fields = [
            'title',
            'description',
            'category', 
        ]
