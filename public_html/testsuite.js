$(document).ready(function() {
    var dataroot = "b.json";
    $.getJSON(dataroot, function(data) {
        $.each(data, function(entryindex, entry) {
            AppData.many_s_choices.push(entry);
        });
        
    });
    alert("读取原始数据完毕！");
});

var AppData = {
    json_string: '',
    get_schoice_by_index: function(index) {
        return AppData.many_s_choices[index];
    },
    add_schoice: function(data) {
        AppData.many_s_choices.push(data);
    },
    update_schoice: function(index, data) {
        AppData.many_s_choices[index] = data;
    },
    many_s_choices: []
};




