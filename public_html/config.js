
$(document).ready(function() {
    Config.doc_ready();

    //列表框点击题目索引，显示题目
    $('#sel-item-index').change(function() {
        var $me = $(this);
        var index = $me.val();
        var data = AppData.get_schoice_by_index(index);       //最终的题目来源还是在AppData里面
        Config.display_item(data);
    });

    $('#btn-addquestion').click(function() {
        var $sel = $('#sel-item-index');
        var count = AppData.many_s_choices.length;
        $('<option/>', {value: count, text: count+1}).appendTo($sel);
    });

    $('#btn-deletequestion').click(function() {
        var index = $('#sel-item-index').val();
        if (index !== null) {
            AppData.many_s_choices.splice(index, 1);
        }
        else {
        }
        Config.display_item_index();
    });

    $('#btn-save').click(function() {
        var data = {};
        data.body = $('#body').val();
        data.choices = [];
        $('.choice-input').each(function() {   //choice-input是一个类，前面要加.
            var $me = $(this);          //$me仅仅是一个变量名，取成me也没问题
            var s = $me.val();
            var choice = Config.choice_from_string(s);
            if (choice !== null) {
                data.choices.push(choice);
            }
        });
        var index = $('#sel-item-index').val();
        AppData.update_schoice(index, data);
    });

    $('#btn-additem').click(function() {
        var $wrapper = $('#choices');
        var $choice = $('<div/>');
        $('<label/>', {html: "新选项"}).appendTo($choice);
        $('<input/>', {val: this.text, class: 'choice-input'}).appendTo($choice);
        $choice.appendTo($wrapper);
    });

    $('#btn-saveall').click(function() {
        alert(JSON.stringify(AppData.many_s_choices));
    });
});

var Config = {
    doc_ready: function() {
        //alert('ss');
        Config.display_item_index();
        $('#body').val(null);
    },
    display_item: function(data) {
        //题干
        if (data == null) {
            $('#body').val(null);
            $('#choices').empty();
        }
        $('#body').val(data.body);
        for (var i = 0; i < 10; i++) {
            $("#choice_" + i).empty();
        }
        //选项
        var index = 1;
        var $wrapper = $('#choices').empty();
        $.each(data.choices, function() {   //each的另外一种用法$("li").each(function(){});
            var s = Config.choice_to_string(this); //this表示每次循环的那一个choice
            var $choice = $('<div/>');
            $('<label/>', {html: "选项" + index}).appendTo($choice);
            $('<input/>', {val: s, class: 'choice-input'}).appendTo($choice);
            $choice.appendTo($wrapper);
            index++;
        });
    },
    //在select标签里面加<option/>
    display_item_index: function() {
        var $sel = $('#sel-item-index').empty();
        var count = AppData.many_s_choices.length;
        for (var i = 0; i < count; i++) {
            $('<option/>', {value: i, text: i+1}).appendTo($sel);
        }
    },
    choice_to_string: function(choice) {
        return choice.text + '#' + choice.is_key + '#' + choice.feedback;
    },
    choice_from_string: function(s) {
        if (s === null || s === undefined || $.trim(s) === '') {
            return null;
        }
        var parts = s.split('#');
        if (parts.length < 3) {
            return null;
        }

        var obj = {text: parts[0],
            is_key: parts[1],
            feedback: parts[2]};
        return obj;
    }
};

