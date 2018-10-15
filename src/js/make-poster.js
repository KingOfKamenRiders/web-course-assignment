/**
 * 实现的功能：图片的编辑、合成、截取
 * 依赖的第三方库：
 * fabric.js : http://fabricjs.com/
 * jQuery : https://jquery.com/
 * jQuery.Jcrop : http://deepliquid.com/content/Jcrop.html
 * 以上三个库都采用<script>标签依赖cdn上的文件的方式，无须下载
 */

//三个画布对象
var c_portrait = null,c_poster = null,c_ultimate = null

//用户选择的英雄
var cur_hero = null

//截图时的参数
var anchor_x = 0, anchor_y = 0, crop_w = 0, crop_h =0

//一些常量参数
const CANVAS_1_ID = 'c',CANVAS_1_WIDTH = 500,CANVAS_1_HEIGHT = 500
const CANVAS_2_ID = 'poster', CANVAS_2_WIDTH = 800, CANVAS_2_HEIGHT = 600
const CANVAS_3_ID = 'ultimate_work',CANVAS_3_WIDTH = 800, CANVAS_3_HEIGHT = 600
const ITEM_WIDTH = 50,ITEM_HEIGHT = 50
const HERO_URLS = ['../image/index/iron_man.jpg','../image/index/captain_America.jpg','../image/index/spider_man.jpg',
    '../image/index/black_widow.jpg','../image/index/Hulk.jpg','../image/index/Thor.jpg',
    '../image/index/Dead_Pool.jpg','../image/index/Dr.Strange.jpg','../image/index/panther.jpg']
const HEROES= ['钢铁侠','美国队长','蜘蛛侠','黑寡妇','绿巨人','雷神','死侍','奇异博士','黑豹']
const HAIRSTYLE_URLS = ['../image/make-poster/hs1-1.png','../image/make-poster/hs2-2.png','../image/make-poster/hs3-3.png',
    '../image/make-poster/hs4-4.png','../image/make-poster/hs5-5.png']
const WEAPON_URLS = ['../image/make-poster/shield.png','../image/make-poster/hammar.png','../image/make-poster/gun1.png',
    '../image/make-poster/gun2.png','../image/make-poster/gun3.png']
const FACIAL_URLS = ['../image/make-poster/b1.png','../image/make-poster/b2.png','../image/make-poster/g1.png',
    '../image/make-poster/g2.png','../image/make-poster/g3.png']
const BGIS = ['../image/make-poster/bg1.jpg','../image/make-poster/bg2.jpg','../image/make-poster/bg3.jpg']

//网页初始化方法
function init() {
    init_canvas();
    add_hero_bind();
    add_item_bind();
    set_visible();
    init_button();
}

//初始化画布对象
function init_canvas() {
    c_portrait = new fabric.Canvas(CANVAS_1_ID);
    c_portrait.on('mouse:dblclick',function (option) {
        console.log('ok')
        console.log(option.target)
        c_portrait.remove(option.target)
    })
    c_poster = new fabric.Canvas(CANVAS_2_ID);
    fabric.Image.fromURL(BGIS[0],(img)=>{
        img.set({
            scaleX: CANVAS_2_WIDTH / img.width,
            scaleY: CANVAS_2_HEIGHT / img.height,
        });
        c_poster.setBackgroundImage(img, c_poster.renderAll.bind(c_poster));
    })
    c_ultimate = new fabric.Canvas(CANVAS_3_ID);
}

//添加控件绑定方法
function add_hero_bind() {
    $.each($('.add-hero'),(i,v)=>$(v).on('click',
        ()=>{
        fabric.Image.fromURL(HERO_URLS[i], function(img) {
                img.set({
                    scaleX: CANVAS_1_WIDTH / img.width,
                    scaleY: CANVAS_1_HEIGHT / img.height
                });
                c_portrait.setBackgroundImage(img, c_portrait.renderAll.bind(c_portrait));
            })
        cur_hero = HEROES[i];
        }))
}


function add_item_bind() {
    $.each($('#hs img'),(i,v)=>$(v).on('click',
        ()=>fabric.Image.fromURL(HAIRSTYLE_URLS[i],function (img) {
            img.set({
                scaleX: ITEM_WIDTH / img.width,
                scaleY: ITEM_HEIGHT / img.height,
                top:100,
                left:100,
            });
            c_portrait.add(img)
        })))
    $.each($('#weapons img'),(i,v)=>$(v).on('click',
        ()=>fabric.Image.fromURL(WEAPON_URLS[i],function (img) {
            img.set({
                scaleX: ITEM_WIDTH / img.width,
                scaleY: ITEM_HEIGHT / img.height,
                top:100,
                left:100,
            });
            c_portrait.add(img)
        })))
    $.each($('#facials img'),(i,v)=>$(v).on('click',
        ()=>fabric.Image.fromURL(FACIAL_URLS[i],function (img) {
            img.set({
                scaleX: ITEM_WIDTH / img.width,
                scaleY: ITEM_HEIGHT / img.height,
                top:100,
                left:100,
            });
            c_portrait.add(img)
        })))
    $.each($('#bgis img'),(i,v)=>$(v).on('click',
        ()=>fabric.Image.fromURL(BGIS[i],(img)=>{
            img.set({
                scaleX: CANVAS_2_WIDTH / img.width,
                scaleY: CANVAS_2_HEIGHT / img.height,
            });
            c_poster.setBackgroundImage(img, c_poster.renderAll.bind(c_poster));
        })))
}

function onCropChange(c) {
    anchor_x = c.x
    anchor_y = c.y
    crop_w = c.w
    crop_h = c.h

    var rx = 300 / c.w;
    var ry = 300 / c.h;

    $('#preview').css({
        width: Math.round(rx * 500) + 'px',
        height: Math.round(ry * 375) + 'px',
        marginLeft: '-' + Math.round(rx * c.x) + 'px',
        marginTop: '-' + Math.round(ry * c.y) + 'px'
    });
}
function init_button() {
    $('#next-1').on('click',function () {
        if(!cur_hero)
            alert('请先选择一个人物')
        else{
            $('.edit-area').fadeIn();
            $('.roles').slideUp();
        }
    })
    $('#next-2').on('click',function () {
        $('.assemble-area').fadeIn();
        $('.edit-area').slideUp();
        var portrait = c_portrait.toDataURL()
        fabric.Image.fromURL(portrait,(img)=>{
            img.set({
                scaleX: 200 / img.width,
                scaleY: 350 / img.height,
            });
            c_poster.add(img)
        })
    })
    $('#next-3').on('click',function () {
        var poster = c_poster.toDataURL();
        $('#before-crop').attr({
            src:poster,
        })
        $('#preview').attr({
            src:poster,
        })
        $('#before-crop').Jcrop({
            onChange:onCropChange,
            onSelect:onCropChange,
            aspectRatio:1
        })
        $('.crop-area').fadeIn();
        $('.assemble-area').slideUp();
    })
    $('#next-4').on('click',function () {
        console.log(c_poster.toDataURL({
            left:anchor_x,
            top:anchor_y,
            width:crop_w,
            height:crop_h,
        }));
        fabric.Image.fromURL(c_poster.toDataURL({
            left:Math.round(anchor_x*CANVAS_2_WIDTH/500),
            top:Math.round(anchor_y*CANVAS_2_HEIGHT/375),
            width:Math.round(crop_w*CANVAS_2_WIDTH/500),
            height:Math.round(crop_h*CANVAS_2_HEIGHT/375),
        }),(img)=>{
            img.set({
                scaleX: CANVAS_3_WIDTH / img.width,
                scaleY: CANVAS_3_HEIGHT / img.height,
            });
            c_ultimate.setBackgroundImage(img, c_ultimate.renderAll.bind(c_ultimate));
        });
        $('.ultimate').fadeIn();
        $('.crop-area').slideUp();
    })
}
function set_visible() {
    $('.edit-area').hide();
    $('.assemble-area').hide();
    $('.crop-area').hide();
    $('.ultimate').hide();
}