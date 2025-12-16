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