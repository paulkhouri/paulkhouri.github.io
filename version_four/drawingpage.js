console.log("testobject js called")


class DrawingPage{
    constructor(canvas, x, y, w, h){

        this.xMouse = 0;
        this.yMouse = 0;
        this.xMouseStart = 0;
        this.yMouseStart = 0;
  

        this.x=x;
        this.y=y;
        this.w = w;
        this.h = h;

        this.objectSet = [];


        this.element = canvas;
        this.element.addEventListener('mousedown', this.mDown.bind(this));
        this.element.addEventListener('mousemove', this.mMove.bind(this));
        this.element.addEventListener('mouseup', this.mUp.bind(this));

        this.dragging = false;

        this.xSRound = 0
        this.ySRound = 0
        this.xMRound = 0
        this.yMRound = 0

        this.xN = 16
        this.yN = 20

    }

    mDown(e){
        this.xMouseStart= e.offsetX;
        this.yMouseStart = e.offsetY;
        if(this.boundaryCheck(this.xMouse, this.yMouse, this.x, this.y, this.w, this.h)){
            this.dragging = true;
        }
        console.log(Button.shape);

        this.grid_round(16,5)
        this.grid_round(this.xMouseStart, this.w/this.xN)
        this.grid_round(this.yMouseStart, this.h/this.yN)
    



    }

    mMove(e){
        this.xMouse= e.offsetX;
        this.yMouse = e.offsetY;
        if(!this.boundaryCheck(this.xMouse, this.yMouse, this.x, this.y, this.w, this.h)){
            if(this.dragging){
                if(this.xMouse < this.x){
                    this.xMouse = this.x;
                }
                if(this.xMouse > this.x + this.w){
                    this.xMouse = this.x + this.w;
                }
                if(this.yMouse < this.y){
                    this.yMouse = this.y;
                }
                if(this.yMouse > this.y + this.h){
                    this.yMouse = this.y+this.h;
                }

            }
            
            
            //this.dragging = false;
        }
 
    }

    mUp(e){
        if(this.dragging){
            if(Button.shape == "Rectangle"){
                //MoveRectangle xS, yS, xM, yM, col, canvas
                if(!GridButton.on){
                this.objectSet.push(new MoveRectangle(this.xMouseStart, this.yMouseStart, this.xMouse, this.yMouse, Swatch.colour, canvas))
                }else{
                    this.objectSet.push(new MoveRectangle(this.xSRound, this.ySRound, this.xMRound, this.yMRound, Swatch.colour, canvas))
                }
            }else if(Button.shape == "Ellipse"){
                if(!GridButton.on){
                    this.objectSet.push(new Ellipse(this.xMouseStart, this.yMouseStart, this.xMouse, this.yMouse, Swatch.colour, canvas))
                    }else{
                        this.objectSet.push(new Ellipse(this.xSRound, this.ySRound, this.xMRound, this.yMRound, Swatch.colour, canvas))
                    }

            }
        }
        this.dragging = false;
    }

    update(){
        //------------background
        this.draw();
        //-------------- grid
        if(GridButton.on){
        this.grid(this.x, this.y, this.w, this.h, this.xN, this.yN)
        }


        //-------------------------
        for(var i=0; i<this.objectSet.length; i++){
            this.objectSet[i].update();
        }
        if(this.dragging && Button.shape != "Move"){
            var w = this.xMouse - this.xMouseStart;
            var h = this.yMouse - this.yMouseStart;
           
            this.xSRound = this.grid_round(this.xMouseStart, this.w/this.xN)
            this.ySRound = this.grid_round(this.yMouseStart, this.h/this.yN)
            this.xMRound = this.grid_round(this.xMouse, this.w/this.xN)
            this.yMRound = this.grid_round(this.yMouse, this.h/this.yN)
            if(GridButton.on){
                this.drawRect(this.xSRound, this.ySRound, this.xMRound - this.xSRound, this.yMRound - this.ySRound, "rgba(0,255,255,1)", false);
            }else{
                this.drawRect(this.xMouseStart, this.yMouseStart, w, h, "rgba(255,255,0,1)", false);
            }

        }
        
       


    }

    draw(){
        this.drawRect(this.x, this.y, this.w, this.h, "rgba(255,255,255,0.8)", true);



    }
// takes x, y, one colour and true for fill (false means stroke)
    drawRect(x,y, w,h,col,fbool){
        ctx.beginPath();
        ctx.rect(x, y, w,h);
        ctx.lineWidth = 1;
        if(!fbool){
            ctx.strokeStyle = col;
            ctx.stroke();
        }else{
            ctx.fillStyle = col;
            ctx.fill();
    }
        
    }
// takes x, y, one colour and true for fill (false means stroke)
    boundaryCheck(xM, yM, x, y, w, h){
        if(xM>x && xM<x+w && yM>y && yM < y+h){
            return true;
        }else{
            return false;
        }
    }

    grid(x,y,w,h,xN, yN){
    
        var xTick = w/xN;
        var yTick = h/yN;
        ctx.strokeStyle = "rgba(0,0,0, 0.2)";
        for(var i=0 ; i <= xN ; i++){
            ctx.beginPath();
            ctx.moveTo(x+ i*xTick, y);
            ctx.lineTo(x+ i*xTick, y+h);
            ctx.lineWidth = 0.5;
            ctx.stroke();
        }

        for(var j=0 ; j <= yN ; j++){
            ctx.beginPath();
            ctx.moveTo(x, y+j*yTick);
            ctx.lineTo(x+ w, y+j*yTick);
            ctx.lineWidth = 0.5;
            ctx.stroke();
        }


    }

    grid_round(M,N){
        var rounded = N*Math.round(M/N)
        return rounded


    }


}