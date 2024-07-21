function Grafico(context, x, y, tamanhoX, tamanhoY) {
    this.context = context;
    this.x = x;
    this.y = y;
    this.tamanhoX = tamanhoX;
    this.tamanhoY = tamanhoY;
    this.colunas = [];
    this.cores = ["#0B2545", "#8DA9C4", "#000000"];
    this.legendas = ["a", "Engajamento em postagens", "seguidores no LinkedIn"]
}

Grafico.prototype = {
    desenhaEixoX: function() {
        this.context.strokeStyle = "black"; 
        this.context.lineWidth = 3;
        this.context.lineCap = "round";
        this.context.beginPath();
        this.context.moveTo(this.x, this.y + this.tamanhoY);
        this.context.lineTo(this.x + this.tamanhoX, this.y + this.tamanhoY);
        this.context.stroke();
    },
    desenhaEixoY: function() {
        this.context.strokeStyle = "black";
        this.context.lineWidth = 3;
        this.context.lineCap = "round";
        this.context.beginPath();
        this.context.moveTo(this.x, this.y);
        this.context.lineTo(this.x, this.y + this.tamanhoY);
        this.context.stroke();
    },
    desenhaEixos: function() {
        this.desenhaEixoX();
        this.desenhaEixoY();
    },
    desenhaColunas: function() {
        var x = this.x;
        var total_colunas = this.colunas.length;
        var w = this.tamanhoX / total_colunas;
        for (var i in this.colunas) {
            var val = this.colunas[i];
            var color = this.cores[i % this.cores.length];
            this.context.fillStyle = color;
            this.context.fillRect(x, this.y + this.tamanhoY - val, w, val);
            x += w;
        }
    },
    setColunas: function(valores) {
        this.valores = valores;
        this.colunas = valores.map(val => val * this.tamanhoY / 100000);
    },
    mostrarValor: function(x, y) {
        var xPos = this.x;
        var total_colunas = this.colunas.length;
        var w = this.tamanhoX / total_colunas;
        for (var i in this.colunas) {
            if (x > xPos && x < xPos + w) {
                var valor = this.valores[i];
                this.context.clearRect(0, 0, this.context.canvas.width, this.context.canvas.height);
                this.desenhaEixos();
                this.desenhaColunas();
                this.desenhaLegenda();
                this.context.fillStyle = "black";
                this.context.font = "14px Arial";
                this.context.fillText(valor, xPos + w / 2 - 10, this.y + this.tamanhoY - this.colunas[i] - 10); // Exibir valor no topo da coluna
            }
            xPos += w;
        }
    },
    desenhaLegenda: function() {
        var x = this.x;
        var y = this.y + this.tamanhoY + 20;
        var larguraCaixa = 20;
        var alturaCaixa = 20;
        var espaco = 10;
        for (var i in this.legendas) {
            this.context.fillStyle = this.cores[i % this.cores.length];
            this.context.fillRect(x, y, larguraCaixa, alturaCaixa);
            this.context.fillStyle = "black";
            this.context.font = "14px Arial";
            this.context.fillText(this.legendas[i], x + larguraCaixa + espaco, y + alturaCaixa - 5);
            x += larguraCaixa + this.context.measureText(this.legendas[i]).width + espaco + 20;
        }
    }
};

var canvas = document.getElementById('canvas_grafico');
var context = canvas.getContext('2d');

var grafico = new Grafico(context, 50, 50, 400, 350);

var valores = [10000, 29000, 94000];
grafico.setColunas(valores);

grafico.desenhaEixos();
grafico.desenhaColunas();
grafico.desenhaLegenda();

canvas.addEventListener('mousemove', function(event) {
    var rect = canvas.getBoundingClientRect();
    var x = event.clientX - rect.left;
    var y = event.clientY - rect.top;
    grafico.mostrarValor(x, y);
});
