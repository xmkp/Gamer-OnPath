/**
 * Created by jopi on 14-9-7.
 */

PublicFunction = {};
PublicFunction.getBg = function(){
    var bg = cc.Node.create();
    var winSize = cc.director.getWinSize();

    var bgPic = cc.Sprite.createWithSpriteFrameName("bg.png");
    var width = bgPic.getContentSize().width - 1;
    var height = bgPic.getContentSize().height -1;
    var countX = Math.ceil(winSize.width / width);
    var countY = Math.ceil(winSize.height / height);

    for(var i= 0 ; i < countX ; i++){
        for(var j = 0 ; j < countY ; j++){
            var oneBg = null;
            if(i == 0 && j == 0){
                oneBg = bgPic;
            }else{
                oneBg = cc.Sprite.createWithSpriteFrameName("bg.png");;
            }
            oneBg.setAnchorPoint(0,0);
            oneBg.setPosition(width * i,height * j);
            bg.addChild(oneBg);
        }
    }
    return bg;
}