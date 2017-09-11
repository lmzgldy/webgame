window.onload=function(){
	var chooseNumBar=document.getElementById("numChooseTable");
	for(var index in chooseNumBar.childNodes)
		if(chooseNumBar.childNodes[index].nodeType==1)
		{
			var nums=chooseNumBar.childNodes[index].childNodes[0].childNodes;
			for(var num in nums)
			{
				if(nums[num].nodeType==1)
					nums[num].onclick=function(){
						for(var sib in this.parentNode.childNodes)
							if(this.parentNode.childNodes[sib].nodeType==1)
								this.parentNode.childNodes[sib].className="";
						this.className="cur";
						curNum=this.innerHTML;
					}
			}
		}
}
var curNum=1;
var primaryData=new Array(9);
primaryData[0]=[7,8,6,5,4,1,2,9,3];
primaryData[1]=[4,2,1,3,6,9,8,5,7];
primaryData[2]=[5,3,9,8,7,2,4,6,1];
primaryData[3]=[9,6,8,2,3,7,5,1,4];
primaryData[4]=[2,4,3,6,1,5,7,8,9];
primaryData[5]=[1,5,7,4,9,8,3,2,6];
primaryData[6]=[6,7,2,9,8,4,1,3,5];
primaryData[7]=[8,9,4,1,5,3,6,7,2];
primaryData[8]=[3,1,5,7,2,6,9,4,8];
var primaryWhisk=[1,2,3,4,5,6,7,8,9];
function createGameData(){
	var whisk=getWhisk();
	for(var i=0;i<9;i++)
		for(var j=0;j<9;j++)
			primaryData[i][j]=getNewNum(primaryData[i][j],whisk);
	return primaryData;
}
function getNewNum(oldNum,whisk){
	for(var i=0;i<whisk.length;i++)
		if(whisk[i]==oldNum)
			return whisk[(i+1)%whisk.length];
	return -1;
}
function getWhisk(){
	var p1,p2,temp;
	for(var i=0;i<4;i++)
	{
		p1=parseInt(Math.random()*9);
		p2=parseInt(Math.random()*9);
		temp=primaryWhisk[p1];
		primaryWhisk[p1]=primaryWhisk[p2];
		primaryWhisk[p2]=temp;
	}
	return primaryWhisk;
}
function getPositions(positionCount)
{
	var positions=new Array();
	var position;
	for(var i=0;i<positionCount;i++)
	{
		position=parseInt((Math.random()*9))%8;
		positions.push(position);
	}
	return positions;
}
function isHole(nowPosition,holePositions)
{
	for(var i=0;i<holePositions.length;i++)
		if(holePositions[i]==nowPosition)
			return true;
	return false;
}
var dataArr;
function newGame()
{
	var playContent=document.getElementById("playContent");
	playContent.innerHTML="";//Çå¿ÕÆåÅÌ
	dataArr=createGameData();
	for(var i=0;i<9;i++)
	{
		var holeCount=parseInt((Math.random()*5));
		var holePositions=getPositions(holeCount);
		var strHtml="<tr>";
		for(var j=0;j<9;j++)
		{
			var className="area"+parseInt(i/3)+parseInt(j/3);
			if(isHole(j,holePositions))
				strHtml=strHtml+'<td class="hole '+className+'" onclick="fill(this)" id="cell'+i+j+'"></td>';
			else
				strHtml=strHtml+'<td class="'+className+'" id="cell'+i+j+'">'+dataArr[i][j]+'</td>';
		}
		strHtml+="</tr>";				
		playContent.innerHTML+=strHtml;
	}
}
function fill(sender)
{
	if(sender.innerHTML==curNum)
	{
		sender.innerHTML="";
		return;
	}
	var playContent=document.getElementById("playContent");
	var cells=playContent.getElementsByTagName("td");
	var isCanFill=true;
	var i=0;
	for(i=0;i<cells.length;i++)
		if(sender.className.match(cells[i].className)||cells[i].id.match(sender.id.substr(0,sender.id.length-1))||cells[i].id.charAt(cells[i].id.length-1)==sender.id.charAt(sender.id.length-1))
			if(cells[i].innerHTML==curNum)
			{
				isCanFill=false;
				setTimeout("reset('"+cells[i].id+"','"+cells[i].style.backgroundColor+"')",2000);
				cells[i].style.color="white";
				cells[i].style.backgroundColor="red";
			}
	if(isCanFill)
		sender.innerHTML=curNum;
	for(i=0;i<cells.length;i++)
		if(cells[i].innerHTML=="")
			return;
	alert("success");
}
function reset(id,oldBc)
{
	document.getElementById(id).style.color="black";
	document.getElementById(id).style.backgroundColor=oldBc;
}
function resetGame(){
	var playContent=document.getElementById("playContent");
	var cells=playContent.getElementsByTagName("td");
	for(i=0;i<cells.length;i++)
	if(cells[i].className.match("hole"))
		cells[i].innerHTML="";
	}
function showAnswer()
{
	var playContent=document.getElementById("playContent");
	var cells=playContent.getElementsByTagName("td");
	for(var i=0;i<9;i++)
	{
		for(var j=0;j<9;j++)
		{
			if(cells[i*9+j].className.match("hole"))
		cells[i*9+j].innerHTML=dataArr[i][j];
		}
	}
}