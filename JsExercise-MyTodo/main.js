const add_button=document.getElementById("add-button");
const all_button=document.getElementById("all-button");
const unfinished_button=document.getElementById("unfinished-button");
const finished_button=document.getElementById("finished-button");
const textarea=document.getElementById("input");

add_button.onclick=lable_add;
all_button.onclick=show_all;
unfinished_button.onclick=show_unfinished;
finished_button.onclick=show_finished;
textarea.onclick=clear;

let lables=[];//类数组，存放数据
let stack=[];//用于储存当前页面有哪些lable

let items=[];//存放items

//新版items类
class TodoItem{
    constructor(name){
        this.name=name;
        this.state='UNFINISHED';
        this.id= new Date().getTime();//唯一的时间戳作为id
        this.seen=true;//用seen标记该item是否展示
    }
}

//标签的构造函数
function lable(name){
    this.name=name;
    this.state=false;
}

function lable_add(){
    if(document.getElementById("input").value!==""){
        let new_lable=new lable(document.getElementById("input").value);
        lables.push(new_lable);
       // print(lables.length-1);
        stack.push(lables.length-1);
        //新版
        NewItem=new TodoItem(document.getElementById("input").value);
        items.push(NewItem);
        renderTodoList(items);
    }
    else
        alert("请输入内容");
}

function clear(){
    let text=document.getElementById("input");
    text.value="";
}

function print(num){

    /*创建部分*/
    let lable_container=document.getElementById("lables");//获取lable容器
    let lable_div=document.createElement("div");//存放一条lable
    lable_div.id="lable_div"+num;//给该lable唯一的编号（希望该编号可以对应数组中的编号，方便操作）
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

function item_delete(e){
    let item=e.target.parentNode;
    id=Number(item.id);
    for(let i=0;i<items.length;i++){
        if(items[i].id===id){
            items.splice(i,1);
        }
    }
    renderTodoList(items);
}

function state_change(e){
    //寻找事件源
    let text=e.target.parentNode;
    
    let num=Number(text.id);

    //修改items内的状态
    for(let i=0;i<items.length;i++){
        if(items[i].id===num){
            if(items[i].state==='UNFINISHED'){
                items[i].state='FINISHED';
            }
            else{
                items[i].state='UNFINISHED';
            }
        }
    }
    renderTodoList(items);
}

function show_all(){
    items.forEach(function(item){
        item.seen=true;
    });
    renderTodoList(items);
}

function show_finished(){
    items.forEach(function(item){
        if(item.state==='FINISHED'){
            item.seen=true;
        }
        else{
            item.seen=false;
        }
    });
    renderTodoList(items);
}

function show_unfinished(){
    items.forEach(function(item){
        if(item.state==='UNFINISHED'){
            item.seen=true;
        }
        else{
            item.seen=false;
        }
    });
    renderTodoList(items);
}

function renderTodoList(todoLists){
    let lists=document.getElementById("lables");//获取item的容器
    let parent=lists.parentNode;
    parent.removeChild(lists);
    lists=document.createElement("div");
    lists.className="lables-container";
    lists.id="lables";
    parent.appendChild(lists);
    todoLists.forEach(function(item){
        let node=renderTodoItem(item);
        if(node!==null){
            lists.appendChild(node);
        }
    }); 
}

function renderTodoItem(item){
    if(item.seen===true){
        /*创建部分*/
        item_container=document.createElement("div");//存放一条item
        item_name=document.createElement("div");//存放单个item的名字
        item_state=document.createElement("div");//存放单个item的状态
        delete_button=document.createElement("button")//存放删除按钮
        //添加每一个item内button的监听
        delete_button.onclick=item_delete;
        //添加名字的监听
        item_name.onclick=state_change;

        item_container.className="lable-div";
        item_container.id=item.id;

        //向item里添加三个容器
        item_container.appendChild(item_name);
        item_container.appendChild(item_state);
        item_container.appendChild(delete_button);
        //设置容器的内容
        item_name.innerHTML=item.name;
        item_state.className="state-style";
        delete_button.className="delete-button-style";
        delete_button.innerHTML="删除";
        if(item.state==='FINISHED'){
            item_name.className="finished-lable";//已完成的lable
            item_state.innerHTML="已完成";
        }
        else{
            item_name.className="unfinished-lable";//未完成的lable
            item_state.innerHTML="未完成";
        }
        return item_container;
        }
    else
        return null;
}