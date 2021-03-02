document.addEventListener('DOMContentLoaded', function(){
const slideOffset = window.innerWidth > 768 ? 550 : 405;
    

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

  function sliderNext(){
      let max = $('.comments-slider .comment').length - 2;
      max = max * slideOffset;
      const currPos = $('.comments-slider').attr('data-pos');
      if(currPos == max) return;
      const newPOS = +currPos+ slideOffset;
      $('.comments-slider').attr('data-pos' , newPOS);
      $('.comments-slider').css('transform', `translateX(-${newPOS}px)`);

        const currActive = $('.comments-slider .active');
        const newActive = $('.comments-slider .active').next();
        $(newActive).addClass('active');
        $(currActive).removeClass('active');
        $(newActive).css({'right':'0', 'z-index': '0'});
        setTimeout(function(){
            (newActive).css({'right':'initial'});
        }, 600);
        $(currActive).css('transform', 'scale(0.7)');
        $(newActive).css('transform', 'scale(1)');
        giveSlidesPosition();
  };

  function slidePrev(){
    const currPos = $('.comments-slider').attr('data-pos');
    if(currPos == -slideOffset) return;
    let newPOS = +currPos - slideOffset;
    console.log(newPOS == -slideOffset);
    $('.comments-slider').attr('data-pos' , newPOS);
    if(newPOS == -slideOffset) {
        newPOS = slideOffset;
        $('.comments-slider').css('transform', `translateX(${newPOS}px)`);
    }else{
        $('.comments-slider').css('transform', `translateX(-${newPOS}px)`);
    }

      const currActive = $('.comments-slider .active');
      const newActive = $('.comments-slider .active').prev();
      $(newActive).addClass('active');
      $(currActive).removeClass('active');
      $(newActive).css({'left':'0', 'z-index': '0'});
      setTimeout(function(){
        (newActive).css({'left':'initial'});
    }, 600);
      $(currActive).css('transform', 'scale(0.7)');
      $(newActive).css('transform', 'scale(1)');
      giveSlidesPosition();
  }

  function giveSlidesPosition(){
    $('.comments-slider .active').next().css({'right':'150px', 'z-index': '-1'});
    $('.comments-slider .active').prev().css({'left':'150px', 'z-index': '-1'});
  };

  giveSlidesPosition();

})