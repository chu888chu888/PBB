((function(){(function(a){var b,c;return b=function(a){var b,c,d,e,f,g,h,i;return document.selection?(g=document.selection.createRange(),f=0,g&&g.parentElement()===a&&(e=a.value.replace(/\r\n/g,"\n"),d=e.length,i=a.createTextRange(),i.moveToBookmark(g.getBookmark()),c=a.createTextRange(),c.collapse(!1),i.compareEndPoints("StartToEnd",c)>-1?h=b=d:(h=-i.moveStart("character",-d),b=-i.moveEnd("character",-d)))):h=a.selectionStart,h},c=function(a,b){var c;return document.selection?(c=a.createTextRange(),c.move("character",b),c.select()):a.setSelectionRange(b,b)},a.fn.caretPos=function(a){var d;return d=this[0],d.focus(),a?c(d,a):b(d)}})(window.jQuery)})).call(this);((function(){(function(a){var b,c,d,e,f,g,h,i,j,k,l;return d={$mirror:null,css:["overflowY","height","width","paddingTop","paddingLeft","paddingRight","paddingBottom","marginTop","marginLeft","marginRight","marginBottom","fontFamily","borderStyle","borderWidth","wordWrap","fontSize","lineHeight","overflowX"],init:function(b){var c,d;return c=a("<div></div>"),d={position:"absolute",left:-9999,top:0,zIndex:-2e4,"white-space":"pre-wrap"},a.each(this.css,function(a,c){return d[c]=b.css(c)}),c.css(d),this.$mirror=c,b.after(c),this},setContent:function(a){return this.$mirror.html(a),this},getFlagRect:function(){var a,b,c;return a=this.$mirror.find("span#flag"),b=a.position(),c={left:b.left,top:b.top,bottom:a.height()+b.top},this.$mirror.remove(),c}},b=function(b){var f,g=this;return f=this.$inputor=a(b),this.options={},this.query={text:"",start:0,stop:0},this._cache={},this.pos=0,this.flags={},this.theflag=null,this.search_word={},this.view=c,this.mirror=d,f.on("keyup.inputor",function(a){var b,c;c=a.keyCode===40||a.keyCode===38,b=!c||!g.view.isShowing();if(b)return g.lookup()}).on("mouseup.inputor",function(a){return g.lookup()}),this.init(),e("At.new",f[0]),this},b.prototype={constructor:b,init:function(){var a=this;return this.$inputor.on("keydown.inputor",function(b){return a.onkeydown(b)}).on("scroll.inputor",function(b){return a.view.hide()}).on("blur.inputor",function(b){return a.view.hide(1e3)}),e("At.init",this.$inputor[0])},reg:function(b,c){var d,f,g;return d={},a.isFunction(c)?d.callback=c:d=c,g=(f=this.options)[b]||(f[b]=a.fn.atWho["default"]),this.options[b]=a.extend({},g,d),e("At.reg",this.$inputor[0],b,c)},dataValue:function(){var a,b;return b=this.search_word[this.theflag],b?b:(a=/data-value=["']?\$\{(\w+)\}/g.exec(this.getOpt("tpl")),this.search_word[this.theflag]=i(a)?null:a[1])},getOpt:function(a){try{return this.options[this.theflag][a]}catch(b){return null}},rect:function(){var b,c,d,e,f,g,h,i,j,k;return b=this.$inputor,document.selection?(c=document.selection.createRange(),j=c.boundingLeft+b.scrollLeft(),k=c.boundingTop+a(window).scrollTop()+b.scrollTop(),e=k+c.boundingHeight,{top:k-2,left:j-2,bottom:e-2}):(f=function(a){return a.replace(/</g,"&lt").replace(/>/g,"&gt").replace(/`/g,"&#96").replace(/"/g,"&quot").replace(/\r\n|\r|\n/g,"<br />")},i=b.val().slice(0,this.pos-1),g="<span>"+f(i)+"</span>",g+="<span id='flag'>@</span>",h=b.offset(),d=this.mirror.init(b).setContent(g).getFlagRect(),j=h.left+d.left-b.scrollLeft(),k=h.top-b.scrollTop(),e=k+d.bottom,k+=d.top,{top:k,left:j,bottom:e+2})},cache:function(a){var b,c;return b=this.query.text,!this.getOpt("cache")||!b?null:(c=this._cache)[b]||(c[b]=a)},getKeyname:function(){var b,c,d,f,g,h,j,k,l=this;return b=this.$inputor,k=b.val(),c=b.caretPos(),j=k.slice(0,c),g=null,a.each(this.options,function(a){var b,c;c=new RegExp(a+"([A-Za-z0-9_+-]*)$|"+a+"([^\\x00-\\xff]*)$","gi"),b=c.exec(j);if(!i(b))return g=b[1]===void 0?b[2]:b[1],l.theflag=a,!1}),typeof g=="string"&&g.length<=20?(h=c-g.length,d=h+g.length,this.pos=h,f={text:g.toLowerCase(),start:h,end:d}):this.view.hide(),e("At.getKeyname",f),this.query=f},replaceStr:function(a){var b,c,d,f,g,h;return b=this.$inputor,d=this.query,f=b.val(),c=this.getOpt("display_flag")?0:this.theflag.length,g=f.slice(0,d.start-c),h=g+a+f.slice(d.end),b.val(h),b.caretPos(g.length+a.length),b.change(),e("At.replaceStr",h)},onkeydown:function(b){var c;c=this.view;if(!c.isShowing())return;switch(b.keyCode){case 38:b.preventDefault(),c.prev();break;case 40:b.preventDefault(),c.next();break;case 9:case 13:if(!c.isShowing())return;b.preventDefault(),c.choose();break;default:a.noop()}return b.stopPropagation()},renderView:function(a){return e("At.renderView",this,a),a=a.splice(0,this.getOpt("limit")),a=l(a,this.dataValue()),a=j(a),a=k.call(this,a),this.view.render(this,a)},lookup:function(){var b,c,d;return d=this.getKeyname(),d?(e("At.lookup.key",d),i(c=this.cache())?i(c=this.lookupWithData(d))?a.isFunction(b=this.getOpt("callback"))?b(d.text,a.proxy(this.renderView,this)):this.view.hide():this.renderView(c):this.renderView(c),a.noop()):!1},lookupWithData:function(b){var c,d,e=this;return c=this.getOpt("data"),a.isArray(c)&&c.length!==0&&(d=a.map(c,function(c,d){var f,g,h;try{g=a.isPlainObject(c)?c[e.dataValue()]:c,h=new RegExp(b.text.replace("+","\\+"),"i"),f=g.match(h)}catch(i){return null}return f?c:null})),d}},c={timeout_id:null,id:"#at-view",holder:null,_jqo:null,jqo:function(){var b;return b=this._jqo,b=i(b)?this._jqo=a(this.id):b},init:function(){var b,c,d=this;if(!i(this.jqo()))return;return c="<div id='"+this.id.slice(1)+"' class='at-view'><ul id='"+this.id.slice(1)+"-ul'></ul></div>",a("body").append(c),b=this.jqo().find("ul"),b.on("mouseenter.view","li",function(c){return b.find(".cur").removeClass("cur"),a(c.currentTarget).addClass("cur")}).on("click",function(a){return a.stopPropagation(),a.preventDefault(),d.choose()})},isShowing:function(){return this.jqo().is(":visible")},choose:function(){var a,b;return a=this.jqo().find(".cur"),b=i(a)?this.holder.query.text+" ":a.attr(this.holder.getOpt("choose"))+" ",this.holder.replaceStr(b),this.hide()},rePosition:function(){var b;return b=this.holder.rect(),b.bottom+this.jqo().height()-a(window).scrollTop()>a(window).height()&&(b.bottom=b.top-this.jqo().height()),e("AtView.rePosition",{left:b.left,top:b.bottom}),this.jqo().offset({left:b.left,top:b.bottom})},next:function(){var b,c;return b=this.jqo().find(".cur").removeClass("cur"),c=b.next(),c.length||(c=a(this.jqo().find("li")[0])),c.addClass("cur")},prev:function(){var a,b;return a=this.jqo().find(".cur").removeClass("cur"),b=a.prev(),b.length||(b=this.jqo().find("li").last()),b.addClass("cur")},show:function(){return this.isShowing()||this.jqo().show(),this.rePosition()},hide:function(a){var b,c=this;if(!isNaN(a))return b=function(){return c.hide()},clearTimeout(this.timeout_id),this.timeout_id=setTimeout(b,300);if(this.isShowing())return this.jqo().hide()},clear:function(a){return a===!0&&(this._cache={}),this.jqo().find("ul").empty()},render:function(b,c){var d,i;return a.isArray(c)?c.length<=0?(this.hide(),!0):(this.holder=b,b.cache(c),this.clear(),d=this.jqo().find("ul"),i=b.getOpt("tpl"),a.each(c,function(a,c){var j;return i||(i=f),j=g(i,c),e("AtView.render",j),d.append(h(j,b.query.text))}),this.show(),d.find("li:eq(0)").addClass("cur")):!1}},j=function(b){return a.map(b,function(b,c){return a.isPlainObject(b)||(b={id:c,name:b}),b})},g=function(a,b){var c;try{return c=a.replace(/\$\{([^\}]*)\}/g,function(a,c,d){return b[c]})}catch(d){return""}},h=function(a,b){return i(b)?a:a.replace(new RegExp(">\\s*(\\w*)("+b.replace("+","\\+")+")(\\w*)\\s*<","ig"),function(a,b,c,d){return"> "+b+"<strong>"+c+"</strong>"+d+" <"})},k=function(a){var b,c,d,e,f,g,h;b=this.dataValue(),d=this.query.text,e=[];for(g=0,h=a.length;g<h;g++){c=a[g],f=c[b];if(f.toLowerCase().indexOf(d)===-1)continue;c.order=f.toLowerCase().indexOf(d),e.push(c)}return e.sort(function(a,b){return a.order-b.order}),e},l=function(b,c){var d;return d=[],a.map(b,function(b,e){var f;f=a.isPlainObject(b)?b[c]:b;if(a.inArray(f,d)<0)return d.push(f),b})},i=function(b){return!b||a.isPlainObject(b)&&a.isEmptyObject(b)||a.isArray(b)&&b.length===0||b instanceof a&&b.length===0||b===void 0},f="<li id='${id}' data-value='${name}'>${name}</li>",e=function(){},a.fn.atWho=function(d,e){return c.init(),this.filter("textarea, input").each(function(){var c,f;return c=a(this),f=c.data("AtWho"),f||c.data("AtWho",f=new b(this)),f.reg(d,e)})},a.fn.atWho["default"]={data:[],choose:"data-value",callback:null,cache:!0,limit:5,display_flag:!0,tpl:f}})(window.jQuery)})).call(this);((function(){var a=[].indexOf||function(a){for(var b=0,c=this.length;b<c;b++)if(b in this&&this[b]===a)return b;return-1};$(function(){var b,c,d,e,f,g,h,i,j;d=[],c=function(b){var c;c=$(b).text();if(a.call(d,c)<0)return d.push(c)},i=$(".username");for(e=0,g=i.length;e<g;e++)b=i[e],c(b);j=$(".reply_user");for(f=0,h=j.length;f<h;f++)b=j[f],c(b);$("#content").atWho("@",{data:d}),$(".reply").click(function(){var a,b,c,d,e;return c=$(this),a=c.data("floor"),e=c.data("user"),d=$("#content"),b="#"+a+" @"+e+" ",d.val().trim().length===0?b+="":b="\n"+b,d.focus().val(d.val()+b)})})})).call(this);