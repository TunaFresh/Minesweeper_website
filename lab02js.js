// Lab02 - Completion/Marking Chart - remove 'x' if not completed
// Submission Code : 1201_2000_l02
// [ x ] - 70% Base completion working to spec
// [ x ] - 30% Enhancement Total
//     [ x ] - 20% Safe start mode implementation
//     [  ] - 10% Additional Enhancements
//
// Provide detail about any issues with respect to 70% base mark :
//
// 
// Provide detail with respect to your completion of the 10% enhancement of your choice :
//
//

let endrow = 0;
let mines = 0;
let endcol = 0;
let col = 0;
let row = 0;
let gamearr = [];
let gameover = false;
let win = false;
let fclick = true;
let sclick = false;
let exposed = 0;
let winsrc;
let losesrc;
let mineexpose;

function NewGrid(){

    const table = document.createElement(`table`);

    let newRow = 0;
    let newCol = 0;
    
    //table = "<table>";
    
    while(newCol <= endcol)
    {
        
        const tr = document.createElement(`tr`);
        const td = document.createElement(`td`);
        table.appendChild(tr);
        //alert("test");
        //table += "<tr>";
        while(newRow<=endrow)
        {
            tr.appendChild(td);
            //table += "<td>";
            //table += `<button class="gbut" id="+r+","+c+"></button>`;
            //table +=
            //table += "</td>";  
            //rid:r;
            //cid:c;
         //alert("end nest while");
        const button = document.createElement(`button`);
        button.cid = newCol;
        button.rid = newRow;
        button.id = newCol+","+newRow;
        button.class = "gbut";
        
         td.appendChild(button);
            ++newRow;
        }
        //table += "</tr>";
        ++newCol;
        newRow = 0;
    }
    
    //table += "</table>";
    //gbut.style.width = `20px`;
    //gbut.style.height = `20px`;
   // alert('test');
    //document.getElementById("game").innerHTML= table;
    document.getElementById("game").innerHTML= "";
    document.getElementById("game").appendChild(table);
    
    BindGrid();
}

function MoveMine(sCol, sRow)
{
    let startC = parseInt(sCol);
    let startR = parseInt(sRow);
    
    mCol = Math.random()*endcol;
    mRow = Math.random()*endrow;
    mCol = parseInt(mCol);
    mRow = parseInt(mRow);
    while (mCol === sCol && mCol === sRow)
    {
        mCol = Math.random()*endcol;
        mRow = Math.random()*endrow;
        mCol = parseInt(mCol);
        mRow = parseInt(mRow);
    
    }
    gamearr[sCol][sRow].is_mine = false;
    gamearr[mCol][mRow].is_mine = true;

FoundMine();


}


function BindGrid(){
    //alert(endcol);
    for (let c= 0; c<= endcol;++c)
    {
        for (let r=0;r<=endrow;++r)
        {

            gamearr[c][r].Bind();
        }
    }
}

function Cell(col, row)
{
    this.ColorIndex = -1;
    this.is_exposed = false;
    this.highlight = false;
    this.is_mine = false;
    this.adjacent_count = 0;
    this.cRow = row;
    this.cCol = col;

    //start show
    this.Show = function ()
    {
    
    //alert(loc.value);
    let iVal = 0;
    if (this.is_exposed === false)
    {
        iVal = 1;
    }
    else
    {
        if(this.is_mine === false)
        {
            if(adjacent_count === 0)
            {
                //alert('white');
                document.getElementById(this.cCol+","+this.cRow).style.backgroundColor = "white";
                }
            else if (adjacent_count != 0)
            {
                document.getElementById(this.cCol+","+this.cRow).style.backgroundColor = $`adjacent_count`;
                }
        }
        else
        {
            document.getElementById(this.cCol+","+this.cRow).style.backgroundColor = "red";
            //iVal = 2;

        }
        iVal = 0;
    }
    return iVal;
    }//end show
this.Bind = () =>
{
    //let col = this.cid;
    //let row = this.rid;
    //alert(`row${this.row}`);
    //alert(`col${this.col}`);
    
    //discover = Cell(col,row).Show();
    //alert('bind');
    document.getElementById(this.cCol+","+this.cRow).onclick =function(evt) 
    {
        let startsq = false;
        let idname = this.id.split(",");
        let nCol = 0;
        let nRow = 0;
        //alert(`col: ${idname[0]}row: ${idname[1]}`);
        if (fclick === true) 
        {
            startsq = true;
            if(gamearr[idname[0]][idname[1]].is_mine === true)
            {

                MoveMine(idname[0],idname[1]);

            }
            fclick = false;
            CheckCell(idname[0],idname[1]);    

        }
        else
        {
       if(gameover === true)
       {
           EndGame();
       }
       else
       {
        if(evt.shiftKey)
        {
         //alert('shift click');   
           sclick = true;
        }
        else
        {
            sclick = false;
        }

        
        
         
             CheckCell(idname[0],idname[1]);
         
             if(exposed === ((endcol+1) * (1+endrow) - mines) || mineexpose === mines)
             {
                 gameover = true;
                 win = true;
                 EndGame();
                 return;
             } 
            }
    
}
};
   // ShowGrid();
}
    return this;
}

function ShowGrid(){
    let exposedCount = 0;
    for(let c = 0; c<=endcol;++c)
    {
        for(let r=0;r<=endrow;++r)
        {
            gamearr[c][r].Show()
            if (gamearr[c][r].is_exposed === true)
            {
                ++exposedCount;
            }
        }
    }
    if (exposedCount >= endcol*endrow - mines )
    {
        //alert("you win");
        document.querySelector(`#winlose img`).src = winsrc.src;
    }

}
function FoundMine()
{
    for(let c = 0;c<= endcol;++c)
    {
        for(let r = 0; r<= endrow;++r)
        {
            gamearr[c][r].adjacent_count = 0;
        }
    }
    for (let c = 0; c<=endcol;++c)
    {
        for(let r = 0; r<=endrow;++r)
        {
            if(gamearr[c][r].is_mine === false)
            {
                gamearr[c][r].adjacent_count = CountAdj(c,r);
            }
        }
    }
}

function NewGame(){
    document.querySelector(`#winlose img`).src = "";

    const gameSel = document.querySelector(`select`);
    const diff = gameSel.value;
   fclick = true;
    switch(diff)
    {
        case `easy`:
            //alert('easy');
            endcol = 6;
            endrow = 6;
            mines = 6;
            break;
        case `medium`:
            endcol = 12;
            endrow = 12;
            mines = 36;
            //alert('medium');
            break;
        case `hard`:
            endcol = 17;
            endrow = 17;
            mines = 125;
            //alert('hard');
            break;
            
    }
   gamearr = [];
   exposed = 0;
   mineexpose = 0;
   sclick = false;
    for(let c = 0; c<= endcol;++c)
    {  
        let rowArray = [];
        //gamearr.push([]);
        for (let r=0;r<=endrow;++r)
        {
            //alert('hi');
            rowArray.push(new Cell(c,r));
           
        }
        gamearr.push(rowArray);
    }
    newgame = true;
    gameover = false;
    NewGrid();
    RandomCell();
    for (let c = 0; c<=endcol;++c)
    {
        for(let r = 0; r<=endrow;++r)
        {
            if(gamearr[c][r].is_mine === false)
            {
                gamearr[c][r].adjacent_count = CountAdj(c,r);
            }
        }
    }
}

function CountAdj(aCol, aRow)
{
    let count = 0;
   // alert(`aCol ${aCol} aRow${aRow}`);

    for (let c= aCol- 1; c<= aCol+1;++c){

        for (let r= aRow- 1; r<= aRow+1; ++r){

            if (c>=0 && c< endcol && r >= 0 && r <= endrow && ( c != aCol || r != aRow ))
            {
                if (gamearr[c][r].is_mine)
                {
                    ++count;
                }
            }
        }
    }
    return count;
}


function PlayerClick()
{
    document.getElementById(this.col+","+this.row);
   // alert(`${id.value} - id`)

    if(newgame === true)
    {
         //alert(id.value);
         RandomCell();
         newgame = false;
    }
    else
    {
        CheckCell();
    }


}
function CheckCell(ckCol, ckRow){
  
    //let endcond = 
    if(sclick === true)
    {
        if(gamearr[ckCol][ckRow].is_mine === true)
        {
            document.getElementById(ckCol+","+ckRow).style.backgroundColor = "red";
            gamearr[ckCol][ckRow].is_exposed = true;
            ++mineexpose;
            return;   
        }
        else
        {
            gameover = true;
            EndGame();
            return;
        }
    }


    if(ckCol < 0 || ckRow < 0 || ckCol > endcol || ckRow > endrow )
    {
        return;
    }
   
    if(gamearr[ckCol][ckRow].is_exposed === true)
    {
        //alert(`${cols} col`);
        return;
    }
    if(gamearr[ckCol][ckRow].is_mine === true)
    {
        document.getElementById(ckCol+","+ckRow).style.backgroundColor = "red";
        gameover = true;
        EndGame();
        return;
    }
    
    if(gamearr[ckCol][ckRow].adjacent_count != 0)
    {
        document.getElementById(ckCol+","+ckRow).style.backgroundColor = "white";
        
        document.getElementById(ckCol+","+ckRow).innerText = gamearr[ckCol][ckRow].adjacent_count;
        document.getElementById(ckCol+","+ckRow).style.marginBottom = "5px";
        gamearr[ckCol][ckRow].is_exposed = true;
        ++exposed;
        return;
        //alert(`adj test`);
    }
    
  
    gamearr[ckCol][ckRow].is_exposed = true;
    document.getElementById(ckCol+","+ckRow).style.backgroundColor = "white";
    ++exposed;
    
    if(exposed === ((endcol+1) * (1+endrow) - mines))
    {
        gameover = true;
        win = true;
        EndGame();
        return;
    }
    //gamearr[ckCol][ckRow].adjacent_count === 0 && 
   
    CheckCell(parseInt(ckCol),parseInt( ckRow)+1);   //right
    CheckCell(parseInt(ckCol),parseInt( ckRow)-1);  //left
    CheckCell(parseInt(ckCol)+1,parseInt( ckRow));//down
    CheckCell(parseInt(ckCol)-1,parseInt( ckRow));//up
   
}

function RandomCell()
{
   let mineCount = 0;
   let tCol = 0;
   let tRow = 0;
   while(mineCount < mines)
   {
       tCol = Math.random()*endcol;
       tRow = Math.random()*endrow;
       tCol = parseInt(tCol);
       tRow = parseInt(tRow);
       //alert(tRow);
       
           if(gamearr[tCol][tRow].is_mine === false)
           {
               gamearr[tCol][tRow].is_mine = true;
               ++mineCount;
           }
       
   }
}
function EndGame()
{
    if(win === false)
    {
        document.querySelector(`#winlose img`).src = losesrc.src;
    //alert('game over');
    }
    else
    {
        //alert(`u win`);
        document.querySelector(`#winlose img`).src = winsrc.src;
    }
}
function preloadimg(){
    winsrc = new Image();
    losesrc = new Image();
    winsrc.src = "./images/win.png"
    losesrc.src = "./images/lose.png"
    
}

window.onload = function(){
    //medium 16x16
    //hard 25x25
    
    NewGame();
    gameover = false;
    newgame = true;
    preloadimg();

    //alert('test load');

    //document.querySelectorAll(`start`).onclick =
    
    document.getElementById('start').onclick = NewGame;
    //document.querySelectorAll(`#game`).onclick = Testc;
   //document.getElementById('game').onclick = PlayerClick;
   
    
}

