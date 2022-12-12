window.addEventListener('load',()=>{
    const span = document.querySelectorAll("#arch span");
    console.log(span, span.length);
    
    //** 3d 모델링 */
    function Create_span_parts(item){
        const newDiv_front = document.createElement("div");
        const newDiv_back = document.createElement("div");
        const newDiv_left = document.createElement("div");
        const newDiv_right = document.createElement("div");
        const newDiv_top = document.createElement("div");
        const newDiv_bottom = document.createElement("div");
    
        newDiv_front.setAttribute("class","face front");
        newDiv_back.setAttribute("class","face back");
        newDiv_left.setAttribute("class","face left");
        newDiv_right.setAttribute("class","face right");
        newDiv_top.setAttribute("class","face top");
        newDiv_bottom.setAttribute("class","face bottom");
    
        item.appendChild(newDiv_front);
        item.appendChild(newDiv_back);
        item.appendChild(newDiv_left);
        item.appendChild(newDiv_right);
        item.appendChild(newDiv_top);
        item.appendChild(newDiv_bottom);
    }
    
    span.forEach(item => Create_span_parts(item));
});