/**
 * Created by jopi on 14-9-7.
 */

/**
 * Created by jopi on 14-9-7.
 */

/**
 * 如何游戏的帮助界面
 * @type {extend|*}
 */
var LevelSelectLayer = cc.Layer.extend({
    _touchListener:null,
    _colNum:4,
    _levelnode:null,
    ctor:function () {
        this._super();
        this.init();

    },
    init:function () {
        var winSize = cc.director.getWinSize();

        this.addChild(PublicFunction.getBg());

        var logo = cc.Sprite.createWithSpriteFrameName("top.png");
        logo.setAnchorPoint(0.5,0.5);
        logo.setPosition(winSize.width / 2,winSize.height / 2 + 300);
        this.addChild(logo, 10, 1);

        this._levelnode = ccui.Layout.create();
        this.addChild(this._levelnode);
        this._levelnode.setPosition(cc.p(winSize.width/4,winSize.height/3));

        this.initLevels();


    },
    initLevels:function(){
        var rowNum = Math.ceil (levels.length / this._colNum);
        for(var i = 0 ; i < rowNum; i++){
            for(var j = 0 ; j < this._colNum; j++){
                var button = ccui.Button.create("btnlock.png","btnlock.png","btnlock.png",ccui.Widget.PLIST_TEXTURE);
                button.setPosition(i * 80,j * 80);
                button.setTitleText(i);
                this._levelnode.addChild(button);
            }
        }
    }
});


var LevelSelectScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new LevelSelectLayer();
        this.addChild(layer);
    }
});