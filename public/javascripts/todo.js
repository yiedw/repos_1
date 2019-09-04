$(document).ready(function () {
    var get_list = function () {
        $.ajax('/list', {
            'success': function (list) {
                var trs = '';

                list = JSON.parse(list).list;

                for (var i = 0, len = list.length; i < len; i++) {
                    trs += '<tr>' +
                        '<td>' + (i + 1) + '</td>' +
                        '<td>' + list[i].contents + '</td>' +
                        '<td><button type="button" class="btn btn-success">완료</button></td>' +
                        '<td><button type="button" class="btn btn-danger"> 삭제</button></td>' +
                        '</tr>';
                }

                $('tbody').html(trs);
            }
        });
    };

    get_list();

    //새로운 할 일 추가
    $('.form-inline button').click(function(){
        $.ajax('/add',{
            'method' : 'POST',
            'data' : {
                'contents' : $('#new_todo').val()
            },
            'success' : get_list
        });
    });

    //선택한 할 일 완료
    $('tbody').on('click', '.btn-success', function(){
        $.ajax('/complete',{
            'method' : 'POST',
            'data' : {
                'index': parseInt($(this).parent().siblings(':first').text()) - 1
            },
            'success' : get_list
        })
    })

    //선택한 할 일 삭제
    $('tbody').on('click','btn-danger', function(){
        $.ajax('/del',{
            'method' : 'POST',
            'data' : {
                'index' : parseInt($(this).parent().siblings(':first').text()) - 1
            },
            'success' : get_list
        })
    })
});