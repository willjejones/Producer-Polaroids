function positionToCell(x, y){
	return [(Math.floor(x/cellYSize)), (Math.floor(y/cellXSize))]; 
}

function cellToPosition(y, x){
	//Bottom Left Position of cell
	return [(y * cellYSize), (x * cellXSize) + cellXSize];	
}

function renderBoard(ctx, cellXSize, cellYSize){
	
	fontSize = 30;
	if(cellXSize > cellYSize){
		fontSize = cellYSize;
	} else {
		fontSize = cellXSize;
	}

	for(y = 0; y < boardState.cells.length; y++) {
		for(x = 0; x < boardState.cells[y].length; x++){		
			if(boardState.cells[y][x].flag){
				ctx.font = "30px Arial";
				var positions = cellToPosition(y, x);
				ctx.fillStyle = '#FF9800';
				ctx.fillRect(positions[0], positions[1] - cellXSize, cellYSize, cellXSize);
				//ctx.fillText("F",positions[0],positions[1]);
			} else {			
				if(boardState.cells[y][x].view == "shown"){		
					if(boardState.cells[y][x].state == -1){
						ctx.font = fontSize + "px Arial";
						var positions = cellToPosition(y, x);
						//ctx.fillStyle = '#37474F';
						//ctx.fillRect(positions[0], positions[1] - cellXSize, cellYSize, cellXSize);
						ctx.fillStyle = 'white';
						ctx.fillText("\u2622",positions[0] + cellYSize/3.5,positions[1] - cellXSize/8);
					} else if(boardState.cells[y][x].state != 0){						
						numColours = ['black', '#2196F3', '#8BC34A', '#F44336', '#000099', '#990033', '#009999', 'black', '#e6e6ff'];
						ctx.fillStyle = numColours[boardState.cells[y][x].state];				
						ctx.font = fontSize + "px Arial";
						var positions = cellToPosition(y, x);
						ctx.fillRect(positions[0], positions[1] - cellXSize, cellYSize, cellXSize);
						ctx.fillStyle = 'white';
						ctx.fillText(boardState.cells[y][x].state,positions[0] + cellYSize/3.5, positions[1] - cellXSize/8);						
					} else {
						ctx.font = fontSize + "px Arial";
						var positions = cellToPosition(y, x);
						ctx.fillStyle = '#9E9E9E';
						ctx.fillRect(positions[0], positions[1] - cellXSize, cellYSize, cellXSize);
						//ctx.fillText("x",positions[0],positions[1]);
					}					
				}				
			}			
		}
	}
	//ctx.moveTo(0,0);
	//ctx.lineTo(50, 50);
}

function drawBoard() {
	var c = document.getElementById("board");
	var ctx = c.getContext("2d");
	ctx.canvas.width  = window.innerWidth;
	ctx.canvas.height = window.innerHeight;
	/* ctx.beginPath();
	ctx.arc(95,50,40,0,2*Math.PI); */
	boardWidth = window.innerWidth;
	boardHeight = window.innerHeight;
	
	cellYSize = boardWidth/numYCells;
	cellXSize = boardHeight/numXCells;
	
	renderBoard(ctx, cellXSize, cellYSize);
	/* 
	for(y = 1; y <= numYCells; y++){
		startPoint = cellYSize * y;
		ctx.moveTo(startPoint,0);
		ctx.lineTo(startPoint, boardHeight);
	}
	
	for(x = 1; x <= numXCells; x++){
		startPoint = cellXSize * x;
		ctx.moveTo(0,startPoint);
		ctx.lineTo(boardWidth, startPoint);
	} */
	ctx.stroke();
}

function floodFill(x, y){
	//alert(x + ", " + y);
	cell = boardState.cells[x][y];
	if(cell.view == "shown"){
		return;
	}
	if(cell.state == -1){
		return;
	}
	if(cell.state > 0){
		cell.view = "shown";
		return;
	}
	cell.view = "shown";
	if(y < numYCells - 1){
		floodFill(x, y + 1);
	}
	if(y > 0){
		floodFill(x, y - 1);
	}
	if(x > 0){
		floodFill(x - 1, y);
	}
	if(x < numXCells - 1){
		floodFill(x + 1, y);
	}
	return;
}

function checkWin(){
	var winning = true;
	for(y = 0; y < boardState.cells.length; y++) {
		for(x = 0; x < boardState.cells[y].length; x++){
			if(boardState.cells[y][x].state == -1){
				if(boardState.cells[y][x].flag == false){
					winning = false;
				}
			}
		}
	}
	if(winning){
		alert("Congratulations! You Win.");
	}
}

function showBombs(){
	for(y = 0; y < boardState.cells.length; y++) {
		for(x = 0; x < boardState.cells[y].length; x++){
			if(boardState.cells[y][x].state == -1){
				boardState.cells[y][x].view = "shown";
			}
		}
	}
}

function handleCellChoice(x, y, leftClick){

	if(leftClick){	
		switch(boardState.cells[x][y].state){
			case -1:
				showBombs();
				setTimeout(function(){alert("Game Over"), location.reload();}, 800);
				break;				
			case 0:
				floodFill(x, y);
				break;	
		}
		
		if(boardState.cells[x][y].state > 0){
			boardState.cells[x][y].view = "shown";
		}
	} else {
		if(boardState.cells[x][y].flag == false){
			if(flagsLeft > 0){
				if(boardState.cells[x][y].view == "hidden"){
					boardState.cells[x][y].flag = true;
					flagsLeft--;
					if(flagsLeft == 0){
						checkWin();
					}
				}
			} else {
				alert("No more mines left.");
			}
		} else {
			boardState.cells[x][y].flag = false;
			flagsLeft++;
		}
	}
}

function getPosition(event)
{
	var x = event.x;
	var y = event.y;
	var leftClick = true;
	
	if(event.button == 2){
		leftClick = false;
	}

	var canvas = document.getElementById("board");

	x -= canvas.offsetLeft;
	y -= canvas.offsetTop;
	//alert("x:" + x + " y:" + y);
	cell = positionToCell(x, y);
	//alert(cell[0] + ", " + cell[1]);
	handleCellChoice(cell[0], cell[1], leftClick);
}

function setUpBoard(){
	
	for(y = 0; y < numYCells; y++){
		var row = [];
		for(x = 0; x < numXCells; x++){
			var cell = { 
				view: "hidden",
				state: 0,
				flag: false};
			row.push(cell);
		}
		boardState.cells.push(row);
	}
	// Access like this:
	//alert(boardState.cells[0][0].view);
}

function addMines(){
	minesToPlace = numOfMines;
	
	while(minesToPlace != 0){
		
		randomX = Math.floor((Math.random() * 1000)) % numXCells;
		randomY = Math.floor((Math.random() * 1000)) % numYCells;
		
		if(boardState.cells[randomY][randomX].state == 0){
			boardState.cells[randomY][randomX].state = -1;
			minesToPlace--;
			//alert(randomX + ", " + randomY);
		}
	}
}

function createDistanceMatrix(){
	for(y = 0; y < numYCells; y++){
		for(x = 0; x < numXCells; x++){
			distanceMatrix[y][x] = 0;
		}
	}
}

function generateNumbers(){
	for(y = 0; y < numYCells; y++){
		for(x = 0; x < numXCells; x++){
			if(boardState.cells[y][x].state == -1){
				if((x == 0) && (y == 0)){
					if(boardState.cells[y + 1][x].state != -1){
						boardState.cells[y + 1][x].state++;
					}
					if(boardState.cells[y + 1][x + 1].state != -1){
						boardState.cells[y + 1][x + 1].state++;
					}
					if(boardState.cells[y][x + 1].state != -1){
						boardState.cells[y][x + 1].state++;
					}
				} else if((x == numXCells - 1) && (y == numYCells - 1)){
					if(boardState.cells[y - 1][x].state != -1){
						boardState.cells[y - 1][x].state++;
					}
					if(boardState.cells[y - 1][x - 1].state != -1){
						boardState.cells[y - 1][x - 1].state++;
					}
					if(boardState.cells[y][x - 1].state != -1){
						boardState.cells[y][x - 1].state++;
					}
				} else if((x == 0) && (y == numYCells - 1)){
					if(boardState.cells[y - 1][x].state != -1){
						boardState.cells[y - 1][x].state++;
					}
					if(boardState.cells[y - 1][x + 1].state != -1){
						boardState.cells[y - 1][x + 1].state++;
					}
					if(boardState.cells[y][x + 1].state != -1){
						boardState.cells[y][x + 1].state++;
					}
				} else if((x == numXCells - 1) && (y == 0)){
					if(boardState.cells[y + 1][x].state != -1){
						boardState.cells[y + 1][x].state++;
					}
					if(boardState.cells[y + 1][x - 1].state != -1){
						boardState.cells[y + 1][x - 1].state++;
					}
					if(boardState.cells[y][x - 1].state != -1){
						boardState.cells[y][x - 1].state++;
					}
				} else if((x == 0) && (y != 0)){
					if(boardState.cells[y - 1][x].state != -1){
						boardState.cells[y - 1][x].state++;
					}
					if(boardState.cells[y + 1][x].state != -1){
						boardState.cells[y + 1][x].state++;
					}
					if(boardState.cells[y][x + 1].state != -1){
						boardState.cells[y][x + 1].state++;
					}
					if(boardState.cells[y - 1][x + 1].state != -1){
						boardState.cells[y - 1][x + 1].state++;
					}
					if(boardState.cells[y + 1][x + 1].state != -1){
						boardState.cells[y + 1][x + 1].state++;
					}
				} else if((x != 0) && (y == 0)){
					if(boardState.cells[y + 1][x].state != -1){
						boardState.cells[y + 1][x].state++;
					}
					if(boardState.cells[y + 1][x + 1].state != -1){
						boardState.cells[y + 1][x + 1].state++;
					}
					if(boardState.cells[y + 1][x - 1].state != -1){
						boardState.cells[y + 1][x - 1].state++;
					}
					if(boardState.cells[y][x + 1].state != -1){
						boardState.cells[y][x + 1].state++;
					}
					if(boardState.cells[y][x - 1].state != -1){
						boardState.cells[y][x - 1].state++;
					}
				} else if((x == numXCells - 1) && (y != 0)){
					if(boardState.cells[y + 1][x].state != -1){
						boardState.cells[y + 1][x].state++;
					}
					if(boardState.cells[y - 1][x].state != -1){
						boardState.cells[y - 1][x].state++;
					}
					if(boardState.cells[y + 1][x - 1].state != -1){
						boardState.cells[y + 1][x - 1].state++;
					}
					if(boardState.cells[y - 1][x - 1].state != -1){
						boardState.cells[y - 1][x - 1].state++;
					}
					if(boardState.cells[y][x - 1].state != -1){
						boardState.cells[y][x - 1].state++;
					}
				} else if((x != 0) && (y == numYCells - 1)){
					if(boardState.cells[y][x + 1].state != -1){
						boardState.cells[y][x + 1].state++;
					}
					if(boardState.cells[y][x - 1].state != -1){
						boardState.cells[y][x - 1].state++;
					}
					if(boardState.cells[y - 1][x - 1].state != -1){
						boardState.cells[y - 1][x - 1].state++;
					}
					if(boardState.cells[y - 1][x + 1].state != -1){
						boardState.cells[y - 1][x + 1].state++;
					}
					if(boardState.cells[y - 1][x].state != -1){
						boardState.cells[y - 1][x].state++;
					}
				} else {
					if(boardState.cells[y][x + 1].state != -1){
						boardState.cells[y][x + 1].state++;
					}
					if(boardState.cells[y][x - 1].state != -1){
						boardState.cells[y][x - 1].state++;
					}
					if(boardState.cells[y - 1][x - 1].state != -1){
						boardState.cells[y - 1][x - 1].state++;
					}
					if(boardState.cells[y - 1][x + 1].state != -1){
						boardState.cells[y - 1][x + 1].state++;
					}
					if(boardState.cells[y - 1][x].state != -1){
						boardState.cells[y - 1][x].state++;
					}
					if(boardState.cells[y + 1][x - 1].state != -1){
						boardState.cells[y + 1][x - 1].state++;
					}
					if(boardState.cells[y + 1][x + 1].state != -1){
						boardState.cells[y + 1][x + 1].state++;
					}
					if(boardState.cells[y + 1][x].state != -1){
						boardState.cells[y + 1][x].state++;
					}
				}
			}
		}
	}
}

window.onload = function(){
	var c = document.getElementById("board");
	var ctx = c.getContext("2d");
	ctx.canvas.addEventListener("mousedown", getPosition, false);
	setUpBoard();
	addMines();
	generateNumbers();
}

var fps = 60;
var interval = 1000 / fps;
var boardWidth = 500;
var boardHeight = 500;
var numXCells = 20;
var numYCells = 20;
var distanceMatrix = [[]];
var boardState = { cells: [] };
var numOfMines = 40;
var flagsLeft = numOfMines;

//alert(window.innerWidth + " " + window.innerHeight);

function draw() {	
    setTimeout(function() {
        window.requestAnimationFrame(draw);
		drawBoard();
    }, interval);
}

draw();