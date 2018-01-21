$(document).ready(function () {    
var elem=$('ul');      
$('a.viewswitch').on('click',function(e) {
 if ($(this).hasClass('gridview')) {
  elem.fadeOut(100, function () {
  elem.removeClass('listview').addClass('gridview');
  elem.fadeIn(100);
});      
}
else if($(this).hasClass('listview')) {
  elem.fadeOut(100, function () {
  elem.removeClass('gridview').addClass('listview');
  elem.fadeIn(100);
});        
}
});
});
 
