'use strict';

/* 스크롤시 메인 타이틀 */
$(document).ready(function() {
    // 애니메이션을 적용할 모든 요소를 선택
    const $animElements = $('.tit1');

    // Intersection Observer 옵션 설정
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0 
    };

    // 콜백 함수
    const observerCallback = (entries, observer) => {
        entries.forEach(entry => {
            const $target = $(entry.target); // 제이쿼리 객체로 변환
            
            if (entry.isIntersecting) {
                // 요소가 화면에 진입했을 때
                $target.addClass('is-visible');
            } else {
                // 요소가 화면에서 벗어났을 때
                $target.removeClass('is-visible');
            }
        });
    };

    // Intersection Observer 인스턴스 생성
    const observer = new IntersectionObserver(observerCallback, observerOptions);

    // 모든 요소 관찰 시작
    $animElements.each(function() {
        observer.observe(this); // 'this'는 순수 DOM 요소를 가리킵니다.
    });
});


/* 스크롤 원형 차트 */
$(document).ready(function() {
    const $skillBoxes = $('.skills_box');
    const radius = 90;
    const circumference = 2 * Math.PI * radius; // 약 565.48

    // Intersection Observer 옵션
    const options = {
        root: null,
        rootMargin: '0px',
        threshold: 0.5 
    };

    // 관찰자 콜백 함수
    const observerCallback = (entries, observer) => {
        entries.forEach(entry => {
            const $skillBox = $(entry.target);
            const $strokeElement = $skillBox.find('.stroke');
            
            if ($strokeElement.length === 0) return;

            // 데이터 속성에서 퍼센트 가져오기
            const percentage = parseInt($skillBox.data('percentage'), 10);
            const targetOffset = circumference * (100 - percentage) / 100;

            if (entry.isIntersecting) {
                // 화면에 들어왔을 때: 활성화 및 차트 채우기
                $skillBox.addClass('active');
                $strokeElement.css('stroke-dashoffset', targetOffset);
            } else {
                // 화면에서 나갔을 때: 비활성화 및 초기화
                $skillBox.removeClass('active');
                $strokeElement.css('stroke-dashoffset', circumference);
            }
        });
    };

    // 인스턴스 생성 및 관찰 시작
    const observer = new IntersectionObserver(observerCallback, options);

    $skillBoxes.each(function() {
        observer.observe(this);
    });
});


/* 스크롤 애니메이션 */
$(document).ready(function() {
    // 애니메이션을 적용할 요소를 선택합니다.
    const $highlights = $('.highlight');

    // 콜백 함수 정의
    const observerCallback = (entries) => {
        entries.forEach(entry => {
            const $target = $(entry.target);
            
            if (entry.isIntersecting) {
                // 뷰포트 진입 시: CSS 변수를 100%로 설정
                $target.css('--highlight', '100%');
            } else {
                // 뷰포트 이탈 시: CSS 변수를 0%로 초기화
                $target.css('--highlight', '0%');
            }
        });
    };

    // 옵션 설정 (0이면 1픽셀이라도 보일 때 즉각 반응)
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0
    };

    // 관찰자 생성 및 실행
    const observer = new IntersectionObserver(observerCallback, observerOptions);

    $highlights.each(function() {
        observer.observe(this);
    });
});


/* 마우스 호버 물방울 효과 */
$(document).ready(function () {
	$('.fill-box').on('mouseenter', function (e) {
		const $this = $(this);
		const offset = $this.offset();
		const x = e.pageX - offset.left;
		const y = e.pageY - offset.top;

		$this.find('.fill-box::after').css({ top: y, left: x });
	});
});


/* email 복사하기 */
$(document).ready(function() {
    // 대체(Fallback) 복사 로직
    const fallbackCopyText = (text) => {
        // 제이쿼리로 임시 input 생성 및 설정
        const $tempInput = $('<input>');
        $('body').append($tempInput);
        
        $tempInput.val(text).select();
        
        // 모바일 지원을 위한 선택 범위 설정 (순수 DOM 접근)
        $tempInput[0].setSelectionRange(0, 99999);

        try {
            const success = document.execCommand('copy');
            $tempInput.remove();
            return success;
        } catch (err) {
            $tempInput.remove();
            return false;
        }
    };

    // 이메일 클릭 이벤트 바인딩
    $('.email_copy').on('click', async function() {
        const textToCopy = $(this).text(); // 요소의 텍스트 가져오기
        let copySuccess = false;

        // 최신 navigator.clipboard API 시도
        if (navigator.clipboard && window.isSecureContext) {
            try {
                await navigator.clipboard.writeText(textToCopy);
                copySuccess = true;
            } catch (err) {
                console.warn('최신 클립보드 API 실패. 대체 방법 시도:', err);
            }
        }

        // 최신 API가 실패했거나 지원되지 않을 경우 대체 로직 시도
        if (!copySuccess) {
            copySuccess = fallbackCopyText(textToCopy);
        }

        // 결과 알림
        if (copySuccess) {
            alert(`이메일 주소가 복사되었습니다: ${textToCopy}`);
        } else {
            alert('자동 복사에 실패했습니다. 이메일 주소를 수동으로 복사해주세요.');
        }
    });
});