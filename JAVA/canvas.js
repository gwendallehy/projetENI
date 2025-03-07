var c = document.querySelector('#canvas');

var ctx = c.getContext("2d");

function step0() {
    ctx.fillStyle = 'grey';
    ctx.fillRect(0, 10, 130, 10);
    ctx.fillStyle = 'lightgrey';
    ctx.fillText("Faible", 50, 30);

    ctx.fillStyle = 'grey';
    ctx.fillRect(140, 10, 130, 10);
    ctx.fillStyle = 'lightgrey';
    ctx.fillText("Moyen", 190, 30);

    ctx.fillStyle = 'grey';
    ctx.fillRect(280, 10, 130, 10);
    ctx.fillStyle = 'lightgrey';
    ctx.fillText("Fort", 330, 30);

}


function step1() {
    ctx.fillStyle = 'red';
    ctx.fillRect(0, 10, 130, 10);
    

    ctx.fillStyle = 'grey';
    ctx.fillRect(140, 10, 130, 10);
    

    ctx.fillStyle = 'grey';
    ctx.fillRect(280, 10, 130, 10);
    

}

function step2() {
    ctx.fillStyle = 'grey';
    ctx.fillRect(0, 10, 130, 10);
    
    
    ctx.fillStyle = 'orange';
    ctx.fillRect(140, 10, 130, 10);
    

    ctx.fillStyle = 'grey';
    ctx.fillRect(280, 10, 130, 10);
    

}

function step3() {
    ctx.fillStyle = 'grey';
    ctx.fillRect(0, 10, 130, 10);
    

    ctx.fillStyle = 'grey';
    ctx.fillRect(140, 10, 130, 10);
    

    ctx.fillStyle = 'green';
    ctx.fillRect(280, 10, 130, 10);
    

}
