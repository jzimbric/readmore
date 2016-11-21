var main = function(){
    var menu = $('.menu');
   // var nav-side-right = $('.right-side-bar');
    var origOffsetY = menu.offset().top;

    function scroll() {
        if ($(window).scrollTop() >= origOffsetY) {
            $('.menu').addClass('sticky');
            $('.right-side-bar').addClass('sticky');
            $('.fluid-container').addClass('menu-padding');
        } else {
            $('.menu').removeClass('sticky');
            $('.right-side-bar').removeClass('sticky');
            $('.fluid-container').removeClass('menu-padding');
        }


    }

    document.onscroll = scroll;

//*******  buttons to change font size
	$('button.font-size--').click(function(){
		console.log('you clicked --!');
		var fontSize = parseInt($('p.lexile-picker').css('font-size'));
    var lineSpace = parseInt($('p.lexile-picker').css('line-height'));
		console.log(fontSize);
    console.log(lineSpace);
		fontSize = fontSize - 2 + "px";
    lineSpace = lineSpace -2 + "px";
		console.log(fontSize);
    console.log(lineSpace);
		$('p.lexile-picker').css({'font-size':fontSize});
    $('p.lexile-picker').css({'line-height':lineSpace})
		
	});

	$('button.font').click(function(){
		console.log('you clicked +!');
		var fontSize = parseInt($('p.lexile-picker').css('font-size'));
    var lineSpace = parseInt($('p.lexile-picker').css('line-height'));
		console.log(fontSize);
		fontSize = fontSize + 2 + "px";
    lineSpace = lineSpace + 2 + "px";
		console.log(fontSize);
		$('p.lexile-picker').css({'font-size':fontSize});
    $('p.lexile-picker').css({'line-height':lineSpace})
	});

//******* buttons to change lexile 
	$('p.lexile-picker').each(function(){
		$(this).hide();
	$('p.lexile-picker').first().show();
	});



	$('button.lexile').click(function(){
		var myID = $(this).attr("id");
		$('p.lexile-picker').each(function(){
			if($(this).attr('id') == myID){
				$('p.lexile-picker').each(function(){
					$(this).hide();
						});
				
				$(this).show();
			} 
		});
	});


// Original JavaScript code by Chirp Internet: www.chirp.com.au
// Please acknowledge use of this code by including this header.




//
// this is the wikiblurb thing i found
//

/*
*
* File: jquery.wikiblurb.js
* Version: 1.0.0
* Description: A simple jQuery plugin to get sections of Wikipedia and other Wikis
* Author: 9bit Studios
* Copyright 2012, 9bit Studios
* http://www.9bitstudios.com
* Free to use and abuse under the MIT license.
* http://www.opensource.org/licenses/mit-license.php
*/

(function ($) {

    $.fn.wikiblurb = function (options) {

        var defaults = $.extend({
      wikiURL: "http://en.wikipedia.org/",
      apiPath: 'w',
      section: 0,
      page: 'Jimi_Hendrix',
      removeLinks: false,     
      type: 'all',
      customSelector: '',
            filterSelector: '', 
            callback: function(){ }
        }, options);
        
  /******************************
  Private Variables
  *******************************/         

  var object = $(this);
  var settings = $.extend(defaults, options);
  
  /******************************
  Public Methods
  *******************************/         
        
        var methods = {
          
      init: function() {
    return this.each(function () {
        methods.appendHTML();
        methods.initializeItems();
    });
      },

      /******************************
      Utilities
      *******************************/      

     addUnderscores: function(page) {
    if(page.trim().indexOf(' ') !== -1) {
                    page.replace(' ', '_');
                }
                return page;
      },            
            
      /******************************
      Append HTML
      *******************************/      

      appendHTML: function() {
    // nothiing to append
      },

      /******************************
      Initialize
      *******************************/      

      initializeItems: function() {
                
                var page = methods.addUnderscores(settings.page);
                
    $.ajax({
        type: "GET",
        url: settings.wikiURL + settings.apiPath + "/api.php?action=parse&format=json&prop=text&section="+settings.section+"&page="+settings.page+"&callback=?",
        contentType: "application/json; charset=utf-8",
        async: true,
        dataType: "json",
        success: function (data, textStatus, jqXHR) {

      try {
          var markup = data.parse.text["*"];
          var blurb = $('<div class="nbs-wikiblurb"></div>').html(markup);

          // remove links?

          if(settings.removeLinks) {
        blurb.find('a').each(function() { 
            $(this).replaceWith($(this).html()); 
        });
          }
          else {
        blurb.find('a').each(function() {
            var link = $(this);
            var relativePath = link.attr('href').substring(1); // remove leading slash
            link.attr('href', settings.wikiURL + relativePath); 
        });         
          }

          // remove any references
          blurb.find('sup').remove();

          // remove cite error
          blurb.find('.mw-ext-cite-error').remove();

        // filter elements
                            if(settings.filterSelector) { 
                                blurb.find(settings.filterSelector).remove(); 
                            }

          switch(settings.type) {
        case 'text':        
            object.html($(blurb).find('p'));
            break;
            
        case 'blurb':
            object.html($(blurb).find('p:first'));
            break;
        
        case 'infobox':
            object.html($(blurb).find('.infobox'));
            break;
            
        case 'custom':
            object.html($(blurb).find(settings.customSelector));
            break;
        
        default:
            object.html(blurb);
            break;
          }
                            
                            settings.callback();
        
      }
      catch(e){
          methods.showError();
      }
      
        },
        error: function (jqXHR, textStatus, errorThrown) {
      methods.showError();
        }
    });
      },
      
      showError: function(){
    object.html('<div class="nbs-wikiblurb-error">There was an error locating your wiki data</div>');
      }

        };
        
        if (methods[options]) { // $("#element").pluginName('methodName', 'arg1', 'arg2');
            return methods[options].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof options === 'object' || !options) {   // $("#element").pluginName({ option: 1, option:2 });
            return methods.init.apply(this);  
        } else {
            $.error( 'Method "' +  method + '" does not exist in wikiblurb plugin!');
        } 
    };

})(jQuery);







//
// this is the hilitor function that i found to highlight words.
//

function Hilitor(id, tag)
{

  var targetNode = document.getElementById(id) || document.body;
  var hiliteTag = tag || "EM";
  var skipTags = new RegExp("^(?:" + hiliteTag + "|SCRIPT|FORM|SPAN)$");
  var colors = ["#ff6", "#a0ffff", "#9f9", "#f99", "#f6f"];
  var wordColor = [];
  var colorIdx = 0;
  var matchRegex = "";
  var openLeft = false;
  var openRight = false;

  this.setMatchType = function(type)
  {
    switch(type)
    {
      case "left":
        this.openLeft = false;
        this.openRight = true;
        break;
      case "right":
        this.openLeft = true;
        this.openRight = false;
        break;
      case "open":
        this.openLeft = this.openRight = true;
        break;
      default:
        this.openLeft = this.openRight = false;
    }
  };

  this.setRegex = function(input)
  {
    input = input.replace(/^[^\w]+|[^\w]+$/g, "").replace(/[^\w'-]+/g, "|");
    input = input.replace(/^\||\|$/g, "");
    if(input) {
      var re = "(" + input + ")";
      if(!this.openLeft) re = "\\b" + re;
      if(!this.openRight) re = re + "\\b";
      matchRegex = new RegExp(re, "i");
      return true;
    }
    return false;
  };

  this.getRegex = function()
  {
    var retval = matchRegex.toString();
    retval = retval.replace(/(^\/(\\b)?|\(|\)|(\\b)?\/i$)/g, "");
    retval = retval.replace(/\|/g, " ");
    return retval;
  };

  // recursively apply word highlighting
  this.hiliteWords = function(node)
  {
    if(node === undefined || !node) return;
    if(!matchRegex) return;
    if(skipTags.test(node.nodeName)) return;

    if(node.hasChildNodes()) {
      for(var i=0; i < node.childNodes.length; i++)
        this.hiliteWords(node.childNodes[i]);
    }
    if(node.nodeType == 3) { // NODE_TEXT
        var nv;
        var regs;
      if((nv = node.nodeValue) && (regs = matchRegex.exec(nv))) {
        if(!wordColor[regs[0].toLowerCase()]) {
          wordColor[regs[0].toLowerCase()] = colors[colorIdx++ % colors.length];
        }

        var match = document.createElement(hiliteTag);
        match.appendChild(document.createTextNode(regs[0]));
        match.style.backgroundColor = wordColor[regs[0].toLowerCase()];
        match.style.fontStyle = "inherit";
        match.style.color = "#000";

        var after = node.splitText(regs.index);
        after.nodeValue = after.nodeValue.substring(regs[0].length);
        node.parentNode.insertBefore(match, after);
      }
    };
  };

  // remove highlighting
  this.remove = function()
  {
    var arr = document.getElementsByTagName(hiliteTag);
    var el;
    while(arr.length && (el = arr[0])) {
      var parent = el.parentNode;
      parent.replaceChild(el.firstChild, el);
      parent.normalize();
    }
  };

  // start highlighting at target node
  this.apply = function(input)
  {
    this.remove();
    if(input === undefined || !input) return;
    if(this.setRegex(input)) {
      this.hiliteWords(targetNode);
    }
  };

}
//
//this is the stuff i made + the 'find word stuff'
//



  var vocabList = [];

    $(".clickable").on("click", function(e){
         var s = window.getSelection();
         var range = s.getRangeAt(0);
         var node = s.anchorNode;
         while(range.toString().indexOf(' ') != 0) {                 
            range.setStart(node,(range.startOffset -1));
         }
         range.setStart(node, range.startOffset +1);
         do{
           range.setEnd(node,range.endOffset + 1);

        }while(range.toString().indexOf(' ') == -1 && range.toString().trim() != '');
        var str = range.toString().trim();
        var myHilitor = new Hilitor(".clickable");
        myHilitor.apply(str);
        var $newWord = $('<p class="vocab"></p>').text(str);
       $(".new-words").append($newWord);
       $newWord.click(function(e){
        $(this).hide();
        vocabList.pop($newWord);
       });
      $(".new-words").append(" ");
        
        vocabList.push($newWord);
        console.log($newWord);
        //console.log(vocabList);
      $("#article").wikiblurb({
        wikiURL: "http://en.wiktionary.org/",
        apiPath: 'w',
        section: 0,
        page: str,
        removeLinks: false,     
        type: 'all',
        customSelector: '',
        callback: function(){ 
            console.log('Data loaded...');
        }


    });
      $("#article2").wikiblurb({
        wikiURL: "http://en.wiktionary.org/",
        apiPath: 'w',
        section: 1,
        page: str,
        removeLinks: false,     
        type: 'all',
        customSelector: '',
        callback: function(){ 
            console.log('Data loaded...');
        }
       

    });
      
       });

 // var clickables = $(".clickable").toArray();
// console.log(clickables);




};

$(document).ready(main);