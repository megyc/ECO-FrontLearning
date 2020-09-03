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
            this.items.forEach(function(item,index) {
                if(item.id===id){
                    vm.items.splice(index,1);
                }
            });
        },
        stateChange:function(e){
            const id=Number(e.target.parentNode.id);
            this.items.forEach(item=>{
                if(item.id===id){
                    item.state=item.state==="FINISHED"?"UNFINISHED":"FINISHED";
                }
            })
        },
        showAll:function(){
            this.items.forEach(item=>{
                item.seen=true;
            })
        },
        showFinished:function(){
            this.items.forEach(item=>{
                item.seen=item.state==='FINISHED';
            })
        },
        showUnfinished:function(){
            this.items.forEach(item=>{
                item.seen=item.state==='UNFINISHED';
            })
        }
    }
})

