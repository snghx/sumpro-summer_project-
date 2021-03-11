document.addEventListener('DOMContentLoaded', (event) => {
    document.querySelectorAll('.quiz-list').forEach((quiz_container) => {
        //각 변수의 초기값을 컨테이너 속성에 추가한다
        quiz_container.setAttribute('quiz-num', 1);
        quiz_container.setAttribute('quiz-tot', 1);
        quiz_container.setAttribute('point-tot', 0);
        quiz_container.setAttribute('point-get', 0);

        let quiz_count = 1;
        quiz_container.querySelectorAll('quiz').forEach((quiz_page) => {
            //첫 페이지가 아니면 숨김
            if (quiz_count > 1) quiz_page.style.display = 'none';
            //페이지마다 번호 속성주기
            quiz_page.setAttribute('page', quiz_count);
            quiz_count++;
        });
        quiz_container.setAttribute('quiz-tot', quiz_count - 1);

        //총 점수 세기
        let point_count = 0;
        quiz_container.querySelectorAll('answer').forEach((answer_item) => {
            if (answer_item.hasAttribute('point')) {
                point_count += Number(answer_item.getAttribute('point'));
            }
        });

        //답안에 온클릭 이벤트 넣기
        quiz_container.querySelectorAll('answer').forEach((answer_item) => {
            answer_item.onclick = (event) => {
                //quiz_page가 기준 element임. closest메소드를 통해 자신부터 부모요소 단위로 출발하여 각 요소가 '지정'한 quiz선택자를 만족할 때까지 탐색한다. 
                let quiz_page = event.target.closest('quiz');
                //quiz_container를 quiz_page의 부모요소로 지정
                let quiz_container = quiz_page.parentNode;
                //다음페이지 설정
                let next = Number(quiz_page.getAttribute('page')) + 1;
                let get_point = Number(quiz_container.getAttribute('point-get'));

                //클릭한 답안에 포인트가 있는 경우 점수에 합산
                //점수쌓는 방식 + 태그 거르는 방식 추가바람
                if (event.target.hasAttribute('point')) {
                    get_point += Number(event.target.getAttribute('point'));
                    quiz_container.setAttribute('point-get', get_point);

                }

                //포인트 표시 태그 업데이트
                var result_type = get_point.toString().split("").map((str) => Number(str)).reverse().indexOf(Math.max.apply(null, get_point.toString().split("").map((str) => Number(str)).reverse()));
                var result_ex;
                var type_p;
                var movie_p;
                var movie_n;

                if (result_type == 0) {
                    result_type = '해맑은 팝콘<br/>'
                    type_p = '<img src="https://image.flaticon.com/icons/svg/863/863133.svg" width=250px>'
                    result_ex = '영화 속 웃긴 상황이나 등장 인물의 우스꽝스러운 모습을 보며 행복을 느끼는 타입이네요!</br >(당신이 선호하는 영화는 코미디나 개그 장르일 확률이 높아요~)</br >이 유형의 사람들은 각박한 현실 속에서도 자신만의 행복을 찾아 다니는 긍정적인 성격이에요.</br >또, 팡팡 터지는 팝콘처럼 주변인들을 웃게 만들어주는 능력을 가지고 있어요.</br >당신의 유쾌한 성격 덕분에, 주변 사람들은 항상 당신과 함께 영화를 감상하고 싶어한답니다!'
                    movie_n = '스파이</br>나를 차버린 스파이</br>히트</br> 배드 맘스'
                    movie_p = '<img src="https://image.tmdb.org/t/p/w440_and_h660_face/sgEl7IpKy3StkCnroGtDOLOHm40.jpg" width=160px height = 200px >, <img src="https://image.tmdb.org/t/p/w440_and_h660_face/pxBnrckggmykE56de7dqfNEHos2.jpg" width=160px height = 200px >,  <img src="https://image.tmdb.org/t/p/w440_and_h660_face/buL7jm8SjutoyoSihFTpss9Va1j.jpg" width=160px height = 200px >, <img src="https://image.tmdb.org/t/p/w440_and_h660_face/9PaIkUnfOcU1wi5cFbamnmAkjEs.jpg" width=160px height = 200px > <br />'
                        ;
                }
                else if (result_type == 1) {
                    result_type = '속이 뻥 뚫리는 탄산음료</br>'
                    type_p = '<img src="https://cdn.pixabay.com/photo/2020/01/30/12/37/fizzy-4805335_1280.png" width=300px>'
                    result_ex = '이 유형과 잘 어울리는 영화 장르는 액션이나 모험 영화입니다. </br >화려한 액션이나 빠른 전개를 가진 영화를 좋아하는 당신,</br >무료한 현실 속에서 자극이 필요한가요 ?</br> 이 유형의 사람들은 시원시원하고 활동적인 성격이에요.</br >친구가 실수를 해도 쿨하게 용서해주고 지나가는 대인배랍니다.</br >뒤끝이 없으면서도 화끈한 성향 덕분에 당신의 주변에는 항상 사람들이 모이는군요!'
                    movie_n = '오션스8 </br> 올드가드 </br> 매드맥스:분노의 도로</br> 아토믹 블론드'
                    movie_p = '<img src="https://image.tmdb.org/t/p/original/rBJfBKvSllVhQXHygSSfs3t2YJV.jpg" width=160px height = 200px >,<img src="https://image.tmdb.org/t/p/original/65Qf0or6IYVPaxVy7vZXFsHWXAX.jpg" width=160px height = 200px >,<img src="https://image.tmdb.org/t/p/original/2s2b3FgmDC7EyJoDF6vybnJbAGe.jpg" width=160px height = 200px >, <img src="https://image.tmdb.org/t/p/original/qaC3A1hSdW3DMXYukjwGR8i9iVg.jpg" width=160px height = 200px > '
                        ;
                }
                else if (result_type == 2) {
                    result_type = '갓 만든 뜨거운 프레즐</br>'
                    type_p = '<img src="https://image.flaticon.com/icons/svg/539/539837.svg" width=250px>'
                    result_ex = '입 안에 들어가서 오돌토돌하고 뜨거운 식감을 자랑하는 갓 만든 프레즐처럼, 자극적이고 쇼킹한 영화를 즐기는 유형이네요~ </br>이 유형의 사람들은 공포 영화나 B급 영화를 선호하기도 해요.</br >또, 다른 사람들보다 스트레스에 강하다는 장점을 가지고 있어요.</br >당신은 복잡한 상황에서 색다른 해결책을 제시하는 날카로운 직감을 가지고 있을 확률이 높아요. </br > '
                    movie_n = '셔터 아일랜드</br> 샤이닝 </br> 호텔 뭄바이</br> 차이나타운'
                    movie_p = '<img src="https://image.tmdb.org/t/p/original/7Q55Twd6LJhhIrFfxEWALm9jpf2.jpg" width=160px height = 200px >,<img src="https://image.tmdb.org/t/p/original/vzc4lvpjaZrrfxsnqmhURm37gmB.jpg" width=160px height = 200px >,<img src="https://image.tmdb.org/t/p/original/h9AOgs7GKNJLdvoNPkmJOFB3I7H.jpg" width=160px height = 200px >,<img src="https://image.tmdb.org/t/p/original/9YX1SdRcqLkDEMhvFMaFZ3b24Dv.jpg" width=160px height = 200px > ';

                }
                else if (result_type == 3) {
                    result_type = '촉촉한 맛밤</br>'
                    type_p = '<img src="https://image.flaticon.com/icons/svg/3367/3367826.svg" width=250px>'
                    result_ex = '개인주의적인 현대 사회에서 보기 드문 유형이에요.</br >혹시 감동적이고 슬픈 영화를 보며 눈물을 흘리는 일이 빈번하지는 않나요 ?</br >당신에게 어울리는 영화는 잔잔한 감동을 주는 멜로 영화나 실화를 기반으로 한 다큐멘터리랍니다.</br >당신은 타인의 감정에 쉽게 공감해주는 여린 감성을 가지고 있어요.</br >항상 타인의 의견을 경청하고, 공감해주는 당신의 모습에 반하는 주변인들이 많답니다.'
                    movie_n = '프란시스 하</br>어톤먼트 </br>패왕별희</br> 나, 다니엘 블레이크'
                    movie_p = '<img src="https://image.tmdb.org/t/p/original/ihnqrVROzFeDiKSXev2NZNsu7k6.jpg" width=160px height = 200px >,<img src="https://image.tmdb.org/t/p/original/xOwDTYsUUNriE7e9LauxB7k581J.jpg" width=160px height = 200px >, <img src="https://image.tmdb.org/t/p/original/q7X5eBILAmgYpSFVeTt47ZzkPZT.jpg" width=160px height = 200px >,<img src="https://image.tmdb.org/t/p/original/bC0CmUZ9s5zdvW2CEWK6sPXXp8V.jpg" width=160px height = 200px > <br />'
                        ;
                }
                else if (result_type == 4) {
                    result_type = '<center>달콤살벌 츄러스</br></center>'
                    type_p = '<center><img src="https://image.flaticon.com/icons/svg/325/325565.svg" width=250px></center>'
                    result_ex = '<center>어색한 듯하면서도 잘 어울리는 두 단어의 조합만큼 속을 알기 힘들고 복잡한 당신!</br> 달달함과 시나몬 파우더의 알싸함을 동시에 가지고 있는 츄러스처럼 달달한 정통 로맨스 혹은 진중한 분위기의 영화가 잘 어울리네요!</br >추리물이나 성장물처럼 몰입력이 강하고 여운이 길게 남는 영화를 추천드려요.</br > </center>'
                    movie_n = '<center>레미제라블: 2012</br> 다빈치 코드 </br> 타이타닉 </br>서프러제트</center>'
                    movie_p = '<center><img src="https://image.tmdb.org/t/p/w440_and_h660_face/oIFhwuAZHlD8HUfThtC3FLiCvj4.jpg" width=160px height = 200px >,<img src="https://image.tmdb.org/t/p/w440_and_h660_face/c3yjY3klWbOCjIwy6U0BkmKvy9A.jpg" width=160px height = 200px >,<img src="https://image.tmdb.org/t/p/w440_and_h660_face/t0EqhsC3UYeTYhYnrxwvhBo1uOV.jpg" width=160px height = 200px >,<img src="https://image.tmdb.org/t/p/w440_and_h660_face/6oqe2yphhsGk5ki41fhksLcgVzF.jpg" width=160px height = 200px > <br /></center>'
                }
                else if (result_type == 5) {
                    result_type = '자체개발 소스 입은 핫도그</br>'
                    type_p = '<img src="https://image.flaticon.com/icons/svg/926/926257.svg" width=250px>'
                    result_ex = '세상에, 케찹도 아니고, 머스타드도 아닌 자체개발 소스를 입은 핫도그라니! 얼마나 독특한가요?</br >축하합니다! 당신은 ‘자체개발 소스 입은 핫도그’ 유형에 해당하는군요.</br> 혹시 주변에서 아이디어뱅크와 같이 새로움을 주는 역할을 맡고 있지 않으신가요 ?</br >톡톡 튀는 특별함을 가지고 있는 당신에게는 소설을 기반으로 한 영화 혹은 판타지나 SF영화가 찰떡이네요.</br >이런 유형의 영화가 당신만의 매력을 스크린으로 감상해볼 수 있는 기회를 제공해 줄 것 같네요.'
                    movie_n = '그래비티</br>인셉션</br> 미지와의 조우 </br>루스에게 생긴 일'
                    movie_p = '<img src = "https://image.tmdb.org/t/p/original/u8ffl7CRAS12KA8eQEtkLuHg8Fm.jpg"  width=160px height= 200px>,<img src="https://image.tmdb.org/t/p/original/dVhP5LObWUYWwcHKufcdUabApII.jpg"  width=160px height= 200px>,<img src="https://image.tmdb.org/t/p/original/kzD5ng3BvRUxW9vBfCkg61XjITR.jpg"  width=160px height= 200px>,<img src="https://image.tmdb.org/t/p/original/1stdUlXBc3nxqhdWvZ6wWWEbCQW.jpg"  width=160px height= 200px>';
                }
                else if (result_type == 6) {
                    result_type = '버터 감싸안은 오징어</br >'
                    type_p = '<img src="https://image.flaticon.com/icons/svg/1181/1181937.svg" width=200px>'
                    result_ex = '먹는 순간 입 안에 퍼지는 달달 고소한 기분을 느낄 수 있게 해주는 버터오징어 같은 당신!</br >자기 자신은 물론, 주변인까지 발 끝부터 행복을 솟아오르게 하는 재주를 가지고 있네요.</br > 이런 당신에게는 평화롭고 마음이 따스해지는 분위기의 영화를 추천드려요.</br >잔잔하고 부드러운 영화와 함께 라면 한층 더 행복해질 수 있지 않을까요 ?'
                    movie_n = '마담 프루스트의 비밀정원 </br> 개 같은 내 인생</br>플립</br>원더'
                    movie_p = '< img src = "https://image.tmdb.org/t/p/original/f9QeXJbwTx1ECcHVqWzmSHVz80Q.jpg"  width = 160px height = 200px >,<img src="https://image.tmdb.org/t/p/original/d5945ggHlijMC5Gf0bEdfbrDuHj.jpg" width=160px height = 200px >,<img src="https://image.tmdb.org/t/p/original/rufIMvXhFDREzby1B4s0hHc8Kmr.jpg" width=160px height = 200px >, <img src="https://image.tmdb.org/t/p/original/wI9ksZ27Av4YVCHbXnrhT200FP6b.jpg" width=160px height = 200px > <br />';
                }


                quiz_container.querySelectorAll('point').forEach((get_str) => {

                    document.getElementById('R').innerHTML = result_type;
                    document.getElementById('E').innerHTML = result_ex;
                    document.getElementById('P').innerHTML = type_p;
                    document.getElementById('M_N').innerHTML = movie_n;
                    document.getElementById('M_P').innerHTML = movie_p;
                });



                var index = 0; //이미지에 접근하는 인덱스
                window.onload = function () { slideShow(); }

                function slideShow() {
                    var i;
                    var x = document.getElementsByClassName("slide1");
                    for (i = 0; i < x.length; i++) {
                        x[i].style.display = "none";
                    }
                    index++;
                    if (index > x.length) {
                        index = 1;
                    }
                    x[index - 1].style.display = "block";
                    setTimeout(slideShow, 4000);
                }

                //다음 페이지로 이동
                quiz_page.style.display = 'none';
                quiz_container.querySelector(`quiz[page="${next}"]`).style.display = 'block';
                quiz_container.setAttribute('quiz-num', next);
            }
        });
        //리셋 태그에 온클릭 이벤트 넣기
        quiz_container.querySelectorAll('reset').forEach((reset_btn) => {
            reset_btn.onclick = (event) => {
                let quiz_page = event.target.closest('quiz');
                let quiz_container = quiz_page.parentNode;

                //퀴즈 컨테이너의 변수 초기화
                quiz_container.setAttribute('quiz-num', 1);
                quiz_container.setAttribute('point-get', 0);

                //첫페이지로 넘어가기
                quiz_page.style.display = 'none';
                quiz_container.querySelector(`quiz[page="1"]`).style.display = 'block';
            }
        });
    });
});

