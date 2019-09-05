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
                        '<td>' + (i + 1) + '</td>' +
                        '<td>' + list[i].title + '</td>' +
                        '<td class="contents">' + list[i].contents + '</td>' +
                        '<td class="priority">' + list[i].priority + '</td>' +
                        '<td class="end_time">' + list[i].end_time + '</td>' +
                        '<td><button type="button" class="btn btn-success">' + list[i].complete + '</button></td>' +
                        '<td><button type="button" class="btn btn-modified">수정</button></td>' +
                        '<td><button type="button" class="btn btn-danger"> 삭제</button></td>' +
                        '</tr>'
                    var d = new Date(list[i].end_time);
                    // console.log(d+","+i);
                    var today = new Date();
                    if (today > d) {
                        number_arr.push(i);
                    }
                }
                $('tbody').html(trs);
                // console.log(number_arr);
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
        
        //정렬(너무 파일을 읽기전에 실행되버리면 빈 데이터가 들어옴 --> 이걸 방지)
        setTimeout(function(){
            $('#my_table').tablesorter();
        },100);
        
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

    //선택한 할 일 수정
    $('tbody').on('click', '.btn-modified', function () {
        var trs = "";
        $.ajax('/modified', {
            'method': 'POST',
            'data': {
                'index': parseInt($(this).parent().siblings(':first').text()) - 1

            },
            // success: get_list
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