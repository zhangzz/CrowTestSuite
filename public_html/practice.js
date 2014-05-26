$(document).ready(function() {
    Practice.on_doc_ready();
});

var Practice = {
    on_doc_ready: function() {
        $('#btn-next').click(Practice.on_btn_next_click);
        $('#btn-prev').click(Practice.on_btn_prev_click);
        Practice.init();
    },
    init: function() {
        Practice.current_item_index = 0;
        Practice.show_current_item();
    },
    current_item_index: 0,
    show_item_count: function() {
        var current_number = Practice.current_item_index + 1;
        $('#item-count').text("共"+AppData.many_s_choices.length+"题，当前是第"+current_number+"题");
    },
    show_current_item: function() {
        var item = AppData.many_s_choices[Practice.current_item_index];
        Practice.create_ui(item, 'one-item');
        Practice.show_item_count();
    },
    item_next: function() {
        if (AppData.many_s_choices.length > Practice.current_item_index + 1) {
            Practice.current_item_index++;
        }
    },
    item_prev: function() {
        if (Practice.current_item_index > 0) {
            Practice.current_item_index--;
        }
    },
    create_ui: function(data, div_id) {
        var $wrapper = $('#' + div_id).empty();
        var item_id = "every_choice";
        //1 body
        $('<div/>', {'class': 'single-choice-body', html: data.body,style:"color:black"}).appendTo($wrapper);
        //2 选项
        var $choices = $('<ol/>',{type: 'A'}).appendTo($wrapper);
        var j = 0;
        $.each(data.choices, function() {
            //this = {text: '0', is_key: false, feedback: 'wrong'}
            var $li = $('<li/>').appendTo($choices);
            $('<input/>', {name: item_id,
                'type': 'radio',
                'data-is-key': this.is_key,
                'data-feedback': this.feedback,
                'id':j
            }).appendTo($li);
            $('<label/>', {html: this.text,for:j}).appendTo($li);
            j++;
        });
        //3 反馈信息
        var $div_feedback = $('<div/>',{style:"color:red;font-size:2em;font-weight:bold"}).appendTo($wrapper);
        //3 加交互
        $('input[type=radio][name=' + item_id + ']').click(function() {
            //alert('s');
            var $me = $(this);
            var is_key = $me.attr('data-is-key');
            var feedback = $me.attr('data-feedback');
            //if(is_key=)
            $div_feedback.html(feedback);
        });
    },
    on_btn_next_click: function() {
        Practice.item_next();
        Practice.show_current_item();
    },
    on_btn_prev_click: function() {
        Practice.item_prev();
        Practice.show_current_item();
    },
};

