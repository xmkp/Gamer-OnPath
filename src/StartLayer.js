var StartLayer = cc.Layer.extend({
	ctor:function () {
		this._super();
		this.init();
	},
	init:function () {
		cc.spriteFrameCache.addSpriteFrames(res.p_buttons_plist);
		var winSize = cc.director.getWinSize();
		
		var logo = cc.Sprite.createWithSpriteFrameName("top.png");
		logo.setAnchorPoint(0.5,0.5);
        logo.setPosition(winSize.width / 2,winSize.height / 2 + 150);
		this.addChild(logo, 10, 1);

        var levelNormal = cc.Sprite.createWithSpriteFrameName("chuangguan.png");
        var levelSelected = cc.Sprite.createWithSpriteFrameName("chuangguan.png");
        //levelSelected.setScale(1.1);
        //levelSelected.setAnchorPoint(0.5,0.5);
        var levelDisabled = cc.Sprite.createWithSpriteFrameName("chuangguan.png");

        var competitionNormal = cc.Sprite.createWithSpriteFrameName("jingsai.png");
        var competitionSelected = cc.Sprite.createWithSpriteFrameName("jingsai.png");
        var competitionDisabled = cc.Sprite.createWithSpriteFrameName("jingsai.png");

        var howToPlayNormal = cc.Sprite.createWithSpriteFrameName("wan.png");
        var howToPlaySelected =cc.Sprite.createWithSpriteFrameName("wan.png");
        var howToPlayDisabled = cc.Sprite.createWithSpriteFrameName("wan.png");


        var levelMemuItem = new cc.MenuItemSprite(levelNormal, levelSelected, levelDisabled, function () {

        }.bind(this));

        var competitionMemuItem = new cc.MenuItemSprite(competitionNormal, competitionSelected, competitionDisabled, function () {

        }.bind(this));

        var howToPlayMemuItem = new cc.MenuItemSprite(howToPlayNormal, howToPlaySelected, howToPlayDisabled, function () {

        }.bind(this));

        var menu = new cc.Menu(levelMemuItem, competitionMemuItem, howToPlayMemuItem);
        menu.alignItemsVerticallyWithPadding(10);
        this.addChild(menu, 1, 2);
        menu.x = winSize.width / 2;
        menu.y = winSize.height / 2 - 80;
	}
});