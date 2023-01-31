 fetch('hospitals.json').then(datas=>datas.json()).then(data=>{
    console.log(data)

const selectlist=document.getElementById('pincode')
const hospitallist=document.getElementById('tbody')

data.forEach(element => {
    selectlist.innerHTML +=
    `
    <option value="${element.pincode}">${element.pincode}</option>
    
    `
});

selectlist.addEventListener("change",()=>{
    hospitallist.innerHTML=""
    data.filter(e=>{
        if(selectlist.value==e.pincode){
            hospitallist.innerHTML +=
            `
            <tr>
            <td>${e.name}</td>
            <td>${e.address}</td>
            <td>${e.phonenumber}</td>
            </tr>

            `
            
        }
    })
    
})



 });


    
    