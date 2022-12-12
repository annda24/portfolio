// greeting.js

// Designed by: Jarlan Perez; Original image: https://www.artstation.com/artwork/VdBllN
// reference : Ricardo Oliva Alonso, 3D Room-Pure CSS; Origin Code : https://codepen.io/ricardoolivaalonso/pen/mdPzrpe

window.addEventListener('load',() => {
    // const
    const modeling = document.querySelector("div#h.house");
    const frame = modeling.parentElement;
    const rotX_default = 77;
    const rotZ_default = 40;
    const scale_default = 1;

    // let
    let rotX = rotX_default;
    let rotZ = rotZ_default;
    let scale = scale_default;
    /** true :  */
    let event_on = true;
    let before_X = 0.5;
    let before_Y = 0.5;

    // default
    modeling.style.transform = `scale(${scale}) perspective(300vmin) rotateX(${rotX}deg) rotateZ(${rotZ}deg) translateX(0) translateY(0) translateZ(-22vmin)`;   

    // function
    /** pointermove Event; cursur 위치에 따른 모델링 회전 */
    function Event_pointerMove_modeling_rotate (e) {
        let now_X = e.pageX / window.innerWidth;
        let now_Y = e.pageY / window.innerHeight;

        // cursur X방향 이동 -> rotateZ +-; -40 ~ 140 범위에서만 반응
        if (now_X > before_X && rotZ < 140) {rotZ = Math.min(rotZ + 0.5,140);}
        else if (now_X < before_X && rotZ > -40) {rotZ = Math.max(rotZ - 0.5,-40);}

        // cursur Y방향 이동 -> rotateX +-; -20 ~ 110 범위에서만 반응
        if (now_Y > before_Y && rotX < 110) {rotX = Math.min(rotX + 0.4,110);}
        else if (now_Y < before_Y && rotX > -20) {rotX = Math.max(rotX - 0.4,-20);}

        modeling.style.transform = `scale(${scale}) perspective(300vmin) rotateX(${rotX}deg) rotateZ(${rotZ}deg) translateX(0) translateY(0) translateZ(-22vmin)`;

        before_X = now_X;
        before_Y = now_Y;
        // console.log(rotX, rotZ);
    };// rotX : -20 ~ 110 / rotZ : -40 ~ 140

    /** wheel Event; wheel action에 따른 모델링 scale 변화 */
    function Event_wheel_modeling_zoomInOut (e) {
        scale -= e.deltaY / 1500;
        modeling.style.transform = `scale(${scale}) perspective(300vmin) rotateX(${rotX}deg) rotateZ(${rotZ}deg) translateX(-10vmin) translateZ(-30vmin)`;
    };

    /** click Event; 클릭으로 pointermove Event add/remove */
    function Event_click_rotateOnOff (){
        if (event_on == true){// EventListener 중단
            frame.removeEventListener('pointermove',Event_pointerMove_modeling_rotate);
            event_on = false;
        }else if(event_on == false) {// EventListener 실행
            frame.addEventListener('pointermove', Event_pointerMove_modeling_rotate);
            event_on = true;
        }
    };

    /** Click Event; 우클릭시 모델링 transform 초기화 */
    function Event_contextmenu_transform_initialization (e){
        // 1. 우클릭 기본 이벤트 삭제
        e.preventDefault();

        // 2. 초기 값으로 업데이트
        rotX = rotX_default;
        rotZ = rotZ_default;
        scale = scale_default;

        // 3. modeling.animate
        modeling.animate(
            {transform :`scale(${scale}) perspective(300vmin) rotateX(${rotX}deg) rotateZ(${rotZ}deg) translateX(0) translateY(0) translateZ(-22vmin)`},
            {duration:500,fill:"forwards",easing:"ease-in-out"}
        );

        // 4. Event_modeling_rotate 중단
        frame.removeEventListener('pointermove',Event_pointerMove_modeling_rotate);
        event_on = false;
    };
    
    // addEventListener
    frame.addEventListener('pointermove',Event_pointerMove_modeling_rotate);
    frame.addEventListener('wheel',Event_wheel_modeling_zoomInOut);
    frame.addEventListener('click',Event_click_rotateOnOff);
    frame.addEventListener('contextmenu',Event_contextmenu_transform_initialization);

    // 수정필요
    // frame 우클릭('contextmenu') 이벤트 실행 후 다른 이벤트 실행이 안됨
});