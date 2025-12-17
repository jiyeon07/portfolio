'use strict';

$( document ).ready(function(){
  findTab();
});

/* 탭 메뉴 */
function findTab() {
    $('.view-cont .tab-wrap li').click(function(){
        var tab_id = $(this).attr('data-tab');

        $('.view-cont .tab-wrap li').removeClass('on');
        $('.view-cont .tab-cont').removeClass('on');

        $(this).addClass('on');
        $("#"+tab_id).addClass('on');
    });
}

/* 뒤로가기 */
$(document).ready(function() {
    $('.btn-back').on('click', function(e) {
        e.preventDefault(); // 기본 동작 방지
        
        if (document.referrer) {
            // 이전 페이지 정보가 있으면 뒤로 가기
            window.history.back();
        } else {
            // 이전 페이지 정보가 없으면 홈으로 이동 (경로 수정 가능)
            location.href = '/index.html'; 
        }
    });
});