	/*
		 * flipPage('选择器'，'参数' ，'翻页之前的回调函数 ， 翻页之后的回调函数');
		 *
		 * aside_show 0: 尾页显示，1: 首尾显示，2: 一直显示，3: 不显示
		 */
	var flipPage = function( wrap , flipPage_para, afterCallback, beforeCallback){
				var option = {
					  'selector'      : '',
						'isVertical'    : true ,
						'type'          : 'normal',
						'autoTurnPage'  : 0 ,
						'currentPage'   : 0 ,
						'aside_show'    : 0 ,
						'loop'          : 0 ,
						'ismakebyphone' : 0 
				};

				this.options = $.extend( option , flipPage_para);

				this.wrap            = $(wrap);
				this.slider          = this.options.selector   ? this.wrap.children(this.options.selector) : this.children();
				var sliderArray = [];
				this.slider.each(function() { // 把 slider 转换成数组，方便调用
						sliderArray.push($(this));
				});
				this.sliderArray = sliderArray;
				this.time            = 600;        //动画切换时间
				this.childCount      = this.sliderArray.length;
				this.translatez      = Math.ceil(window.innerHeight / 2);
				this.cssDirection    = this.options.isVertical ? 'translateY' : 'translateX';
				this.rotateDirection = this.options.isVertical ? 'rotateX' : 'rotateY';
				this.currentPage     = this.options.currentPage;
				this.autoTurnTime    = this.options.autoTurnPage * 1000;

				this.afterCallback = afterCallback;
				this.beforeCallback = beforeCallback;

				this.init();
				
	};

	flipPage.prototype = {
		init : function(){
			var _self = this;

			if(String(_self.options.isVertical) == 'false'){
    			$('#next').removeClass('vertical-next').addClass('horizontal-next');
			}else{
					$('#next').removeClass('horizontal-next').addClass('vertical-next');
			}
			// 设置外层flip的css： { overflow:hidden; position:relative; }
			_self.wrap.css({
					'overflow': 'hidden',
					'position': 'absolute',
					'left': '0%',
					'top': '0%'
			});

			_self.slider.css({
					'-webkit-transition': '-webkit-transform ' + _self.time + 'ms linear',
					'transition': 'transform ' + _self.time + 'ms linear'
			});
			if(_self.options.type == 'cube' ){
					_self.time = 1000;
					_self.slider.css({
							'-webkit-transition': '-webkit-transform '+ _self.time +'ms ease', //cubic-bezier(0.175, 0.885, 0.32, 1.175)',
							'transition': 'transform '+ _self.time +'ms ease', //cubic-bezier(0.175, 0.885, 0.32, 1.175)',
					});
			}
			[ 'cube' , 'rotate' , 'card' , 'cutcard' , 'falldown' , 'fadeInOut' ].indexOf(_self.options.type) > -1 ? $('#invitation-container').addClass('cube-flip-page') : '';			

			switch(_self.options.type){
				case 'cube' :
					_self.sliderArray[_self.currentPage].css({
							'-webkit-transform': _self.cssDirection + '(0) rotateY(0)',
							'transform': _self.cssDirection + '(0) rotateY(0)',
							'display':'blcok'
					});
					for (var i = 0; i < _self.currentPage; i++) {
							var rotateStr = (_self.rotateDirection == 'rotateY') ? '(-90deg) ' : '(90deg) ',
									tf = _self.rotateDirection + rotateStr + _self.cssDirection+'(-50%) translateZ('+ _self.translatez +'px)';
							_self.sliderArray[i].css({
									opacity: 0,
									'-webkit-transform': tf ,
									'transform': tf
							})

					}
					for (var j = _self.currentPage+1; j < _self.childCount; j++) {
						var rotateStr = (_self.rotateDirection == 'rotateY') ? '(90deg) ' : '(-90deg) ',
								tf = _self.rotateDirection + rotateStr + _self.cssDirection+'(50%) translateZ(' + _self.translatez + 'px)' ;
						_self.sliderArray[j].css({
								opacity: 0,
								'-webkit-transform': tf ,
								'transform': tf 
						})
					}
					break ;
				case 'rotate' :
					_self.sliderArray[_self.currentPage].css({
							'-webkit-transform': _self.cssDirection + '(0) translateZ(0px) rotateZ(0deg)',
							'transform': _self.cssDirection + '(0) translateZ(0px) rotateZ(0deg)',
							'display':'blcok' 
					});
					for (var i = 0; i < _self.currentPage; i++) {
						_self.sliderArray[i].css({
								opacity: 0,
								'-webkit-transform': _self.cssDirection + '(-100%) translateZ(-1000px) rotateZ(180deg)',
								'transform': _self.cssDirection + '(-100%) translateZ(-1000px) rotateZ(180deg)',
						})
					}
					for (var j = _self.currentPage+1; j < _self.childCount; j++) {
						_self.sliderArray[j].css({
								opacity: 0,
								'-webkit-transform': _self.cssDirection + '(100%) translateZ(-1000px) rotateZ(180deg)',
								'transform': _self.cssDirection + '(100%) translateZ(-1000px) rotateZ(180deg)',
						})
					}
					break ;
				case 'card' :
					_self.sliderArray[_self.currentPage].css({
							'-webkit-transform': _self.rotateDirection + '(0deg)',
							'transform': _self.rotateDirection + '(0deg)',
							'display':'blcok' 
					});
					for (var i = 0; i < _self.currentPage; i++) {
						var rotateStr = (_self.rotateDirection == 'rotateY') ? '(-180deg) ' : '(180deg) ';
						_self.sliderArray[i].css({
								opacity: 0,
								'-webkit-transform': _self.rotateDirection + rotateStr,
								'transform': _self.rotateDirection + rotateStr,
								'z-index': 11
						});
					}
					for (var j = _self.currentPage + 1; j < _self.childCount; j++) {
						var rotateStr = (_self.rotateDirection == 'rotateY') ? '(180deg) ' : '(-180deg) ';
						_self.sliderArray[j].css({
								'-webkit-transform': _self.rotateDirection + rotateStr,
								'transform': _self.rotateDirection + rotateStr,
								'z-index': 11
						});
					}
					break ;
				case 'cutcard' : 
				case 'falldown' : 
				case 'fadeInOut' :
					_self.slider.css({
								display: 'none',
								'transition':'none',
								'-webkit-transition':'none',
						});
					_self.sliderArray[_self.currentPage].css("display" , "block");
					break ;
				case 'cover' : 
					_self.sliderArray[_self.currentPage].css({
							'-webkit-transform': _self.cssDirection + '(0)',
							'transform': _self.cssDirection + '(0)',
							'display':'blcok' ,
							'z-index': 11
					});
					for (var i = 0; i < _self.currentPage; i++) {
						_self.sliderArray[i].css({
								opacity: 0,
								'-webkit-transform': _self.cssDirection+'(0)',
								'transform': _self.cssDirection+'(0)',
						})
					}
					for (var j = _self.currentPage + 1; j < _self.childCount; j++) {
						_self.sliderArray[j].css({
								opacity: 0,
								'-webkit-transform': _self.cssDirection + '(100%)',
								'transform': _self.cssDirection + '(100%)'
						});
					}
					break ;
				default :
						_self.sliderArray[_self.currentPage].css({
								'-webkit-transform': _self.cssDirection + '(0)',
								'transform': _self.cssDirection + '(0)',
								'display':'blcok' 
						});
						for (var i = 0; i < _self.currentPage; i++) {
							_self.sliderArray[i].css({
									'-webkit-transform': _self.cssDirection + '(-100%)',
									'transform': _self.cssDirection + '(-100%)'
							});
						}
						for (var j = _self.currentPage + 1; j < _self.childCount; j++) {
							_self.sliderArray[j].css({
									opacity: 0,
									'-webkit-transform': _self.cssDirection + '(100%)',
									'transform': _self.cssDirection + '(100%)'
							});
						}
						break ;
			}

			_self.wrap.gesture(function(event , dir) {
					if (_self.options.isVertical) {
						if(dir == "Up"){
							_self.flipNext(event);
						}else if(dir == "Down"){
							_self.flipPrev(event);
						}
					}else{
						if(dir == "Left"){
							_self.flipNext(event);
						}else if(dir == "Right"){
							_self.flipPrev(event);
						}
					}
				});


				//绑定自动翻页
				//定时器
				if(_self.autoTurnTime != 0){
						_self.slider.on('webkitAnimationStart', function(e) {
								_self.autoTimer && clearTimeout(_self.autoTimer);
								_self.isInfiniteAnimation = false;
						});
						_self.slider.on('webkitAnimationEnd webkitAnimationIteration', function(e){
							_self.autoTurnPageFn(e);
						});
				}

				// 修复 Android 4.0.X 触摸事件的 Bug
				// 参考：Android Issue 19827、152913
				// https://code.google.com/p/android/issues/detail?id=19827
				// https://code.google.com/p/chromium/issues/detail?id=152913
				this.wrap.on('touchstart', function(e) {
						// e.preventDefault();
				});
				this.wrap.on('touchmove', function(e) {
						e.preventDefault();
				});
				this.wrap.on('touchend', function(e) {});

		},
		flipNext : function(e){
			var _self = this;
			_self.pageFlipDirection = 'down';

			_self.autoTimer && clearTimeout(_self.autoTimer);
			if(_self.wrap.children('.moving').length){
					return '';
			}
			_self.currentPage = _self.slider.index(_self.wrap.children('.current-page'));
			_self.targetPage = _self.currentPage + 1;
			// 自动翻页时e为undefined, 滑动翻页时e为event事件, 页面跳转时e为targetpage(页面跳转如果没有传targetpage 则默认滑到下一页)
			if(e != undefined ){
				// 手动翻页
				if(e.target){
					e.preventDefault();
					e.stopPropagation();
					// 最后一页再往下滑一页
					if (_self.currentPage == _self.childCount - 1) {
						// 如果设置了微站 则加载微站
						if ($('body').attr('cre_ut') && $('body').attr('weizhan-ty') === 'pull') {
    					getNewPageData('weizhan', $('body').attr('cre_ut'));
							return '';
						}
						// 页数少于3 不能循环
						if( _self.childCount < 3){ return; }
						// 未提示过回到第一页时
						if (! _self.cycleFlipTip){
							alertTip('再次滑动 回到第一页');
							_self.cycleFlipTip = true;
							return;
						}
					}
				} else {
				// 调接口跳转翻页
					_self.targetPage = e;
				}

			} else {
			// 自动翻页或页内跳转到下一页
				if (_self.currentPage == _self.childCount - 1 && _self.childCount < 3) {
					return;
				}
			}
			if( _self.targetPage == _self.currentPage){  //跳转的是单前页，直接返回
				return ;
			}

			// 倒数第二页向最后一页滑动时 或者页内跳转到最后一页取消自动翻页
			if (_self.currentPage == _self.childCount - 2 || _self.targetPage == _self.childCount - 1) {
					_self.slider.off('webkitAnimationStart webkitAnimationIteration webkitAnimationEnd');
					_self.autoTurnTime = 0;
			}

			// 设置进入页面的页码
			_self.targetPage = _self.targetPage > _self.childCount-1 ? 0 : _self.targetPage;
			// 页面切换动画执行前回调函数
			_self.beforeCallback && _self.beforeCallback(_self.currentPage, _self.targetPage);

			_self[_self.options.type]();
		},
		flipPrev : function(e){
			var _self = this;

			_self.pageFlipDirection = 'up';
			_self.autoTimer && clearTimeout(_self.autoTimer);

			if(_self.wrap.children('.moving').length){
					return '';
			}
			_self.currentPage = _self.slider.index(_self.wrap.children('.current-page'));

			if (e && e.target) {
					e.preventDefault();
					e.stopPropagation();
			}
			// 第一页再往上滑一页
			if (_self.currentPage == 0) {
					// 页数少于3 不能循环
					if( _self.childCount < 3){ return; }
					// 未提示过上滑回到第一页时
					if (! _self.cycleFlipTip){
							alertTip('再次滑动 回到最后一页');
							_self.cycleFlipTip = true;
							return;
					}
					// 从第一页往上滑到最后一页 取消自动翻页
					_self.slider.off('webkitAnimationStart webkitAnimationIteration webkitAnimationEnd');
					_self.autoTurnTime = 0;
			}

			// 设置进入页面的页码
			_self.targetPage = _self.currentPage - 1;
			_self.targetPage = _self.targetPage < 0 ? _self.childCount-1 : _self.targetPage;
			// 页面切换动画执行前回调函数
			_self.beforeCallback && _self.beforeCallback(_self.currentPage, _self.targetPage);

			_self[_self.options.type]();

		},
		cover : function(){
		//覆盖切换
			var _self = this ;

			var curTranslateDistance = 0,
					$currentPage, $targetPage;

			if(_self.pageFlipDirection == 'up'){
				curTranslateDistance = '100%';
			}
			// 设置当前页动画
			$currentPage = _self.sliderArray[_self.currentPage].removeClass('current-page moving').css({
					opacity: 1,
					'z-index': _self.pageFlipDirection == 'up' ? 12 : 11,
					'-webkit-transform': _self.cssDirection+'('+curTranslateDistance+')',
					'transform': _self.cssDirection+'('+curTranslateDistance+')'
			});
			// 设置进入页的动画
			$targetPage = _self.sliderArray[_self.targetPage].addClass('current-page moving').css({
					opacity: 1,
					'z-index': _self.pageFlipDirection == 'up' ? 11 : 12,
					'-webkit-transform': _self.cssDirection+'(0)',
					'transform': _self.cssDirection+'(0)',
			});
			setTimeout(function() {
					$currentPage.css({
							opacity: 0
					});
					_self.wrap.children('.moving').removeClass('moving');
					_self.afterCallback && _self.afterCallback(_self.targetPage);
					// 翻页动画结束后，初始化进入页面的下一页或上一页动画状态
					_self.setNearbyPageAni( _self.options.type, _self.targetPage);
					_self.autoTurnPageFn(); // 自动翻页

			}, _self.time+100);
		},
		normal : function(){
		//平滑切换
			var _self = this ;

			var translateDistance = '-100%';
			if (_self.pageFlipDirection == 'up') {
					translateDistance = '100%';
			}
			// 设置当前页动画
			_self.sliderArray[_self.currentPage].removeClass('current-page moving').css({
					opacity: 1,
					'-webkit-transform': _self.cssDirection+'(' + translateDistance + ')',
					'transform': _self.cssDirection+'(' + translateDistance + ')'
			});
			// 设置进入页动画
			_self.sliderArray[_self.targetPage].addClass('current-page moving').css({
					opacity: 1,
					'-webkit-transform': _self.cssDirection+'(0)',
					'transform': _self.cssDirection+'(0)'
			});

			setTimeout(function() {
					_self.afterCallback && _self.afterCallback(_self.targetPage);
					_self.wrap.children('.moving').removeClass('moving');
					// 翻页动画结束后，初始化进入页面的下一页或上一页动画状态
					_self.setNearbyPageAni(_self.options.type, _self.targetPage);
					_self.autoTurnPageFn(); // 自动翻页

			}, _self.time + 100 );

		},
		scale : function(){
		// 缩放切换
			var _self = this ;

			var translateDistance = '-100%',
					scaleClass = _self.options.isVertical ? 'scaleUp':'scaleLeft',
					scaleClassTwo = _self.options.isVertical ? 'scaleDown':'scaleRight';

			if (_self.pageFlipDirection == 'up') {
					translateDistance = '100%';
					scaleClass = scaleClassTwo;
			}
			// 设置当前页动画
			_self.sliderArray[_self.currentPage].removeClass('current-page moving').addClass(scaleClass).css({
					opacity: 1,
			});
			// 设置进入页动画
			$targetPage = _self.sliderArray[_self.targetPage].addClass('current-page moving').css({
					opacity: 1,
					'-webkit-transform': _self.cssDirection+'(0%)',
					'transform': _self.cssDirection+'(0%)',
			});
			setTimeout(function() {
					_self.wrap.children('.'+scaleClass).css({
							opacity: 0,
							'-webkit-transform': _self.cssDirection+'('+translateDistance+')',
							'transform': _self.cssDirection+'('+translateDistance+')'
					}).removeClass(scaleClass);

					_self.wrap.children('.moving').removeClass('moving');
					_self.afterCallback && _self.afterCallback(_self.targetPage);
					// 翻页动画结束后，初始化进入页面的下一页或上一页动画状态
					_self.setNearbyPageAni(_self.options.type, _self.targetPage);
					_self.autoTurnPageFn(); // 自动翻页
			}, _self.time + 100 );
		},
		cube : function(){
		// 翻书切换
			var _self = this ;

			var rotateDistance, translateDistance, $currentPage;

			if(_self.pageFlipDirection =='up'){
					translateDistance = '50%';
					if(_self.rotateDirection == 'rotateX'){
							rotateDistance = '-90deg';
					} else {
							rotateDistance = '90deg';
					}
			}else{
					translateDistance = '-50%';
					if(_self.rotateDirection == 'rotateY'){
							rotateDistance = '-90deg';
					} else {
							rotateDistance = '90deg';
					}
			}
			// 设置当前页动画
			var tf = _self.rotateDirection+'('+rotateDistance+') ' + _self.cssDirection+'('+translateDistance+') translateZ('+ _self.translatez +'px)';
			$currentPage = _self.sliderArray[_self.currentPage].removeClass('current-page moving').css({
					opacity: 1,
					'z-index': 30,
					'-webkit-transform': tf ,
					'transform': tf 
			});
			// 设置进入页动画
			_self.sliderArray[_self.targetPage].addClass('current-page moving').css({
					opacity: 1,
					'-webkit-transform': _self.rotateDirection + '(0) ' + _self.cssDirection + '(0) translateZ(0)',
					'transform': _self.rotateDirection + '(0) ' + _self.cssDirection + '(0) translateZ(0)',
			});
			setTimeout(function(){
				$currentPage.css({
							'z-index': 9,
					});
			}, _self.time / 2);
			setTimeout(function(){
					$currentPage.css({
							'opacity': 0,
							'z-index': 10,
					});
					_self.wrap.children('.moving').removeClass('moving');

					_self.afterCallback && _self.afterCallback(_self.targetPage);
					// 翻页动画结束后，初始化进入页面的下一页或上一页动画状态
					_self.setNearbyPageAni( _self.options.type, _self.targetPage);
					_self.autoTurnPageFn(); // 自动翻页
			}, _self.time+100);
		},
		rotate : function(){
		// 旋转切换
			var _self = this ;

			var translateDistance = '-100%', $currentPage;

			if(_self.pageFlipDirection =='up'){
					translateDistance = '100%';
			}
			// 设置当前页动画
			$currentPage = _self.sliderArray[_self.currentPage].removeClass('current-page moving').css({
					opacity: 1,
					'-webkit-transform': _self.cssDirection+'('+translateDistance+')' + 'translateZ(-1000px) rotateZ(180deg)',
					'transform': _self.cssDirection+'('+translateDistance+')' + 'translateZ(-1000px) rotateZ(180deg)',
					'z-index': 9
			})
			// 设置进入页动画
			_self.sliderArray[_self.targetPage].addClass('current-page moving').css({
					opacity: 1,
					'-webkit-transform': _self.cssDirection+'(0%) translateZ(0px) rotateZ(0deg)',
					'transform': _self.cssDirection+'(0%) translateZ(0px) rotateZ(0deg)',
					'z-index': 10
			});
			setTimeout(function() {
					$currentPage.css('opacity', 0);

					_self.wrap.children('.moving').removeClass('moving');

					_self.afterCallback && _self.afterCallback(_self.targetPage);
					// 翻页动画结束后，初始化进入页面的下一页或上一页动画状态
					_self.setNearbyPageAni( _self.options.type, _self.targetPage);
					_self.autoTurnPageFn(); // 自动翻页
			}, _self.time+100);
		},
		card : function(){
		// 翻牌切换
			var _self = this ;

			var rotateD = _self.pageFlipDirection =='down' ?
										(_self.rotateDirection == 'rotateY' ? -180 : 180):
										(_self.rotateDirection == 'rotateY' ? 180 : -180),
					$currentPage;
			// 设置当前页动画
			$currentPage = _self.sliderArray[_self.currentPage].removeClass('current-page moving').css({
					opacity: 1,
					'-webkit-transform': _self.rotateDirection+'('+rotateD+'deg)',
					'transform': _self.rotateDirection+'('+rotateD+'deg)',
					'z-index':'11',
			});
			// 设置进入页动画
			_self.sliderArray[_self.targetPage].addClass('current-page moving').css({
					opacity: 1,
					'-webkit-transform': _self.rotateDirection+'(0deg)',
					'transform': _self.rotateDirection+'(0deg)',
					'z-index':'11',
			});
			setTimeout(function() {
					$currentPage.css('opacity', 0);

					_self.wrap.children('.moving').removeClass('moving');

					_self.afterCallback && _self.afterCallback(_self.targetPage);
					// 翻页动画结束后，初始化进入页面的下一页或上一页动画状态
					_self.setNearbyPageAni( _self.options.type, _self.targetPage);
					_self.autoTurnPageFn(); // 自动翻页
			}, _self.time+100);
		},
		cutcard : function(){
		// 切牌切换
			var _self = this ;

			var tempFlipAniClass, curFlipAniClass, $currentPage, $targetPage;

			if( _self.pageFlipDirection == 'down') {
					if( _self.rotateDirection == 'rotateY'){
							tempFlipAniClass = 'flippage-cutCard-left-downward';
							curFlipAniClass  = 'flippage-cutCard-right-upward';
					} else {
							tempFlipAniClass = 'flippage-cutCard-top-downward';
							curFlipAniClass  = 'flippage-cutCard-bottom-upward';
					}
			} else {
					if(_self.rotateDirection == 'rotateY'){
							tempFlipAniClass = 'flippage-cutCard-right-downward';
							curFlipAniClass  = 'flippage-cutCard-left-upward';
					} else {
							tempFlipAniClass = 'flippage-cutCard-bottom-downward';
							curFlipAniClass  = 'flippage-cutCard-top-upward';
					}
			}
			// 设置当前页动画
			$currentPage = _self.sliderArray[_self.currentPage].removeClass('current-page moving').css({
					display: 'block'
			}).addClass(tempFlipAniClass);
			// 设置进入页动画
			$targetPage = _self.sliderArray[_self.targetPage].addClass('current-page moving').css({
					display: 'block'
			}).addClass(curFlipAniClass);

			setTimeout(function() {
					$currentPage.css({
							display: 'none'
					}).removeClass(tempFlipAniClass);

					$targetPage.removeClass(curFlipAniClass);

					_self.wrap.children('.moving').removeClass('moving');

					_self.afterCallback && _self.afterCallback(_self.targetPage);
					// 翻页动画结束后，初始化进入页面的下一页或上一页动画状态
					_self.setNearbyPageAni( _self.options.type, _self.targetPage);
					_self.autoTurnPageFn(); // 自动翻页
			}, 1000 );
		},
		falldown : function(){
		// 掉落切换
			var _self = this ;

			var $currentPage, $targetPage;
			_self.cleanSectionHtml(_self.sliderArray[_self.currentPage]);
			_self.cleanSectionHtml(_self.sliderArray[_self.targetPage]);
			// 设置当前页动画
			$currentPage = _self.sliderArray[_self.currentPage].addClass('flippage-falldown')
											.removeClass('current-page moving').css({
												display: 'block',
												'z-index': 10
											});
			// 设置进入页动画
			$targetPage = _self.sliderArray[_self.targetPage].addClass('moving current-page flippage-normalTranslateInUp')
										.css({
											display: 'block',
											'z-index': 11
										});

			setTimeout(function() {
					$currentPage.css({
							'display':'none'
					}).removeClass('flippage-falldown');

					$targetPage.removeClass('flippage-normalTranslateInUp moving');

					_self.afterCallback && _self.afterCallback(_self.targetPage);
					// 翻页动画结束后，初始化进入页面的下一页或上一页动画状态
					_self.setNearbyPageAni( _self.options.type, _self.targetPage);
					_self.autoTurnPageFn(); // 自动翻页
			}, 1000 );
		},
		fadeInOut : function(){
		// 淡入淡出切换
			var _self = this ;

			var $currentPage, $targetPage;
			_self.cleanSectionHtml(_self.sliderArray[_self.currentPage]);
			_self.cleanSectionHtml(_self.sliderArray[_self.targetPage]);
			// 设置当前页动画
			$currentPage = _self.sliderArray[_self.currentPage].removeClass('current-page moving flippage-fadeIn').css({
					'display':'block',
					'z-index':'11',
			}).addClass('flippage-fadeOut');
			// 设置进入页动画
			$targetPage = _self.sliderArray[_self.targetPage].css({
					display: 'block',
			}).removeClass('flippage-fadeOut').addClass('moving current-page flippage-fadeIn');

			setTimeout(function() {
					$currentPage.css({
							'display':'none',
							'z-index':'0'
					}).removeClass('flippage-fadeOut');

					$targetPage.removeClass('flippage-fadeIn');

					_self.wrap.children('.moving').removeClass('moving');

					_self.afterCallback && _self.afterCallback(_self.targetPage);
					// 翻页动画结束后，初始化进入页面的下一页或上一页动画状态
					_self.setNearbyPageAni( _self.options.type, _self.targetPage);
					_self.autoTurnPageFn(); // 自动翻页
			}, 1000 );
		},
		setNearbyPageAni : function(flipAniType, curPage, tarPage){
			var _self = this ;

			var curNextPage, curPrePage;

			if(_self.childCount < 3) { return; }

			curPage = isNaN(curPage) ? _self.currentPage : curPage;
			if(isNaN(tarPage)){
			// 没有传tarPage时 初始化curPage的相邻页动画状态
				(_self.pageFlipDirection == 'down' || _self.pageFlipDirection == undefined) && (curNextPage = curPage+1 <= _self.childCount-1 ? curPage+1 : 0);
				(_self.pageFlipDirection == 'up' || _self.pageFlipDirection == undefined) && (curPrePage  = curPage-1 >= 0 ? curPage-1 : _self.childCount-1);

			} else {
			// 有传tarPage时 为页内跳转
				curNextPage = tarPage;
				curPrePage  = tarPage-1 >= 0 ? tarPage-1 : _self.childCount-1;
				// 页内跳转如果跳转页面是当前页下一页 则不再初始化当前页动画状态
				curPrePage == curPage && (curPrePage = undefined );
			}


			switch(flipAniType){
					case 'normal':
					case 'scale':
							//下一页初始化
							isNaN(curNextPage) || _self.sliderArray[curNextPage].css({
								opacity: 0,
								'-webkit-transform': _self.cssDirection+'(100%)',
								'transform': _self.cssDirection+'(100%)',
							});
							//上一页初始化
							isNaN(curPrePage) || _self.sliderArray[curPrePage].css({
								opacity: 0,
								'-webkit-transform': _self.cssDirection+'(-100%)',
								'transform': _self.cssDirection+'(-100%)',
							});
							break;
					case 'cover':
							//下一页初始化
							isNaN(curNextPage) || _self.sliderArray[curNextPage].css({
								opacity: 0,
								transform: _self.cssDirection+'(100%)',
								'-webkit-transform': _self.cssDirection+'(100%)',
								'z-index': 10,
							});
							//上一页初始化
							isNaN(curPrePage) || _self.sliderArray[curPrePage].css({
								opacity: 0,
								transform: _self.cssDirection+'(0)',
								'-webkit-transform': _self.cssDirection+'(0)',
								'z-index': 10,
							});
							break;
					case 'cube':
							var rotateDeg = _self.rotateDirection == 'rotateY' ? 90 : -90;
							//下一页初始化
							isNaN(curNextPage) || _self.sliderArray[curNextPage].css({
								opacity: 0,
								'-webkit-transform': _self.rotateDirection+'('+rotateDeg +'deg) '+ _self.cssDirection+'(50%) translateZ('+ _self.translatez +'px)',
								'transform': _self.rotateDirection+'('+rotateDeg +'deg) '+ _self.cssDirection+'(50%) translateZ('+ _self.translatez +'px)',
							});
							//上一页初始化
							isNaN(curPrePage) || _self.sliderArray[curPrePage].css({
								opacity: 0,
								'-webkit-transform': _self.rotateDirection+'('+(-rotateDeg)+'deg) '+ _self.cssDirection+'(-50%) translateZ('+ _self.translatez +'px)',
								'transform': _self.rotateDirection+'('+(-rotateDeg)+'deg) '+ _self.cssDirection+'(-50%) translateZ('+ _self.translatez +'px)',
							});
							break;
					case 'rotate':
							//下一页初始化
							isNaN(curNextPage) || _self.sliderArray[curNextPage].css({
								opacity: 0,
								'-webkit-transform': _self.cssDirection+'(100%) translateZ(-1000px) rotateZ(180deg)',
								'transform': _self.cssDirection+'(100%) translateZ(-1000px) rotateZ(180deg)',
								'z-index': 9
							});
							//上一页初始化
							isNaN(curPrePage) || _self.sliderArray[curPrePage].css({
								opacity: 0,
								'-webkit-transform': _self.cssDirection+'(-100%) translateZ(-1000px) rotateZ(180deg)',
								'transform': _self.cssDirection+'(-100%) translateZ(-1000px) rotateZ(180deg)',
								'z-index': 9
							});
							break;
					case 'card':
							//下一页位置
							var rotateDeg = _self.rotateDirection == 'rotateY' ? 180 : -180;
							isNaN(curNextPage) || _self.sliderArray[curNextPage].css({
								opacity: 0,
								'-webkit-transform': _self.rotateDirection+'('+rotateDeg +'deg)',
								'transform': _self.rotateDirection+'('+rotateDeg +'deg)'
							});
							//上一页初始化
							isNaN(curPrePage) || _self.sliderArray[curPrePage].css({
								opacity: 0,
								'-webkit-transform': _self.rotateDirection+'(-'+rotateDeg +'deg)',
								'transform': _self.rotateDirection+'(-'+rotateDeg +'deg)'
							});
							break;
					case 'cutcard': break;
					case 'falldown': break;
					case 'fadeInOut': break;
			}
		},
		autoTurnPageFn : function(e){
			var _self = this;
			if (_self.autoTurnTime == 0 || _self.currentPage == (_self.childCount-1) || _self.isInfiniteAnimation) {
			// 正在翻页或者已到最后一页则停止翻页
					return '';
			}
			e && e.type == 'webkitAnimationIteration' && (_self.isInfiniteAnimation = true);
			_self.autoTimer && clearTimeout(_self.autoTimer);
			_self.autoTimer = setTimeout( function(){
				_self.flipNext();
			} , _self.autoTurnTime);
		},
		cleanSectionHtml : function(selector){
			var _that = $(selector);
			var _classes = (_that.attr('class')).split(' ');
			for (var j = 0; j < _classes.length; j++) {
					if (/flippage-/.test(_classes[j])) {
							_that.removeClass(_classes[j]);
					}
			}
		},
		destroy : function(){
			var _self = this;
			_self.wrap.off('mousedown mouseup touchstart touchend');
			_self.slider.css({
					'-webkit-transition': '',
					'transition': '',
					'-webkit-transform': '',
					'transform' : '',
					'opacity' : '',
					'display' : ''
			}).off('webkitAnimationStart webkitAnimationIteration webkitAnimationEnd');
			_self.autoTimer && clearTimeout(_self.autoTimer);
			$('#invitation-container').removeClass('cube-flip-page');
			_self.currentPage = 0;
		},
		setOption : function(data){
			if(! data){
				return ;
			}
			var _self = this;
			_self.destroy();
			_self.options = $.extend( _self.options , data);
			_self.cssDirection    = _self.options.isVertical ? 'translateY' : 'translateX';
			_self.rotateDirection = _self.options.isVertical ? 'rotateX' : 'rotateY';
			_self.currentPage     = _self.options.currentPage = 0;
			_self.autoTurnTime    = _self.options.autoTurnPage * 1000;

			_self.init();
			_self.beforeCallback && _self.beforeCallback(_self.currentPage, 0 );

			_self.setNearbyPageAni( _self.options.type , _self.currentPage );

			var $willpage = _self.sliderArray[_self.currentPage];
			$willpage.children('div').css("display", 'block');
			$willpage.addClass('current-page').siblings().removeClass('current-page moving');

			setTimeout(function() {
					_self.afterCallback && _self.afterCallback(0);
			}, _self.time+100);
		},
		stopFlip : function(){
			var isiphone = ('ontouchstart' in window),
					eventArr = isiphone ? ["touchstart" , "touchend"] : ["mousedown" , "mouseup"];
			this.wrap.children().on( eventArr[1], function(event) {
				event.stopPropagation();
			});
		},
		restartFlip : function(){
			var isiphone = ('ontouchstart' in window),
			eventArr = isiphone ? ["touchstart" , "touchend"] : ["mousedown" , "mouseup"];

			this.wrap.children().off( eventArr[1] );
		}
	}


$.fn.gesture = function(func){
	var isiphone = ('ontouchstart' in window),
			eventArr = isiphone ? ["touchstart" , "touchend"] : ["mousedown" , "mouseup"],
			sP = {x : 0 , y : 0},
			eP = {x : 0 , y : 0};

	this.on(eventArr[0], function(event) {
		if(isiphone){
			sP.x = event.originalEvent.touches[0].clientX;   //jquery
			sP.y = event.originalEvent.touches[0].clientY;
			// sP.x = event.touches[0].clientX;   //zepto
			// sP.y = event.touches[0].clientY;
		}else{
			sP.x = event.clientX;
			sP.y = event.clientY;
		}
		// event.stopPropagation();
	}).on(eventArr[1] , function(event) {
		if(isiphone){
			eP.x = event.originalEvent.changedTouches[0].clientX;   //jquery
			eP.y = event.originalEvent.changedTouches[0].clientY;
			// eP.x = event.changedTouches[0].clientX;   //zepto
			// eP.y = event.changedTouches[0].clientY;
		}else{
			eP.x = event.clientX;
			eP.y = event.clientY;
		}

		if(calculateTouchesDistance(sP, eP) < 25){
			return ;
		}

		var dir = calculateDirection(sP, eP);

		func && func(event , dir);

	});

	function calculateTouchesDistance(startPoint, endPoint) {
    var diffX = Math.abs(startPoint.x - endPoint.x);
    var diffY = Math.abs(startPoint.y - endPoint.y);

    return Math.round(Math.sqrt(diffX * diffX + diffY * diffY));
  }
	function calculateAngle(startPoint, endPoint) {
    var x = startPoint.x - endPoint.x;
    var y = endPoint.y - startPoint.y;
    var r = Math.atan2(y, x); //radians
    var angle = Math.round(r * 180 / Math.PI); //degrees

    //ensure value is positive
    if (angle < 0) {
      angle = 360 - Math.abs(angle);
    }

    return angle;
  }
  function calculateDirection(startPoint, endPoint) {
    var angle = calculateAngle(startPoint, endPoint);

    if ((angle <= 45) && (angle >= 0)) {
      return "Left";
    } else if ((angle <= 360) && (angle >= 315)) {
      return "Left";
    } else if ((angle >= 135) && (angle <= 225)) {
      return "Right";
    } else if ((angle > 45) && (angle < 135)) {
      return "Down";
    } else {
      return "Up";
    }
  }
}


// 配置页面微信接口
var configWxSDK = function(){
	var is_custom_domain = $('body').attr("is_custom_domain");
	var url = '//www.zhichiwangluo.com';
	if(is_custom_domain == '1'){
		url  = '//gzh.zhichiwangluo.com';
	}
	$.ajax({
		url : url + '/index.php?r=Share/appJsConfig',
		type: 'get',
		data: null,
		dataType: 'json',
		success: function(data){
			if (data.status === 0) {
				wx.config({
					debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
					appId: data.appId, // 必填，公众号的唯一标识
					timestamp: data.timestamp, // 必填，生成签名的时间戳
					nonceStr: data.nonceStr, // 必填，生成签名的随机串
					signature: data.signature,// 必填，签名，见附录1
					jsApiList: ['onMenuShareTimeline','onMenuShareQQ' ,'onMenuShareAppMessage','openLocation','hideOptionMenu','showOptionMenu','hideMenuItems','showMenuItems','hideAllNonBaseMenuItem','showAllNonBaseMenuItem' , 'startRecord' ,'stopRecord' ,'onVoiceRecordEnd' ,'playVoice', 'stopVoice' ,'onVoicePlayEnd' , 'uploadVoice' , 'downloadVoice' , 'chooseImage' , 'uploadImage'], // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
					fail: function(msg){
			            console.log(msg);
			        }
				});
			}
		}
	});
};
//微信分享设置
var configWxShare = function(data){
		wx.onMenuShareTimeline({
				title: data.title, // 分享标题
				link: data.link, // 分享链接
				//imgUrl: data.imgUrl, // 分享图标
				imgUrl: data.imgUrl, // 分享图标
				type: data.type || '', // 分享类型,music、video或link，不填默认为link
				dataUrl: data.dataUrl || '', // 如果type是music或video，则要提供数据链接，默认为空
				success: function (msg) {
						// 用户确认分享后执行的回调函数
						$.isFunction(data.success) && data.success();
				},
				cancel: function (msg) {
						// 用户取消分享后执行的回调函数
						$.isFunction(data.cancel) && data.cancel();
				},
				fail: function(msg){
            console.log(msg);
        }
		});

		wx.onMenuShareAppMessage({
				title: data.title, // 分享标题
				desc: data.desc, // 分享描述
				link: data.link, // 分享链接
				imgUrl: data.imgUrl, // 分享图标
				type: data.type || '', // 分享类型,music、video或link，不填默认为link
				dataUrl: data.dataUrl || '', // 如果type是music或video，则要提供数据链接，默认为空
				success: function (msg) {
						// 用户确认分享后执行的回调函数
						$.isFunction(data.success) && data.success();
				},
				cancel: function (msg) {
						// 用户取消分享后执行的回调函数
						$.isFunction(data.cancel) && data.cancel();
				},
				fail: function(msg){
            console.log(msg);
        }
		});
		wx.onMenuShareQQ({
	    title: data.title, // 分享标题
	    desc: data.desc, // 分享描述
	    link: data.link, // 分享链接
	    imgUrl: data.imgUrl, // 分享图标
	    success: function () {
	    	$.isFunction(data.success) && data.success();
	    },
	    cancel: function () {
	    	$.isFunction(data.cancel) && data.cancel();
	    },
			fail: function(msg){
          console.log(msg);
      }
		});
};
// 调用微信地图
var OpenWeixinMap = function(data) {
	var lat=+data.lat,
			lng=+data.lng,
			address=data.address;
		// alert('openWeixinMap');
	wx.openLocation({
		latitude: lat,
		longitude: lng,
		name: '',
		address: address,
		scale: 13,
		infoUrl: 'http://weixin.qq.com',
		success: function () {
	    $.isFunction(data.success) && data.success();
    },
    cancel: function () {
    	$.isFunction(data.cancel) && data.cancel();
    },
		fail: function(msg){
			$.isFunction(data.fail) && data.fail();
    }
	});
}
// 微信上传图片
function choosePhoneImage(num ,successfun , errorfun){
    num = num || 1;
	wx.chooseImage({
	    count: num, // 默认9
	    sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
	    sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
	    success: function (res) {
	        var localIds = res.localIds; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
	        	console.log(localIds);
            var img_arr = [],
                i = 0,
                length = localIds.length;
            function upload() {
              wx.uploadImage({
                  localId: localIds[i],
                  isShowProgressTips: 1, // 默认为1，显示进度提示
                  success: function (res) {
                  	console.log(res.serverId);
                    i++;
                    img_arr.push(res.serverId);
                    if(i<length){
                      upload();
                    }else{
                      uploadImgs(img_arr , successfun);
                    }
                  },
                  fail: function (res) {
                    alertTip(JSON.stringify(res));
                  }
              });
            }
            upload();
	    },
        fail: function(msg){
            console.log(msg);
            alertTip(msg);
            errorfun && errorfun();
        }
	});
}

// 把微信服务器的图片存到我们服务器
function uploadImgs(img_arr, successfun){
    showLoading();
    $.ajax({
      url: '/index.php?r=Usercenter/UploadWxImages',
      type: 'post',
      dataType: 'json',
      data: {img_arr: img_arr},
      success: function(data){
        if(data.status == 0){
          successfun(data.data.img_list);
        }else{
          alertTip(data.data);
        }
        removeLoading();
      },
      error: function() {
        removeLoading();
        alertTip('error: 上传图片失败，请重试');
      }
    });
  }

// 取URL参数
var GetQueryString = function(name){
		var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
		var r = window.location.search.substr(1).match(reg);
		if(r!=null)return  unescape(r[2]); return null;
}
function click_focus() {
		// var obj = {
		//     id: 'gh_18e0fff7569c',
		//     url: 'http://img.weiye.me/zcimgdir/album/file_55dbf77b6f476.jpg',
		// }
		// oneKey(obj).Event();

	var useragent = navigator.userAgent;
	if (useragent.match(/MicroMessenger/i) != 'MicroMessenger') {
		// 这里警告框会阻塞当前页面继续加载
		alert('已禁止本次访问：微信搜索"微页"在微信菜单中访问！');
		// 以下代码是用javascript强行关闭当前页面
		var opened = window.open('http://mp.weixin.qq.com/s?__biz=MzA4NTExNjk5Ng==&mid=209792047&idx=1&sn=620735142c44f8a34307304e4765e745&scene=0#rd', '_self');
		opened.opener = null;
		opened.close();
	}
	// var browser = {
	// 	versions: function() {
	// 		var u = navigator.userAgent,
	// 			app = navigator.appVersion;
	// 		return { //移动终端浏览器版本信息
	// 			ios: !! u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
	// 			iPhone: u.indexOf('iPhone') > -1, //是否为iPhone或者QQHD浏览器
	// 			iPad: u.indexOf('iPad') > -1, //是否iPad
	// 		};
	// 	}(),
	// }
	// var wechat_info = useragent.match(/MicroMessenger\/([\d\.]+)/i);
	// if(browser.versions.iPhone || browser.versions.iPad || browser.versions.ios){
	// ios系统
		window.location.href = "http://mp.weixin.qq.com/s?__biz=MzA4NTExNjk5Ng==&mid=209792047&idx=1&sn=620735142c44f8a34307304e4765e745&scene=0";
	// } else {
	// android系统
		// window.location.href = "https://mp.weixin.qq.com/mp/profile_ext?action=home&username=gh_18e0fff7569c&sn=5cfafb3bfc9ce16e7792f236bf843c52&scene=1&uin=ODc3MjI2ODA%3D&key=ac89cba618d2d976961100f3489a077068c672fbc5b63049f3d7924aa0c6da07e14fe30415d32b9c9ac23138ebdb21a9&devicetype=webwx&version=70000001&lang=en&pass_ticket=ATGvAmc95iew6HQ5saFD%2Bn7SD1hiMVvRfqlHgOqKkY4%3D";
	// }
	// if (wechat_info && wechat_info[1] < '6.2'){
	// //微信6.2以下版本
	//   if (browser.versions.iPhone || browser.versions.iPad || browser.versions.ios) {
	//   // 如果是ios系统
	//       window.location.href = "http://mp.weixin.qq.com/s?__biz=MzA4NTExNjk5Ng==&mid=209792047&idx=1&sn=620735142c44f8a34307304e4765e745&scene=0";
	//   } else {
	//   // android系统
	//       window.location.href = "https://mp.weixin.qq.com/mp/profile_ext?action=home&username=gh_18e0fff7569c&sn=5cfafb3bfc9ce16e7792f236bf843c52&scene=1&uin=ODc3MjI2ODA%3D&key=ac89cba618d2d976961100f3489a077068c672fbc5b63049f3d7924aa0c6da07e14fe30415d32b9c9ac23138ebdb21a9&devicetype=webwx&version=70000001&lang=en&pass_ticket=ATGvAmc95iew6HQ5saFD%2Bn7SD1hiMVvRfqlHgOqKkY4%3D";
	//   }
	// } else {
	//   //微信6.2及以上版本
	//   window.location.href = "http://mp.weixin.qq.com/s?__biz=MzA4NTExNjk5Ng==&mid=209792047&idx=1&sn=620735142c44f8a34307304e4765e745&scene=0";
	// }
}
//数组对象
function objectLength(object){
    var num =0;
    for (var i in object){
        if(i!="undefined"){
            num++;
        }
    }
    return num;
}
function getFirstObject(object){
    var index = 0;
    for (var i in object){
        if(i!='undefined'){
            return object[i];
        }
    }
}
function asyLoadScript(filename, fileType, callback){
    var container=document.getElementsByTagName('body')[0];
    var node;
    if(fileType == "js"){
        var oJs = document.createElement('script');        
        oJs.setAttribute("type","text/javascript");
        oJs.setAttribute("src", filename);//文件的地址 ,可为绝对及相对路径
        container.appendChild(oJs);//绑定
        node = oJs;
    }else if(fileType == "css"){
        var oCss = document.createElement("link"); 
        oCss.setAttribute("rel", "stylesheet"); 
        oCss.setAttribute("type", "text/css");  
        oCss.setAttribute("href", filename);
        container.appendChild(oCss);//绑定
        node = oCss;
    }
    node.onload = function(){
        $.isFunction(callback) && callback();
    }
}
// 提示框组件 author: anle
		$.tooltip = function(ops){
				var ops = $.extend({
								html    : '',
								delay   : 2000,
								callback: null
						}, ops);

				var obj = null,
						text= ops.html,
						html= '<div id="tool_tip" style="position:fixed; max-width:60%; z-index:9999; top:0;'
								+ ' left:0; opacity:1; padding:30px 40px; background:rgba(0,0,0,0.7);'
								+ 'color:#fff; border-radius:8px; text-align:center; font-size:18px; font-weight:bold">'
								+ text +'</div>';

				$('#tool_tip').remove();
				obj = $(html).appendTo('body');

				obj.css({'margin-left': '-' + obj[0].offsetWidth/2 + 'px', 'margin-top':'-'+obj[0].offsetHeight/2+'px',
								 left:'50%', top:'50%'});

				setTimeout(function(){
						obj.animate({
								opacity : 0
						}, 500, 'linear', function(){
								obj.remove();
								$.isFunction(ops.callback) && ops.callback();
						});
				}, ops.delay);
		};

		$.isEmptyObject = function(obj){
				var name;
				for (name in obj) {
						return false;
				}
				return true;
		};

//弹默认提示框
function alertTip(html, callback, delay) {
		$.tooltip({
				'html'    : html || '',
				'delay'   : delay || 2000,
				'callback': callback || null
		});
};

// 展示loading
function showLoading(){
    // var $loading = $('<div id="loading_logo"><div class="double-bounce1"></div>'
    //              + '<div class="double-bounce2"></div></div>');
    var loading = '<div id="loading_logo"><div class="spinner-container container1">'
                + '<div class="circle1"></div><div class="circle2"></div>'
                + '<div class="circle3"></div><div class="circle4"></div></div>'
                + '<div class="spinner-container container2"><div class="circle1"></div>'
                + '<div class="circle2"></div><div class="circle3"></div>'
                + '<div class="circle4"></div></div><div class="spinner-container container3">'
                + '<div class="circle1"></div><div class="circle2"></div><div class="circle3"></div>'
                + '<div class="circle4"></div></div></div>';
 
    $('body').append(loading);
}
// 移除loading
function removeLoading(){
    $('#loading_logo') && $('#loading_logo').remove();
}

//请求error提示框
function requestErrorTip() {
    $.tooltip({
        html : '请求异常'
    });
}
// 请求超时提示框
function requestTimeoutTip() {
    $.tooltip({
        html : '网络状况可能不太好喔'
    });
}

// 封装ajax请求
function $ajax(url, type, data, dataType, success, error){
    removeLoading();
    showLoading();
    $.ajax({
        url : url,
        type: type || 'get',
        data: data || {},
        timeout : 30000,
        dataType: 'json',
        success: function(data){
            removeLoading();
            $.isFunction(success) && success(data);
        },
        error: function(xhr, errorType, error){
            removeLoading();
            if (errorType === 'timeout') { 
              requestTimeoutTip();
            } else {
              requestErrorTip();
            }
            $.isFunction(error) && error(xhr, errorType, error);
        }
    });
}

// 固定body 禁止滚动
function fixbody(){
    $('body').attr({
        'ontouchmove':'return false',
        'onmousewheel':'return false'
    });
};

// 恢复body滚动
function relievebody(){
    $('body').attr({
        'ontouchmove':'',
        'onmousewheel':''
    });
};

//弹幕头像错误
function errorDanmuCover(that){
  that.src = 'http://cdn.jisuapp.cn/zhichi_frontend/static/invitation/images/default_photo.jpg';
}

// 输入框弹窗
function promptTip(data){
	var options = {
		title : data.title || "",
		text : data.text || "",   //提示文字
		value : data.value || "" , //输入框初始值
		CancelText : data.CancelText || '取消',  //取消按钮文字
		ConfirmText : data.ConfirmText || '确定', //确定按钮文字
		CancelFunction : data.CancelFunction || function(){}, //取消按钮回调
		ConfirmFunction : data.ConfirmFunction || function(){}, //确定按钮回调
		CloseFunction : data.CloseFunction || function(){}, //关闭×按钮回调
	}

	var _div = '<div style="position: fixed;left: 0;top: 0;width: 100%;height: 100%;'
			+'background:rgba(0,0,0,0.5); z-index: 99999;">'
			+'<div style="position: absolute;left: 50%;top: 25%;width: 290px;border-radius: 5px;opacity: 1;margin-left: -145px;box-shadow: rgba(0, 0, 0, 0.498039) 0px 5px 15px;background: #fff;padding-bottom: 20px;text-align: center;overflow: hidden;">'
			+'<h4 style="height: 40px;line-height:40px;background: #00a1ee;color: #fff;padding: 0 20px;text-align:left;">'+options.title+'</h4>'
			+'<p style="border-radius: 5px;font-size: 16px;padding: 0px 30px;text-align: left;margin-top: 15px;">'
			+ options.text + '</p><div style="margin: 10px 0 20px;"><input class="prompt-input" style="border: 1px solid #ddd;width: 220px;height: 25px;padding: 0 5px;" type="text" value="'+options.value+'" /></div>'
			+'<span class="tip-close" style="position: absolute; display: block; width: 30px; height: 30px;'
			+' top: 0; right: 0; text-align: center; cursor: pointer; font-size: 30px; color: #fff;">×</span>'
			+'<button class="tip-combtn" style="width: 80px; height: 32px;font-size: 16px;color: #FFF;cursor: pointer;'
			+'margin-left: 20px;margin-top: 10px;background-color: #3b99d7;">'+options.ConfirmText+'</button>'
			+'<button class="tip-canbtn" style="width: 80px; height: 32px;font-size: 16px;color: #FFF;cursor: pointer;'
			+'margin-left: 20px;margin-top: 10px;background-color: #B4B4B4;">'+options.CancelText+'</button></div></div>';

	_div = $(_div);
	_div.find('.tip-combtn').click(function(event) {
		options.ConfirmFunction( _div.find('.prompt-input').val() );
		_div.remove();
	});
	_div.find('.prompt-input').keyup(function(event) {
		var key = event.keyCode || event.which;
		if(key == 13){
			options.ConfirmFunction( _div.find('.prompt-input').val() );
			_div.remove();
		}
	});
	_div.find('.tip-canbtn').click(function(event) {
		options.CancelFunction();
		_div.remove();
	});
	_div.find('.tip-close').click(function(event) {
		options.CloseFunction();
		_div.remove();
	});
	$('body').append(_div);
	// _div.children('div').css('margin-left', '-'+_div.children('div').width()/2+'px');
}

//字符长度
//获得字符串实际长度，中文2，英文1
function stringLength(str) {
  var realLength = 0, len = str.length, charCode = -1;
  for (var i = 0; i < len; i++) {
    charCode = str.charCodeAt(i);
    if(charCode > 128){
        realLength += 2;
    }else{
        realLength +=1;
    }
  }
  return realLength;
};
// 截取字符串 中文2，英文1
function subString(str, len) { 
        var newLength = 0 ,
        		newStr = "" ,
        		chineseRegex = /[^\x00-\xff]/g ,
        		singleChar = "",
        		strLength = str.replace(chineseRegex,"**").length;
        for(var i = 0;i < strLength;i++) { 
                singleChar = str.charAt(i).toString(); 
                if(singleChar.match(chineseRegex) != null) { 
                        newLength += 2; 
                }else { 
                        newLength++; 
                } 
                if(newLength > len) { 
                        break; 
                } 
                        newStr += singleChar; 
        } 
        if(strLength > len) { 
                newStr += "..."; 
        } 
        return newStr; 
}

var overscroll = function(el) {
  el.addEventListener('touchstart', function() {
    var top = el.scrollTop
      , totalScroll = el.scrollHeight
      , currentScroll = top + el.offsetHeight

    //If we're at the top or the bottom of the containers
    //scroll, push up or down one pixel.
    //
    //this prevents the scroll from "passing through" to
    //the body.
    if(top === 0) {
      el.scrollTop = 1
    } else if(currentScroll === totalScroll) {
      el.scrollTop = top - 1
    }
  })

  el.addEventListener('touchmove', function(evt) {
    //if the content is actually scrollable, i.e. the content is long enough
    //that scrolling can occur
    if(el.offsetHeight < el.scrollHeight)
      evt._isScroller = true
  })
}