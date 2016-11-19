from django.shortcuts import render, HttpResponse, get_object_or_404
from .models import Article, Body

# Create your views here.
def index(request):
	articles = Article.objects.all()
	bodies = Body.objects.all()
	count = Article.objects.all().count()

	context = {
		'count' : count,
		'articles' : articles,
		'bodies' : bodies,
	}
	return render(request, "base.html", context)

def reader(request, article_id):
	article = get_object_or_404(Article, pk=article_id)
	body = article.bodies.all()

	context = {
		"article" : article,
		"body" : body,
	}

	return render(request, "article.html", context)



