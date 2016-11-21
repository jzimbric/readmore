from __future__ import unicode_literals
import os


from django.db import models
from django.utils import timezone

def get_image_path(instance, filename):
    return os.path.join('photos', str(instance.id), filename)

# Create your models here.
class Article(models.Model):
	title = models.CharField(max_length=200)
	author = models.CharField(max_length=200)
	blurb = models.CharField(max_length=135)
	featured = models.BooleanField()
	subject = models.SlugField(max_length=50)


	def __str__(self):
		return self.title



class Body(models.Model):
	article = models.ForeignKey(Article, related_name="bodies", on_delete=models.CASCADE)
	body = models.TextField()
	lexile = models.IntegerField()

	def __str__(self):
		return self.body

class Chapter(models.Model):
	title = models.CharField(max_length=100)
	author = models.CharField(max_length=100)

	class Meta:
		abstract = True

class Story(Chapter):
	body = models.TextField()





