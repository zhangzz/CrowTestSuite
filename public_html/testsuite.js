$(document).ready(function() {
    App.on_doc_ready();


    $('#btn-show-json-data').click(function() {
        //以JSON格式显示题目数据
        var s = JSON.stringify(AppData.many_s_choices);
        alert(s);
    });

    $('#btn-set-item-data').click(function() {
        //以JSON格式设置题目数据
        var json = $('#ta1').val();
        //console.log(json);
        var objs = JSON.parse(json);
        //console.log(objs);
        AppData.many_s_choices = objs;
        SChoiceItems.init();
    });
});


var App = {
    on_doc_ready: function() {
        //alert('ss');
        $('#btn1').click(App.on_btn1_click);
        $('#btn-next').click(App.on_btn_next_click);
        $('#btn-prev').click(App.on_btn_prev_click);
        App._test();
    },
    on_btn1_click: function() {
        //console.log('clickefd');
        var json = JSON.stringify(AppData.single_choice);
        alert(json);
    },
    on_btn_next_click: function() {
        SChoiceItems.item_next();
        SChoiceItems.show_current_item();
    },
    on_btn_prev_click: function() {
        SChoiceItems.item_prev();
        SChoiceItems.show_current_item();
    },
    _test: function() {
        SChoiceItem.create_ui(AppData.single_choice, 'items', 'item1');
        SChoiceItems.show_item_count();
        SChoiceItems.show_current_item();
    }
};

var AppData = {
    json_string: '',
    single_choice: {
        body: '1+1=？',
        choices: [
            {text: '0', is_key: 0, feedback: 'wrong'},
            {text: '1', is_key: 0, feedback: 'wrong'},
            {text: '2', is_key: 1, feedback: 'right'},
            {text: '0', is_key: 0, feedback: 'wrong'}
        ]
    },
    get_schoice_by_index: function(index) {
        return AppData.many_s_choices[index];
    },
    add_schoice: function(data) {
        AppData.many_s_choices.push(data);
    },
    update_schoice: function(index, data) {
        AppData.many_s_choices[index] = data;
    },
    many_s_choices: [
        {
            body: '1+1=？',
            choices: [
                {text: '0', is_key: 0, feedback: 'wrong'},
                {text: '2', is_key: 1, feedback: 'right'},
                {text: '0', is_key: 0, feedback: 'wrong'}
            ]
        },
        {
            body: '今天星期几？',
            choices: [
                {text: '星期一', is_key: 0, feedback: 'wrong'},
                {text: '星期天', is_key: 1, feedback: 'right'},
                {text: '星期三', is_key: 0, feedback: 'wrong'},
                {text: '星期五', is_key: 0, feedback: 'wrong'}
            ]
        },
        {
            type:1,
            body: '1用英语怎么讲？',
            choices: [
                {text: 'one', is_key: 1, feedback: 'right'},
                {text: 'two', is_key: 0, feedback: '错'},
                {text: 'three', is_key: 0, feedback: 'wrong'},
                {text: 'apple', is_key: 0, feedback: 'wrong'}
            ]
        },
        {
            type:2,
            body: '1用英语怎么讲？',
            choices: [
                {text: 'one', is_key: 1, feedback: 'right'},
                {text: 'two', is_key: 0, feedback: '错'},
                {text: 'three', is_key: 0, feedback: 'wrong'},
                {text: 'apple', is_key: 0, feedback: 'wrong'}
            ]
        }
    ]

};

var SChoiceItem = {
    create_ui: function(data, div_id, item_id) {
        var $wrapper = $('#' + div_id).empty();
        //1 body
        $('<div/>', {'class': 'single-choice-body', html: data.body}).appendTo($wrapper);
        //2 选项
        var $choices = $('<ol/>').appendTo($wrapper);
        $.each(data.choices, function() {
            //this = {text: '0', is_key: false, feedback: 'wrong'}
            var $li = $('<li/>').appendTo($choices);
            $('<input/>', {name: item_id,
                'type': 'radio',
                'data-is-key': this.is_key,
                'data-feedback': this.feedback
            }).appendTo($li);
            $('<label/>', {html: this.text}).appendTo($li);
        })
        //3 反馈信息
        var $div_feedback = $('<div/>').appendTo($wrapper);
        //3 加交互
        $('input[type=radio][name=' + item_id + ']').click(function() {
            //alert('s');
            var $me = $(this);
            var is_key = $me.attr('data-is-key');
            var feedback = $me.attr('data-feedback');
            //if(is_key=)
            $div_feedback.html(feedback);
        });
    }
};


var SChoiceItems = {
    init: function() {
        SChoiceItems.current_item_index = 0;
        SChoiceItems.show_current_item();
    },
    current_item_index: 0,
    show_item_count: function() {
        $('#item-count').text(AppData.many_s_choices.length);
    },
    show_current_item: function() {
        var item = AppData.many_s_choices[SChoiceItems.current_item_index];
        SChoiceItem.create_ui(item, 'one-item', 'item11');
    },
    item_next: function() {
        if (AppData.many_s_choices.length > SChoiceItems.current_item_index + 1) {
            SChoiceItems.current_item_index++;
        }
    },
    item_prev: function() {
        if (SChoiceItems.current_item_index > 0) {
            SChoiceItems.current_item_index--;
        }
    },
}

