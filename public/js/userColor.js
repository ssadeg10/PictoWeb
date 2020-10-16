const userColors = [
    ["#B8B8F0", "#121592"],//ppl
    ["#FEA1A1", "#AF2121"],//red
    ["#8CF1BA", "#0d793d"],//grn
    ["#feb588", "#e34400"],//org
    ["#76dff2", "#086e9a"]//blu
    ];

    for (let i = 0; i < 5; i++) {
        var c1 = userColors[i][0];
        var c2 = userColors[i][1]
        $(".c"+(i+1).toString()).css("backgroundColor", c1)
                                .css("borderColor", c2)
                                .css("borderWidth", 1);
        
        // $(".c"+(i+1).toString()+":active")
        //     .css("backgroundColor", "red")
        //     .css("borderColor", "#red");
        // $(".c"+(i+1).toString()+":focus")
        //     .css("backgroundColor", "red")
        //     .css("borderColor", "#red");
        // $(".c"+(i+1).toString()+".focus")
        //     .css("backgroundColor", "red")
        //     .css("borderColor", "#red");
    }

    var group = $('.rbColor');

    group.change(function(){ //preserves visisble checked state
        var selected = "."+$('input[name=color]:checked').prop('id');
        // console.log(selected);
        group.css("borderWidth", 1);
        $(selected).css("borderWidth", 2);
    });

    $(".c1").button('toggle'); //default
