
var MainSceneLayer = cc.Layer.extend({
	sprite:null,
	_level:null,
	_filed:null,
	_lineNode:null,
	_drawNode:null,
	_collisions:null,
	_touchNode:null,
	_bgCircleColor:cc.color(100,100,100,255),
	_bg0Color:cc.color(7,195,13,255),
	_bg1Color:cc.color(235,170,34),
	_bg2Color:cc.color(185,24,14),

    _touchLength:20,
	
	ctor:function () {
		//////////////////////////////
		// 1. super init first
		this._super();

		this._drawNode = new cc.DrawNode();
		this.addChild(this._drawNode, 10);
		
		/////////////////////////////
		// 2. add a menu item with "X" image, which is clicked to quit the program
		//    you may modify it.
		// ask the window size
		var size = cc.winSize;
		//this._drawNode.setPosition(cc.p(size.width / 2,size.height));
		this._collisions = [
		                    [0, 0, 0, 0],
		                    [false, false, false, false, false]
		                    ];
		
		
		this._level = levels[0];
		this._filed = this._level[0];
		this._lineNode = this._level[1];
		cc.log(this._level);
		cc.log(this._filed);
		cc.log(this._lineNode);
		
		this.collisionMagic();
		this.reDraw();
		//this.initDot();
		
	},

    getTouchedFiled:function(location){

        for (var index = 0; index < this._filed.length; index++) {
            var position =  cc.p(this._filed[index][0],this._filed[index][1]);
            cc.log(position.x + "   " + position.y);
            cc.log(location.x + "   " + location.y);
            var rect = cc.rect(position.x - this._touchLength,position.y - this._touchLength,2* this._touchLength,2*this._touchLength);
            if(cc.rectContainsPoint(rect,location)) return this._filed[index];
        }
        return null;
    },

    _onTouchBegan: function (touch, event) {
        cc.log("_onTouchBegan");
        var target = event.getCurrentTarget();
        var location = touch.getLocation();
        //cc.log(location.x + "   " + location.y);
        var nodeLocation = target._drawNode.convertToNodeSpace(location);
        //cc.log(nodeLocation.x + "   " + nodeLocation.y);
        this._touchNode = this.getTouchedFiled(nodeLocation);
        cc.log(this._touchNode);
        return true;
    },

    _onTouchMoved: function (touch, event) {
        var target = event.getCurrentTarget();
        var location = touch.getLocation();
        var nodeLocation = target._drawNode.convertToNodeSpace(location);

        if(this._touchNode != null)
        {
        	this._touchNode[0] = Math.floor(nodeLocation.x);
        	this._touchNode[1] = Math.floor(nodeLocation.y);

            //this.collisionMagic();
            this.reDraw();
        }

    },

    _onTouchEnded:function(touch, event){
        this._touchNode = null;
        this.collisionMagic();
        this.reDraw();
    },
    _onTouchCancelled:function(touch, event){
        this._touchNode = null;
        this.collisionMagic();
        this.reDraw();
    },

    onEnter:function(){
        this._super();
    	this._touchListener = cc.EventListener.create({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true,
            onTouchBegan: this._onTouchBegan.bind(this),
            onTouchMoved: this._onTouchMoved.bind(this),
            onTouchEnded: this._onTouchEnded.bind(this),
            onTouchCancelled: this._onTouchCancelled.bind(this)
        });

        var locListener = this._touchListener;
        cc.eventManager.addListener(locListener, this);
        cc.Node.prototype.onEnter.call(this);
    },
    onExit:function(){
    	this._super();
    	cc.eventManager.removeListener(this._touchListener);
    },

	initDot:function(){
		for (var index = 0; index < this._filed.length; index++) {
			var p = cc.p(this._filed[index][0],this._filed[index][1]);
			cc.log(p);
			this._drawNode.drawDot(p, 17, this._bgCircleColor);
			this._drawNode.drawDot(p, 8, this._bg0Color);
		}
	},
	
	reDraw:function () {
		this._drawNode.clear();
		var x;
		var y;
		var c0;
		var c1;
		/*draw lines*/
		var lineWidth = 1;
		var drawColor = null;
		
		for(var i=0; i<this._lineNode.length; i++) {
			c0 = this._filed[this._lineNode[i][0]];
			c1 = this._filed[this._lineNode[i][1]];
			if(this._collisions[1][i]>1) {
				drawColor = this._bg2Color;
			} else if(this._collisions[1][i]==1) {
				drawColor = this._bg1Color;
			} else {
				drawColor = this._bg0Color;
			}
			
			this._drawNode.drawSegment( cc.p(c0[0], c0[1]), cc.p(c1[0], c1[1]), lineWidth, drawColor );
		}

		/*draw circles*/
		for(var i=0; i<this._filed.length; i++) {
			x = this._filed[i][0];
			y = this._filed[i][1];
			drawColor = this._bgCircleColor;
			this._drawNode.drawDot(cc.p(x,y), 17, this._bgCircleColor);
			if(this._collisions[0][i]>1) {
				drawColor = this._bg2Color;
			} else if(this._collisions[0][i]==1) {
				drawColor = this._bg1Color;
			} else {
				drawColor = this._bg0Color;
			}
			this._drawNode.drawDot(cc.p(x,y), 8, drawColor);
		}
	},
	collisionMagic:function () {
		this._collisions = [
		              [],
		              []
		              ];
		for(i=0; i<this._filed.length; i++) {
			this._collisions[0].push(0);
		}
		for(i=0; i<this._lineNode.length; i++) {
			this._collisions[1].push(0);
		}
		B = false;
		for(var i=0; i<this._lineNode.length; i++) {
			for(var j=i; j<this._lineNode.length; j++) {
				if(i!==j) {
					var b = this.checkCollision(this._lineNode[i],this._lineNode[j]);
					if(b) {
						B = true;
						this._collisions[0][this._lineNode[i][0]]+=b;
						this._collisions[0][this._lineNode[j][0]]+=b;
						this._collisions[0][this._lineNode[i][1]]+=b;
						this._collisions[0][this._lineNode[j][1]]+=b;
						this._collisions[1][i] += b;
						this._collisions[1][j] += b;
					}
				}
			}
		}
		/*
		if(!B) {
			winLevel();
		}
		else if(mode==1 && stepLeft==1){
			lostLevel();
		}
		else if(mode==1)
		{
			stepLeft = stepLeft - 1;
			$("#gametitle").text("还剩"+stepLeft+"步！");
		}
		*/
	},
	checkCollision:function (L1, L2) {
		var v1 = {
				p0: {x: this._filed[L1[0]][0], y: this._filed[L1[0]][1]},
				p1: {x: this._filed[L1[1]][0], y: this._filed[L1[1]][1]},
		};
		v1.vx = v1.p0.x-v1.p1.x;
		v1.vy = v1.p0.y-v1.p1.y;
		var v2 = {
				p0: {x: this._filed[L2[0]][0], y: this._filed[L2[0]][1]},
				p1: {x: this._filed[L2[1]][0], y: this._filed[L2[1]][1]}
		};
		v2.vx = v2.p0.x-v2.p1.x;
		v2.vy = v2.p0.y-v2.p1.y;


		var tV1 = {
				vx:v1.p0.x-v2.p0.x,
				vy:v1.p0.y-v2.p0.y
		};
		var tV2 = {
				vx: v2.p0.x-v1.p0.x,
				vy: v2.p0.y-v1.p0.y
		}
		var t1 = this.perP(tV1, v1)/this.perP(v2, v1);
		var t2 = this.perP(tV2, v2)/this.perP(v1, v2);

		return(t1>-1 && t1<0 && t2>-1 && t2<0);
	},
	
	perP:function(va, vb) {
		return va.vx*vb.vy - va.vy*vb.vx;
	}
});

var MainScene = cc.Scene.extend({
	onEnter:function () {
		this._super();
		var layer = new MainSceneLayer();
		this.addChild(layer);
	}
});

