let search = document.querySelector('.header_search');
let head = document.querySelector('header');
let inpit = document.querySelector('#inpit');
let funtional = document.querySelector('.header_functional');

document.querySelector('.menu').addEventListener('change', (e) => {
    event.preventDefault();
    document.querySelector('nav').classList.toggle('table');	  
});
search.addEventListener('click', (e) => {   
    document.querySelector('.wrap').classList.toggle('active');	
    document.querySelector('.search').classList.toggle('active');	
    document.querySelector('nav').classList.toggle('active');	
    head.classList.toggle('hidden');
    inpit.focus();
    
});
if(inpit.focus){
    inpit.onblur = function() {
        document.querySelector('.wrap').classList.remove('active');	
        document.querySelector('.search').classList.remove('active');	
        document.querySelector('nav').classList.remove('active');
        head.classList.remove('hidden');
    };  
    }else{
        search.addEventListener('click', (e) => {   
            document.querySelector('.wrap').classList.toggle('active');	
            document.querySelector('.search').classList.toggle('active');	
            document.querySelector('nav').classList.toggle('active');	
            head.classList.toggle('hidden');
            inpit.focus();
            
        }); 
    }




funtional.addEventListener('click', (e) => {   
  document.querySelector('nav').classList.remove('table');	
  document.querySelector('input[type=checkbox]').checked=false;
});

$(document).ready(function(){
    $("[data-collapse]").on("click", function(event){
        event.preventDefault();
        var $this =  $(this),
        blockid = $this.data('collapse'); 
        $(this).toggleClass("active");
        console.log(this);
        $(blockid).slideToggle(500);    
    });
});