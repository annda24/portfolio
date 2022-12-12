let nowView_section = 0;
const scrollTop = [];
const Menu = document.querySelector("#Menu");
const link_Menu = Menu.querySelectorAll("li a");
const section = document.querySelectorAll("#Container section");
const articleFrame_div = document.querySelector("#Project .articleFrame");

// function
/** section의 scrollTop 확인; Event_resize 겸용 */
function scrollPos_set(){
    const sectionEA = section.length;
    const scrollTop_Last = document.body.scrollHeight;
    for (var i=0;i<sectionEA;i++){
        const scrollTop_i = scrollTop_Last * i/sectionEA;
        scrollTop.push(scrollTop_i);
    }
}
/** return 받은 pos값으로 이동 (scrollTo) */
function scroll_snap(no){
    window.scrollTo({top:scrollTop[no],behavior:'smooth'});

    section.forEach(item => {
        if (item == item){
            item.classList.add('on');
        } else {
            item.classList.remove('on');
        }
    });
}
/** Event Function; click;
 * sideMenu의 a; 클릭한 li(a)의 section으로 scrollTo */
function Event_click_link_Menu(event){
    event.preventDefault();
    
    // 클릭한 li의 index번호 확인
    const node = event.target.parentElement;
    const nodes = event.target.parentElement.parentElement.children;
    const list = Array.prototype.slice.call(nodes);
    nowView_section = list.indexOf(node);
    
    // 확인된 nowView_section 번의 section으로 이동
    scroll_snap(nowView_section);

    // section.on인 Menu li.on
    list.forEach(items=>{
        if(items == list[nowView_section]){
            items.classList.add("on");
        }else {
            items.classList.remove("on");
        }
    });
}
/** Event Function; wheel; 각 section에 snap */
let nowPos = window.scrollY;
let prevPos = 0;
function Event_scroll(event){
    nowPos = window.scrollY;

    if(!section[2].classList.contains('on')){
        const wheelAction = nowPos - prevPos;
        console.log(wheelAction);

        if (wheelAction > 0 && nowView_section < 2){// wheel Down, next
            nowView_section ++;
        }
        else if (wheelAction < 0 && nowView_section > 0){// wheel Up, prev
            nowView_section --;
        }
        scroll_snap(nowView_section);
    }

    prevPos = nowPos;
}
/** Event Function; resize; wheel action에서 걸리는 snap 위치 재설정 */
function Event_resize_snapReset(){scrollPos_set();}

// addEventListener
window.addEventListener('scroll',Event_scroll);
window.addEventListener('resize',Event_resize_snapReset);
link_Menu.forEach(item => item.addEventListener('click',Event_click_link_Menu));

scrollPos_set();