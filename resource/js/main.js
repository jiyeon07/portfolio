'use strict';

/* 스크롤시 메인 타이틀 */
document.addEventListener("DOMContentLoaded", function() {
    // 1. 애니메이션을 적용할 모든 요소를 선택합니다.
    const animElements = document.querySelectorAll('.tit1');

    // 2. Intersection Observer 옵션을 설정합니다.
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        // threshold를 0으로 설정하면 요소가 1픽셀이라도 보일 때 감지합니다.
        threshold: 0 
    };

    // 3. 콜백 함수: 관찰 대상의 상태 변화가 있을 때마다 실행됩니다.
    const observerCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // 요소가 화면에 진입했을 때 (스크롤 다운 또는 업)
                entry.target.classList.add('is-visible');
            } else {
                // 요소가 화면에서 벗어났을 때 (스크롤 다운 또는 업)
                entry.target.classList.remove('is-visible');
            }
            // 중요: observer.unobserve()를 사용하지 않아야 계속 관찰합니다.
        });
    };

    // 4. Intersection Observer 인스턴스 생성
    const observer = new IntersectionObserver(observerCallback, observerOptions);

    // 5. 모든 애니메이션 요소에 대해 관찰 시작
    animElements.forEach(element => {
        observer.observe(element);
    });
});


/* 스크롤 원형 차트 */
document.addEventListener('DOMContentLoaded', () => {
    const skillBoxes = document.querySelectorAll('.skills_box');
    const radius = 90;
    // 반지름 90에 대한 원의 둘레: 2 * Math.PI * 90 ≈ 565.48
    const circumference = 2 * Math.PI * radius; 

    // Intersection Observer 옵션 설정
    // threshold: 0.5는 요소가 뷰포트에 50% 이상 보일 때/나갈 때 모두 감지합니다.
    const options = {
        root: null, // 뷰포트를 기준으로 관찰합니다.
        rootMargin: '0px',
        threshold: 0.5 
    };
    // 관찰자 콜백 함수
    const observerCallback = (entries, observer) => {
        entries.forEach(entry => {
            const skillBox = entry.target;
            const percentage = parseInt(skillBox.dataset.percentage, 10);
            const strokeElement = skillBox.querySelector('.stroke');
            
            if (!strokeElement) return; // .stroke 요소가 없으면 건너뜁니다.

            // 목표 stroke-dashoffset 값을 미리 계산합니다.
            // (100 - 비율)% 만큼 둘레에서 뺌 = 채워져야 할 부분
            const targetOffset = circumference * (100 - percentage) / 100;
            
            // --- 

            // 1. 요소가 뷰포트에 들어올 때 (스크롤 다운)
            if (entry.isIntersecting) {
                // .active 클래스 추가 및 애니메이션 실행 (차트 채우기)
                skillBox.classList.add('active');
                strokeElement.style.strokeDashoffset = targetOffset;

            // 2. 요소가 뷰포트에서 나갈 때 (스크롤 업 또는 다운)
            } else {
                // .active 클래스 제거 및 애니메이션 초기화 (차트 비우기)
                skillBox.classList.remove('active');
                // 초기 상태인 둘레 값으로 되돌려 선을 완전히 숨깁니다.
                strokeElement.style.strokeDashoffset = circumference;
            }
        });
    };
    // Intersection Observer 인스턴스 생성
    const observer = new IntersectionObserver(observerCallback, options);

    // 모든 .skills_box 요소를 관찰 대상으로 등록합니다.
    skillBoxes.forEach(box => {
        observer.observe(box);
    });
});


/* 스크롤 애니메이션 */
document.addEventListener('DOMContentLoaded', () => {
  const highlights = document.querySelectorAll('.highlight');

  // Intersection Observer의 콜백 함수 정의
  const observerCallback = (entries) => {
    entries.forEach(entry => {
      // isIntersecting: 뷰포트에 진입했는지 여부 (true/false)
      if (entry.isIntersecting) {
        // 뷰포트 내에 있을 때: 
        // CSS 변수를 100%로 설정하여 애니메이션 실행 (형광펜 그리기)
        entry.target.style.setProperty('--highlight', '100%');
      } else {
        // 뷰포트 밖으로 나갔을 때: 
        // CSS 변수를 0%로 설정하여 다음 진입을 위해 초기화 (형광펜 지우기)
        entry.target.style.setProperty('--highlight', '0%');
      }
    });
  };
  // Intersection Observer 옵션 설정
  const observerOptions = {
    root: null, // 뷰포트
    rootMargin: '0px', 
    // threshold: 0.8 -> 0으로 변경: 요소가 1픽셀이라도 보이면 즉시 반응
    threshold: 0 // 이탈/진입 시 즉시 감지하기 위해 0으로 설정
  };

  // Intersection Observer 인스턴스 생성
  const observer = new IntersectionObserver(observerCallback, observerOptions);

  // 모든 .highlight 요소를 관찰 시작
  highlights.forEach(highlight => {
    observer.observe(highlight);
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
document.addEventListener('DOMContentLoaded', () => {
    const emailElement = document.getElementById('email_copy');

    // 대체(Fallback) 복사 로직: document.execCommand('copy') 사용
    const fallbackCopyText = (text) => {
        let tempInput = document.createElement('input'); // 임시 Input 요소 생성
        tempInput.value = text;
        document.body.appendChild(tempInput); // DOM에 추가
        
        // Input 요소를 선택
        tempInput.select();
        tempInput.setSelectionRange(0, 99999); // 모바일 지원

        try {
            // 복사 명령 실행 (Deprecated 되었지만, 구형 브라우저 및 대체 용도로 사용)
            document.execCommand('copy');
            document.body.removeChild(tempInput); // 임시 요소 제거
            return true; // 복사 성공
        } catch (err) {
            document.body.removeChild(tempInput); // 임시 요소 제거
            return false; // 복사 실패
        }
    };
    // 이메일 요소가 존재하는지 확인
    if (emailElement) {
        emailElement.addEventListener('click', async () => {
            const textToCopy = emailElement.textContent;
            let copySuccess = false; // 복사 성공 여부 플래그

            // 1. 최신 navigator.clipboard API 시도
            try {
                await navigator.clipboard.writeText(textToCopy);
                copySuccess = true;
            } catch (err) {
                console.warn('최신 클립보드 API 실패. 대체 방법 시도:', err);
            }

            // 2. 최신 API가 실패했을 경우, 대체 로직(execCommand) 시도
            if (!copySuccess) {
                copySuccess = fallbackCopyText(textToCopy);
            }
            
            // 3. 결과 알림
            if (copySuccess) {
                alert(`이메일 주소가 복사되었습니다: ${textToCopy}`);
            } else {
                alert('자동 클립보드 복사에 실패했습니다. 이메일 주소를 수동으로 복사해주세요.');
            }
        });
    }
});