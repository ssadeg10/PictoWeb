const userColors = [
    ["#B8B8F0", "#121592"],//ppl
    ["#FEA1A1", "#AF2121"],//red
    ["#8CF1BA", "#0d793d"],//grn
    ["#feb588", "#e34400"],//org
    ["#76dff2", "#086e9a"]//blu
    ];

function formatColor(color){
    var i;
    switch(color){
        case 'purple':
            i = 0; break;
        case 'red':
            i = 1; break;
        case 'green':
            i = 2; break;
        case 'orange':
            i = 3; break;
        case 'blue':
            i = 4; break;
    
        default:
            break;
    }

    return{
        primary: userColors[i][1],
        secondary: userColors[i][0]
    }
}

module.exports = formatColor;