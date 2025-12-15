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
	const x = document.getElementById(id);
	x.scrollIntoView({ behavior: "smooth", block: "start" });
}

// 모바일 gnb
document.addEventListener('DOMContentLoaded', () => {
    // 1. 필요한 DOM 요소 선택
    const menuButton = document.querySelector('.btn-menu');
    const gnbMenu = document.querySelector('.gnb');

    // 2. 버튼 클릭 이벤트 리스너 추가
    menuButton.addEventListener('click', () => {
        // gnbMenu 요소에 'is-active' 클래스를 토글 (있으면 제거, 없으면 추가)
        gnbMenu.classList.toggle('is-active');

        // 메뉴가 열렸을 때 버튼 이미지 변경 또는 접근성을 위한 'aria-expanded' 속성 토글
        const isMenuOpen = gnbMenu.classList.contains('is-active');
        menuButton.setAttribute('aria-expanded', isMenuOpen);

        // 메뉴가 열렸을 때 본문 스크롤 방지
        if (isMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    });

    // 메뉴 항목 클릭 시 메뉴 닫기 기능
    const gnbLinks = document.querySelectorAll('.gnb a');
    gnbLinks.forEach(link => {
        link.addEventListener('click', () => {
            gnbMenu.classList.remove('is-active');
            document.body.style.overflow = ''; // 스크롤 해제
        });
    });
});