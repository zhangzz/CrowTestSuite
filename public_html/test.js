$(document).ready(function() {
    $('<div/>', {'id': 'title', 'html': '你准备好答题了吗？',style:"font-size:2em"}).appendTo($('#div-title'));
    $('#start').click(Test.on_doc_ready);
});


var Test = {
    on_doc_ready: function() {
        Test._test();
        $('#div-start').toggle();
        $('#div-tip').toggle();
        $('#title').empty();
        $('#title').html("单项选择题");
    },
    on_submit_click: function() {
        Test.stop = window.clearInterval(Test.stop);
        $('#panel').toggle();
        $('#timer').toggle();
        $('#title').empty();
        $('#title').html("测试结果为：");
        var i = 0;
        var rightCount = 0;
        var $wrapper = $('#feedback').empty();

        $('<div/>', {id: "totalAnswer"}).appendTo($wrapper);
        $('<div/>', {id: "detailAnswer"}).appendTo($wrapper);
        for (; i < AppData.many_s_choices.length; i++) {
            $('<label/>', {id: "question" + i, html:i+1+"."+ AppData.many_s_choices[i].body + "<br/>"}).appendTo($('#detailAnswer'));

            var item_id = 'item' + i;
            var tmp = $('input[type=radio][name=' + item_id + ']:checked');
            
            var is_key = tmp.attr("data-is-key");
           
            if (is_key === '1') {
                rightCount++;
                var order = tmp.attr('order');
                var str = "您的正确回答为：" + AppData.many_s_choices[i].choices[order].text + "<br/>";

                $('<label/>', {id: 'choice' + i, html: str, style: "color:blue"}).appendTo($('#detailAnswer'));
            }
            else if (is_key === undefined) {
                
                var str1 = "您没有作答此题<br/>";
                $(AppData.many_s_choices[i].choices).each(function(){
                    var is_key = this.is_key;
                     if(is_key === '1'){
                        var str2 = str1 + "正确回答为：" + this.text +"<br/>";
                        $('<label/>', {id: 'choice' + i, html: str2, style: "color:green"}).appendTo($('#detailAnswer'));
                     }
                });
               
                
                
            }
            else {
                var order1 = tmp.attr('order');
                console.log("3");
                str1 = "您的回答为：" + AppData.many_s_choices[i].choices[order1].text + "<br/>";
                $(AppData.many_s_choices[i].choices).each(function(){
                    var is_key = this.is_key;
                     if(is_key === '1'){
                        
                        var str2 = str1 + "正确回答为：" + this.text +"<br/>";
                        $('<label/>', {id: 'choice' + i, html: str2, style: "color:red"}).appendTo($('#detailAnswer'));
                     }
                });
            }
        }
        var wrongCount = AppData.many_s_choices.length - rightCount;

        var test_minute = Test.aminute - Test.minute;
        var test_second = Test.asecond - Test.second;
        if (test_second < 0) {
            test_minute--;
            test_second = 60 + test_second;
        }
        $('<label/>', {html: "总共题目数目：" + AppData.many_s_choices.length + "<br/>" + "正确的题目数：" + rightCount + "<br/>" + "错误的题目数为：" + wrongCount +
                    "<br/>所用的时间为" + test_minute + "分" + test_second + "秒" + "<br/><br/>", style: "color:black"}).appendTo($('#totalAnswer'));

    },
    _test: function() {
        Test.create_ui(AppData.many_s_choices);
        $('#submit').click(Test.on_submit_click);


    },
    aminute: 20,
    asecond: 0,
    minute: 20,
    second: 0,
    stop: 0,
    timing: function() {
        console.log(Test.minute * 60 + Test.second);
//        for(var i = 0;i < Test.minute*60+Test.second;i ++)
        m = Test.check_time(Test.minute);
        s = Test.check_time(Test.second);
        $('#timer').html("剩余时间为：" + m + ":" + s);
        Test.stop = window.setInterval(function() {
            Test.update_time();
        }, 1000);

    },
    update_time: function() {
        if (Test.second === 0) {
            Test.minute--;
            Test.second = 59;
        }
        else
            Test.second--;
        if (Test.minute === 0 && Test.second === 0)
            Test.on_submit_click();
        m = Test.check_time(Test.minute);
        s = Test.check_time(Test.second);
//        console.log(Test.minute + " " + Test.second);
        $('#timer').html("剩余时间为：" + m + ":" + s);
    },
    check_time: function(time) {
        if (time < 10)
            time = '0' + time;
        return time;
    },
    create_ui: function(dataArray) {
        //绘制界面框架
        $('<div/>', {'id': 'timer'}).appendTo($('#panel'));
        $('<div/>', {'id': 'test-question'}).appendTo($('#panel'));
        $('<button/>', {'id': 'submit', 'html': '提交','style':'margin-left:150px;'}).appendTo($('#panel'));

        var div_id = 'test-question';
        var $wrapper = $('#' + div_id).empty();
        var i = 0;
        var item_id = "item";
        for (i = 0; i < dataArray.length; i++) {
            var data = dataArray[i];
            //1 body
            $('<div/>', {'id': 'single-choice-body' + i, html: i + 1 + "." + data.body}).appendTo($wrapper);
            //2 选项
            var $choices = $('<ol/>', {type: 'A'}).appendTo($wrapper);
            var j = 0;
            $.each(data.choices, function() {
                //this = {text: '0', is_key: false, feedback: 'wrong'}

                var $li = $('<li/>').appendTo($choices);
                $('<input/>', {name: item_id + i,
                    'type': 'radio',
                    'data-is-key': this.is_key,
                    'feedback': this.feedback,
                    'id': item_id + i + j,
                    'order': j
                }).appendTo($li);
                $('<label/>', {html: this.text, for : item_id + i + j}).appendTo($li);
                j++;
            });
        }
        Test.timing();
    }
};



