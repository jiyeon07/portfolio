(() => {
	const target = 'a, button';   // 적용할 요소
	let isTabFocus = false;       // 최근 포커스가 Tab 키로 이동했는지 여부

	/* ──────────────────────────────
	* 1) 키 입력·마우스 클릭 구분
	* ────────────────────────────── */
	document.addEventListener('keydown', e => {
		if (e.key === 'Tab') isTabFocus = true;   // Tab 키 눌림 → 키보드 포커스
	});
	document.addEventListener('mousedown', () => {
		isTabFocus = false;                       // 마우스 클릭 → 키보드 아님
	});

	/* ──────────────────────────────
	* 2) 마우스 Hover
	* ────────────────────────────── */
	document.addEventListener('mouseover', e => {
		if (e.target.matches(target)) e.target.classList.add('is-hover');
	});
	document.addEventListener('mouseout', e => {
		if (e.target.matches(target)) e.target.classList.remove('is-hover');
	});

	/* ──────────────────────────────
	* 3) 키보드(Tab) Focus
	* ────────────────────────────── */
	document.addEventListener('focusin', e => {
		if (isTabFocus && e.target.matches(target)) {
			e.target.classList.add('is-focus');
		}
	});
	document.addEventListener('focusout', e => {
		if (e.target.matches(target)) e.target.classList.remove('is-focus');
	});
})();

/* header */
// 스크롤 이동
function scrollAnkerTo(id) {
    // 이동할 대상 요소 선택
    const $target = $('#' + id);

    // 대상 요소가 존재하는지 확인 후 애니메이션 실행
    if ($target.length) {
        $('html, body').stop().animate({
            scrollTop: $target.offset().top
        }, 600); // 600ms(0.6초) 동안 부드럽게 이동
    }
}

// 모바일 gnb
$(document).ready(function() {
    const $menuButton = $('.btn-menu'); // 메뉴 열기 버튼
    const $closeButton = $('.btn-close'); // 메뉴 닫기 버튼
    const $gnbMenu = $('.gnb');
    const $gnbLinks = $('.gnb a');

    // 공통: 메뉴 닫기 함수
    function closeMenu() {
        $gnbMenu.removeClass('is-active');
        $menuButton.attr('aria-expanded', false);
        $('body').css('overflow', '');
    }

    // 공통: 메뉴 열기 함수
    function openMenu() {
        $gnbMenu.addClass('is-active');
        $menuButton.attr('aria-expanded', true);
        $('body').css('overflow', 'hidden');
    }

    // 메뉴 열기 버튼 클릭 시
    $menuButton.on('click', function() {
        if ($gnbMenu.hasClass('is-active')) {
            closeMenu();
        } else {
            openMenu();
        }
    });

    // 닫기 버튼(.btn-close) 클릭 시
    $closeButton.on('click', function() {
        closeMenu();
    });

    // 메뉴 항목(링크) 클릭 시 메뉴 닫기
    $gnbLinks.on('click', function() {
        closeMenu();
    });
});