const login_button=document.getElementById("login-button");

login_button.onclick=login;

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
}