let slideWrap = $(".slide_wrap"),
    slideShow = slideWrap.find(".slide_show"),
    slideList = slideShow.find(".slide_list"),
    slides = slideList.find(".slide"),
    slideBtn = slideWrap.find(".slide_btn");

let slideCount = slides.length,
    slideWidth = slides.innerWidth(),
    showNum = 3,
    num = 0,
    currentIndex = 0,
    
    slideCopy = $(".slide:lt("+ showNum +")").clone();
    slideList.append(slideCopy);

//�̹��� �����̱�
function backShow(){
  if( num == 0 ){
    //����
    num= slideCount;
    slideList.css("left", -num * slideWidth + "px");
  }
  num--;
  slideList.stop().animate({ left : -slideWidth * num +"px"}, 400);
}

function nextShow(){
  if( num == slideCount ){
    //������
    num= 0;
    slideList.css("left", num);
  }
  num++;
  slideList.stop().animate({ left : -slideWidth * num +"px"}, 400);
}

//����, ������ ��ư ����
slideBtn.on("click","button",function(){
  if( $(this).hasClass("prev")){
    //���� ��ư�� Ŭ��
    backShow();
  } else {
    //������ ��ư�� Ŭ��
    nextShow();
  }
});

