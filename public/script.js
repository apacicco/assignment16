window.onload = () => {
    document.getElementById("add-jewelry-link").onclick = addJewelryBoxes;
    document.getElementById("edit-jewelry-link").onclick = editJewelryBoxes;
    showJewels();
   // document.getElementById("add-edit-JEWEL-form").onsubmit = addJewelry;
   document.getElementById("add-JEWELS-form").onsubmit = addJewelry;
   document.getElementById("edit-JEWELS-form").onsubmit = editJewelry;



}

const editJewelry = async(e) => {
    e.preventDefault();
    const form = document.getElementById("edit-JEWELS-form");

    const formData = new FormData(form);//all form data is in FormData
    //formData.delete("img");
    formData.append("materials", getEditMaterials());
    
   // console.log("in here");
    let response;

       console.log("in  editJewelry"); 
       console.log(...formData);

       response = await fetch(`/api/jewelry/${form._id.value}`,{
        method:"PUT",
        body:formData
       });
       


       //response = await response.json();

       //get jewel w indicated id then display



   //after if, err if needed
   if(response.status !=200){
    console.log("errrrrrrrrrrrrr");
    return;
   }

   const jewel = await response.json();
   
   document.querySelector(".form-class").classList.add("transparent");
   //resetForm();
   showJewels();
   editMats(jewel);



};

const getEditMaterials = () => {
    const inputs = document.querySelectorAll("#edit-jewel-boxes input");
    let mats = [];
    inputs.forEach((input)=> {
        mats.push(input.value);
    });
    return mats;
}

const addJewelry = async(e) => {
    e.preventDefault();
    const form = document.getElementById("add-JEWELS-form");

    const formData = new FormData(form);//all form data is in FormData
    

    formData.append("materials", getMaterials());
   // console.log("in here");
    let response;

    if(form._id.value == -1)
    {
    formData.delete("_id");
       console.log("in if editJewelry"); 

       response = await fetch("/api/jewelry", {
        method:"POST",
        body:formData
       });
       
    }


   //after if, err if needed
   if(response.status !=200){
    console.log("errrrrrrrrrrrrr");
    return;
   }

   document.querySelector(".form-class").classList.add("transparent");
   //resetForm();
   showJewels();
};

const getMaterials = () => {
    const inputs = document.querySelectorAll("#jewel-boxes input");
    let mats = [];
    inputs.forEach((input)=> {
        mats.push(input.value);
    });
    return mats;
}

const getJewelry = async () => {
    try {
        return (await fetch("api/jewelry/")).json();
    } catch (error) {
        console.log(error);
    }
}

const showJewels = async () =>{
    console.log("showJewels");
    let jewelry = await getJewelry();

    console.log(jewelry);
    let store = document.getElementById("store"); 
    store.innerHTML = "";
    
    jewelry.forEach((jewel)=>{
        const section = document.createElement("section");
        store.append(section);

        
        const a = document.createElement("a");
        a.href = "#";
        section.append(a);


        const h4 = document.createElement("h4");
        h4.innerHTML = jewel.name;

        //console.log("below jewel.name");
        a.append(h4);

        a.onclick = () => {
            //console.log(jewel.description);
            
            editMats(jewel);
            populateEditForm(jewel);
        }
    });
}

const editMats = async (jewel)=> {
    const details = document.getElementById("jewel-details");
            details.innerHTML = "";
            const h5 = document.createElement("h5");
            const p = document.createElement("p");
            details.append(h5);
            details.append(p);
            h5.innerHTML = jewel.description;
            p.innerHTML = "Materials: " + jewel.materials;
}




const addJewelryBoxes = (e) => {
    e.preventDefault();
    console.log("adding jewel");
    const jewelBoxes = document.getElementById("jewel-boxes");
    const input = document.createElement("input");
    input.type = "text";
    jewelBoxes.append(input);
};

const editJewelryBoxes = (e) => {
    e.preventDefault();
    console.log("adding jewel");
    const jewelBoxes = document.getElementById("edit-jewel-boxes");
    const input = document.createElement("input");
    input.type = "text";
    jewelBoxes.append(input);
};




const populateEditForm = (jewel) => {
    console.log("populatededitform");
    const form = document.getElementById("edit-JEWELS-form");
    form._id.value = jewel._id;
    form.name.value = jewel.name;
    form.description.value = jewel.description;
   // form.materials.value = jewel.materials;

    //add materials
    populateJewels(jewel.materials);
    document.getElementById("delete-jewelry-link").onclick = async () =>{
        
    populateEditForm(jewel);
    let response = await fetch(`/api/jewelry/${form._id.value}`, {
        method: "DELETE",
        headers : {
            "Content-Type":"application/json;charset=utf-8"
        }
    }) ;
    if(response.status != 200){
        console.log("bad delete");
        return
    };
    resetForm();
    showJewels();

    };

    //
    
    
};

const populateJewels = (materials) => {
    const section = document.getElementById("edit-jewel-boxes");
    section.innerHTML = " "; 
    materials.forEach((material)=> {//didnt need .materials or .jewels; it gave an error
        const input = document.createElement("input");
        input.type = "text";
        input.value = material;
        section.append(input);
    });
    
    //const sec = document.getElementById("edit-jewel-boxes");
    
      
};

const resetForm = () => {
    const form = document.getElementById("edit-JEWELS-form");
    form.reset();
    form._id = "-1";
    document.getElementById("edit-jewel-boxes").innerHTML = "";
};


