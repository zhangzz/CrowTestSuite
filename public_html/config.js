
$(document).ready(function() {
    AppConf.doc_ready();

    //列表框点击题目索引，显示题目
    $('#sel-item-index').change(function() {
        var $me = $(this);
        //alert($me.val());
        var index = $me.val();
        var data = AppData.get_schoice_by_index(index);
        AppConf.display_item(data);
    });

    //提交按钮
    $('#btn-save').click(function() {
        var data = {};
        data.body = $('#body').val();
        data.choices = [];
        $('.choice-input').each(function() {
            var $me = $(this);
            var s = $me.val();
            var choice = AppConf.choice_from_string(s);
            if (choice !== null) {
                data.choices.push(choice);
            }
            //console.log($me.val());
        });
        var index=$('#sel-item-index').val();
        AppData.update_schoice(index, data);
    });
});

var AppConf = {
    doc_ready: function() {
        //alert('ss');
        AppConf.display_item_index();
    },
    display_item: function(data) {
        //题干
        $('#body').val(data.body);
        //选项
        var index = 1;
        $.each(data.choices, function() {
            var s = AppConf.choice_to_string(this);
            $('#c' + index).val(s);
            index++;
        });

    },
    display_item_index: function() {
        var $sel = $('#sel-item-index').empty();
        var count = AppData.many_s_choices.length;
        for (var i = 0; i < count; i++) {
            $('<option/>', {value: i, text: i}).appendTo($sel);
        }
    },
    choice_to_string: function(choice) {
        return choice.text + '#' + choice.is_key + '#' + choice.feedback;
    },
    choice_from_string: function(s) {
        if (s === null || s === undefined || $.trim(s) === '') {
            return null;
        }
        //星期一#0#wrong
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
