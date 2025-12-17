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
        e.preventDefault(); // 클릭 시 페이지 새로고침이나 링크 이동 방지
        window.history.back(); // 무조건 이전 페이지로 이동
    });
});