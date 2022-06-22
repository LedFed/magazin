
// Эфект дыма
const text = document.querySelector('.about_text');

text.innerHTML = text.textContent.replace(/\S/g,'<span>$&</span>');

text.addEventListener('mouseover', function(event){
    if(event.target.tagName != 'SPAN') return;
    event.target.classList.add('active');
});

let btn = document.querySelector('.btn_return');

btn.addEventListener('click', function(event){
    event.target.removeEventListener('active');
});
// 