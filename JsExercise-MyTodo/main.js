const add_button=document.getElementById("add-button");

add_button.onclick=lable_add;

let lables=[];

//标签的构造函数
function lable(name){
    this.name=name;
    this.state=false;
}

function lable_add(){
    let new_lable=new lable(document.getElementById("input").value);
    lables.push(new_lable);
    print(lables.length-1);
}


function print(num){
    let lable_name=document.createElement("div");
    let lable_div=document.getElementById("lables");
    lable_div.appendChild(lable_name);
    lable_name.innerHTML=lables[num].name;
    if(lables[num].state){
        lable_name.className="finisher-lable";
    }
    else{
        lable_name.className="unfinisher-lable";
    }
}