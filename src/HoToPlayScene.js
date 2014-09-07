/**
 * Created by jopi on 14-9-7.
 */

/**
 * 如何游戏的帮助界面
 * @type {extend|*}
 */
var HoToPlayLayer = cc.Layer.extend({
    _touchListener:null,
    ctor:function () {
        this._super();
        this.init();
    },
    init:function () {
        var winSize = cc.director.getWinSize();
        var bg = cc.Sprite.create(res.p_intro_png);
        this.addChild(bg);
        bg.setAnchorPoint(0.5,0.5);
        bg.setScale(1.5);
        bg.setPosition(cc.p(winSize.width/2,winSize.height/2));
    },

    onEnter:function(){
        this._super();
        this._touchListener = cc.EventListener.create({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true,
            onTouchBegan: this._onTouchBegan.bind(this),
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

    _onTouchBegan: function (touch, event) {
        return true;
    },

    _onTouchEnded:function(touch, event){
        cc.director.popScene();
    },

    _onTouchCancelled:function(touch, event){
        cc.director.popScene();
    }
});


var HoToPlayScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new HoToPlayLayer();
        this.addChild(layer);
    }
});