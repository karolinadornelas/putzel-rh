function Grafico(context, x, y, tamanhoX, tamanhoY) {
    //Contexto necessário para desenhar no canvas
    this.context = context;
     //Posição x e y onde o gráfico será desenhado
     this.x = x;
     this.y = y;
     //Tamanho do eixo X
     this.tamanhoX = tamanhoX;
     //Tamanho do eixo Y
     this.tamanhoY = tamanhoY;
     this.colunas = [];
 
 }
 Grafico.prototype = {
     //Método responsável por desenhar o eixo X
     desenhaEixoX: function() {
         this.context.strokeStyle = "black"; 
         this.context.lineWidth = 3;
         this.context.lineCap = "round";
         this.context.beginPath();
         this.context.moveTo(this.x,this.y+this.tamanhoY );
         this.context.lineTo(this.x+this.tamanhoX,this.y+this.tamanhoY );
         this.context.stroke();
 
     },
     //Método responsável por desenhar o eixo y
     desenhaEixoY: function() {
         this.context.strokeStyle = "black";
         this.context.lineWidth = 3;
         this.context.lineCap = "round";
         this.context.beginPath();
         this.context.moveTo(this.x,this.y );
         this.context.lineTo(this.x,this.y+this.tamanhoY );
         this.context.stroke();
 
      },
      //Método responsável por desenhar os dois eixos
      desenhaEixos: function() {
          this.desenhaEixoX();
          this.desenhaEixoY();
      },
      desenhaColunas: function() {
          var x = 0;
          var total_colunas = this.colunas.length;
          var w = this.tamanhoX / total_colunas;
          for (var i in this.colunas) {
              var val = this.colunas[i];
              var color = this.corRandomica();
              this.context.fillStyle = color;
              this.context.fillRect(x,this.tamanhoY - val,w,val);
              x += w;
          }
      },
      setColunas: function(valores){
          for (var i in valores) {
              this.colunas.push(valores[i] * this.tamanhoY / 1000);
          }
      },
      //Retorna o código de uma cor aleatória
      corRandomica: function() {
          var letras = '0123456789ABCDEF'.split('');
          var cor = '#';
          for (var i = 0; i < 6; i++ ) {
               cor += letras[Math.floor(Math.random() * 16)];
          }
          return cor;
      }
  }
 
  var canvas = document.getElementById('canvas_grafico');
  var context = canvas.getContext('2d');
 
  //Criando nosso gráfico
  var grafico = new Grafico(context,0,0,350,350);
 
  var valores = [650, 770, 950];
  grafico.setColunas(valores);
  grafico.desenhaColunas();
  grafico.desenhaEixos();