
const tabingBtnActive =async(btn_name)=>{

//    first all tabing btn active class remove 
 const all_tabing_btn = document.querySelectorAll(".tab_btn");
 all_tabing_btn.forEach((btn)=>btn.classList.remove('active'));

 let ActiveBtn = document.getElementById(btn_name);
//  console.log(ActiveBtn);
 
 ActiveBtn.classList.add('active');
    

}

const ItemCount = (data)=>{

    const TotalItem = data.length;
    const ItemCountId = document.getElementById("TotalItemCount");
    ItemCountId.innerText = TotalItem;
    return;

}


const LoadingSpinner = (status)=>{

    if(status==true){
        // total item count loader
        document.getElementById("ItemCountLoader").classList.remove('hidden');
        document.getElementById("TotalItemCount").classList.add('hidden');

        // main data loader
        document.getElementById("data_loader_spinner").classList.remove("hidden");
        document.getElementById("data_container").classList.add("hidden");
    }else{

        document.getElementById("ItemCountLoader").classList.add('hidden');
        document.getElementById("TotalItemCount").classList.remove('hidden');

        // main data loader
        document.getElementById("data_loader_spinner").classList.add("hidden");
        document.getElementById("data_container").classList.remove("hidden");

    }

}

const CardPiorityColor=(priority)=>{


    if(priority=="high"){
        return "bg-[#FEECEC] text-[#EF4444]";
    }else if(priority=="medium"){
        return "bg-[#FFF8DB] text-[#D97706]";
    }else{
        return "bg-[#EEEFF2] text-[#9CA3AF]";
    }

}


const ModalardPiorityColor=(priority)=>{


    if(priority=="high"){
        return "bg-[#EF4444] text-[#FFFF]";
    }else if(priority=="medium"){
        return "bg-[#1530DF] text-[#FFFF]";
    }else{
        return "bg-[#20AA5A] text-[#FFFF]";
    }

}

const CardBorderColorManage = (status)=>{

    if(status=="open"){
        return "border-[#00A96E] ";
    }else if(status=="closed"){
         return "border-[#A855F7]";
    }

}



const CardTopImgManage = (status)=>{

    const imgVal={
    open: 'Open-Status.png',
    closed: 'Closed- Status .png',
};

   return imgVal[status];

}

const CardLevelStatus = (labels)=>{

    const LabelColor = {
        0:"bg-[#FEECEC] text-[#EF4444] border border-[#FECACA]",
        1:"bg-[#FFF8DB] text-[#D97706] border border-[#FDE68A]",
        2:"bg-[#FEECEC] text-[#EF4444] border border-[#FECACA]",
        3:"bg-[#FFF8DB] text-[#D97706] border border-[#FDE68A]",
    }

    const LabelHtml = labels.map((lab_name,index)=>{
        return `
    <span class="text-[13px] ${LabelColor[index]}  font-medium rounded-full p-[5px]"><i
                                    class="fa-solid fa-bug text-[12px]"></i> ${lab_name}</span>`;
    });

    return LabelHtml.join("");
    


}


const modalStatusColor = (status)=>{

    if(status=="open"){
        return "bg-[#00A96E]";
    }else if(status=="closed"){
     return "bg-[#a98d00]";
    }
}

const OpenModal =async (id)=>{
    
    const ModalId = document.getElementById("issue_modal");
    ModalId.showModal();

    const url = "https://phi-lab-server.vercel.app/api/v1/lab/issue/"+id;
    const res = await fetch(url);
    const res_data = await res.json();
    const data = res_data.data;
    console.log(data);

    const ModalCointainer = document.getElementById("modal_container");
    ModalCointainer.innerHTML = "";

    const ModalHtml = ` <div id="main_content" class="p-3">
                    <h2 class="text-[#1F2937] text-2xl font-bold">Fix broken image uploads</h2>

                     <div class="flex items-center flex-wrap gap-3 pt-1">
                         <div class="${modalStatusColor(data.status)} px-2 py-1 rounded-full text-white text-[12px]">${data.status}</div>
                         <p class="text-[#64748B] text-[12px] flex gap-1 items-center"><i class="fa-regular fa-circle-dot text-[#64748B] text-[6px]"></i> Opened by ${data.assignee}</p>
                         <p class="text-[#64748B] text-[12px] flex gap-1 items-center"><i class="fa-regular fa-circle-dot text-[#64748B] text-[6px]"></i> ${new Date(data.createdAt).toLocaleDateString()}</p>
                     </div>

                     <div class="labels_modal pt-5">
                        ${CardLevelStatus(data.labels)}
                     </div>

                     <p class="text-[#64748B] pt-5">${data.description}</p>

                     <div class="modal_footer_info flex gap-25 pt-5">
                         <div class="">
                            <p class="text-[#64748B] text-[16px]">Assignee:</p>
                            <h3 class="font-semibold text-[16px] text-[#1F2937]">${data.assignee}</h3>
                         </div>
                         <div class="">
                            <p class="text-[#64748B] text-[16px]">Priority:</p>
                            <div class="${ModalardPiorityColor(data.priority)} px-2 py-1 rounded-full text-center text-[12px]">${data.priority.toUpperCase()}</div>
                         </div>
                     </div>

                </div>`;

    ModalCointainer.innerHTML = ModalHtml;
}

const DisplayData = (data)=>{

    const DataContainer = document.getElementById("data_container");
    DataContainer.innerHTML = "";

    data.forEach((item)=>{

        const ChildHtml = `
        <div onclick="OpenModal(${item.id})" class="single_card cursor-pointer bg-[#FFFFFF] shadow rounded border-t-3 ${CardBorderColorManage(item.status)}">
                    <div class="p-4">
                        <div class="card_head flex justify-between items-center">
                            <img class="w-6" src="assets/${CardTopImgManage(item.status)}" alt="">
                            <p
                                class=" ${CardPiorityColor(item.priority)} font-medium text-[12px] pt-[2px] text-center rounded-3xl w-20 h-6">
                                ${item.priority.toUpperCase()}</p>
                        </div>
                        <h2 class="pt-3 text-[#1F2937] font-semibold text-[14px]">${item.title}
                        </h2>
                        <p class="text-[#64748B] text-[12px] pt-1">${item.description}</p>
                        <div class="card_badge pt-[12px] flex flex-wrap gap-2" id="CardLevel">
                        ${CardLevelStatus(item.labels)}
                           
                        </div>
                    </div>

                    <hr class="text-[#E4E4E7]">
                    <div class="card_footer_info p-4">
                        <p class="text-[#64748B] text-[12px]">#1by ${item.author}</p>
                        <p class="text-[#64748B] text-[12px]">${new Date(item.createdAt).toLocaleDateString()}</p>
                    </div>


                </div>
        `;

        DataContainer.innerHTML+=ChildHtml;

    });
    
    

}

const AllIssueData = async (btn_name)=>{

    tabingBtnActive(btn_name);

    LoadingSpinner(true);
    const url = "https://phi-lab-server.vercel.app/api/v1/lab/issues";
    const res = await fetch(url);
    const res_data = await res.json();
    const data = res_data.data;
    // display data
    DisplayData(data);
    // inside tabing item count 
    ItemCount(data);
    LoadingSpinner(false);

    // console.log(data);

}

AllIssueData('all_tab');

// All Open Issue Data
const OpenIssueData =async (btn_name)=>{

    tabingBtnActive(btn_name);

    LoadingSpinner(true);
    const url = "https://phi-lab-server.vercel.app/api/v1/lab/issues";
    const res = await fetch(url);
    const res_data = await res.json();
    const data = res_data.data;

    const FilterData = data.filter((item)=>item.status===btn_name);
    
    

    // display data
    DisplayData(FilterData);
    // inside tabing item count 
    ItemCount(FilterData);
    LoadingSpinner(false);

}
// All Closed Issue Data
const ClosedIssueData =async (btn_name)=>{

    tabingBtnActive(btn_name);

    LoadingSpinner(true);
    const url = "https://phi-lab-server.vercel.app/api/v1/lab/issues";
    const res = await fetch(url);
    const res_data = await res.json();
    const data = res_data.data;

    const FilterData = data.filter((item)=>item.status===btn_name);
    
    

    // display data
    DisplayData(FilterData);
    // inside tabing item count 
    ItemCount(FilterData);
    LoadingSpinner(false);

}


// search 
const GlobalSearch =async ()=>{

    const searchValue = document.getElementById("search_input").value;
    LoadingSpinner(true);
    const url = `https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${searchValue}`;
    const res = await fetch(url);
    const res_data = await res.json();
    const data = res_data.data;


    // display data
    DisplayData(data);
    // inside tabing item count 
    ItemCount(data);
    LoadingSpinner(false);

}