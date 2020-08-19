const add_button=document.getElementById("add-button");

add_button.onclick=lable_add;
let lables=[];
let lable_num=-1;

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
    print(lables.length-1);
}


function print(num){
    let lable_container=document.getElementById("lables");//获取lable容器
    let lable_div=document.createElement("div");//存放一条lable
    lable_div.id="lable_div"+lable_num;
    let lable_name=document.createElement("div");//存放单个lable的名字
    let lable_state=document.createElement("div");//存放单个lable的状态
    let delete_button=document.createElement("button")//存放删除按钮
    delete_button.id="delete_button"+lable_num;
    lable_container.appendChild(lable_div);//向lable容器里添加一条lable
    lable_div.className="lable-div";//采用flex布局
    //向div里添加三个容器
    lable_div.appendChild(lable_name);
    lable_div.appendChild(lable_state);
    lable_div.appendChild(delete_button);
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
    //添加每一个lable内button的监听
    delete_button.onclick=lable_delete;
}

function lable_delete(e){
    //找到事件源
    let lable=e.target.parentNode;
    //事件源的父节点
    let parent=lable.parentNode;
    parent.removeChild(lable);
    //获取该标签的id并从lables内移除
    lables.splice(lable.id[lable.id.length-1],1);
}