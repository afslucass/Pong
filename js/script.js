var canvas = document.querySelector("#canvas")
var ctx = canvas.getContext('2d')

document.addEventListener('keydown',function(event){
    if(event.keyCode == 38){
        Player1.movY = 'Cima'
    }
    if(event.keyCode == 40){
        Player1.movY = 'Baixo'
    }
})
document.addEventListener('keyup',function(event){
    Player1.movY = 'Parado'
})

var Player1 = {
    WIDTH: 20,
    HEIGHT: 100,
    x: 20,
    y: 200,
    vel: 5,
    movY: 'Parado',
    calculate: function(){
        if(this.movY == 'Cima' && this.y > 0){
            this.y = this.y - this.vel
        }
        if(this.movY == 'Baixo' && this.y < canvas.height - this.HEIGHT){
            this.y = this.y + this.vel
        }
        if(this.movY == 'Parado'){
            this.y = this.y
        }
    },
    draw: function(){
        ctx.beginPath()
        ctx.fillRect(Player1.x,Player1.y,Player1.WIDTH,Player1.HEIGHT)
    }
}

var Ball = {
    WIDTH: 20,
    HEIGHT: 20,
    x: canvas.width,
    y: canvas.height/2,
    vel: 5,
    dirX: -1,
    dirY: -1,
    calculate: function(){
        if(this.x < 0){
            this.dirX = 1
            this.vel = 5
            Player1.vel = 5
            Pontuacao.pontos = 0
        }
        if(this.x > canvas.width - 20){
            this.dirX = -1
        }
        if(this.y < 0){
            this.dirY = 1
        }
        if(this.y > canvas.height - 20){
            this.dirY = -1
        }

        if(this.dirX == -1 && this.x <= Player1.x + Player1.WIDTH && Player1.y < this.y + this.HEIGHT && Player1.y + Player1.HEIGHT > this.y ){
            this.dirX = 1
            this.vel += 1
            Player1.vel += 1
            Pontuacao.pontos += 1
        }

        this.x = this.x+this.vel*this.dirX
        this.y = this.y+this.vel*this.dirY
    },
    draw: function(){
        ctx.beginPath()
        ctx.fillRect(this.x,this.y,this.WIDTH,this.HEIGHT)
    }
}

var Pontuacao = {
    pontos: 0,
    draw: function(){
        ctx.beginPath()
        ctx.font = '50px Times New Roman'
        ctx.fillText( this.pontos , canvas.width/1.2, 50)
    }
}

function Process(params) {
    ctx.clearRect(0,0,canvas.width,canvas.height)
    Ball.calculate()
    Player1.calculate()

    Pontuacao.draw()
    Player1.draw()
    Ball.draw()

    window.requestAnimationFrame(Process)
}
Process()

