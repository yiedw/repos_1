var fs = require('fs');

exports.list = function (req, res) {
    fs.exists("./todo_list.json", function (exists) {


        if (exists) {
            fs.readFile('./todo_list.json', {
                'encoding': 'utf8'
                //파일 읽기
            }, function (err, list) {
                res.json(list);
            });
        }
        else {
            var list = {
                'list': []
            };

            fs.writeFile('./todo_list.json',
                JSON.stringify(list), function (err) {
                    res.json(list);
                });
        }
    });
};

exports.add = function (req, res) {
    var todo = {
        'title':'',
        'contents': '',
        'priority' : '',
        'end_time': '',
        'complete': 'X'
    };
    
    todo.title=req.body.title;
    todo.contents=req.body.contents;
    todo.priority=req.body.priority;
    todo.end_time=req.body.end_time;
    
    fs.readFile('./todo_list.json', {
        'encoding': 'utf8'
    }
    , function (err, data) {
        data = JSON.parse(data);
        data.list.push(todo);
        
        fs.writeFile('./todo_list.json', JSON.stringify(data),function (err) {
                res.json(true);
            }
        )}
    )
}

exports.complete=function(req,res){
    fs.readFile('./todo_list.json',{
        'encoding' : 'utf8'
    },function(err,data){
        data=JSON.parse(data);
        data.list[req.body.index].complete='O';

        fs.writeFile('./todo_list.json',JSON.stringify(data),function(err){
            res.json(true);
        })
    })
}

exports.modified=function(req,res){
    fs.readFile('./todo_list.json',{
        'encoding' : 'utf8'
    },function(err,data){
        data=JSON.parse(data);
        data.list[req.body.index].title=req.body.title;
        data.list[req.body.index].contents=req.body.contents;
        data.list[req.body.index].priority=req.body.priority;
        data.list[req.body.index].end_time=req.body.end_time;

        fs.writeFile('./todo_list.json',JSON.stringify(data),function(err){
            res.json(true);
        })
    })
}

exports.del=function(req,res){
    fs.readFile('./todo_list.json',{
        'encoding' : 'utf8'
    }, function(err,data){
        data=JSON.parse(data);
        data.list[req.body.index]=null;
        data.list=data.list.filter(Boolean);
        fs.writeFile('./todo_list.json',JSON.stringify(data),function(err){
            res.json(true);
        })
    })
}
