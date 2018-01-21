function ajaxCallStart(){
    $.mobile.loading('show', {
    text: 'foo',
    textVisible: true,
    theme: 'a',
    html: "<div class='newloading'><div class='loadingtable'><div class='loadingcell'><div class='loadingbox'><img src='images/logo_loading.png' /> <br /> <br />Loading...</div></div></div></div>"
  });
}
function ajaxCallStop(){
	  $.mobile.loading( "hide" );
}

function isEmpty(value){
	  return (value == null || value.length === 0);
}

function callRestGet(url, callbackFunctionSuccess, callbackFunctionFailure,
		asynch) {
	ajaxCallStart();
	if (isEmpty(asynch)) {
		asynch = true;
	}

	$.ajax({
		type : 'GET',		
		url : url,
		async : asynch,
		complete : function(result, textStatus) {
			if (result.status === 200) {
				if (callbackFunctionSuccess != null) {
					callbackFunctionSuccess(result);
				}
			} else {
			 	/*if (callbackFunctionFailure != null) {
					callbackFunctionFailure(result, textStatus);
				} else {
					var errorContainer = $('div#retrievalFailure');
					defaultFormErrorHandler(result, errorContainer);
				} */
				alert("Internet Connection Not Available");
			}
		ajaxCallStop();
		}
	});
}

function defaultFormErrorHandler(result, errorContainer,formEle) {
	var errorInfo = {};
	var template = $('#genericErrorTpl').html();
	message = "Internal server error, Please try again.";
	errorInfo['message'] = message;		
	var html = Mustache.to_html(template, errorInfo);
	if (!errorContainer) {
		errorContainer = $('div#error');
	}
	$(errorContainer).html(html);
	$(errorContainer).show();
}

function displayFormSuccess(message) {
	var html = '<ul><li>' + message + '</li></ul>';
	$('#formSuccess').html(html);
}

function setupArticalDetail(){
var url='http://www.foochia.com/mobile/recent_post.php';

document.addEventListener("offline", onOffline, false);
function onOffline() {
	$('body').find('div#offline').show()
	return false;
}
callRestGet(url,
		function(result){
			var data = jQuery.parseJSON(result.responseText);
			articalDetails(data);
		},
		null
	);
}
function articalDetails(data) {
var articles=new Array();
var articleData=new Array();

$.each(data.articles, function( index, article ) {
  var id='article'+index;
  var next=parseInt(index)+1;
  var prv=parseInt(index)-1;
  var idPrv='article'+prv;
  var idNext='article'+next;
  var menuId='menu'+index;
  if(index <5){
  var customObject={'image':article.image,'title':article.title,'date':date,'id':id,'idNext':idNext,'idPrv':idPrv};
  articles.push(customObject);
  }else{
  //Date  added to article page
  var pubDate = new Date(article.published);
  var date = pubDate.getFullYear()+'-'+dateConversion(pubDate.getMonth())+'-'+dateConversion(pubDate.getDate())+' '+dateConversion(pubDate.getHours())+':'+dateConversion(pubDate.getMinutes())+':'+dateConversion(pubDate.getSeconds());
  var customObject={'image':article.image,'title':article.title,'summary':article.summary,'date':date,'id':id};
  articleData.push(customObject);
  }
  article['id']=id;
  article['idNext']=idNext;
  article['menuId']=menuId;
  article['idPrv']=idPrv;
});
var articleSliderData={'articles':articles};
var articleListData={'articles':articleData};
	var sliderTemplate = $('#sliderDivTmp').html();
	var html = Mustache.to_html(sliderTemplate,articleSliderData);
	$('#sliderDiv').html(html);
	var articleListTemplate = $('#articleDivTmp').html();
	var articleListHtml = Mustache.to_html(articleListTemplate,articleListData);
	$('#content').html(articleListHtml);
	var pageDivTemplate = $('#pageDivTmp').html();
	var articleListHtml = Mustache.to_html(pageDivTemplate,data);
	$('body').append(articleListHtml);
	$.mobile.defaultPageTransition = "fade";
	//var swiper = new Swiper('.swiper-container');
(function(d, s, id) {
var js, fjs = d.getElementsByTagName(s)[0];
if (d.getElementById(id)) return;
js = d.createElement(s); js.id = id;
js.src = "//connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.3&appId=279430378757286";
fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));
//var myApp = new Framework7(); 
var swiper = new Swiper('.swiper-container', {
	pagination: '.swiper-pagination',
	paginationClickable: true,
	spaceBetween: 20,
	loop: true
});	


    size_li = $("#content li").size();
    x=10;
    $('#content li:lt('+x+')').attr('style','display: block !important');
	
	
	
    $('#loadMore').click(function () {
		
        x= (x+10 <= size_li) ? x+10 : size_li;
		if(x==size_li){
			$('#loadMore').hide();
			}
        $('#content li:lt('+x+')').attr('style','display: block !important');
    });
    $('#showLess').click(function () {
        x=(x-5<0) ? 3 : x-5;
        $('#content li').not(':lt('+x+')').attr('style','display: none !important');
    });
	
	$('#clickbuttons a').on('click',function(e) {
    if ($(this).hasClass('grid')) {		
        $('#content').removeClass('listview').addClass('gridview');
    }
    else if($(this).hasClass('list')) { 		
        $('#content').removeClass('gridview').addClass('listview');
    }
	else
	{
		alert("false");
	}
   });

$.ajax({
  url: "http://www.foochia.com/mobile/apps-ads.php",
  beforeSend: function( xhr ) {
    xhr.overrideMimeType( "text/plain; charset=x-user-defined" );
  }
}).done(function( data ) {
    $(".adspace").html(data);
  });

// for pause video of a page
$('body').on("click", "a.bkcbtn", function(event) {
	var currentVideo=$(this).closest('div').find('div.itemimg').html();
	$(this).closest('div').find('div.itemimg').empty();
	$(this).closest('div').find('div.itemimg').html(currentVideo);
	$.mobile.changePage( "#home", {
    transition: "slide",
    reverse: false,
    changeHash: false
});

});	
$('body').on("click", "#articalDetails", function(event) {
		var currentId=$(this).data('id');
		var currentDiv=$('body').find('input#currentDiv').val();
		$('body').find('div#'+currentDiv).css('display','none');
		$('body').find("div#"+currentId).css('display','block');
		$('body').find('input#currentDiv').val("7");
		window.scrollTo(500, 0);
		currentDiv=currentId;
	});
}
 
//News
function setupBeautyDetails(){
var url='http://www.foochia.com/mobile/beauty.php';
callRestGet(url,
		function(result){
			var data = jQuery.parseJSON(result.responseText);
			articalDetails(data);
		},
		null
);}




//Sports
function setupSportsDetails(){
var url='http://www.foochia.com/mobile/sports.php';
callRestGet(url,
		function(result){
			var data = jQuery.parseJSON(result.responseText);
			articalDetails(data);
		},
		null
);}

//Entertainment
function setupEntertainmentDetails(){
var url='http://www.foochia.com/mobile/entertainment.php';
callRestGet(url,
		function(result){
			var data = jQuery.parseJSON(result.responseText);
			articalDetails(data);
		},
		null
);}

//Photo Gallery
function setupMultimediaphoto(){
var url='hhttp://www.foochia.com/mobile/photogallery.php';
callRestGet(url,
		function(result){
			var data = jQuery.parseJSON(result.responseText);
			articalDetails(data);
		},
		null
);}

//Video Gallery
function setupMultimedivideo(){
var url='http://www.foochia.com/mobile/video.php';
callRestGet(url,
		function(result){
			var data = jQuery.parseJSON(result.responseText);
			articalDetails(data);
		},
		null
);}


function setupHealthFitnessDetails(){
var url='http://www.foochia.com/mobile/health_fitness.php';
callRestGet(url,
		function(result){
			var data = jQuery.parseJSON(result.responseText);
			articalDetails(data);
		},
		null
);}

function setupWeddingsDetails(){
var url='http://www.foochia.com/mobile/weddings.php';
callRestGet(url,
		function(result){
			var data = jQuery.parseJSON(result.responseText);
			articalDetails(data);
		},
		null
);}

function setupCelebritiesDetails(){
var url='http://www.foochia.com/mobile/celebrities.php';
callRestGet(url,
		function(result){
			var data = jQuery.parseJSON(result.responseText);
			articalDetails(data);
		},
		null
);}
function setupLifeDetails(){
var url='http://www.foochia.com/mobile/life.php';
callRestGet(url,
		function(result){
			var data = jQuery.parseJSON(result.responseText);
			articalDetails(data);
		},
		null
);}
function setupTechnologyDetails(){
var url='http://www.foochia.com/mobile/technology.php';
callRestGet(url,
		function(result){
			var data = jQuery.parseJSON(result.responseText);
			articalDetails(data);
		},
		null
);}
function setupFoochia_kitchenDetails(){
var url='http://www.foochia.com/mobile/foochia_kitchen.php';
callRestGet(url,
		function(result){
			var data = jQuery.parseJSON(result.responseText);
			articalDetails(data);
		},
		null
);}

function setupInteriorsDetails(){
var url='http://www.foochia.com/mobile/interiors.php';
callRestGet(url,
		function(result){
			var data = jQuery.parseJSON(result.responseText);
			articalDetails(data);
		},
		null
);}
function setupShoppingDetails(){
var url='http://www.foochia.com/mobile/shopping.php';
callRestGet(url,
		function(result){
			var data = jQuery.parseJSON(result.responseText);
			articalDetails(data);
		},
		null
);}


//Bug fixed date convertor with formatyyyy-mm-dd hh:mm:ss
function dateConversion(date){
 if(date.toString().length==1){
 return '0'+date;
 } else{
 	return date;
 }}
