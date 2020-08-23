const login_button=document.getElementById("login-button");

login_button.onclick=login;

let User="admin"
let PassWord="123"


function login(){
    let number=document.getElementById("input1").value;
    let password=document.getElementById("input2").value;
    let number_text;
    //let psssword_text;
    //非空校验
    number_text=number.split(" ").join("");//去除用户名中的空格，密码先不考虑
    if(number_text===""){
        alert("工号不能为空");
        document.getElementById("input1").value="";
    }
    else if(password===""){
        alert("密码不能为空");
    }
    else if(User===number_text&&PassWord===password){
        alert("登陆成功");
    }
    else{
        alert("用户名或密码错误");
        document.getElementById("input2").value="";
    }
}