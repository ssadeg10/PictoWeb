
window.addEventListener("load", ()=>{
    const canvas = document.querySelector("#drawLayer");
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

        //create line dividers
        // ctx.strokeStyle = document.getElementById('name').getAttribute('background-color');
        // for(let i = 0; i < 160; i=i+32){
        //     ctx.moveTo(0, i);
        //     ctx.lineTo(canvas.width, i);
        //     ctx.stroke();
        // }

        let paint = false;

        //initial variables
        var width = 5;
        var color = "#000000";
        ctx.imageSmoothingEnabled = !1;
        ctx.filter = 'url(#remove-alpha)';

        // function startPos(e){
        //     paint = true;
        //     draw(e);
        // }
        // function endPos(e){
        //     paint = false;
        //     ctx.beginPath();
        // }



        // last known position
        var pos = { x: 0, y: 0 };

        function resize() {
            var w = canvas.getBoundingClientRect().width - 450;
            var h = canvas.getBoundingClientRect().height - 160;
            canvas.width = canvas.getBoundingClientRect().width - w;
            canvas.height = canvas.getBoundingClientRect().height - h;
            
            // var name = document.querySelector('#name'); 
            // if(name.offsetHeight <= 35){
            //     // name.style.paddingBottom = '1px';
            // }
        }

        // new position from mouse event
        function setPosition(e) {
            const rect = canvas.getBoundingClientRect();
            pos.x = e.clientX - rect.left;
            pos.y = e.clientY - rect.top;
        }

        // new position from touch event
        function setPositionTouch(e){
            try{
                const rect = canvas.getBoundingClientRect();
                pos.x = e.touches[0].clientX - rect.left;
                pos.y = e.touches[0].clientY - rect.top;
            } catch(err){}
        }
        
        function drawNew(e) {
            // mouse left button must be pressed
            if (e.buttons !== 1) return;
          
            ctx.beginPath(); // begin
          
            ctx.lineWidth = width;
            ctx.strokeWidth = width;
            ctx.lineCap = 'round';
            ctx.lineJoin = 'round';
            ctx.strokeStyle = color;
            
            ctx.moveTo(pos.x, pos.y); // from
            setPosition(e);
            ctx.lineTo(pos.x, pos.y); // to
          
            ctx.stroke();
        }

        function drawNewTouch(e) {
            ctx.beginPath(); // begin
          
            ctx.lineWidth = width;
            ctx.strokeWidth = width;
            ctx.lineCap = 'round';
            ctx.lineJoin = 'round';
            ctx.strokeStyle = color;

            ctx.moveTo(pos.x, pos.y); // from
            setPositionTouch(e);
            ctx.lineTo(pos.x, pos.y); // to
          
            ctx.stroke();
        }

        // function draw(e){
        //     if(!paint) return;

        //     const rect = canvas.getBoundingClientRect();
        //     const x = MouseEvent.clientX - rect.left;
        //     const y = MouseEvent.clientY - rect.top;

        //     ctx.lineWidth = width;
        //     ctx.strokeStyle = color;
        //     ctx.lineCap = "round";

        //     ctx.lineTo(x, y);
        //     ctx.stroke();
        //     ctx.beginPath();
        //     ctx.moveTo(x, y);
            
        // }

        function lineWidth(c){
            switch(c){
                case 'lg':
                    width = 12;
                    break;
                case 'md':
                    width = 5;
                    break;
                case 'sm':
                    width = 2;
                    break;
                default:
                    break;
            }
        }
        function clear(){
            ctx.clearRect(0,0,canvas.width, canvas.height);
            //document.getElementById("canvas").style.display = "none";
        }
        
        function erase(toggle){
            if(toggle){
                ctx.globalCompositeOperation="destination-out";
                color = "#ffffff";
            } else {
                ctx.globalCompositeOperation="source-over";
                color = "#000000";
            }
        }


        function send(){
            var canvasData = canvas.toDataURL();
            document.getElementById('canvasDataHolder').setAttribute("src", canvasData);
            $(document).trigger('canvasSrcAdded');
        }



        //event listeners
        // window.addEventListener('resize', resize);
        // canvas.addEventListener("mouseup", endPos);


        // Canvas desktop mouse event listeners
        canvas.addEventListener("mousedown", setPosition, false);
        canvas.addEventListener("mousemove", drawNew, false);
        canvas.addEventListener("mouseenter", setPosition, false);
        canvas.addEventListener("click", function(){
            ctx.beginPath();
            ctx.fillStyle = color;
            ctx.arc(pos.x, pos.y, width/2, 0, 2 * Math.PI);
            ctx.fill();
        }, false);

        // Canvas mobile touch event listeners
        canvas.addEventListener("touchstart", setPositionTouch, false);
        canvas.addEventListener("touchmove", drawNewTouch, false);
        canvas.addEventListener("touchenter", setPositionTouch, false);
        canvas.addEventListener("touchend", setPositionTouch, false);



        // $('canvas').mousemove(function(e){
        //     if(e.buttons == 1) console.log("y: " + pos.y);
        // });
        // $('canvas').click(()=> console.log("y: " + pos.y));

        document.getElementById("lg").addEventListener('click', ()=> lineWidth('lg'));
        document.getElementById("md").addEventListener('click', ()=> lineWidth('md'));
        document.getElementById("sm").addEventListener('click', ()=> lineWidth('sm'));
        document.getElementById("clear").addEventListener('click', ()=>{
            erase(false)
            clear()
        });
        document.getElementById("erase").addEventListener('click', ()=> erase(true));
        document.getElementById("draw").addEventListener('click', ()=> erase(false));
        document.getElementById("send").addEventListener('click', ()=>{
            send()
            clear()
        });
        // document.getElementById("clone").addEventListener('click', ()=>{
        // });
    }
});