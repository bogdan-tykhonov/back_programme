document.addEventListener('DOMContentLoaded', function(){
const slideOffset = window.innerWidth > 768 ? 550 : 405;
    
$('a[href*=\\#]').on('click', function(event){     
  event.preventDefault();
  $('html,body').animate({scrollTop:$(this.hash).offset().top - 100}, 500);
});

  function setHeightData(){
    const questions = document.querySelectorAll('.question');
    questions.forEach(question => {
        question.querySelector('.wrapper').addEventListener('click', toggle);
        const answer = question.querySelector('.answer');
        const currHeight = answer.offsetHeight;
        answer.setAttribute('data-height', currHeight);
        answer.style.height = '0px';
        answer.classList.add('close');
    })
  };

  setHeightData();

  function toggle(){
    const answer = this.closest('.question').querySelector('.answer');
    if(answer.classList.contains('close')){
        answer.classList.remove('close');
        this.querySelector('h1').textContent = '-';
        currHeight = answer.getAttribute('data-height');
        answer.style.height = `${currHeight}px`;
    }else{
        this.querySelector('h1').textContent = '+';
        answer.classList.add('close');
        answer.style.height = '0px';
    }
  };

  document.querySelector('#next').addEventListener('click', sliderNext);
  document.querySelector('#prev').addEventListener('click', slidePrev);

  function changeActiveSlide(side){
        const currActive = $('.comments-slider .active');
        let newActive;
        if(side == 'right'){
          newActive = $('.comments-slider .active').next();
          $(newActive).css({'right':'0', 'z-index': '0'});
        setTimeout(function(){
            (newActive).css({"right":'initial'});
        }, 600);
        }else if(side == 'left'){
          newActive = $('.comments-slider .active').prev();
          $(newActive).css({"left":'0', 'z-index': '0'});
        setTimeout(function(){
            (newActive).css({"left":'initial'});
        }, 600);
        };

        $(newActive).addClass('active');
        $(currActive).removeClass('active');   
        $(currActive).css('transform', 'scale(0.7)');
        $(newActive).css('transform', 'scale(1)');
        giveSlidesPosition();
        activeDot();
  }

  function sliderNext(){
      let max = $('.comments-slider .comment').length - 2;
      max = max * slideOffset;
      const currPos = $('.comments-slider').attr('data-pos');
      if(currPos == max) return;
      const newPOS = +currPos+ slideOffset;
      $('.comments-slider').attr('data-pos' , newPOS);
      $('.comments-slider').css('transform', `translateX(-${newPOS}px)`);
      changeActiveSlide('right');
        
  };

  function slidePrev(){
    const currPos = $('.comments-slider').attr('data-pos');
    if(currPos == -slideOffset) return;
    let newPOS = +currPos - slideOffset;

    $('.comments-slider').attr('data-pos' , newPOS);

    if(newPOS == -slideOffset) {
        newPOS = slideOffset;
        $('.comments-slider').css('transform', `translateX(${newPOS}px)`);
    }else{
        $('.comments-slider').css('transform', `translateX(-${newPOS}px)`);
    }

    changeActiveSlide('left');
  }

  function giveSlidesPosition(){
    $('.comments-slider .active').next().css({'right':'150px', 'z-index': '-1'});
    $('.comments-slider .active').prev().css({'left':'150px', 'z-index': '-1'});
  };

  giveSlidesPosition();

  function dotsInit(){
    const slides = $('.comments-slider .comment');
    for(let slide of slides){
      const dot = document.createElement('div');
      dot.classList.add('dot');
      document.querySelector('.dots').append(dot);
    }
  };

  dotsInit();

  function activeDot(){
    const curr = document.querySelector('.dots .active-dot');

    if(curr){
      curr.classList.remove('active-dot');
      curr.style.backgroundColor = window.innerWidth > 768 ? '#232323' : 'white';
      curr.style.transform = 'scale(1)';
    }

    const slides = Array.from($('.comments-slider .comment'));
    const dots = Array.from($('.dots .dot'));
    const activeSlide = $('.comments-slider .active');
    const pos = slides.indexOf(activeSlide[0]);
    dots[pos].classList.add('active-dot');
    dots[pos].style.backgroundColor = window.innerWidth > 768 ? 'white' : '#FECE2F';
    dots[pos].style.transform = 'scale(1.2)';
  };

  activeDot();

  document.querySelector('#main-form').addEventListener('submit', submitForm);

  function submitForm(e){
   
      let errors  = [];
      const inputs = this.querySelectorAll('.form-input');
      for(let input of inputs){
      if(input.value.length == 0){
        input.closest('.input-block').querySelector('.error').style.height = '20px';
        errors.push(1);
      }else{
        input.closest('.input-block').querySelector('.error').style.height = '0px';
      }
    };

    if(errors.length > 0) {
      e.preventDefault();
      return;
    };

    const dataPropose = this.getAttribute('data-propose');
    
    if(dataPropose == "false"){
      e.preventDefault();
      document.querySelector('.main-form .special-propose_wrapper').style.display = 'flex';
      document.querySelector('.special-propose .proposition').addEventListener('click', function(){
        this.setAttribute('data-propose', 'true');
        liqpayData();
        $('#main-form').trigger('submit');
      });
      document.querySelector('.special-propose button').addEventListener('click', function(){
        this.closest('.special-propose_wrapper').style.display = 'none';
      });
    };
  };

  async function sha1(str) {
    const buf = Uint8Array.from(unescape(encodeURIComponent(str)), c=>c.charCodeAt(0)).buffer;
    const digest = await crypto.subtle.digest('SHA-1', buf);
    const raw = String.fromCharCode.apply(null, new Uint8Array(digest));
    return btoa(raw); // base64
}

  function liqpayData(){
    const json_string = {"public_key":"i73112537030","version":"3","action":"pay","amount":"500","currency":"UAH","description":'Доступ до відео та КОМПЛЕКС ОЗДОРОВЧОЇ ГІМНАСТИКИ - 9 СИЛ',"order_id":"000001", 'language': 'ru'};
    const data = window.btoa(unescape(encodeURIComponent(JSON.stringify(json_string))));
    const privat = 'Su7Huz8Ympwa7xyu7RFVfs868vKNbRrQzXTtwLHY';
    const sign_string = privat+data+privat;
    let signature;
     sha1(sign_string).then((signData) => {
       signature = signData;
       document.querySelector('#main-form input[name="data"]').value = data;
      document.querySelector('#main-form input[name="signature"]').value = signature;
      });
    
     
   };

  liqpayData();


});