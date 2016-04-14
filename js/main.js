var board = new Array();
var score = 0;
$(document).ready(function() {
	newgame();
})

function newgame() {
	//初始化棋盘格
	init();
	//在随机2个各自生成数字
	generateOneNumber();
	generateOneNumber();
	score = 0;

}

function init() {
	for (var i = 0; i < 4; i++) {
		for (var j = 0; j < 4; j++) {
			var gridCell = $("#grid-cell-"+i+"-"+j);
			gridCell.css('top', getPosTop(i,j));
			gridCell.css('left', getPosLeft(i,j));
		}
	}

	for (var i = 0; i < 4; i++) {
		board[i]=new Array();
		for (var j = 0; j < 4; j++) {
			board[i][j] = 0;
		}
	}

	updateBoardView();
}

function getPosTop(i,j) {
	return 20+120*i;
}

function getPosLeft(i,j) {
	return 20+120*j;
}
function updateBoardView() {
	$(".number-cell").remove();
	for (var i = 0; i < 4; i++) {
		for (var j = 0; j < 4; j++) {
			$("#grid-container").append('<div class="number-cell" id="number-cell-'+i+'-'+j+'">');
			var theNumberCell = $("#number-cell-"+i+"-"+j+"");
			if (board[i][j] == 0) {
				theNumberCell.css('width','0px');
				theNumberCell.css('height','0px');
				theNumberCell.css('top',getPosTop(i,j) + 50);
				theNumberCell.css('left',getPosLeft(i,j) + 50);
			} else {
				theNumberCell.css('width','100px');
				theNumberCell.css('height','100px');
				theNumberCell.css('top',getPosTop(i,j));
				theNumberCell.css('left',getPosLeft(i,j));
				theNumberCell.css('background-color',getNumberBackgroundColor(board[i][j]));
				theNumberCell.css('color',getNumberColor(board[i][j]));
				console.log(board[i][j]);
				console.log(theNumberCell);
				theNumberCell.text(board[i][j]);
			}
		}
	}
}

function getNumberBackgroundColor(number) {
	switch(number) {
		case 2:
			return "#eee4da";
			break;
		case 4:
			return "#ede0c8";
			break;
		case 8:
			return "#f2b179";
			break;
		case 16:
			return "#f59563";
			break;
		case 32:
			return "#f67c5f";
			break;
		case 64:
			return "#f65e3b";
			break;
		case 128:
			return "#edcf72";
			break;
		case 256:
			return "#edcc61";
			break;
		case 512:
			return "#9c0";
			break;
		case 1024:
			return "#33b5e5";
			break;
		case 2048:
			return "#09c";
			break;
		case 4096:
			return "#a6c";
			break;
		case 8192:
			return "#93c";
			break;
	}

	return "black";
}
//获取数字颜色
function getNumberColor(number) {
	if (number <= 4) {
		return "#776e65";
	}
	return "white";
}
//生成数字
function generateOneNumber() {
	if (nospace(board)) {
		return false;

	} else {
		var randx = parseInt(Math.floor(Math.random()*4));
		var randy = parseInt(Math.floor(Math.random()*4));
		while(true){
			if (board[randx][randy] == 0) {
				break;
			} 
			randx = parseInt(Math.floor(Math.random()*4));
			randy = parseInt(Math.floor(Math.random()*4));
		}
		var randNumber = Math.random() < 0.5 ? 2 : 4;
		board[randx][randy] = randNumber;
		console.log(randx+"--"+randy);
		showNumberAnimate(randx,randy,randNumber);
		return true;
	}
}

//检测是否还有空间
function nospace(board) {
	var nospaceFlag = true; 
	for (var i = 0; i < 4; i++) {
		for (var j = 0; j < 4; j++) {
			if (board[i][j] == 0) {
				nospaceFlag = false;
			}
		}
	}
	return nospaceFlag;
}

//数字显示
function showNumberAnimate(x,y,randNumber) {
	$("#number-cell-"+x+"-"+y+"").text(randNumber);
	$("#number-cell-"+x+"-"+y+"").css('top',getPosTop(x,y));
	$("#number-cell-"+x+"-"+y+"").css('left',getPosLeft(x,y));
	$("#number-cell-"+x+"-"+y+"").css('width','100px');
	$("#number-cell-"+x+"-"+y+"").css('height','100px');
	$("#number-cell-"+x+"-"+y+"").css('background-color',getNumberBackgroundColor(randNumber));
}

//检测键盘
$(document).keyup(function(event) {
	event = event || window.event;
	moveAction(event);
})

//移动操作
function moveAction() {
	switch(event.keyCode) {
		case 37:
			moveLeft();
			break;
		case 38:
			moveTop();
			break;
		case 39:
			moveRight();
			break;
		case 40:
			moveBottom();
		default:
			break;
	}
	$("#score").text(score);
	generateOneNumber();
}

//左移
function moveLeft() {
	moveLeftFunc()
}

//上移
function moveTop() {
	moveTopFunc();
}

//右移
function moveRight() {
	moveRightFunc()
}

//下移
function moveBottom() {
	moveBottomFunc()
}
//按住向left的按钮
function moveLeftFunc() {
	var temp = 0;
	for (var i = 0; i < 4; i++) {
		board[i] = SortLorT(board[i]);
	}
	updateBoardView();
}
//按住向上的按钮
function moveTopFunc() {
	var temp = 0;
	arrayResert(board);
	for (var i = 0; i < 4; i++) {
		board[i] = SortLorT(board[i]);
	}
	arrayResert(board);
	updateBoardView();
}
//按住向右的按钮
function moveRightFunc() {
	var temp = 0;
	for (var i = 0; i < 4; i++) {
		board[i] = SortRorB(board[i]);
	}
	console.log(board)
	updateBoardView();
}
//按住向下的按钮
function moveBottomFunc() {
	var temp = 0;
	arrayResert(board);
	for (var i = 0; i < 4; i++) {
		board[i] = SortRorB(board[i]);
	}
	arrayResert(board);
	updateBoardView();
}
//向上或者向左移动计算
function SortLorT(arr) {
	for (var k = 0; k < arr.length; k++) {
		var c = k;
		if (arr[k]!=0) {
			for (var m = k+1; m < arr.length; m ++) {
				if (arr[m] != 0) {
					if(arr[c] == arr[m]) {
						arr[c] = arr[c] - 0 + arr[m];
						score += arr[c];
						arr[m] = 0;
						break;
					} else {
						c = m;
					}
				}
			}
		}
	}
	var temp = null;
	for (var i = 0; i < arr.length; i++) {
		for (var j = 0; j < arr.length-1; j++) {
			if (arr[j] == 0) {
				temp = arr[j];
				arr[j] = arr[j+1];
				arr[j+1] = temp;
			}
		}
	}
	return arr;
}
//向右或者向下移动计算
function SortRorB(arr) {
	// var arr = [2,0,2,0,0,2,0];
	for (var k = arr.length - 1; k >= 0; k--) {
		var c = k;
		if (arr[k]!=0) {
			for (var m = k-1; m >= 0; m --) {
				if (arr[m] != 0 && m >= 0) {
					if(arr[c] == arr[m]) {
						arr[c] = arr[c] - 0 + arr[m];
						score += arr[c];
						arr[m] = 0;
						break;
					} else {
						c = m;
					}
				}
			}
		}
	}
	var temp = null;
	for (var i = arr.length -1 ; i >= 0; i--) {
		for (var j = arr.length-1; j >= 0; j--) {
			if (arr[j] == 0 && j-1 >=0) {
				temp = arr[j];
				arr[j] = arr[j-1];
				arr[j-1] = temp;
			}
		}
	}
	return arr;
	// console.log(arr);
}

//矩阵对角交换
function arrayResert(arr){
	var temp = null; 
	for (var i = 0; i < arr.length; i++) {
		for (var j = i; j < arr.length; j++) {
			if (i != j) {
				temp = arr[i][j];
				arr[i][j] = arr[j][i];
				arr[j][i] = temp;
			}
		}
	}
	return arr;
}

//计算分数
