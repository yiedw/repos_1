$(document).ready(function () {
    var check = true;
    var get_list = function () {
        $.ajax('/list', {
            'success': function (list) {
                var number_arr = [];
                var trs = '';
                list = JSON.parse(list).list;
                for (var i = 0, len = list.length; i < len; i++) {
                    trs += '<tr id="table_tr' + i + '">' +
                        '<td class="index">' + (i + 1) + '</td>' +
                        '<td clas="title">' + list[i].title + '</td>' +
                        '<td class="contents">' + list[i].contents + '</td>' +
                        '<td class="priority">' + list[i].priority + '</td>' +
                        '<td class="end_time">' + list[i].end_time + '</td>' +
                        '<td><button type="button" class="btn btn-success">' + list[i].complete + '</button></td>' +
                        '<td><button type="button" class="btn btn-hide">수정</button></td>' +
                        '<td><button type="button" class="btn btn-danger"> 삭제</button></td>' +
                        '</tr>' +
                        '<tr style="display :none" id="hide_no' + i + '"><form>' +
                        '<td> #</td>' +
                        '<td><input type="text" id="modified_title'+i+'" value="'+list[i].title + '"></td>' +
                        '<td><input type="text" id="modified_contents'+i+'" value="'+list[i].contents + '"></td>' +
                        '<td><input type="number" id="modified_priority'+i+'" value="'+list[i].priority + '"></td>' +
                        '<td> </td>' +
                        '<td> </td>' +
                        '<td><button type="button" class="btn btn-modified">수정</button></td>' +
                        '</form></tr>'



                    var d = new Date(list[i].end_time);
                    var today = new Date();
                    if (today > d) {
                        number_arr.push(i);
                    }
                }
                $('tbody').html(trs);
                for (var i = 0; i < number_arr.length; i++) {
                    var temp = "#table_tr" + number_arr[i];
                    $(temp).css({
                        color: "red"
                    })
                    if (check) {
                        window.alert("마감 기한이 지난 스케줄이 있습니다.");
                        check = false;
                    }
                }
            }
        });

        //정렬(파일을 읽기전에 실행되버리면 빈 데이터가 들어옴 --> 이걸 방지)
        setTimeout(function () {
            $('#my_table').tablesorter();
        }, 100);

    };

    get_list();

    //새로운 할 일 추가
    $('.form-inline button').click(function () {
        $.ajax('/add', {
            'method': 'POST',
            'data': {
                'title': $('#title').val(),
                'contents': $('#contents').val(),
                'priority': $('#priority').val(),
                'end_time': $('#end_time').val()
            }
            // 'success': get_list
        });
        location.reload();
    });

    //선택한 할 일 완료
    $('tbody').on('click', '.btn-success', function () {

        $.ajax('/complete', {
            'method': 'POST',
            'data': {
                'index': parseInt($(this).parent().siblings(':first').text()) - 1
            },
            // 'success': get_list
        })
        location.reload();
    })

    //수정할 부분 접기 펼치기
    var index=0;
    $('tbody').on('click', '.btn-hide', function () {
        index=(parseInt($(this).parent().siblings(':first').text()) - 1)
         id_index = "#hide_no" + (parseInt($(this).parent().siblings(':first').text()) - 1)
        
        if ($(id_index).is(':visible') == false) {
            $(id_index).show();
        }
        else if ($(id_index).is(':visible') == true) {
            $(id_index).hide();
        }
    })
    
    //선택한 할 일 수정
    $('tbody').on('click','.btn-modified',function(){
        $.ajax('/modified', {
            'method': 'POST',
            'data': {
                'index': index,
                'title': $("#modified_title"+index).val(),
                'contents' :  $("#modified_contents"+index).val(),
                'priority' :  $("#modified_priority"+index).val()
            }
        })
        location.reload();
    })



    //선택한 할 일 삭제
    $('tbody').on('click', '.btn-danger', function () {
        $.ajax('/del', {
            'method': 'POST',
            'data': {
                'index': parseInt($(this).parent().siblings(':first').text()) - 1

            }
            // 'success': get_list()
        })
        location.reload();
    })




});