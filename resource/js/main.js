document.addEventListener('DOMContentLoaded', () => {
    const charts = document.querySelectorAll('.skill_box');

    const observerOptions = {
        root: null, // 뷰포트를 기준으로 감지
        rootMargin: '0px',
        threshold: 0.5 // 요소의 50%가 보이면 실행
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // 1. 해당 요소가 화면에 나타났을 때
                animateChart(entry.target);
                // 2. 애니메이션이 끝났으므로 관찰 중지 (반복 방지)
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // 모든 그래프 요소를 관찰 시작
    charts.forEach(chart => {
        observer.observe(chart);
    });
});

// 차트 애니메이션
function animateChart(chartElement) {
    const percentage = chartElement.dataset.percentage; // 예: "90"
    const circle = chartElement.querySelector('.chart-inner');
    const percentageText = chartElement.querySelector('.percentage');

    // 1. 원형 채우기 애니메이션 실행
    // stroke-dasharray: [채울 길이], [남은 길이] -> 90, 10
    const dasharrayValue = `${percentage}, 100`;
    circle.style.strokeDasharray = dasharrayValue;

    // 2. 숫자 카운팅 애니메이션 (선택 사항)
    let currentNumber = 0;
    const duration = 1500; // 1.5초 (CSS transition과 동일하게)
    const step = percentage / (duration / 10); // 10ms마다 증가할 값

    const counter = setInterval(() => {
        currentNumber += step;
        if (currentNumber >= percentage) {
            currentNumber = percentage;
            clearInterval(counter);
        }
        percentageText.textContent = `${Math.floor(currentNumber)}%`;
    }, 10);
}