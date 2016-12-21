 documentReady(function() {
	// 放大镜================================================================================
	var pic2=hxsdTool.getByClass(document,'goods_pic')[0];//获取展示图
	var main_left=hxsdTool.getByClass(document,'main_left')[0];
	var pic1=hxsdTool.getByClass(document,'goods_picbox')[0];//获取缩略图
	var span=pic1.getElementsByTagName('span')[0]//获取缩略图内span
	var bigImg=pic2.getElementsByTagName('img')[0];//获取展示图内大图
	// 缩略图鼠标移入事件（鼠标移出显示展示图和span）-----------------------------------------
	pic1.onmouseover=function() {
		span.style.display=pic2.style.display='block';
		//缩略图鼠标移动事件（span和展示图内容随鼠标移动）-------------------------------------------
		pic1.onmousemove=function(ev) {
			ev=ev||event;
			var scrollTop=document.documentElement.scrollTop||document.body.scrollTop;//滚动条顶距
			var x=ev.clientX-hxsdTool.offsetLeft(pic1)-span.offsetWidth/2;//span左距
			var y=ev.clientY+scrollTop-span.offsetHeight/2-main_left.offsetTop;//span顶距
			var maxX=pic1.offsetWidth-span.offsetWidth-10;//span最大左距
			var maxY=pic1.offsetHeight-span.offsetHeight-10;//span最大顶距		
			//限制范围
			x=x<0?x=0:x>maxX?maxX:x;
			y=y<0?y=0:y>maxY?maxY:y;
			// 赋值定位span
			span.style.left=x+'px';
			span.style.top=y+'px';
			// 赋值移动展示图内大图
			bigImg.style.left=(pic2.offsetWidth-bigImg.offsetWidth)*x/maxX+'px';
			bigImg.style.top=(pic2.offsetHeight-bigImg.offsetHeight)*y/maxY+'px';
		};
		// 缩略图鼠标移出事件（鼠标移出隐藏展示图和span）-----------------------------------------
		pic1.onmouseout=function() {
			span.style.display=pic2.style.display='none';			
		};
		
	};
	// 小缩略图列表变红框================================================================================
	var goods_picul=document.getElementsByClassName('goods_piclist')[0].getElementsByTagName('ul')[0];//ul
	var goods_piclist=goods_picul.getElementsByTagName('li');//li
	for (var i = 0; i < goods_piclist.length; i++) {
		goods_piclist[i].onmouseover=function() {
			pic1.getElementsByTagName('img')[0].src=bigImg.src=this.getElementsByTagName('img')[0].src;
			for (var i = 0; i < goods_piclist.length; i++) {
				goods_piclist[i].className='';
			};
			this.className='li_hover';
		};
	};
	// 选择类型变红框================================================================================
	var chose=hxsdTool.getByClass(hxsdTool.getByClass(document,'mid_chose')[0],'dd');//mid_chose内所有dd
	//所有dd绑事件
	for (var i = 0; i < chose.length; i++) {
		(function get_chose(n) {
			var aChoseA=chose[n].getElementsByTagName('a');//第n个dd的所有a
			for (var i = 0; i < aChoseA.length; i++) {
				// 第n个dd的所有a插入样式用span
				var choseSpan=document.createElement('span');	
				aChoseA[i].appendChild(choseSpan);
				// 所有a的点击事件
				aChoseA[i].onclick=function() {
					var _this=this;
					hxsdTool.removeClass(aChoseA,'get_chose');
					this.className=hxsdTool.addClass(_this,'get_chose');
				};
			};
		})(i)		
	};
	// 加减购物车================================================================================
	var buy_num=hxsdTool.getByClass(document,'buy_num')[0];
	var buy_num_input=buy_num.getElementsByTagName('input')[0];//buy_num的input显示框
	var buy_num_btn=buy_num.getElementsByTagName('a');//按钮
	// 加按钮点击事件----------------
	buy_num_btn[0].onclick=function() {
		buy_num_input.value++;
		buy_num_btn[1].style.color='#666';
		buy_num_btn[1].style.cursor='auto';
	};
	// 减按钮点击事件----------------
	buy_num_btn[1].onclick=function() {
		buy_num_input.value--;
		// 显示框为1时，固定数量和鼠标样式
		if(buy_num_input.value<=1){
			buy_num_input.value=1
			buy_num_btn[1].style.color='#ccc';
			buy_num_btn[1].style.cursor='not-allowed';
		};
	};
	
	// 选项卡================================================================================
	var bot_title=hxsdTool.getByClass(document,'item_bot_title')[0];//标题列表div
	var bot_title_li=bot_title.getElementsByTagName('li');//所有标题
	var bot_text=hxsdTool.getByClass(document,'item_bot_text')[0].children//所有内容div
	for (var i = 0; i < bot_title_li.length; i++) {
		bot_title_li[i].index=i;
		// 标题点击事件-------------
		bot_title_li[i].onclick=function() {
			// 标题样式更改
			var _this=this;
			hxsdTool.removeClass(bot_title_li,'recom');
			this.className=hxsdTool.addClass(_this,'recom');
			// 详细内容显示
			for (var i = 0; i < bot_text.length; i++) {
				bot_text[i].style.display='none';
			};
			bot_text[this.index].style.display='block';
		};
	}


})
