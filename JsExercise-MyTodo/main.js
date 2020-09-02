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

function lable_add(){
    if(document.getElementById("input").value!==""){
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
    lists.className="item-container";
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

        item_container.className="item-div";
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
            item_name.className="finished-item";//已完成的lable
            item_state.innerHTML="已完成";
        }
        else{
            item_name.className="unfinished-item";//未完成的lable
            item_state.innerHTML="未完成";
        }
        return item_container;
        }
    else
        return null;
}