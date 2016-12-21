
documentReady(function() {
// banner图轮播==========================================================	
	my_widget.slide("banner",true);
// 详情链接栏=========================================================
(function() {
	var aLi=hxsdTool.getByClass(document,'nav-title')[0].getElementsByTagName('li');//标题li
	var oMenuCont=document.getElementById('oMenuCont');//详情菜单盒子
	var aDl=hxsdTool.getByClass(oMenuCont,'nav-text');//所有详情菜单
	var leave_menu=null;//离开右侧 回到左侧
	// 所有标题li绑事件
	for(var i=0; i<aLi.length; i++){
		aLi[i].index=i;//发牌照
		// 标题鼠标移入事件（清除计时器、显示详情菜单）
		aLi[i].onmouseover=function(){
			clearTimeout(leave_menu);
			oMenuCont.style.display="block";
			hxsdTool.removeClass(aLi,"ac");//删除所有li上的ac  
			this.className="ac";//自己增加ac
			//显示相对应的内容(就是选项卡的原理)
			for(var i=0; i<aDl.length; i++){
				aDl[i].style.display="none";
			};
			aDl[this.index].style.display="block";
		};
		// 标题鼠标移出事件（清除计时器、隐藏显示详情菜单）
		aLi[i].onmouseout=function(){
			clearTimeout(leave_menu);
			leave_menu=setTimeout(function(){
				oMenuCont.style.display="none";
				hxsdTool.removeClass(aLi,"ac");//删除所有li上的ac  
			},100)
		};
	};
	// 详情菜单盒子鼠标移入事件（清除计时器、显示）
	oMenuCont.onmouseenter=function(ev){
		clearTimeout(leave_menu);
		this.style.display="block";
	};
	// 详情菜单盒子鼠标移出事件（隐藏）
	oMenuCont.onmouseleave=function(){
			hxsdTool.removeClass(aLi,"ac");//删除所有li上的ac  
			this.style.display="none";
	};
})();
// 详情楼层=========================================================
(function() {
	var floor_title_box=hxsdTool.getByClass(document,'allf-top');//所有楼层标题div
	// for (var i = 0; i < floor_title_box.length; i++) {
	// 	(function(n) {
			var floor_title=hxsdTool.getByClass(floor_title_box[0],'nav')[0].getElementsByTagName('li');//第0个div里所有标题
			var floor=hxsdTool.getByClass(document,'floor');//所有楼
			var floor_text=hxsdTool.getByClass(floor[0],'floor_wrap_right');//第0楼的右边内容div
			for (var i = 0; i < floor_text.length; i++) {
					floor_text[i].style.display='none'
				};
			floor_text[0].style.display='block';
			for (var i = 0; i < floor_title.length; i++) {
				floor_title[i].index=i;
				// 所有标题li的鼠标滑过事件
				floor_title[i].onmouseenter=function() {
					var _this=this;
					for (var i = 0; i < floor_text.length; i++) {
						floor_text[i].style.display='none'
					};
					hxsdTool.removeClass(floor_title,'first');
					this.className=hxsdTool.addClass(_this,'first');
					floor_text[this.index].style.display='block'
				};
			};
			
	// 	})(i)
	// }
 })();

// 左侧定位楼层=========================================================
(function() {	
	var LocationFloorList=hxsdTool.getByClass(document,'LocationFloorList')[0];
	var aLi=LocationFloorList.getElementsByTagName('li');
	var aFloor=hxsdTool.getByClass(document,'floor');
	var arr=[];
	//计算每层楼顶距，放入arr// console.log(arr);
	for(var i=0; i<aFloor.length; i++){
		var json={};
		json.name=i;
		json.offsetTop=aFloor[i].offsetTop;
		arr.push(json);
	};
	// 窗口滚动事件--------------------------------
	window.onscroll=function(){
		//显示楼层编号
		var scrolltop=document.documentElement.scrollTop || document.body.scrollTop;
		if(scrolltop>1400&&scrolltop<9300){
			LocationFloorList.style.display='block';
			LocationFloorList.style.left=(aFloor[0].offsetLeft-40)+'px';
		}else{
			LocationFloorList.style.display='none';
		};
		// 根据楼层滚动位置，定位编号
		var last_arr=[];
		for(var j=0; j<arr.length; j++){
			if(arr[j].offsetTop<scrolltop+200){
				last_arr.push(arr[j].name);
			}
		};
		if(last_arr.length){
			var li_index=last_arr[last_arr.length-1];
			for(var l=0; l<aFloor.length; l++){
				aLi[l].className='';
			};
			aLi[li_index].className='ac';
		};
	};
	//点击编号，跳转到相对楼层
	for(var i=0; i<aFloor.length; i++){
		aLi[i].index=i;
		aLi[i].onclick=function(){
			var start=document.documentElement.scrollTop || document.body.scrollTop;
			var end=arr[this.index].offsetTop;
			move(start,end)
		}
	};
	//move
	var timer;
	function move(start,end){
		var dis=end-start;
		var count=parseInt(1500/30);
		var n=0;
		clearInterval(timer);
		timer=setInterval(function(){
			n++;
			var a=1-n/count;
			var step_dis=start+dis*(1-a*a*a*a);
			window.scrollTo(0,step_dis);
			if(n==count){
				clearInterval(timer);
			};
		},30)
	};
})();

})