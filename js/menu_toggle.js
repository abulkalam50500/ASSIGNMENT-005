
let MenuOpen = false;
const ToggleMenu = ()=>{

    
     const menu = document.getElementById("small_device");

     if(MenuOpen==false){
        menu.classList.remove("hidden");
        MenuOpen=true;
     }else if(MenuOpen==true){
        menu.classList.add("hidden");
        MenuOpen=false;
     }

}