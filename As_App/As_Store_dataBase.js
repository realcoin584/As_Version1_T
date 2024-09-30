
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-analytics.js";

const firebaseConfig = {
apiKey: "AIzaSyB5DyejP2vesGm_CxXoFL0prVEJEoBgTak",
authDomain: "asdatabase1.firebaseapp.com",
projectId: "asdatabase1",
storageBucket: "asdatabase1.appspot.com",
messagingSenderId: "100119192363",
appId: "1:100119192363:web:b392b62bd6f3cd93649b6e",
measurementId: "G-78YMH5G1JV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

import { getDatabase,set,ref,remove,update,child,onValue } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-database.js";
const db =getDatabase();
























//SET UI
setInterval(()=>{
    if(localStorage.getItem("hasAccount")==='true'&& localStorage.getItem("ADMIN") != "true" && localStorage.getItem('user_NP') !=null){
        set(ref(getDatabase(),`UI/${localStorage.getItem('user_NP').split('/')[1]}`),{
            userName:localStorage.getItem('user_NP').split('/')[0],
            phoneNumber:localStorage.getItem('user_NP').split('/')[1],
            order:""
        }).then(()=>{
            localStorage.setItem("hasAccount",'false')
        })
    }
},100)


//ONVALUE UI
let UI=[{
    order:"",
    phoneNumber:"",
    userName:""
}];
onValue(ref(db,"UI"),(snapshot)=>{
    UI=[];
    snapshot.forEach((userdetail)=> {
        UI.push(
            userdetail.val()
        )
    });
})



//UPDATE UI
let hasAccount='false';
setInterval(()=>{

    if(UI[0].userName != "" && localStorage.getItem("ADMIN") != "true" && localStorage.getItem('user_NP') !=null){

        for(let i=0;i<=UI.length;i++){
            

            if(UI[i].phoneNumber === localStorage.getItem('user_NP').split('/')[1]){
                hasAccount='true';
            }
            
            
            if(UI[i].phoneNumber === localStorage.getItem('user_NP').split('/')[1] && UI[i].order != localStorage.getItem('orderSet')){

                if(localStorage.getItem('orderSet')===""){
                    //UI[i].order
                    for(let i=0;i<=UI[i].order.split(',').length;i++){
                        UI[i].order.split(',').length

                        localStorage.setItem(`CI${UI[i].order.split(',')[i].split('/')[0]}`,UI[i].order.split(',')[0])
                    }
                }else{

                    update(ref(getDatabase(),`UI/${localStorage.getItem('user_NP').split('/')[1]}`),{
                    
                        userName:localStorage.getItem('user_NP').split('/')[0],
                        phoneNumber:localStorage.getItem('user_NP').split('/')[1],
                        order:localStorage.getItem("orderSet")
    
                    })
                }
                

            }
        }


        if(hasAccount==='false'){
            localStorage.setItem("hasAccount",'true')
        }

        
        
    }else{
        if(hasAccount==='false' && localStorage.getItem("ADMIN") != "true"){
            localStorage.setItem("hasAccount",'true')
        }
    }


    
},100)







//ONVALUE P_COUNT
let productID=[];
setInterval(()=>{
    onValue(ref(db,"productID"),(snapshot)=>{
        productID=[]
        productID.push(snapshot.val())
    })
},100)






//ADD_PD_MCB
document.querySelector('.ADD_PD_MCB').addEventListener("click",()=>{
    

    if(document.querySelector('.ADD_PD_MC_PNI').value.length > 0 && document.querySelector('.ADD_PD_MC_PPI').value.length > 0){
        localStorage.setItem("product_N",document.querySelector('.ADD_PD_MC_PNI').value)
        localStorage.setItem("product_P",document.querySelector('.ADD_PD_MC_PPI').value)

        document.querySelector('.ADD_PD_MC_PNI').style.outline="2px solid transparent";
        document.querySelector('.ADD_PD_MC_PPI').style.outline="2px solid transparent";
        document.querySelector('.ADD_PD_MC_PNI').value="";
        document.querySelector('.ADD_PD_MC_PPI').value="";
        document.querySelector('.ADD_PD_MC_I').style.backgroundImage=`url('')`;


        
        //SET PI
        update(ref(getDatabase(),"productID"),{
            productID:productID[0].productID+1
        }).then(()=>{

            set(ref(getDatabase(),`PI/product_${productID[0].productID}`),{
                i:localStorage.getItem("product_I"),
                n:localStorage.getItem("product_N"),
                p:localStorage.getItem("product_P"),
                id:productID[0].productID
            }).then(()=>{

                localStorage.removeItem("product_I")
                localStorage.removeItem("product_N")
                localStorage.removeItem("product_P")
            })
        })
        
        



    }else if(document.querySelector('.ADD_PD_MC_PNI').value.length === 0){
        
        if(document.querySelector('.ADD_PD_MC_PPI').value.length === 0){
            document.querySelector('.ADD_PD_MC_PNI').style.outline="2px solid red";
            document.querySelector('.ADD_PD_MC_PPI').style.outline="2px solid red";
        }else{
            document.querySelector('.ADD_PD_MC_PNI').style.outline="2px solid red";
            document.querySelector('.ADD_PD_MC_PPI').style.outline="2px solid green";
        }
    }else{
        document.querySelector('.ADD_PD_MC_PNI').style.outline="2px solid green";
        document.querySelector('.ADD_PD_MC_PPI').style.outline="2px solid red";

    }
    
})







//ONVALUE PI
let PI=[{
    i:"",
    id:0,
    n:"",
    p:""
}];
onValue(ref(db,"PI"),(snapshot)=>{
    PI=[];
    snapshot.forEach((userdetail)=> {
        PI.push(
            userdetail.val()
        )
    });
})









/*USER*/
sessionStorage.setItem("C_I",PI.length)//confirm index
sessionStorage.setItem("U_I",PI.length)//use index
sessionStorage.setItem("CI",PI.length)//cart index

let PTC_H=``;
let PTC_C=`<div class="CPCD_T">shopping cart</div>`;
let CCA=[];

let Delete_p=``;

setInterval(()=>{
    if(PI[0].id != 0){
    
        //home
        if(sessionStorage.getItem("C_I") != PI.length || localStorage.getItem("reset_PI")==='true'){
            sessionStorage.setItem("C_I",PI.length)
            sessionStorage.setItem("U_I",PI.length)
            PTC_H=``;
            Delete_p=``;

            localStorage.removeItem("reset_PI")


            document.querySelector('.H').innerHTML='';
            document.querySelector('.SUB_PD_M').innerHTML='';
        }
        
        
        

        if(sessionStorage.getItem("U_I") != 0){
            sessionStorage.setItem("U_I",sessionStorage.getItem("U_I")-1)

            
            //PTC_H
            PTC_H+=`
            <div class="HPCD">
                <div class="HPCD_T">
                    <p class="HPCD_T_N">new</p>
                    <p class="HPCD_T_I"></p>
                </div>
                <div class="HPCD_I" style="background-image: url('${PI[sessionStorage.getItem("U_I")].i}');"></div>
                <div class="HPCD_N">${PI[sessionStorage.getItem("U_I")].n}</div>
                <p class="HPCD_P"> &#8358 ${PI[sessionStorage.getItem("U_I")].p}</p>
                <div class="HPCD_AC" data-id="${PI[sessionStorage.getItem("U_I")].id}" data-price="${PI[sessionStorage.getItem("U_I")].p}">
                    <p class="HPCD_AC_I"></p> Add to cart
                </div>
                <div class="HPCD_IS">
                    <p class="HPCD_IS_I"></p> In stock
                </div>
            </div>
            `;

            Delete_p+=`
            <div class="SUB_PD_MPC" style="background-image: url('${PI[sessionStorage.getItem("U_I")].i}');">
                <p class="SUB_PD_MPC_D" data-id="${PI[sessionStorage.getItem("U_I")].id}"></p>
            </div>
            `;

            document.querySelector('.H').innerHTML=PTC_H;
            document.querySelector('.SUB_PD_M').innerHTML=Delete_p;


            //HPCD_AC
            const HPCD_AC=document.querySelectorAll('.HPCD_AC');
            HPCD_AC.forEach((e)=>{
                e.addEventListener('click',()=>{
                    let dataDashed_Id=e.dataset.id;
                    let dataDashed_Price=e.dataset.price;

                    if(localStorage.getItem("user_NP") != null){

                    
        
                        if(localStorage.getItem(`CI${dataDashed_Id}`) === null){
                            localStorage.setItem(`CI${dataDashed_Id}`,`${dataDashed_Id}/1`)

                        }else{

                            localStorage.setItem(`CI${dataDashed_Id}`,localStorage.getItem(`CI${dataDashed_Id}`).split('/')[0]+'/'+(Number(localStorage.getItem(`CI${dataDashed_Id}`).split('/')[1])+1))

                        }
                        
                        //CCA_represh
                        localStorage.setItem("CCA_represh",'true')
                        
                        

                    }else{
                        document.querySelector('.A').style.display="block";
                    }
                })
            })




            //SUB_PD_MPC_D
            const SUB_PD_MPC_D=document.querySelectorAll('.SUB_PD_MPC_D');
            SUB_PD_MPC_D.forEach((e)=>{
                e.addEventListener('click',()=>{
                    let dataDashed_Id=e.dataset.id;

                    
                    //DELETE PI
                    remove(ref(getDatabase(),`PI/product_${dataDashed_Id}`),{
                        //REMOVE DATA FROM ITEM BASE
                    }).then(()=>{
                        //CCA_represh
                        localStorage.setItem("CCA_represh",'true')
                        localStorage.setItem("reset_PI",'true')
                    })

                    if(PI.length === 0){
                        document.querySelector('.H').innerHTML='';
                        document.querySelector('.SUB_PD_M').innerHTML='';
                    }

                    
                })
            })

        }



        //cart
        if(sessionStorage.getItem("CI") <= 0){
            sessionStorage.setItem("CI",PI.length-1)
        }else{
            sessionStorage.setItem("CI",Number(sessionStorage.getItem("CI"))-1)
        }


        if(localStorage.getItem("CCA_represh") === 'true'){
            CCA=[];
            PTC_C=`<div class="CPCD_T">shopping cart</div>`;
            localStorage.removeItem("CCA_represh")
            document.querySelector('.C').innerHTML=PTC_C;
            document.querySelector('.CC').innerText=0;
        }
        

        
        if(localStorage.getItem(`CI${PI[sessionStorage.getItem("CI")].id}`) != null && CCA.includes(PI[sessionStorage.getItem("CI")].id) != true){


            CCA.push(PI[sessionStorage.getItem("CI")].id)
            


            document.querySelector('.CC').innerText=Number(document.querySelector('.CC').innerText)+Number(localStorage.getItem(`CI${PI[sessionStorage.getItem("CI")].id}`).split('/')[1]);


            

            
            
        

            PTC_C+=`
            
            <div class="CPCD_B">
                <div class="CPCD_B_L">
                    <P class="CPCD_B_LI" style="background-image: url('${PI[sessionStorage.getItem("CI")].i}"></P>
                </div>
                <div class="CPCD_B_R">
                    <P class="CPCD_B_RN">${PI[sessionStorage.getItem("CI")].n}</P>
                    <P class="CPCD_B_RP"> &#8358 ${PI[sessionStorage.getItem("CI")].p}</P>
                    <P class="CPCD_B_RDI" data-id="${localStorage.getItem(`CI${PI[sessionStorage.getItem("CI")].id}`).split('/')[0]}"></P>
                    <div class="CPCD_B_RQ">
                        <P class="CPCD_B_R_A" data-id="${localStorage.getItem(`CI${PI[sessionStorage.getItem("CI")].id}`).split('/')[0]}" data-price="${PI[sessionStorage.getItem("CI")].p}">+</P>
                        <P class="CPCD_B_R_Q  CPCD_B_R_Q${PI[sessionStorage.getItem("CI")].id}">${localStorage.getItem(`CI${PI[sessionStorage.getItem("CI")].id}`).split('/')[1]}</P>
                        <P class="CPCD_B_R_S" data-id="${localStorage.getItem(`CI${PI[sessionStorage.getItem("CI")].id}`).split('/')[0]}" data-price="${PI[sessionStorage.getItem("CI")].p}">-</P>
                    </div>
                    <P class="CPCD_B_RT CPCD_B_RT${PI[sessionStorage.getItem("CI")].id}"> &#8358 ${PI[sessionStorage.getItem("CI")].p*localStorage.getItem(`CI${PI[sessionStorage.getItem("CI")].id}`).split('/')[1]}</P>
                </div>
            </div>
            `;

            
            document.querySelector('.C').innerHTML=PTC_C;


            const CPCD_B_R_A=document.querySelectorAll('.CPCD_B_R_A');
            CPCD_B_R_A.forEach((e)=>{
                e.addEventListener('click',()=>{
                    let dataDashed_Id=e.dataset.id;
                    let dataDashed_Price=e.dataset.price;
                    
                    

                    localStorage.setItem(`CI${dataDashed_Id}`,(localStorage.getItem(`CI${dataDashed_Id}`).split('/')[0])+'/'+(Number(localStorage.getItem(`CI${dataDashed_Id}`).split('/')[1])+1))


                    document.querySelector(`.CPCD_B_R_Q${dataDashed_Id}`).innerText=`${localStorage.getItem(`CI${dataDashed_Id}`).split('/')[1]}`;
                    document.querySelector(`.CPCD_B_RT${dataDashed_Id}`).innerHTML=`&#8358 ${localStorage.getItem(`CI${dataDashed_Id}`).split('/')[1]*dataDashed_Price}`;
                    document.querySelector('.CC').innerText=`${Number(document.querySelector('.CC').innerText)+1}`;
                    
                    
                })
            })


            const CPCD_B_R_S=document.querySelectorAll('.CPCD_B_R_S');
            CPCD_B_R_S.forEach((e)=>{
                e.addEventListener('click',()=>{
                    let dataDashed_Id=e.dataset.id;
                    let dataDashed_Price=e.dataset.price;
        

                    
                    if(Number(localStorage.getItem(`CI${dataDashed_Id}`).split('/')[1])===1){
                        
                        localStorage.removeItem(`CI${dataDashed_Id}`)
                        localStorage.setItem("CCA_represh",'true')
                        

                    }else{

                        localStorage.setItem(`CI${dataDashed_Id}`,(localStorage.getItem(`CI${dataDashed_Id}`).split('/')[0])+'/'+(Number(localStorage.getItem(`CI${dataDashed_Id}`).split('/')[1])-1))


                        document.querySelector(`.CPCD_B_R_Q${dataDashed_Id}`).innerText=`${localStorage.getItem(`CI${dataDashed_Id}`).split('/')[1]}`;
                        document.querySelector(`.CPCD_B_RT${dataDashed_Id}`).innerHTML=`&#8358 ${localStorage.getItem(`CI${dataDashed_Id}`).split('/')[1]*dataDashed_Price}`;
                        document.querySelector('.CC').innerText=`${Number(document.querySelector('.CC').innerText)-1}`;

                    
                    }
        
                })
            })


            const CPCD_B_RDI=document.querySelectorAll('.CPCD_B_RDI');
            CPCD_B_RDI.forEach((e)=>{
                e.addEventListener('click',()=>{
                    let dataDashed_Id=e.dataset.id;
                    
                    document.querySelector('.CC').innerText=Number(document.querySelector('.CC').innerText)-localStorage.getItem(`CI${dataDashed_Id}`).split('/')[1];
                    
                    localStorage.removeItem(`CI${dataDashed_Id}`)
                    localStorage.setItem("CCA_represh",'true')

                    
        
                })
            })


            
        }


        if(sessionStorage.getItem("orderSet")===null){
            sessionStorage.setItem("orderSet","")
        }
        //CCA
        for(let i=0;i<=CCA.length;i++){
            
            if(sessionStorage.getItem("orderSet")=== ""){
                sessionStorage.setItem("orderSet",`${localStorage.getItem(`CI${CCA[0]}`)}`)
                
            }else if(sessionStorage.getItem("orderSet").split(',').length < CCA.length && sessionStorage.getItem("orderSet").split(',').length != CCA.length){
                sessionStorage.setItem("orderSet",sessionStorage.getItem("orderSet")+`,${localStorage.getItem(`CI${CCA[i]}`)}`)
            }
        }

        if(sessionStorage.getItem("orderSet").split(',').length === CCA.length){
            localStorage.setItem("orderSet",sessionStorage.getItem("orderSet"))
            sessionStorage.setItem("orderSet","")
            
        }
        
    }
    
    
},100)










/*ADMIN*/
sessionStorage.setItem("ADMIN_C_I",UI.length)//confirm index
sessionStorage.setItem("ADMIN_U_I",UI.length)//use index


let ADMIN_PTC_H=``;
let ADMIN_PTC_Order=``;
setInterval(()=>{

    if(localStorage.getItem("ADMIN")==="true" && UI[0].userName != ""){

        //home
        if(sessionStorage.getItem("ADMIN_C_I") != UI.length){ 
            sessionStorage.setItem("ADMIN_C_I",UI.length)
            sessionStorage.setItem("ADMIN_U_I",UI.length)
            ADMIN_PTC_H=``;
        }
        

        if(sessionStorage.getItem("ADMIN_U_I") != 0){
            sessionStorage.setItem("ADMIN_U_I",sessionStorage.getItem("ADMIN_U_I")-1)


            //PTC_H
            ADMIN_PTC_H+=`
            <div class="A_MCD_MAIN_FC" 
            data-user-name="${UI[sessionStorage.getItem("ADMIN_U_I")].userName}";
            data-user-order="${UI[sessionStorage.getItem("ADMIN_U_I")].order}";
            data-user-phone-number="${UI[sessionStorage.getItem("ADMIN_U_I")].phoneNumber}";>
                <p class="A_MCD_MAIN_FI"></p>
                <div class="A_MCD_MAIN_FNP">
                    <p class="A_MCD_MAIN_FN">${UI[sessionStorage.getItem("ADMIN_U_I")].userName}</p>
                    <p class="A_MCD_MAIN_FP">${UI[sessionStorage.getItem("ADMIN_U_I")].phoneNumber}</p>
                </div>
            </div>
            `;

            document.querySelector('.A_MCD_MAIN_F').innerHTML=ADMIN_PTC_H;


            const A_MCD_MAIN_FC=document.querySelectorAll('.A_MCD_MAIN_FC');
            A_MCD_MAIN_FC.forEach((e)=>{
                e.addEventListener('click',()=>{
                    let dataDashed_userName=e.dataset.userName;
                    let dataDashed_userOrder=e.dataset.userOrder;
                    let dataDashed_userPhoneNumber=e.dataset.userPhoneNumber;

                    localStorage.setItem("userName",dataDashed_userName)
                    localStorage.setItem("userOrder",dataDashed_userOrder)
                    localStorage.setItem("userPhoneNumber",dataDashed_userPhoneNumber)

                    document.querySelector('.A_MCD_MAIN_F').style.zIndex=0;
                    document.querySelector('.A_MCD_MAIN_S').style.zIndex=1;
                    
                })
            })
            
            
        }


        

        //A_MCD_MAIN_SBD
        if(localStorage.getItem("userPhoneNumber") != sessionStorage.getItem("userPhoneNumber")){


            sessionStorage.setItem("userPhoneNumber",localStorage.getItem("userPhoneNumber"))

            ADMIN_PTC_Order=``;

            for(let i=0;i<localStorage.getItem("userOrder").split(',').length;i++){
                let productId=Number(localStorage.getItem("userOrder").split(',')[i].split('/')[0]);
                let productQ=Number(localStorage.getItem("userOrder").split(',')[i].split('/')[1]);
            
                for(let i=0;i<PI.length;i++){
                    if(productId===PI[i].id){
                        ADMIN_PTC_Order+=`
                        <div class="A_MCD_MAIN_SBD_B">
                            <div class="A_MCD_MAIN_SBD_B_L">
                                <P class="A_MCD_MAIN_SBD_B_LI" style="background-image: url('${PI[i].i}');"></P>
                            </div>
                            <div class="A_MCD_MAIN_SBD_B_R">
                                <P class="A_MCD_MAIN_SBD_B_RN">${PI[i].n}</P>
                                <P class="A_MCD_MAIN_SBD_B_RP"><b>subtotal:</b> &#8358 ${PI[i].p}</P>
                                <P class="A_MCD_MAIN_SBD_B_RQ"><b>quantity:</b> ${productQ}</P>
                                <P class="A_MCD_MAIN_SBD_B_RT">Total: &#8358 ${PI[i].p*productQ}</P>
                            </div>
                        </div>
                        `;
                    }
                }
            }

            document.querySelector('.A_MCD_MAIN_SBD').innerHTML=ADMIN_PTC_Order;
            document.querySelector('.A_MCD_MAIN_STD').innerHTML=`
            <p class="A_MCD_MAIN_STD_I"></p>
            order by <p class="A_MCD_MAIN_STD_UN">${localStorage.getItem("userName")}</p>
            `;

        }

    }
})







/****___product_image_File___****/
document.querySelector('.ADD_PD_MC_IPI').addEventListener('change',(e)=>{
    let files=e.target.files;
    let picRender=new FileReader();
    
    picRender.addEventListener('load',(event)=>{
        
        /****___SET IMAGES LCSR__****/
        
        localStorage.setItem("product_I",event.target.result)
        document.querySelector('.ADD_PD_MC_I').style.backgroundImage=`url('${event.target.result}')`;
    })

    picRender.readAsDataURL(files[0]); 
}) 

