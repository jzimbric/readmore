from django.shortcuts import render, HttpResponse, get_object_or_404, render_to_response
from .models import Article, Body


# Create your views here.
def index(request):
	articles = Article.objects.all()
	bodies = Body.objects.all()
	featured = Article.objects.get(featured=True)
	

	context = {
		'articles' : articles,
		'bodies' : bodies,
		'featured' : featured,
	}
	return render(request, "base.html", context)

def library(request):
	articles = Article.objects.all()
	subjects = array_of_subjects(articles)
	english = subject_to_array(articles, "English")
	history = subject_to_array(articles, "History")
	science = subject_to_array(articles, "Science")
	context = {
	'articles' : articles,
	'science' : science,
	'english' : english,
	'history' : history,
	'subjects' : subjects,
	}

	return render(request, "library.html", context)

def reader(request, article_id):
	article = get_object_or_404(Article, pk=article_id)
	body = article.bodies.all()
	context = {
	'article' : article,
	'body' : body,

	}


	return render(request, "article.html", context)

def search(request):
    query_string = ''
    found_entries = None
    if ('q' in request.GET) and request.GET['q'].strip():
        query_string = request.GET['q']
        
        entry_query = get_query(query_string, ['title', 'author', 'id', 'subject', ])
        
        found_entries = Article.objects.filter(entry_query) 

    return render_to_response('search_results.html',
                          { 'query_string': query_string, 'found_entries': found_entries })



def array_of_subjects(array):
	subjectArray = []
	for i in range(len(array)):
		if array[i].subject in subjectArray:
			pass
		else: subjectArray.append(array[i].subject)
	return subjectArray

def subject_to_array(array, subject):
	subjectArray = []
	for i in range(len(array)):
		if array[i].subject == subject:
			subjectArray.append(array[i])
		else: pass
	return subjectArray


## Search from http://julienphalip.com/post/2825034077/adding-search-to-a-django-site-in-a-snap

import re

from django.db.models import Q

def normalize_query(query_string,
                    findterms=re.compile(r'"([^"]+)"|(\S+)').findall,
                    normspace=re.compile(r'\s{2,}').sub):
    ''' Splits the query string in invidual keywords, getting rid of unecessary spaces
        and grouping quoted words together.
        Example:
        
        >>> normalize_query('  some random  words "with   quotes  " and   spaces')
        ['some', 'random', 'words', 'with quotes', 'and', 'spaces']
    
    '''
    return [normspace(' ', (t[0] or t[1]).strip()) for t in findterms(query_string)] 

def get_query(query_string, search_fields):
    ''' Returns a query, that is a combination of Q objects. That combination
        aims to search keywords within a model by testing the given search fields.
    
    '''
    query = None # Query to search for every search term        
    terms = normalize_query(query_string)
    for term in terms:
        or_query = None # Query to search for a given term in each field
        for field_name in search_fields:
            q = Q(**{"%s__icontains" % field_name: term})
            if or_query is None:
                or_query = q
            else:
                or_query = or_query | q
        if query is None:
            query = or_query
        else:
            query = query & or_query
    return query