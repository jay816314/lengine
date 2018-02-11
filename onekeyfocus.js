function oneKey(obj) {
    var one_key_focus = {};
    var origin_id = obj.id;
    var url = obj.url;
    one_key_focus.Event = function() {
      if (isAndroid()) {
        window.location = "weixin://profile/" + origin_id;
      } else {
        var html = $('<section class="qrcode-shadow"><div class="qrcode-wrapper"><img class="zhiwen" src="http://cdn.jisuapp.cn/zhichi_frontend/static/version2/common/images/qrcode_focus2.png" alt="加载中"><div class="close-wrapper"><button class="close-shadow">✘</button></div><div class="qrcode-holder"><img src="' + url + '"></div></div></section>');
        $('body').append(html);
        html.find('.qrcode-wrapper').css({'margin-left': '-' + html.find('.qrcode-wrapper')[0].offsetWidth/2 + 'px', 'margin-top':'-'+html.find('.qrcode-wrapper')[0].offsetHeight/2+'px'});
        fixbody();
        $('body').on('click', '.close-shadow', function() {
          html.remove();
          relievebody();
        });
      }
    }
  return one_key_focus;
};

function isAndroid() {
  var useragent = navigator.userAgent;
  if (useragent.match(/MicroMessenger/i) != 'MicroMessenger') {
    // 这里警告框会阻塞当前页面继续加载
    alert('已禁止本次访问：微信搜索"咫尺网络"在微信菜单中访问！');
    // 以下代码是用javascript强行关闭当前页面
    // var opened = window.open('http://mp.weixin.qq.com/s?__biz=MzA4NTExNjk5Ng==&mid=202525561&idx=1&sn=00e960dd831c981a20022f3253cf7516#rd', '_self');
    // opened.opener = null;
    // opened.close();
    return false;
  }
  var browser = {
    versions: function() {
      var u = navigator.userAgent,
        app = navigator.appVersion;
      return { //移动终端浏览器版本信息 
        ios: !! u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端 
        iPhone: u.indexOf('iPhone') > -1, //是否为iPhone或者QQHD浏览器 
        iPad: u.indexOf('iPad') > -1, //是否iPad 
      };
    }(),
  }
  // var wechat_info = useragent.match(/MicroMessenger\/([\d\.]+)[1]/i);
  var wechat_info = useragent.match(/MicroMessenger\/([\d\.]+)/i);
  if (wechat_info && wechat_info[1] < '6.2'){
    //微信6.2以下版本
    if (browser.versions.iPhone || browser.versions.iPad || browser.versions.ios) {
        return false;
    }
    return true;
  } else {
    //微信6.2及以上版本
    return false;
  }
}