from django.db import models

# Create your models here.

class Note(models.Model):
    body = models.TextField(null=True, blank=True)
    updated = models.DateTimeField(auto_now=True) # when the data will be updated
    created = models.DateTimeField(auto_now_add=True) # on the add save

    def __str__(self):
        return self.body[0:50]
