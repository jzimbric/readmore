from django.contrib import admin
from .models import Article, Body, Story, Chapter

# Register your models here.
class ArticleAdmin(admin.ModelAdmin):
	list_display = ('title', 'subject',"id", "featured" )


class BodyAdmin(admin.ModelAdmin):
	list_display = ("id", 'lexile', 'article')


class StoryAdmin(admin.ModelAdmin):
	list_display = ("title", "author", "body")

admin.site.register(Article, ArticleAdmin)
admin.site.register(Body, BodyAdmin)
admin.site.register(Story, StoryAdmin)