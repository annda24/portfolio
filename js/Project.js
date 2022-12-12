// Project.js
import projectData from "./myProjectData.js";   // 포트폴리오 프로젝트 정보
// projectForm.html, myProjectData.js 참고
/*********************** 1. project data insert **************************************/
/** Section name */
const Project = document.querySelector("section#Project");

// project layout
const projectOl = Project.querySelector("ol.list");
const projectForm = Project.querySelector("article#form");

// extra
const randomEffect_hide = ["left","right","top","bottom"];
const HIDE_CLASS_NAME = "hide";
const LOAD_CLASS_NAME = "load";
const ON_CLASS_NAME = "on";

// function-1 : data에 따라 html 삽입
/** (text,tag,target); object를 참고하여 새로운 li 요소 만들기 */
function newTagAppend (text,tag,target){
    const newTag = document.createElement(tag);
    newTag.innerText = text;
    target.appendChild(newTag);
}
/** (text,url,target); object를 참고하여 새로운 a 요소 만들기 */
function newLinkAppend (text,url,target){
    const newLink = document.createElement("a");
    newLink.innerText = text;
    newLink.setAttribute("href",url);
    target.appendChild(newLink);
} 
/** link 추가, link.main은 title, 나머지는 explain에 추가; (child,target,otherTarget); */
function newLinks(child,target,otherTarget){
    target.innerText = child.name;
    const titleLinks = child.link;

    if(titleLinks.main == undefined){ // link가 1개인 경우; link.main이 별도로 없는 경우
        target.setAttribute("href",child.link);
    } else {// link.main이 별도로 있는 경우
    // 1. link.main을 target에 연결
        target.setAttribute("href",child.link.main);

    // 2. 나머지 링크를 explain에 추가; 맨 밑에 참고용으로 추가
        // 2.1 나머지 링크로만 object 만들기
        /** link.main을 제외한 나머지 링크들; Object; otherTarget에 추가할 링크들 */
        const otherLinks = Object.keys(titleLinks)
        .filter((key) => !key.includes("main"))
        .reduce((cur, key) => {return Object.assign(cur, {
            [key]:titleLinks[key]
        })},{});

        // 2.2 다음 object를 key/value array로 나누기
        const link_name = Object.keys(otherLinks);
        const link_src = Object.values(otherLinks);
        
        // 2.3 두 array를 이용하여 a 요소를 만들고 각 li에 추가하기
        for( var i = 0; i < link_name.length; i++ ){
            const newLink_text = `${link_name[i]} 링크`;
            const newLink_url = link_src[i];
            
            const newLink = document.createElement("li");
            newLinkAppend(newLink_text,newLink_url,newLink);
            otherTarget.appendChild(newLink);
        }
    }
}
/** preview 생성; (child,parent); child:projectData.child; parent:생성 위치=div.area3d; */
function newPreview(child,parent){
    // 1. preview 정보 확인
    const type = Object.keys(child.preview);
    const imgList = Object.values(child.preview);

    // 2. div 및 img 생성
    type.forEach(item => {
        // 2.1 div 생성 -> .previewType / .plate 로 정의될 예정
        const newDiv1 = document.createElement("div");
        
        // 2.2 index 확인
        const index = type.indexOf(item);
        
        // 2.3 img 삽입
        imgList[index].forEach(items => {
            // 2.3.1 이미지 생성
            const newImg = document.createElement("img");
            
            // 2.3.2 img 속성 적용
            const index_img = imgList[index].indexOf(items);
            newImg.setAttribute("src",items);
            // img.title 적용
            if (imgList[index].length == 1){
                // img가 1장
                newImg.setAttribute("title",`${child.name} 미리보기 이미지 - ${item}버전`);
            }else {
                // img가 2장 이상
                newImg.setAttribute("title",`${child.name} 미리보기 이미지 - ${item}_${String(index_img).padStart(2,'0')}`);
            }
            // 이미지 삽입
            newDiv1.appendChild(newImg);
        });

        if(newDiv1.children.length == 1){
            // img가 1장; .area3d > .previewType > img
            // newDiv1 : .plate; frameDiv : .previewType;
            newDiv1.setAttribute("class",`previewType ${item}`);
            parent.append(newDiv1);
        }else {
            // img가 2장 이상;  .area3d > .previewType > .plate > img
            // newDiv1 : .plate; frameDiv : .previewType;
            const frameDiv = document.createElement("div");
            newDiv1.setAttribute("class","plate");
            frameDiv.setAttribute("class",`previewType ${item}`);
            frameDiv.appendChild(newDiv1);
            parent.append(frameDiv);
        }
    });
}

// project list 생성
projectData.forEach(item => {newTagAppend(item.name,"li",projectOl);});

// project article 생성
projectData.forEach(item => {
    // 0. argument
    const project_plate = document.querySelector("#Project .articleFrame div");
    const newProject = projectForm.cloneNode(true);
    const title = newProject.querySelector("h2.title a");
    const preview = newProject.querySelector("div#preview");
    const preview_area3d = preview.querySelector(".area3d");
    const explain = newProject.querySelector("ul.explain");
    const lang = newProject.querySelector("ul.lang");

    // 1. article form 복사
    newProject.setAttribute("id",`works${item.index}`);
    newProject.classList.add(HIDE_CLASS_NAME);

    // 첫번째 프로젝트는 로딩 transition 실행
    if(newProject.getAttribute("id") == "work01"){newProject.classList.add(LOAD_CLASS_NAME);}
    
    // 2. 내용 추가
    newLinks(item,title,explain);                                       // title 내용 추가
    newPreview(item,preview_area3d);                                    // preview 내용 추가
    item.explain.forEach(expl => newTagAppend(expl,"li",explain));      // content > explain 내용 추가
    item.lang.forEach(langs => newTagAppend(langs,"li",lang));          // content > language 내용 추가

    // 3. 생성된 article을 div에 추가
    project_plate.appendChild(newProject);

    // extra
    // e1. app link는 팝업창으로 열기
    if (item.type == "app"){
        const url = title.href;
        const windowName = `preview | ${item.name} `;
        const specs = 'width=450,height=1000,top=200,left=900,toolbar=no,menubar=no,scrollbar=no,resizeble=yes';

        title.setAttribute("onclick",`window.open('${url}','${windowName}','${specs}');return false`);
        title.setAttribute("title","팝업창으로 열기");
    }
});

// article form 삭제
projectForm.remove();

/*********************** 1. project data insert **************************************/

/*********************** 2. preview Ratio update **************************************/

const previewPlate = document.querySelectorAll("#Project #preview .plate");
let areaRatio = 0;
/** area3dRatio 산정 function;
 * area3dRatio = area3d_h/area3d_w; */
function areaRatio_calc(){
    const area3d = document.querySelector("#Project #preview .area3d");
    const area3dStyle = window.getComputedStyle(area3d);
    const area3d_w = Number(area3dStyle.width.substring(0,area3dStyle.width.length-2));
    const area3d_h = Number(area3dStyle.height.substring(0,area3dStyle.height.length-2));
    areaRatio = area3d_h/area3d_w;

    return areaRatio;
}
areaRatio_calc();

/** div.plate가 존재하는 previewType의 객체 크기 지정 function
 * works04, works05, works06 */
function previewPlate_size_update(item){
    // item : div.plate
    // argument
    const area3d = item.parentElement.parentElement;
    const previewType = item.parentElement;
    const img = item.querySelectorAll("img");
    let previewTypeRatio = '';
    if(previewType.classList.contains("Mobile")){
        previewTypeRatio = 20/9;
    }else{
        previewTypeRatio = 9/16;
    }

    // size 산정
    // 1. previewType;
    // pc/tab : 9/16; mob : 20/9;
    if(areaRatio == previewTypeRatio){
        previewType.style.width = '100%';
        previewType.style.height = '100%';
    }else if(areaRatio > previewTypeRatio){
        previewType.style.width = '100%';
        let standard = window.getComputedStyle(previewType).width;
        standard = Number(standard.substring(0,standard.length-2));
        standard = standard * previewTypeRatio;
        previewType.style.height = standard+'px';
    }else{
        previewType.style.height = '100%';
        let standard = window.getComputedStyle(previewType).height;
        standard = Number(standard.substring(0,standard.length-2));
        standard = standard / previewTypeRatio;
        previewType.style.width = standard+'px';
    }

    // 2. img;
    // plate>img 특성상 height:100%;width:previewType.width;
    img.forEach(items => {
        items.style.width = window.getComputedStyle(previewType).width;
        items.style.height = '100%';
    })

    // 3. plate; item; height:100%; width
    item.style.width = img.length * 100 + '%';
    item.style.height = '100%';
}

function previewPlate_size_update_otherArea(item){
    // item : div.plate
    const area3d = item.parentElement.parentElement;
    if(area3d.children.length == 2){
        console.log(area3d.parentElement.parentElement.id);
        // plate가 있는 previewType width 확인
        let plate_w = item.parentElement.style.width;
        plate_w = Number(plate_w.substring(0,plate_w.length-2))

        let otherArea = [].slice.call(area3d.children);
        otherArea = otherArea.filter(item => !item.classList.contains("Mobile"));
        otherArea.forEach(items => {
            console.log(items);
            console.log(otherArea.length);

            const parent = items.parentElement;

            // 1. area3d의 gridTemplateColumns 가져오기
            let gridTemplateColumns = window.getComputedStyle(parent).gridTemplateColumns;
            gridTemplateColumns = gridTemplateColumns.split(' ');
            
            let otherArea_w_all = 0;
            gridTemplateColumns.forEach(ele => {
                const width = Number(ele.substring(0,ele.length-2));
                otherArea_w_all = otherArea_w_all + width;
            });
            otherArea_w_all = otherArea_w_all - plate_w;
            
            if(otherArea.length == 1){
                
            }
            const otherArea_order = window.getComputedStyle(items).gridColumnStart;
            console.log(gridTemplateColumns[otherArea_order-1]);

            // 2. plate가 있는 previewType width 확인하기
            // 3. area3d - plate가 있는 previewType = otherArea
        });
        
    }    
}
previewPlate.forEach(item => {
    previewPlate_size_update(item);
    previewPlate_size_update_otherArea(item);
});
window.addEventListener('resize',()=>{
    areaRatio_calc();
    console.log('코드 작성중');
});

/*********************** 2. preview Ratio update **************************************/

/*********************** 3. project action / effect ***********************************/

/** project page */
let nowView_project = 0;

const projectOl_li = Project.querySelectorAll("ol.list li");
const projects = Project.querySelectorAll("article");
const articleFrame = Project.querySelector(".articleFrame");
const articleFrame_div = articleFrame.querySelector("div");

// function-3 : effect
/** 랜덤으로 effect 부여 */
function randomEffect_setting(item){
    const random_no = Math.floor(Math.random() * randomEffect_hide.length);
    item.classList.add(randomEffect_hide[random_no]);
}
/** 해당 번호의 객체만 hide 삭제, 나머지 hide */
function paging(now,pages){
    nowView_project = now;
    pages.forEach(item => {
        if(!item.classList.contains(HIDE_CLASS_NAME)){
            item.classList.add(HIDE_CLASS_NAME);
            item.classList.remove(ON_CLASS_NAME);
        }
    });
    pages[now].setAttribute("class",ON_CLASS_NAME);
    articleFrame_div.style.left = (-nowView_project * 100) +'%';
}
/** projectlist에 보고있는 article의 index 표시 */
function listClassOn(now){
    projectOl_li.forEach(item => item.classList.remove("on"));
    projectOl_li[now].classList.add("on");
}
/** Event Function; click; project 바로 이동 */
function Event_click_projectList(){
    const thisItem = projectData.filter(key => key.name == this.innerText)[0];
    
    const lastestNo = nowView_project;
    nowView_project = Number(thisItem.index)-1;

    if(nowView_project !== lastestNo){
        paging(nowView_project,projects);
        randomEffect_setting(projects[lastestNo]);
    }

    listClassOn(nowView_project);
}

projects.forEach(item => randomEffect_setting(item));
projectOl_li.forEach(item => item.addEventListener('click',Event_click_projectList));

listClassOn(nowView_project);

projects[0].classList.add(LOAD_CLASS_NAME);
if(!Project.classList.contains("hidden")){
    setTimeout(()=>{
        projects[0].setAttribute("class","");
    },"200");
}
/*********************** 3. project action / effect ***********************************/