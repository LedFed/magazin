
$(document).ready(function(){
  $("[data-slider]").slick({
    isFinite:false,
    fade:false,
    slideToShow:1,
    slideToScroll:1,
    arrows:false,
    dots:true,
    autoplay:true,
    autoplaySpeed:5000
  });
  $("[data-slid]").slick({
    arrows:false,
    dots:true,
  })
  $("[data-collapse]").on("click", function(event){
    event.preventDefault();
    var $this =  $(this),
      blockid = $this.data('collapse'); 
      $(this).toggleClass("active");
      console.log(this);
    $(blockid).slideToggle(500);    
});
});

