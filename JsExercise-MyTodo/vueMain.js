class todoItem{
    constructor(name){
        this.name=name;
        this.state='UNFINISHED';
        this.id= new Date().getTime();//唯一的时间戳作为id
        this.seen=true;//用seen标记该item是否展示
    }
}

let vm = new Vue({
    el: '#app',
    data:{
        items:[],
        message:''
    },
    methods:{
        submit:function(){
            if(this.message!==''){
                this.items.push(new todoItem(this.message));
                this.message='';
            }
            else
                alert("请输入内容");
        },
        remove:function(e){
            let id=Number(e.target.parentNode.id);
            console.info(id);
            this.items.forEach(function(item,index) {
                if(item.id===id){
                    items.splice(index,1);
                }
            });
        }
    }
})

