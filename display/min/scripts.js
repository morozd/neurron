window.display={views:{},logic:{},load_view:{}},window.config={server:"game.neurron.com",port:"2020",errorURL:"http://neurron.com/notify/error2.php",gameTime:2,factor:4,amountToHeal:10,punishPoints:1e3,deadTime:5,audio:!0,audioFading:10,audioVolume:50,circleOffset:100,distanceToUser:150,circles:10,frames:30,duration:{moveTime:600},player:{velocity:2},playerSize:80,frameDuration:60,assets:{image:{player_1:{src:"assets/player/ron_red_80.png",width:80},player_2:{src:"assets/player/ron_blue_80.png",width:80},player_3:{src:"assets/player/ron_green_80.png",width:80},player_4:{src:"assets/player/ron_yellow_80.png",width:80},player_5:{src:"assets/player/ron_lila_80.png",width:80},player_6:{src:"assets/player/ron_orange_80.png",width:80},player_7:{src:"assets/player/ron_turq_80.png",width:80},player_8:{src:"assets/player/ron_pink_80.png",width:80},player_dead:{src:"assets/player/ron_grey_80.png",width:80},player_trans:"assets/player/trans.gif",damage:"assets/damage/damage.png",heal:"assets/heal/heal.png",points:"assets/points/points.png",damage_col:{src:"assets/damage/damage_col.png",width:100},points_col:{src:"assets/points/points_col.png",width:100},heal_col:{src:"assets/heal/heal_col.png",width:100}},audio:{damage:"assets/damage/damage.wav",heal:"assets/heal/heal.mp3",points:"assets/points/points.wav",dead:"assets/player/dead.wav",revive:"assets/player/revive.wav",win:"assets/player/win.mp3",start:"assets/views/start/start.mp3",game:"assets/views/game/game.ogg"}},viewAssets:"assets/views/",protocol:{POLLING:0,INIT:1,TEAMNAME:2,CANCEL:3,COUNTDOWN:4,JOINED:5,START:6,MOVE:7,HEAL:8,CREATE:9,COLLISION:10,END:11},obstacles:{1:{type:"damage",size:100,velocity:1,value:10,frameDuration:100,collisionImg:"damage_col",collisionSound:"damage"},2:{type:"heal",size:100,velocity:1,value:10,frameDuration:100,collisionImg:"heal_col",collisionSound:"heal"},3:{type:"points",size:100,velocity:1,value:100,frameDuration:80,collisionImg:"points_col",collisionSound:"points"},4:{type:"points",size:100,velocity:1,value:80,frameDuration:50,collisionImg:"points_col",collisionSound:"points"}},colors:{1:"red",2:"blue",3:"green",4:"yellow",5:"lila",6:"orange",7:"turkey",8:"pink"},playerColors:{1:{r:246,g:91,b:98},2:{r:83,g:102,b:243},3:{r:162,g:251,b:91},4:{r:250,g:235,b:64},5:{r:223,g:105,b:254},6:{r:255,g:182,b:106},7:{r:144,g:216,b:255},8:{r:255,g:121,b:198}},backgroundColors:{1:{r:158,g:7,b:52},2:{r:10,g:26,b:161},3:{r:81,g:154,b:6},4:{r:205,g:172,b:31},5:{r:105,g:23,b:140},6:{r:235,g:124,b:0},7:{r:23,g:163,b:158},8:{r:177,g:0,b:101}}},function(){Function.prototype.bind||(Function.prototype.bind=function(t){if("function"!=typeof this)throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable");var e=Array.prototype.slice.call(arguments,1),i=this,s=function(){},n=function(){return i.apply(this instanceof s&&t?this:t||window,e.concat(Array.prototype.slice.call(arguments)))};return s.prototype=this.prototype,n.prototype=new s,n});var t,e=0,i=["ms","moz","webkit","o"];for(t=0;i.length>t&&!window.requestAnimationFrame;++t)window.requestAnimationFrame=window[i[t]+"RequestAnimationFrame"],window.cancelAnimationFrame=window[i[t]+"CancelAnimationFrame"]||window[i[t]+"CancelRequestAnimationFrame"];window.requestAnimationFrame||(window.requestAnimationFrame=function(t){var i=(new Date).getTime(),s=Math.max(0,16-(i-e)),n=window.setTimeout(function(){t(i+s)},s);return e=i+s,n}),window.cancelAnimationFrame||(window.cancelAnimationFrame=function(t){clearTimeout(t)}),window.transitionend=function(){var t,e,i={WebkitTransition:"webkitTransitionEnd",MozTransition:"transitionend",MSTransition:"msTransitionEnd",OTransition:"oTransitionEnd",transition:"transitionEnd"},s=document.createElement("div"),n=Object.keys(i);for(t=0,e=n.length;e>t;t++)if(void 0!==s.style[n[t]])return i[n[t]];console.log("TransitionEnd - is not supported")}()}(),function(){var t=display.Element=function(){};t.prototype.init=function(t){this.checkMove=config.duration.moveTime/this.velocity/this.grid.frames,this.setup(t),this.register()},t.prototype.setup=function(t){this.getAsset=display.getAsset,this.id=t.id,this.pos=t.pos,t.size&&(this.size=t.size),t.visible&&(this.visible=t.visible),this.diffMove=0,this.diffAni=0,this.check=!1,this.origin=this.screen.ctx,this.spriteCounter=0,this.checkAni=this.getStep(),this.originSprites=this.getAsset("image",this.type),this.spriteImages=this.originSprites,this.src=this.spriteImages instanceof Array?this.spriteImages[0]:this.spriteImages},t.prototype.getStep=function(){var t;return"damage"===this.type&&(t=config.obstacles[1].frameDuration||config.frameDuration),"heal"===this.type&&(t=config.obstacles[2].frameDuration||config.frameDuration),"points"===this.type&&(t=config.obstacles[3].frameDuration||config.frameDuration),this.isPlayer&&(t=config.frameDuration+15*this.id),t},t.prototype.register=function(){this.nextPos=this.pos,this.moving=!1,this.counter=0,this.field=this.grid.fields[this.pos]},t.prototype.move=function(t){t!==this.nextPos&&(this.nextPos=t,this.moving||(this.moving=!0,this.setDir()))},t.prototype.update=function(t){for(this.diffMove+=t,this.diffAni+=t;this.diffAni>=this.checkAni;)this.diffAni-=this.checkAni,this.changeSprite();for(;this.diffMove>=this.checkMove;)this.diffMove-=this.checkMove,this.moving&&this.animate()},t.prototype.changeSprite=function(){this.spriteImages instanceof Array&&(this.spriteCounter=this.spriteCounter+1<this.spriteImages.length?this.spriteCounter+1:0,this.src=this.spriteImages[this.spriteCounter])},t.prototype.animate=function(){var t=this.grid.fields[this.pos];this.counter>=t[this.dir].length?(this.counter=0,this.change(),this.field=this.grid.fields[this.pos]):(this.field=t[this.dir][~~this.counter],this.counter+=1)},t.prototype.draw=function(){var t=this.field,e=t.x+this.grid.getTranslateX(t.radius),i=t.y+this.grid.getTranslateY(t.radius);this.origin.save(),this.origin.translate(e,i),this.origin.rotate(t.angle),this.origin.translate(-e,-i),this.origin.drawImage(this.src,e-this.size/2*t.scale,i-this.size/2*t.scale,this.size*t.scale,this.size*t.scale),this.origin.restore()},t.prototype.resize=function(){this.field=this.grid.fields[this.pos]}}(),function(){display.AssetManager=function(){function t(){return window.URL||(window.URL=window.webkitURL||window.msURL||window.oURL),window.BlobBuilder||(window.BlobBuilder=window.BlobBuilder||window.WebKitBlobBuilder||window.MozBlobBuilder||window.MSBlobBuilder||window.OBlobBuilder),!0}function e(){return!0}function i(t){console.log("IDB: ",t)}function s(t){return Object.prototype.toString.call(t).slice(8,-1)}function n(t){if(t=t.substr(t.lastIndexOf(".")+1).toLowerCase(),"png"===t||"jpg"===t||"jpeg"===t||"gif"===t||"webp"===t)t="image";else if("wav"===t||"mp3"===t||"ogg"===t||"opus"===t)t="audio";else{if("mp4"!==t&&"avi"!==t&&"webm"!==t)throw Error('[ Undefined Type - ".'+t+'" ]');t="video"}return t}function o(t){var e=m[t][0];args=Array.prototype.slice.call(arguments,1),"Array"===s(e)&&e[0].apply(e[1],args||[])}function r(t){if(v.storage&&y);else{var e=new XMLHttpRequest;e.open("GET",t.src,!0),e.onload=function(){var i=e.response;f?c(t,i):l(t,i)},e.onprogress=function(e){a(t,e)},e.onerror=function(i){h(t,e.error.code,i)},e.responseType=f?"blob":"arraybuffer",e.send()}}function a(t,e){var i=~~(.5+v.step*~~(100*(e.loaded/e.total))/100);v.total+=i-v._assets[t.src],v._assets[t.src]=i,v.finished||(v.total>=100&&(v.total=100,v.finished=!0),o("progress",{src:t,progress:v.total}))}function h(t,e,i){o("error",{src:t,code:e,error:i})}function l(t,e){var i,s=new DataView(e),n=t.type,o=t.src||t.origin,r=o.substr(o.lastIndexOf(".")+1).toLowerCase();try{i=new Blob([s],{type:n+"/"+r})}catch(a){i=(new BlobBuilder).append([s]).getBlob(n+"/"+r)}c(t,i)}function c(t,e){v.storage&&y;var i=URL.createObjectURL(e);"image"===t.type?d(t,i):"audio"===t.type&&t.length?g(t,i):u(t,i)}function d(t,e){var i=new Image;i.onload=function(){t.width||t.height?p(t,i):u(t,e,i)},i.src=e}function p(t,e){v.length--;var i,s,n,o,r,a,h,c,d=t.width||t.height,p=t.height||t.width,g=e.width/d,u=e.height/p,f=0,y=document.createElement("canvas"),m=y.getContext("2d");for(y.width=d,y.height=p,r=0;u>r;r++)for(a=0;g>a;a++){for(v.length++,m.clearRect(0,0,d,p),m.drawImage(e,a*d,r*p,d,p,0,0,d,p),s=y.toDataURL("img/png"),n=atob(s.split(",")[1]),o=new ArrayBuffer(n.length),uint=new Uint8Array(o),h=0,c=n.length;c>h;h++)uint[h]=n.charCodeAt(h);i={type:"image",id:t.id,origin:t.src,frame:f},l(i,o),f++}}function g(){}function u(t,e,i){t.origin?(v._assets[t.origin][0]||(v._assets[t.origin]=[]),v._assets[t.origin][t.frame]=i||e):v._assets[t.src]=i||e,t.id?v[t.type][t.id]=v._assets[t.src||t.origin]:(v[t.type]._||(v[t.type]._=[]),v[t.type]._.push(v._assets[t.src||t.origin])),--v.length||o("load",v)}var f=t(),y=e(),m={load:Array(1),error:Array(1),progress:Array(1)},v={storage:!1,_assets:{},image:{},audio:{},video:{},length:0,total:0,step:0,finished:!0},w={Object:function(t){var e,i,o,r,a,h,l,c,d=[],p=0,g=Object.keys(t);for(a=0,h=g.length;h>a;a++)if(e=g[a],"Object"===s(t[e]))for(i=Object.keys(t[e]),l=0,c=i.length;c>l;l++)r=t[e][i[l]],o={type:e,id:i[l],src:r.src||r},r.width&&(o.width=r.width),r.height&&(o.height=r.height),"Object"===s(r)&&r.length&&(o.length=r.length),d[p++]=o;else r=t[e],o={type:n(t[e]),id:e,src:r.src||r},r.width&&(o.width=r.width),r.height&&(o.height=r.height),r.length&&(o.length=r.length),d[p++]=o;return d},Array:function(t){var e,i,o,r,a=[],h=0;for(o=0,r=t.length;r>o;o++)e=t[o],"String"!==s(e)?(i={type:e.type||n(e.src),id:e.id,src:e.src},e.width&&(i.width=e.width),e.height&&(i.height=e.height),e.length&&(i.length=e.length),a[h++]=i):(i={type:n(e),id:null,src:e},a[h++]=i);return a},String:function(t){return[{id:null,type:n(t),src:t}]}},b=function(t,e,i){m[t][0]=[e,i]},C=function(t,e,n){n&&(v.storage=i(n)),e&&(m.load[0]=[e]),t=w[s(t)](t);var o,a,h=t.length;for(v.length=h,v.finished=!1,v.total=0,v.step=~~(.5+100/h),a=0;h>a;a++)o=t[a],v._assets[o.src]=0,r(o)},T=function(t,e,i){var o=e?v[t][e]:v._assets[t];if(!o)return null;if(i&&(o=o[i]),"String"!==s(o))return o;e||(t=n(t));var r="audio"===t?new Audio:document.createElement("video");return r.src=o,r},L=function(t,e){t=w[s(t)](t);var i,n,o,r=t.length;for(o=0;r>o;o++)i=t[o],n=v._assets[i.src],delete v._assets[i.src],URL.revokeObjectURL(n.src||n)};return{on:b,set:C,get:T,unset:L}}()}(),function(){var t=display.Grid=function(){display.Element.prototype.grid=this,display.Background.prototype.grid=this};t.prototype.init=function(t){this.params=t||this.params,this.params&&(this.setup(this.params),this.definePositions(),this.createCanvas(),this.update())},t.prototype.setup=function(t){this.origin=this.screen.ctx,this.width=this.screen.cvs.width,this.height=this.screen.cvs.height,this.frames=this.getFrames(),this.players=t.players,this.circles=t.circles,this.lanes=t.lanes,this.distanceToUser=t.distanceToUser,this.circleOffset=t.circleOffset,this.outerCircleRadius=config.outerCircleRadius=this.height/2-100,this.maxRadius=Math.sqrt(this.width*this.width+this.height*this.height)/2,this.posX=0,this.posY=0,this.transX=0,this.transY=0,this.transXDest=0,this.transYDest=0},t.prototype.getFrames=function(){return config.frames},t.prototype.definePositions=function(){var t,e,i,s,n,o,r,a,h,l,c,d,p,g=this.distanceToUser,u=this.circleOffset,f=this.outerCircleRadius,y=this.frames,m=this.circles,v=this.lanes,w=v*y,b=2*Math.PI/w,C=1/y,T=this.width/2,L=this.height/2,E=[],S=[],A=[];for(r=0;m>r;r++)for(t=g*f/(g+u*r),c=g/(g+u*r),a=1;w>=a;a++)if(e=Math.cos(b*a)*t+T,i=Math.sin(b*a)*t+L,p=b*a,0!==a%y)S.push({x:e,y:i,scale:c,angle:p,radius:t});else{for(h=1;y>h;h++)s=g*f/(g+u*(r-C*h)),d=g/(g+u*(r-C*h)),n=Math.cos(b*a)*s+T,o=Math.sin(b*a)*s+L,A.push({x:n,y:o,scale:d,angle:p,radius:s});E.length&&(l=E.length-1,E[l].antiRing=S.slice(),l&&0===l%v&&(E[l-1].antiRing=E[l-v].ring.slice())),E.push({id:a*r,x:e,y:i,ring:S.slice().reverse(),dist:A.slice(),scale:c,angle:p,radius:t}),A.length=S.length=0}for(a=v-1;E.length-1>a;a+=v)E[a].antiRing.reverse();E[E.length-1].antiRing=E[E.length-v].ring.slice().reverse(),this.fields=E,this.lanes=v},t.prototype.createCanvas=function(){var t=document.createElement("canvas"),e=t.getContext("2d");t.width=this.width,t.height=this.height,this.ctx=e},t.prototype.update=function(t){var e=1e-4*t;this.transX===this.transXDest?this.transXDest=Math.random()/4-.125:this.transX+e<this.transXDest?this.transX+=e:this.transX-e>this.transXDest?this.transX-=e:this.transX=this.transXDest,this.transY===this.transYDest?this.transYDest=Math.random()/4-.125:this.transY+e<this.transYDest?this.transY+=e:this.transY-e>this.transYDest?this.transY-=e:this.transY=this.transYDest},t.prototype.draw=function(){this.drawCircles(),this.origin.drawImage(this.ctx.canvas,this.posX,this.posY,this.width,this.height)},t.prototype.drawLines=function(){var t=this.fields,e=this.ctx;t.forEach(function(t,i){e.fillText(i,t.x,t.y)})},t.prototype.drawCircles=function(){var t=this.ctx,e=this.width,s=this.height,n=this.circles,o=this.distanceToUser,r=this.outerCircleRadius,a=this.circleOffset;for(i=0;n>i;i++)radius=o*r/(o+a*i),t.beginPath(),t.arc(e/2,s/2,radius,0,2*Math.PI,!0),t.closePath(),t.stroke()},t.prototype.drawGrid=function(){var t,e,i,s=this.ctx,n=2*this.players,o=2*Math.PI/n,r=this.distanceToUser*this.outerCircleRadius/this.distanceToUser,a=this.width/2,h=this.height/2;for(i=0;n>i;i++)s.moveTo(a,h),t=Math.cos(o*i)*r+a,e=Math.sin(o*i)*r+h,s.lineTo(t,e),s.stroke()},t.prototype.getTranslateX=function(t){return this.transX*(this.maxRadius-t)},t.prototype.getTranslateY=function(t){return this.transY*(this.maxRadius-t)}}(),function(){var t=0,e=display.Connection=function(){this.url="ws://"+config.server+":"+config.port,this.initializeSocket()};e.prototype.initializeSocket=function(){this.socket=new WebSocket(this.url);var e=this.manager;this.socket.onopen=function(){console.log("[open]")},this.socket.onclose=function(){console.log("[close]")},this.socket.onmessage=function(i){var s,n,o,r=atob(i.data),a=r.charCodeAt(0),h=[];if(a!==config.protocol.POLLING){if(a===config.protocol.INIT&&(h[0]=r.charCodeAt(1)),a===config.protocol.COUNTDOWN&&(h[0]=r.charCodeAt(1),h[1]=r.substr(2)),a===config.protocol.JOINED&&(h[0]=r.charCodeAt(1),h[1]=r.charCodeAt(2)),a===config.protocol.START){o=r.charCodeAt(1),t=o,h[0]=r.charCodeAt(2);var l=[],c=1;for(n=3;o+3>n;n++)l.push({id:c++,pos:r.charCodeAt(n)});h[1]=l}if(a===config.protocol.MOVE&&(h[0]=r.charCodeAt(1),h[1]=r.charCodeAt(2)),a===config.protocol.HEAL){h[0]=r.charCodeAt(1),o=r.charCodeAt(2);var d=[];for(n=3;o+3>n;n++)d.push(r.charCodeAt(n));h[1]=d}if(a===config.protocol.CREATE){var p=[];for(s=1,o=r.charCodeAt(s++),n=0;o>n;n++)p.push({id:r.charCodeAt(s++),category:r.charCodeAt(s++),start:r.charCodeAt(s++)});h[0]=p}if(a===config.protocol.COLLISION){h[0]=r.charCodeAt(1),o=r.charCodeAt(2);var g=[];for(n=3;o+3>n;n++)g.push(r.charCodeAt(n));h[1]=g}if(a===config.protocol.END){var u=[],f=[];for(s=1,h[0]=(r.charCodeAt(s++)<<8)+r.charCodeAt(s++),n=0;t>n;n++)u.push({color:r.charCodeAt(s++),perc:r.charCodeAt(s++)});h[1]=u;var y,m,v,w;for(v=0;3>v;v++)w=r.charCodeAt(s++),y="",y=r.substr(s,w),s+=w,m=(r.charCodeAt(s++)<<8)+r.charCodeAt(s++),f.push({name:y,score:m});h[2]=f}e.handle(a,h)}},this.socket.onerror=function(t){console.log("[error] ",t)}}}(),function(){var t=display.Manager=function(){this.playerList=[],this.runningGame=!1,this.grid=new display.Grid,this.obstaclePool=new display.ObstaclePool,this.statusManager=new display.StatusManager,this.background=new display.Background,this.options=new display.Options({manager:this}),display.Connection.prototype.manager=this,display.StatusManager.prototype.manager=this},e=function(t,e,i){var s=t.length;do el=t[s],el&&el.visible&&el[e](i);while(s--)};t.prototype.resize=function(){this.grid.init(),this.background.resize(),e(this.playerList,"resize"),e(this.obstaclePool.list,"resize"),this.statusManager.clear(),this.statusManager.init(this.playerList)},t.prototype.render=function(){function t(n){i=n-s,s=n,this.screen.ctx.save(),e(this.playerList,"update",i),e(this.obstaclePool.list,"update",i),this.background.update(i),this.grid.update(i),this.screen.clear(),this.background.draw(),e(this.obstaclePool.list,"draw"),e(this.playerList,"draw"),this.statusManager.draw(),this.screen.ctx.restore(),this.runningGame?requestAnimationFrame(t.bind(this)):this.screen.clear()}var i,s=0;requestAnimationFrame(function(e){s=e,t.call(this,e)}.bind(this))},t.prototype.handle=function(t,e){var i={1:this.init,2:this.teamname,3:this.cancel,4:this.countdown,5:this.joined,6:this.start,7:this.move,8:this.heal,9:this.create,10:this.collide,11:this.end};i[t].call(this,e)},t.prototype.init=function(t){var e="http://game.neurron.com/controller/?"+t[0],i=showQRCode(e,{r:14,g:73,b:155}),s=document.getElementById("qr_code"),n=new XMLHttpRequest;n.onload=function(t){var n=JSON.parse(t.currentTarget.responseText).shorturl,o=document.createElement("a");i.className="show",o.href=e,o.textContent=n,o.className="qr_link show",o.target="_blank",s.appendChild(i),s.insertBefore(o,i.nextSibling),s.className="qr_code round show",setTimeout(function(){s.classList.add("fadeIn"),i.classList.add("fadeIn"),o.classList.add("fadeIn")},16.7)},n.open("GET","http://is.gd/create.php?format=json&url="+encodeURI(e),!0),n.setRequestHeader("Content-Type","text/plain; charset=UTF-8"),n.send()},t.prototype.teamname=function(){display.show("load")},t.prototype.cancel=function(){display.show("start"),display.load_view.clearLoadScene()},t.prototype.countdown=function(t){"load"!==display.current&&display.show("load"),display.load_view.loadBar(t[0]),display.teamname=t[1]?t[1]:"",display.load_view.hideLoadBar(),display.load_view.greetTeam()},t.prototype.joined=function(t){display.load_view.showNewPlayer(t[0])},t.prototype.start=function(t){display.show("game"),display.load_view.clearLoadScene(),this.grid.init({lanes:t[0],circleOffset:config.circleOffset,distanceToUser:config.distanceToUser,factor:config.factor,circles:config.circles,players:t[1].length}),this.runningGame=!0,this.playerList=new display.PlayerList(t[1]),this.statusManager.clear(),this.statusManager.init(this.playerList),this.render(),new display.Timer(1e3*60*config.gameTime,"timer")},t.prototype.move=function(t){this.playerList[t[0]-1].move(t[1])},t.prototype.heal=function(t){this.statusManager.handleHeal(t[0],t[1])},t.prototype.create=function(t){var e,i,s,n=t[0];for(i=0,s=n.length;s>i;i++)e=n[i],this.obstaclePool.get(e.id,e.category,e.start)},t.prototype.collide=function(t){this.statusManager.handleCollide(t[0],t[1])},t.prototype.end=function(t){display.show("end"),setTimeout(function(){this.statusManager.showEnd(t[0],t[1],t[2]),this.runningGame=!1,this.screen.clear(),this.obstaclePool.list.length=0,this.obstaclePool.pool.length=0,this.playerList.length=0,this.statusManager.clear()}.bind(this),1e3)}}(),function(){var t=display.Obstacle=function(t){this.init(t)};t.prototype=Object.create(display.Element.prototype),t.prototype.init=function(t){this.endField=t.pos%this.grid.lanes,t.visible=!0,this.value=t.value,this.type=t.type,this.velocity=t.velocity,display.Element.prototype.init.call(this,t),this.collisionCounter=0,this.collisionSound=this.getAsset("audio",t.collisionSound),this.collisionSound.volume=config.audioVolume/100,this.collisionImages=this.getAsset("image",t.collisionImg),this.move(this.endField)},t.prototype.setDir=function(){this.dir="dist"},t.prototype.change=function(){this.pos<this.grid.lanes?this.vanish():this.pos-=this.grid.lanes},t.prototype.changeSprite=function(){this.collisionCounter>0&&this.collide(),display.Element.prototype.changeSprite.call(this)},t.prototype.collide=function(){this.collisionCounter<this.collisionImages.length?(this.src=this.collisionImages[this.collisionCounter],this.collisionCounter++):(this.collisionCounter=0,this.vanish())},t.prototype.vanish=function(){this.visible=!1,this.moving=!1,this.pool.set(this)}}(),function(){var t=display.Player=function(t){this.isPlayer=!0,this.type="player_"+t.id,this.velocity=config.player.velocity,this.visible=!0,this.alive=!0,this.energy=100,this.diffEnergy=0,this.size=config.playerSize,this.color=config.playerColors[t.id],this.init({id:t.id,pos:t.pos}),this.deadSprites=this.getAsset("image","player_dead"),this.transSprite=this.getAsset("image","player_trans"),this.reviveSound=this.getAsset("audio","revive"),this.reviveSound.volume=config.audioVolume/100,this.deadSound=this.getAsset("audio","dead"),this.deadSound.volume=config.audioVolume/100};t.prototype=Object.create(display.Element.prototype),t.prototype.setDir=function(){var t=this.nextPos;this.dir=t>this.pos?t-this.pos<this.grid.lanes/2?"antiRing":"ring":this.pos-t>this.grid.lanes/2?"antiRing":"ring"},t.prototype.change=function(){"ring"===this.dir?0===this.pos%this.grid.lanes?this.pos+=this.grid.lanes-1:this.pos--:this.pos%this.grid.lanes===this.grid.lanes-1?this.pos-=this.grid.lanes-1:this.pos++,this.pos!==this.nextPos?this.setDir():this.moving=!1},t.prototype.die=function(){this.spriteImages=this.deadSprites,this.spriteCounter=0,config.audio&&this.deadSound.play(),this.alive=!1},t.prototype.revive=function(){this.spriteImages=this.originSprites,this.spriteCounter=0,config.audio&&this.reviveSound.play(),this.alive=!0,this.energy=100,this.diffEnergy=100,this.animationStep=2},t.prototype.fade=function(){function t(){i+=s,this.alive||(i>=config.deadTime?this.revive():(i>5*s&&10*s>i||i>20*s&&25*s>i||i>40*s&&44*s>i||i>48*s&&52*s>i||i>54*s&&58*s>i||i>62*s&&66*s>i||i>68*s&&69*s>i||i>70*s&&72*s>i||i>73*s&&76*s>i||i>77*s&&79*s>i||i>80*s&&82*s>i||i>83*s&&86*s>i||i>87*s&&89*s>i||i>90*s&&92*s>i||i>93*s&&96*s>i||i>97*s&&99*s>i?(this.src=this.transSprite,this.spriteImages=null):this.spriteImages=this.deadSprites,setTimeout(t.bind(this),n)))}var e=100,i=0,s=config.deadTime/e,n=1e3*s;setTimeout(t.bind(this),n)}}(),function(){var t=display.Screen=function(){this.createCanvas(),display.Element.prototype.screen=this,display.Background.prototype.screen=this,display.Manager.prototype.screen=this,display.StatusManager.prototype.screen=this,display.Grid.prototype.screen=this};t.prototype.createCanvas=function(){function t(){this.sub=this.cvs.width=window.innerWidth/config.factor*(config.factor-1),this.sub=this.cvs.height=window.innerHeight}var e=document.createElement("div"),i=document.createElement("canvas"),s=document.createElement("canvas");this.cvs=i,this.ctx=i.getContext("2d"),this.sub=s,this.stx=s.getContext("2d"),i.id="screen",e.id="game-l",e.className="wrapper show hide",e.appendChild(i),t.apply(this),document.getElementById("container-left").appendChild(e),window.addEventListener("resize",t.bind(this)),window.addEventListener("orientationchange",t.bind(this))},t.prototype.clear=function(){this.ctx.clearRect(0,0,this.cvs.width,this.cvs.height)}}(),function(){var t=display.ObstaclePool=function(){this.pool=[],this.list=[],display.Obstacle.prototype.pool=this,display.StatusManager.prototype.pool=this};t.prototype.get=function(t,e,i){var s,n=config.obstacles[e];n.id=t,n.pos=i,this.pool.length?(s=this.pool.pop(),s.init.call(s,n)):s=new display.Obstacle(n),this.list[t]=s},t.prototype.set=function(t){delete this.list[t.id],this.pool.push(t)}}(),function(){display.PlayerList=function(t){for(var e=t.length,i=Array(e),s=0;e>s;s++)i[s]=new display.Player(t[s]);return i}}(),function(){var t=display.StatusManager=function(){this.originStep=.5,this.points=0,this.createPanel()};t.prototype.init=function(t){this.points=0,this.playerList=t,this.fullBarWidth=this.offset,this.fullBarHeight=this.canvas.height/16,this.energyBarStartX=this.offset/8,this.colorBarStartX=this.energyBarStartX/2,this.lifeLabelStartX=this.energyBarStartX+this.fullBarWidth+4,this.startY=50,this.color="green",this.distance=this.fullBarHeight+10,this.healer=0;var e=this.panel;this.gradients=[];for(var i=1,s=t.length;s>=i;i++){var n;n=e.createLinearGradient(0,this.startY+i*this.distance,0,this.startY+i*this.distance+this.fullBarHeight),n.addColorStop(0,"rgb("+config.backgroundColors[i].r+","+config.backgroundColors[i].g+","+config.backgroundColors[i].b+")"),n.addColorStop(1,"rgb("+config.playerColors[i].r+","+config.playerColors[i].g+","+config.playerColors[i].b+")"),this.gradients.push(n)}},t.prototype.draw=function(){this.setBackground(),this.showPoints(),this.showLifeBars()},t.prototype.showPoints=function(){var t=this.panel,e=2;t.fillStyle="#0E499B",t.font=e+"em Fredoka One",t.fillText(display.teamname||"neurrons",this.offset/5,30),t.fillText(this.points+" points",this.offset/5,64)},t.prototype.showLifeBars=function(){for(var t,e=this.panel,i=this.playerList,s=0,n=i.length;n>s;s++)t=i[s],e.fillStyle=this.gradients[s],e.fillRect(0,this.startY+(s+1)*this.distance,this.fullBarWidth*((t.energy-t.diffEnergy)/100)+10,this.fullBarHeight),0===t.diffEnergy&&(t.animationStep=this.originStep),t.diffEnergy>0&&(t.diffEnergy-=t.animationStep),0>t.diffEnergy&&(t.diffEnergy+=t.animationStep)},t.prototype.createPanel=function(){var t=document.createElement("div"),e=document.createElement("canvas"),i=e.getContext("2d"),s=document.getElementById("container-right");this.offset=s.offsetWidth-1,e.width=this.offset,e.height=$(s).height(),this.start=this.screen.cvs.width-this.offset,this.panel=i,this.canvas=e,this.setBackground(),e.id="statusmanager",t.appendChild(e),t.id="game-r",t.className="wrapper show hide statusmanagerWrapper",s.appendChild(t)},t.prototype.setBackground=function(){this.panel.fillStyle="#fff",this.panel.fillRect(0,0,this.panel.canvas.width,this.panel.canvas.height)},t.prototype.handleHeal=function(t,e){var i,s,n=e.length,o=config.amountToHeal,r=~~(o/n);if(this.healer=this.playerList[t-1],this.healer.energy>o)for(this.healer.energy-=o,this.healer.diffEnergy=-o,s=0;n>s;s++)i=this.playerList[e[s]-1],90>=i.energy&&(i.energy+=r,i.diffEnergy=r)},t.prototype.handleCollide=function(t,e){var i=this.pool.list[t];if(i){var s,n,o=i.type,r=i.value,a=e.length;if("damage"===o)for(n=0;a>n;n++)s=this.playerList[e[n]-1],s.alive||s.revive(),s.energy>=r?s.energy-=r:s.energy=0,s.diffEnergy=-r,0===s.energy&&(this.points>=config.punishPoints?this.points-=config.punishPoints:this.points=0,s.alive&&(s.die(),s.fade()));else if("heal"===o)for(n=0;a>n;n++){var h=~~(r/a);s=this.playerList[e[n]-1],s.alive||s.revive(),s.energy+=h,s.energy>100&&(s.energy=100),s.diffEnergy=100>s.energy?h:0}else for(n=0;a>n;n++){var l=~~(r/a);s=this.playerList[e[n]-1],s.alive||s.revive(),this.points+=~~(s.energy/100*l)}config.audio&&i.collisionSound&&i.collisionSound.play(),setTimeout(function(){i.collide()},60)}else console.log("Missed: ",t," - ",i)},t.prototype.showEnd=function(t,e,i){setTimeout(function(){document.getElementById("teamname").textContent=display.teamname||"score",document.getElementById("score_value").children[0].textContent=t;var s,n,o=document.styleSheets[document.styleSheets.length-1],r=o.cssRules.length,a=config.colors,h=e.length;for(n=0;h>n;n++)s=e[n],o.insertRule("."+a[s.color]+"{											width: "+s.perc+"%;										}",r+n);document.getElementById("category").textContent=h;var l=document.getElementById("legends").children[0],c=document.getElementById("legends").parentNode,d="<tbody>";for(h=i.length,c.classList.remove("hide"),h||c.classList.add("hide"),n=0;h>n;n++)s=i[n],s.name&&(d+="						<tr>							<td>0"+(n+1)+"</td>							<td>"+s.name+"</td>							<td>"+s.score+"</td>						</tr>					");d+="</tbody>",l.innerHTML=d},16.7)},t.prototype.clear=function(){this.panel.clearRect(0,0,this.canvas.width,this.canvas.height),this.canvas.height=$(document.getElementById("container-right")).height()}}(),function(){var t=display.Background=function(){this.minRadius=20,this.ctx=this.screen.ctx,this.posShift=0,this.rotateDiff=1e-4,this.rotateTime=0,this.rotate=0,this.resize()};t.prototype.resize=function(){var t=this.screen.cvs.width,e=this.screen.cvs.height;this.cx=t/2,this.cy=e/2,this.maxRadius=Math.sqrt(t*t+e*e)/2},t.prototype.update=function(t){this.posShift+=t/config.duration.moveTime,this.rotateTime-=t,0>this.rotateTime&&(this.rotateTime=15e3*Math.random()+3e3,this.rotateDiff=-this.rotateDiff),this.rotate+=this.rotateDiff*t,this.ctx.translate(this.cx,this.cy),this.ctx.rotate(this.rotate),this.ctx.translate(-this.cx,-this.cy)},t.prototype.draw=function(){function t(t,e,i,s){var n,o=(t+g)%2;return n=1>o?(s-i)*o+i:(i-s)*(o-1)+s,n=n*(c-e)/(c-d),~~n}var e,i,s,n,o=0,r=0,a=this.ctx,h=this.cx,l=this.cy,c=this.maxRadius,d=this.minRadius,p=(this.lineWidth,config.outerCircleRadius),g=this.posShift,u=d,f=20;o=this.grid.getTranslateX(0),r=this.grid.getTranslateY(0);var y=a.createRadialGradient(h+o,l+r,1,h,l,c);for(y.addColorStop(0,"rgb(90, 186, 255)"),y.addColorStop((d-1)/c,"rgb(30, 62, 85)"),u=d;c>u;u+=f)e=config.distanceToUser*(p-u)/(u*config.circleOffset),f=~~(40*((u-d)/(c-d))+2),i=t(e,u,17,30),s=t(e,u,29,62),n=t(e,u,72,85),y.addColorStop(u/c,"rgb("+i+","+s+","+n+")");a.fillStyle=y,a.beginPath(),a.arc(h,l,c,0,2*Math.PI,!1),a.fill()}}(),function(){var t=display.Options=function(t){this.manager=t.manager,this.init()};t.prototype.init=function(){screenfull.onchange=this.changeFullScreen.bind(this),this.handleClick()},t.prototype.handleClick=function(){document.getElementById("options").addEventListener("click",function(t){var e=t.target,i=e.id;this[i]&&(e.classList.toggle("off"),this[i]())}.bind(this))},t.prototype.volume=function(){config.audio=!config.audio;var t=config.audio?"play":"pause",e=display.tracks.current,i=display.tracks.next;i&&i[t](),e&&(config.audio&&!e.volume&&display.sound(e),e[t]())},t.prototype.fullscreen=function(){screenfull.enabled&&screenfull.toggle()};var e=document.getElementById("fullscreen");t.prototype.changeFullScreen=function(){screenfull.isFullscreen||e.classList.remove("off"),this.manager.resize()}}(),function(){function t(){var e=display.tracks.current,i=display.tracks.next;e.volume=Math.max(e.volume-o,0),config.audio&&(i.volume=n-s*o),s--?setTimeout(t,1e3):display.tracks.current=i}var e=document.getElementById("container-left"),i=document.getElementById("container-right");display.current=null,display.show=function(t){function s(t){var e=t.currentTarget;e.classList.remove("fadeOut"),e.classList.add("hide"),e.removeEventListener(transitionend,s),--l||n()}function n(){o=document.getElementById(t+"-l"),r=document.getElementById(t+"-r"),o?(o.classList.remove("hide"),setTimeout(function(){o.classList.add("fadeIn")},16.7)):h&&h.left&&(a=document.createElement("div"),a.innerHTML=h.left,a.id=t+"-l",a.className="wrapper show",e.appendChild(a),setTimeout(function(){document.getElementById(t+"-l").classList.add("fadeIn")},16.7)),r?(r.classList.remove("hide"),setTimeout(function(){r.classList.add("fadeIn")},16.7)):h&&h.right&&(a=document.createElement("div"),a.innerHTML=h.right,a.id=t+"-r",a.className="wrapper show",i.appendChild(a),setTimeout(function(){document.getElementById(t+"-r").classList.add("fadeIn")},16.7)),display.logic[t]&&display.logic[t]()}var o,r,a,h=display.views[t],l=0;display.current?(o=document.getElementById(display.current+"-l"),r=document.getElementById(display.current+"-r"),o&&(l++,o.classList.remove("fadeIn"),o.classList.add("fadeOut"),o.addEventListener(transitionend,s)),r&&(l++,r.classList.remove("fadeIn"),r.classList.add("fadeOut"),r.addEventListener(transitionend,s))):n(),display.current=t},display.tracks={current:null,next:null};var s,n=config.audioVolume/100,o=~~(config.audioVolume/config.audioFading+.5)/100;display.sound=function(e){var i=display.tracks,o=i.current;if(o){var r=i.next=e;r.volume=0,s=config.audioFading,t(),r.play()}else o=i.current=e,o.currentTime=0,o.volume=config.audio?n:0,o.play()}}(),function(){var t=display.Timer=function(t,e,i){this.timeLeft=t,this.type=e,this.timeLeftString="",this.appendTo=document.getElementById(i),i||(this.appendTo=document.body),this.loop()};t.prototype.loop=function(){if(this.timeLeft-=1e3,this.setTimeLeftString(),this.displayTimeLeft(),this.timeLeft>=1e3)window.setTimeout(this.loop.bind(this),1e3);else{var t=document.getElementById(this.type);this.appendTo.removeChild(t)}},t.prototype.setTimeLeftString=function(){var t=~~(this.timeLeft/1e3/60),e=~~(this.timeLeft/1e3)-60*t;
10>e&&(e="0"+e),this.timeLeftString="0"+t+":"+e},t.prototype.displayTimeLeft=function(){var t=document.getElementById(this.type);t?t.innerHTML=this.timeLeftString:(t=document.createElement("div"),t.id=this.type,t.className=this.type,t.innerHTML=this.timeLeftString,this.appendTo.appendChild(t))}}();