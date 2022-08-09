var resolution = 50;
var x = 0;
var y = 0;
const right =   [0,1,1,1];
const down =    [1,0,1,1];
const left =    [1,1,0,1];
const up =      [1,1,1,0];
const blank =   [0,0,0,0];
var ifright = true, ifdown = true, ifleft= true, ifup = true, ifblank = true;
var powtorzenia = 0;


function Random(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
  }
  //thx mozilla.org
  
document.addEventListener("DOMContentLoaded", function(){


    while (x < resolution){
        document.getElementById('table').innerHTML += "<tr></tr>";
        x++;
    }
    x = 0;
    while (x < resolution){
        while (y < resolution){
            document.getElementsByTagName('tr').item(y).innerHTML += "<td><div class='cell' id='cell_"+x+"_"+y+"'></div></td>"
            document.getElementById('cell_'+x+'_'+y).style.width = ((1/(resolution)) * 100) +"vw";
            document.getElementById('cell_'+x+'_'+y).style.height = ((1/(resolution)) * 100) +"vw";
            document.getElementById('cell_'+x+'_'+y).style.fontSize = ((1/(resolution)) * 100) +"vw";
            y++
        }
        y = 0;
        x++;
    }

    x = 0;
    y = 0;

    var RandomStartX = Random(0, resolution-1);
    var RandomStartY = Random(0, resolution-1);
    var RandomStartRotation = Random(0, 3);
    document.getElementById('cell_'+RandomStartX+'_'+RandomStartY).innerHTML = "<img class='img' src='t.png'>";
    document.getElementById('cell_'+RandomStartX+'_'+RandomStartY).style.transform = "rotate("+90*RandomStartRotation+"deg)";
    /*
                 1          

                 |             
            0    |–––    1  
                 |          

                 1        
    */
    let cells = new Array(resolution);

    for (var i = 0; i < cells.length; i++) {
        cells[i] = new Array(resolution);
        for (var o = 0; o < cells[i].length; o++) {
            
            cells[i][o] = [0,[0,0,0,0,0]];
            if (i != RandomStartX || o != RandomStartY){
                //document.getElementById('cell_'+i+'_'+o).innerHTML = cells[i][o][1].length;
            }
            
            // each cell's array looks like this:
            // [(1-4 rotation, 5 blank cell and 0 if unknown), [possible states] (.lenth() = is entropy)]
            }

      }

    cells[RandomStartY][RandomStartX][0] = RandomStartRotation+1;
    cells[RandomStartY][RandomStartX][1] = 0;

    // let's check closest cells entropy
    var CellX = RandomStartX;
    var CellY = RandomStartY;
    var Entropy_checkerX = CellX;
    var Entropy_checkerY = CellY;
    

    const interval = setInterval(() => {
        
            mainLoop();
            
        
    }, 0);
    function mainLoop(){
        powtorzenia++;
        if (powtorzenia > resolution*resolution){
            clearInterval(interval);
        }
        Entropy_checkerX = CellX;
        Entropy_checkerY = CellY;
        
        for (var o = 0; o < 4; o++) {
            for (var p = 0, Connectors = new Array(4); p < resolution; p++){
                
            }
                if (o == 0){
                    Entropy_checkerX = CellX-1;
                    Entropy_checkerY = CellY;
                }
                else if (o == 1){
                    Entropy_checkerX = CellX;
                    Entropy_checkerY = CellY-1;
                }
                else if (o == 2){
                    Entropy_checkerX = CellX+1;
                    Entropy_checkerY = CellY;
                }
                else if (o == 3){
                    Entropy_checkerX = CellX;
                    Entropy_checkerY = CellY+1;
                }
                if (1){

                    if (Entropy_checkerX >= 0 && Entropy_checkerX <resolution && Entropy_checkerY >= 0 && Entropy_checkerY <resolution){
                        
                        if (Entropy_checkerX-1 >= 0){
                            if (cells[Entropy_checkerY][Entropy_checkerX-1][0] == 0){Connectors[0] = undefined;}
                            if (cells[Entropy_checkerY][Entropy_checkerX-1][0] == 1){Connectors[0] = 1;}
                            if (cells[Entropy_checkerY][Entropy_checkerX-1][0] == 2){Connectors[0] = 1;}
                            if (cells[Entropy_checkerY][Entropy_checkerX-1][0] == 3){Connectors[0] = 0;}
                            if (cells[Entropy_checkerY][Entropy_checkerX-1][0] == 4){Connectors[0] = 1;}
                            if (cells[Entropy_checkerY][Entropy_checkerX-1][0] == 5){Connectors[0] = 0;}
                        } else {Connectors[0] = undefined;}
        
                        if (Entropy_checkerY-1 >= 0){
                            if (cells[Entropy_checkerY-1][Entropy_checkerX][0] == 0){Connectors[1] = undefined;}
                            if (cells[Entropy_checkerY-1][Entropy_checkerX][0] == 1){Connectors[1] = 1;}
                            if (cells[Entropy_checkerY-1][Entropy_checkerX][0] == 2){Connectors[1] = 1;}
                            if (cells[Entropy_checkerY-1][Entropy_checkerX][0] == 3){Connectors[1] = 1;}
                            if (cells[Entropy_checkerY-1][Entropy_checkerX][0] == 4){Connectors[1] = 0;}
                            if (cells[Entropy_checkerY-1][Entropy_checkerX][0] == 5){Connectors[1] = 0;}
                        } else {Connectors[1] = undefined;}
        
                        if (Entropy_checkerX+1 < resolution){
                            if (cells[Entropy_checkerY][Entropy_checkerX+1][0] == 0){Connectors[2] = undefined;}
                            if (cells[Entropy_checkerY][Entropy_checkerX+1][0] == 1){Connectors[2] = 0;}
                            if (cells[Entropy_checkerY][Entropy_checkerX+1][0] == 2){Connectors[2] = 1;}
                            if (cells[Entropy_checkerY][Entropy_checkerX+1][0] == 3){Connectors[2] = 1;}     
                            if (cells[Entropy_checkerY][Entropy_checkerX+1][0] == 4){Connectors[2] = 1;}
                            if (cells[Entropy_checkerY][Entropy_checkerX+1][0] == 5){Connectors[2] = 0;}
                        } else {Connectors[2] = undefined;}
        
                        if (Entropy_checkerY+1 < resolution){
                            if (cells[Entropy_checkerY+1][Entropy_checkerX][0] == 0){Connectors[3] = undefined;}
                            if (cells[Entropy_checkerY+1][Entropy_checkerX][0] == 1){Connectors[3] = 1;}
                            if (cells[Entropy_checkerY+1][Entropy_checkerX][0] == 2){Connectors[3] = 0;}
                            if (cells[Entropy_checkerY+1][Entropy_checkerX][0] == 3){Connectors[3] = 1;}
                            if (cells[Entropy_checkerY+1][Entropy_checkerX][0] == 4){Connectors[3] = 1;}
                            if (cells[Entropy_checkerY+1][Entropy_checkerX][0] == 5){Connectors[3] = 0;}
                        } else {Connectors[3] = undefined;}
                        //console.log(Connectors);
                        //now compare collected data to possible states, and declare entropy
                        ifright = true, ifdown = true, ifleft= true, ifup = true, ifblank = true;
                        for (var a = 0;a < 4; a++){
                            if (Connectors[a] != undefined){
                                if (Connectors[a] != right[a]){
                                    ifright = false;
                                    
                                }
                                if (Connectors[a] != down[a]){
                                    ifdown = false;
                                }
                                if (Connectors[a] != left[a]){
                                    ifleft = false;
                                }
                                if (Connectors[a] != up[a]){
                                    ifup = false;
                                }
                                if (Connectors[a] != blank[a]){
                                    
                                    ifblank = false;
                                }
                            }
                        }

                        if (ifright){
                            cells[Entropy_checkerY][Entropy_checkerX][1][0] = 1;
                        }else {
                            cells[Entropy_checkerY][Entropy_checkerX][1][0] = 0;
                        }
                        if (ifdown){
                            cells[Entropy_checkerY][Entropy_checkerX][1][1] = 1;
                        }else {
                            cells[Entropy_checkerY][Entropy_checkerX][1][1] = 0;
                        }
                        if (ifleft){
                            cells[Entropy_checkerY][Entropy_checkerX][1][2] = 1;
                        }else {
                            cells[Entropy_checkerY][Entropy_checkerX][1][2] = 0;
                        }
                        if (ifup){
                            cells[Entropy_checkerY][Entropy_checkerX][1][3] = 1;
                        }else {
                            cells[Entropy_checkerY][Entropy_checkerX][1][3] = 0;
                        }
                        if (ifblank){
                            cells[Entropy_checkerY][Entropy_checkerX][1][4] = 1;
                        }else {
                            cells[Entropy_checkerY][Entropy_checkerX][1][4] = 0;
                        }

                        if (cells[Entropy_checkerY][Entropy_checkerX][0] == 0){
                            document.getElementById('cell_'+Entropy_checkerX+'_'+Entropy_checkerY).innerHTML = 
                            cells[Entropy_checkerY][Entropy_checkerX][1][0]+
                            cells[Entropy_checkerY][Entropy_checkerX][1][1]+
                            cells[Entropy_checkerY][Entropy_checkerX][1][2]+
                            cells[Entropy_checkerY][Entropy_checkerX][1][3]+
                            cells[Entropy_checkerY][Entropy_checkerX][1][4];
                        }
                        if (cells[Entropy_checkerY][Entropy_checkerX][1][0]+
                            cells[Entropy_checkerY][Entropy_checkerX][1][1]+
                            cells[Entropy_checkerY][Entropy_checkerX][1][2]+
                            cells[Entropy_checkerY][Entropy_checkerX][1][3]+
                            cells[Entropy_checkerY][Entropy_checkerX][1][4] == 0){
                                //window.location.reload();
                            } 

                        
                        


                    }
                }       
            }
            //alert("kupa");
            var lowest = [5];
            for (var w = 0; w < resolution; w++){
                for (var z = 0; z < resolution; z++){
                    if (cells[z][w][1][0]+cells[z][w][1][1]+cells[z][w][1][2]+cells[z][w][1][3]+cells[z][w][1][4]!=0){
                        if(cells[z][w][1][0]+cells[z][w][1][1]+cells[z][w][1][2]+cells[z][w][1][3]+cells[z][w][1][4]<=lowest[0]){
                            if(cells[z][w][1][0]+cells[z][w][1][1]+cells[z][w][1][2]+cells[z][w][1][3]+cells[z][w][1][4]<lowest[0]){
                                lowest = [
                                    cells[z][w][1][0]+
                                    cells[z][w][1][1]+
                                    cells[z][w][1][2]+
                                    cells[z][w][1][3]+
                                    cells[z][w][1][4]];
                                    //alert (lowest);
                            }

                            lowest.push([w,z]);

                        }
                    }
                    
                }
            }
            var randomCell = Random(1, lowest.length - 1);
            
            var randomRotation = undefined;
            for(var h; randomRotation == undefined;){
                h = Random(0,4);
                
                if (cells[lowest[randomCell][1]][lowest[randomCell][0]][1][h] == 1) {
                    randomRotation = h;
                }
            }

            cells[lowest[randomCell][1]][lowest[randomCell][0]][0] = randomRotation+1;
            if (randomRotation != 4){
            document.getElementById('cell_'+lowest[randomCell][0]+'_'+lowest[randomCell][1]).innerHTML = "<img class='img' src='t.png'>";
            document.getElementById('cell_'+lowest[randomCell][0]+'_'+lowest[randomCell][1]).style.transform = "rotate("+90*randomRotation+"deg)";
            } else if (randomRotation == 4){
                document.getElementById('cell_'+lowest[randomCell][0]+'_'+lowest[randomCell][1]).innerHTML = "<img class='img' src='o.png'>";
            }
            //cells[lowest[randomCell][1]][lowest[randomCell][0]][1] = 0;
            //console.log(lowest);
            cells[lowest[randomCell][1]][lowest[randomCell][0]][1] = 0;
            CellY = lowest[randomCell][1];
            CellX = lowest[randomCell][0];

        //console.log(cells);
        
    }
    
});

