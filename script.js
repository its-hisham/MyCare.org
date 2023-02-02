//Hospital List 
 
//  fetch('hospitals.json').then(datas=>datas.json()).then(data=>{
//     console.log(data)

// const selectlist=document.getElementById('pincode')
// const hospitallist=document.getElementById('tbody')
// const pincode_d = [];
// data.filter(element => {
//     pincode_d.push(element.pincode);
// })
// const pincodes = new Set(pincode_d);
// pincodes.forEach(element => {
//     selectlist.innerHTML +=
//     `
//     <option value="${element}">${element}</option>
    
//     `
// });

// selectlist.addEventListener("change",()=>{
//     hospitallist.innerHTML=""
//     data.filter(e=>{
//         if(selectlist.value==e.pincode){
//             hospitallist.innerHTML +=
            // `
            // <tr>
            // <td>${e.name}</td>
            // <td>${e.address}</td>
            // <td>${e.phonenumber}</td>
            // </tr>

            // `
            
//         }
//     })
//     })
// });
const search = document.getElementById('search');

search.addEventListener("click", () =>{
    fetch('hospitals.json').then(data => data.json()).then(data =>{
        const pincode =document.getElementById('pincode');
        const hospitallist=document.getElementById('tbody');
        
        const pcode = data.filter(ele =>{
            return ele.pincode == parseInt(pincode.value)
        })
        hospitallist.innerHTML = "";
console.log(pcode);
        pcode.forEach(e => {
            if(e.pincode == parseInt(pincode.value)){
                return hospitallist.innerHTML += `
                <tr>
                <td>${e.name}</td>
                <td>${e.address}</td>
                <td>${e.phonenumber}</td>
                </tr>`
            }
            else {
                console.log('error');
                // hospitallist.innerHTML = `<tr>
                // <td>No Hospitals found in this pincode</td>
                // </tr>`;
            }
        })
    
    })
})




//Doctors List

 fetch('doctors.json').then(data => data.json().then(data => {
    console.log(data);

const specialisation = document.getElementById('specialisation');
const doclist =document.getElementById('doclist');
const  special_d =  [];

data.filter(ele =>{
    special_d.push(ele.specialisation);
});

const special  = new Set(special_d);

special.forEach(e => {
    specialisation.innerHTML += `
    <option value="${e}">${e}</option>`
})

specialisation.addEventListener("change",() =>{
    doclist.innerHTML = "";
    data.filter(e =>{
        if(specialisation.value == e.specialisation){
            doclist.innerHTML += `
            <tr>
            <td>${e.doc_id}</td>
            <td>${e.doc_name}</td>
            <td>${e.specialisation}</td>
            <td>${e.doc_fees}</td>
            <td>${e.availability}</td>
            </tr>`
        }
    }) 
})

 }))


    
    