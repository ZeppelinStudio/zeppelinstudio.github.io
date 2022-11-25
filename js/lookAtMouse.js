function updateImageMouse(element, mouseX, mouseY) {
    elementRect = element.getBoundingClientRect();
    let indexSplit = element.src.lastIndexOf("/") + 1
    let id = element.src.slice(0, indexSplit);
    let name = element.src.slice(indexSplit, element.src.lastIndexOf("_") + 1);
    let elemX = elementRect.x + elementRect.width * 0.5;
    let elemY = elementRect.y + elementRect.height * 0.5;

    //evaluate position
    let above = false;
    let left = false;
    let middleX = false;
    let middleY = false;
    if(elemY > mouseY) above = true;
    if(elemX > mouseX) left = true;
    if(mouseX < elementRect.right && mouseX > elementRect.left) {
        middleX = true;
    }
    if(mouseY > elementRect.top && mouseY < elementRect.bottom) {
        middleY = true;
    }

    //choose an replace image
    if(middleY) {
        if(!middleX) {
            if(left) element.src = id + name + "l.jpg";
            else element.src = id + name +"r.jpg";
        } else {
            element.src = id + name +"c.jpg";
        }    
    } else {
        if(above) {
            if(!middleX) {
                if(left) element.src = id + name +"tl.jpg";
                else element.src = id + name + "tr.jpg";
            } else {
                element.src = id + name + "t.jpg";
            }  
        } else {
            if(!middleX) {
                if(left) element.src = id + name + "bl.jpg";
                else element.src = id + name + "br.jpg";
            } else {
                element.src = id + name + "b.jpg";
            }  
        }
    }
}

function handleMouseMove(event) {
    init();
    var e = window.event;
    var pageX = e.clientX;
    var pageY = e.clientY;

    let images = document.getElementsByClassName('lookAtMouse');
    for (var i=0, len=images.length; i<len; ++i) {
        updateImageMouse(images[i], pageX, pageY);
    };
}

function updateImageScroll(element) {
    elementRect = element.getBoundingClientRect();
    let indexSplit = element.src.lastIndexOf("/") + 1
    let id = element.src.slice(0, indexSplit);
    let name = element.src.slice(indexSplit, element.src.lastIndexOf("_") + 1);

    let steps = document.body.clientHeight / 100;
    if(elementRect.y < steps)
        element.src = id + name + "b.jpg";
    else if(elementRect.y < steps * 10)
        element.src = id + name + "br.jpg";
    else if(elementRect.y < steps * 55)
        element.src = id + name + "r.jpg";
    else if(elementRect.y < steps * 80)
        element.src = id + name + "tr.jpg";
    else 
        element.src = id + name + "t.jpg";
}

function handleScroll() {
    let images = document.getElementsByClassName('lookAtMouse');
    for (var i=0, len=images.length; i<len; ++i) {
        updateImageScroll(images[i]);
    };
}

function onTouch(evt) {
    // evt.preventDefault();
    // if (evt.touches.length > 1 || (evt.type == "touchend" && evt.touches.length > 0))
    //   return;
  
    var newEvt = document.createEvent("MouseEvents");
    var type = "mousemove";
    var touch = evt.changedTouches[0];
  
    newEvt.initMouseEvent(type, true, true, evt.originalTarget.ownerDocument.defaultView, 0,
      touch.screenX, touch.screenY, touch.clientX, touch.clientY,
      evt.ctrlKey, evt.altKey, evt.shiftKey, evt.metaKey, 0, null);
    evt.originalTarget.dispatchEvent(newEvt);
  }

function init() {
    let preloader = document.getElementById("preloader");
    if(preloader != null) return;

    let para = document.createElement("DIV");
    para.style = "display: none";
    para.id = "preloader";
    let wrapper = document.body.appendChild(para);

    let images = document.getElementsByClassName('lookAtMouse');
    for (var i=0, len=images.length; i<len; ++i) {
        preloadImage(images[i], wrapper);
    };
}

function preloadImage(element, wrapper) {
    let indexSplit = element.src.lastIndexOf("/") + 1
    let id = element.src.slice(0, indexSplit);
    let name = element.src.slice(indexSplit, element.src.lastIndexOf("_") + 1);

    var preload = document.createElement("IMG");
    preload.src = id + name + "b.jpg";
    wrapper.appendChild(preload);

    var preload = document.createElement("IMG");
    preload.src = id + name + "b.jpg";
    wrapper.appendChild(preload);

    var preload = document.createElement("IMG");
    preload.src = id + name + "br.jpg";
    wrapper.appendChild(preload);

    var preload = document.createElement("IMG");
    preload.src = id + name + "r.jpg";
    wrapper.appendChild(preload);

    var preload = document.createElement("IMG");
    preload.src = id + name + "tr.jpg";
    wrapper.appendChild(preload);

    var preload = document.createElement("IMG");
    preload.src = id + name + "t.jpg";
    wrapper.appendChild(preload);
}

let isMobile = false;
(function(a){
    if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4)))
        isMobile = true;
})(navigator.userAgent||navigator.vendor||window.opera);

document.onmousemove = handleMouseMove;
if(isMobile) document.onscroll = handleScroll;
document.ontouchstart = onTouch;
document.ontouchmove = onTouch;

// document.onscroll = handleMouseMove;