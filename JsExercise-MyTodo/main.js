const add_button=document.getElementById("add-button");
const all_button=document.getElementById("all-button");
const unfinished_button=document.getElementById("unfinished-button");
const finished_button=document.getElementById("finished-button");

add_button.onclick=lable_add;
all_button.onclick=show_all;
unfinished_button.onclick=show_unfinished;
finished_button.onclick=show_finished;

let lables=[];
let lable_num=-1;//存放lable数目，方便进行修改和查询
let stack=[];//用于辅助改变状态

//标签的构造函数
function lable(name){
    this.name=name;
    this.state=false;
    this.num=lable_num;
    lable_num++;
}

function lable_add(){
    let new_lable=new lable(document.getElementById("input").value);
    lables.push(new_lable);
    stack.push(lables.length-1);
    print(lables.length-1);
}

function print(num){

    /*创建部分*/
    let lable_container=document.getElementById("lables");//获取lable容器
    let lable_div=document.createElement("div");//存放一条lable
    lable_div.id="lable_div"+num;//给该lable唯一的编号
    let lable_name=document.createElement("div");//存放单个lable的名字
    let lable_state=document.createElement("div");//存放单个lable的状态
    let delete_button=document.createElement("button")//存放删除按钮

    //添加每一个lable内button的监听
    delete_button.onclick=lable_delete;
    //添加名字的监听
    lable_name.onclick=state_change;


    /*
    这一条貌似没有用
    delete_button.id="delete_button"+lable_num;//给该按钮一个唯一的编号
    */

    lable_container.appendChild(lable_div);//向lable容器里添加一条lable
    lable_div.className="lable-div";//采用flex布局

    //向div里添加三个容器
    lable_div.appendChild(lable_name);
    lable_div.appendChild(lable_state);
    lable_div.appendChild(delete_button);



    /*内容设置部分 */
    //设置容器的内容
    lable_name.innerHTML=lables[num].name;
    lable_state.className="state-style";
    delete_button.className="delete-button-style";
    delete_button.innerHTML="删除";
    if(lables[num].state){
        lable_name.className="finished-lable";//已完成的lable
        lable_state.innerHTML="已完成";
    }
    else{
        lable_name.className="unfinished-lable";//未完成的lable
        lable_state.innerHTML="未完成";
    }
}

function lable_delete(e){
    //找到事件源的lable
    let lable=e.target.parentNode;
    //获取该标签的id并从lables内移除
    let number=lable.id.replace("lable_div","");
    lables.splice(number,1);
    lable_num--;//减少lable数目
    stack.splice(number,1);
    //为保持lable-div与其在lables中的一致性，只好全部重新打印
    //删除整个lablescontainer
    let parent=lable.parentNode.parentNode;
    parent.removeChild(lable.parentNode);
    //重建lablescontainer
    let big_div=document.getElementById("big-container");
    let new_container=document.createElement("div");
    big_div.appendChild(new_container);
    new_container.className="lables-container";
    new_container.id="lables";
    for(let i=k;i<stack.length;i++){
        stack[i]--;
    }
    for(let i=0;i<lables.length;i++){
        let flag=false;
        for(let j=0;j<stack.length;j++){
            if(stack[j]===i)
            flag=true;
        }
        if(flag){
            print(i);
        }
    }
}

function state_change(e){
    //寻找事件源
    let text=e.target.parentNode;
    let num=text.id.replace("lable_div","");
    //修改lables内的状态
    lables[num].state=!lables[num].state;
    //重新打印
    //为保持lable-div与其在lables中的一致性，只好全部重新打印
    //删除整个lablescontainer
    let parent=text.parentNode.parentNode;
    parent.removeChild(text.parentNode);
    //重建lablescontainer
    let big_div=document.getElementById("big-container");
    let new_container=document.createElement("div");
    big_div.appendChild(new_container);
    new_container.className="lables-container";
    new_container.id="lables";
    for(let i=0;i<lables.length;i++){
        let flag=false;
        for(let j=0;j<stack.length;j++){
            if(stack[j]===i)
            flag=true;
        }
        if(flag){
            print(i);
        }
    }
}
function show_all(){
    stack.length=0;
    //全部删除，全部重新打印
    let child=document.getElementById("lables");
    let parent=document.getElementById("big-container");
    parent.removeChild(child);
    //重建lablescontainer
    let big_div=document.getElementById("big-container");
    let new_container=document.createElement("div");
    big_div.appendChild(new_container);
    new_container.className="lables-container";
    new_container.id="lables";
    for(let i=0;i<lables.length;i++){
        stack.push(i);
        print(i);
    }
}

function show_finished(){
    stack.length=0;
    //全部删除，全部重新打印
    let child=document.getElementById("lables");
    let parent=document.getElementById("big-container");
    parent.removeChild(child);
    //重建lablescontainer
    let big_div=document.getElementById("big-container");
    let new_container=document.createElement("div");
    big_div.appendChild(new_container);
    new_container.className="lables-container";
    new_container.id="lables";
    //筛选
    let i=0;
    do{
        if(lables[i].state){
            print(i);
            stack.push(i);
        }
        i++;
    }while(i<lables.length)
}
function show_unfinished(){
    stack.length=0;
    //全部删除，全部重新打印
    let child=document.getElementById("lables");
    let parent=document.getElementById("big-container");
    parent.removeChild(child);
    //重建lablescontainer
    let big_div=document.getElementById("big-container");
    let new_container=document.createElement("div");
    big_div.appendChild(new_container);
    new_container.className="lables-container";
    new_container.id="lables";
    //筛选
    let i=0;
    do{
        if(!lables[i].state){
            print(i);
            stack.push(i);
        }
        i++;
    }while(i<lables.length)
}