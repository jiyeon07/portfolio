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