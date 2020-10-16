window.addEventListener("load", ()=>{
    const canvas = document.querySelector("#textLayer");
    const ctx = canvas.getContext("2d");

    if(canvas.getContext){
        // //window size
        // canvas.width = 450;
        // canvas.height = 160;

        // var w = canvas.getBoundingClientRect().width - 450;
        // var h = canvas.getBoundingClientRect().height - 160;
        // canvas.width = canvas.getBoundingClientRect().width - w;
        // canvas.height = canvas.getBoundingClientRect().height - h;
        resize();

        
        //initial variables
        var width = document.querySelector('#name').borderWidth;
        var color = window.getComputedStyle(document.getElementById('name'), "").getPropertyValue("background-color");
        // ctx.imageSmoothingEnabled = !1;
        // ctx.filter = 'url(#remove-alpha)';
        ctx.translate(0.5, 0.5);

        const userColors = [
                    ["#B8B8F0", "#121592"],//ppl
                    ["#FEA1A1", "#AF2121"],//red
                    ["#8CF1BA", "#0d793d"],//grn
                    ["#feb588", "#e34400"],//org
                    ["#76dff2", "#086e9a"]//blu
                    ];

        function resize() {
            var w = canvas.getBoundingClientRect().width - 450;
            var h = canvas.getBoundingClientRect().height - 160;
            canvas.width = canvas.getBoundingClientRect().width - w;
            canvas.height = canvas.getBoundingClientRect().height - h;
        }

        

        for(let i = 32; i < 160; i += 32){
            ctx.beginPath();
            ctx.strokeStyle = color;
            ctx.moveTo(0, i);
            ctx.lineTo(canvas.width, i);
            ctx.stroke();
        }
    }
});