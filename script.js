//Fetch medicines
const fetchMedicine = fetch("datas/medicines.json").then((response) =>
  response.json().then((datas) => {
    return datas.forEach((data) => {
      document.getElementById("medtable").innerHTML += `
     
    <tr>
      <td><img src="${data.image}" /></td>
      <td>
          <div class="cart-desc">
              <h3>${data.name}</h3>
              <p>${data.description}</p>
          </div>
      </td>
      <td>
          <div class="cart-price">
              <h3 id="price">${data.price}</h3>
          </div>
      </td>
    <td>
        <input type="number" min="1" max="10" value="1" id="qty" />
    </td>
    <td>
        <div class="cart-price">
            <h3 id="total-value">${data.price}</h3>
        </div>
    </td>
    <td>
        <div class="add-to-cart">
            <button >Add to Cart</button>
        </div>
    </td>
    </tr>
    `;
    });
  })
);

/*Find Hospitals*/
fetch("datas/hospitals.json")
  .then((datas) => datas.json())
  .then((data) => {
    const pincode_select = document.getElementById("pincodes");
    const hosptable = document.getElementById("hosptable");
    const pincodes_d = [];

    data.filter((e) => {
      pincodes_d.push(e.pincode);
    });
    const pincodes = new Set(pincodes_d);
    pincodes.forEach((e) => {
      pincode_select.innerHTML += `
            <option value="${e}">${e}</option>
        `;
    });

    //display hospital list based on change in value of the select box
    //addEventListener
    pincode_select.addEventListener("change", () => {
      const selectedPin = pincode_select.value;
      hosptable.innerHTML = "";
      data.filter((e) => {
        if (parseInt(selectedPin) === e.pincode) {
          hosptable.innerHTML += `
            <tr>
                <td>${e.name}</td>
                <td>${e.address}</td>
                <td>${e.pincode}</td>
            </tr>
            `;
        } else if (selectedPin === "all") {
          hosptable.innerHTML += `
            <tr>
                <td>${e.name}</td>
                <td>${e.address}</td>
                <td>${e.pincode}</td>
            </tr>
            `;
        }
      });
    });

    //Search Box functionality Pincode list
    const searchBox = document.getElementById("searchtext");

    searchBox.addEventListener("keyup", () => {
      const searchBoxValue = parseInt(searchBox.value);
      hosptable.innerHTML = "";
      data.filter((e) => {
        // if (searchBoxValue === e.pincode) {
        //   hosptable.innerHTML += `
        //     <tr>
        //         <td>${e.name}</td>
        //         <td>${e.address}</td>
        //         <td>${e.pincode}</td>
        //     </tr>
        //     `;
        // }

        //Start
        if (
          searchBox.value !== "" &&
          e.pincode.toString().search(searchBox.value) !== -1
        ) {
          hosptable.innerHTML += `
                <tr>
                    <td>${e.name}</td>
                    <td>${e.address}</td>
                    <td>${e.pincode}</td>
                </tr>
                `;
        }
        //End
      });
    });
  });

/*Find hospital search type selector
 */
const searchselector = document.getElementsByName("select-type");
let prev = null;
for (let i = 0; i < searchselector.length; i++) {
  searchselector[i].onclick = function () {
    prev ? prev.value : null;
    if (this !== prev) {
      prev = this;
    }
    if (this.value === "dropdwn") {
      document.getElementById("pincodes").style.display = "block";
      document.getElementById("searchtext").style.display = "none";
      document.getElementById("searchtext").value = "";
    } else if (this.value === "searchtxt") {
      document.getElementById("pincodes").style.display = "none";
      document.getElementById("searchtext").style.display = "block";
      document.getElementById("pincodes").value = "";
    }
  };
}

//Doctors List
fetch("datas/doctors.json")
  .then((datas) => datas.json())
  .then((data) => {
    const deptlist_select = document.getElementById("deptlist");
    const doctable = document.getElementById("doctable");
    const deptlist_d = [];

    data.filter((e) => {
      deptlist_d.push(e.doc_dept);
    });
    const deptlist = new Set(deptlist_d);
    deptlist.forEach((e) => {
      deptlist_select.innerHTML += `
              <option value="${e}">${e}</option>
          `;
    });

    //display doctors list based on change in value of the select box
    //addEventListener
    deptlist_select.addEventListener("change", () => {
      const selectedDept = deptlist_select.value;
      doctable.innerHTML = "";
      data.filter((e) => {
        if (selectedDept === e.doc_dept) {
          doctable.innerHTML += `
                <tr>
                    <td>${e.doc_name}</td>
                    <td>${e.doc_dept}</td>
                    <td>${e.doc_fees}</td>
                    <td>${e.availability}</td>
                </tr>
                `;
        } else if (selectedDept === "all") {
          doctable.innerHTML += `
                <tr>
                    <td>${e.doc_name}</td>
                    <td>${e.doc_dept}</td>
                    <td>${e.doc_fees}</td>
                    <td>${e.availability}</td>
                </tr>
                `;
        }
      });
    });

    //Search Box functionality Doctor list
    const searchDoc = document.getElementById("searchdoc");

    searchDoc.addEventListener("keyup", () => {
      doctable.innerHTML = "";
      data.filter((e) => {
        //Start
        if (
          searchDoc.value !== "" &&
          e.doc_name.toLowerCase().search(searchDoc.value.toLowerCase()) !== -1
        ) {
          console.log("hello");
          doctable.innerHTML += `
                <tr>
                    <td>${e.doc_name}</td>
                    <td>${e.doc_dept}</td>
                    <td>${e.doc_fees}</td>
                    <td>${e.availability}</td>
                </tr>
                `;
        }
        //End
      });
    });
  });

//Form validation for all the pages
const allinputs = Array.from(document.getElementsByTagName("input"));
const submitButton = document.getElementById("subBtn");
const getErrorTag = Array.from(document.getElementsByClassName("error"));
let getSuccessId = document.getElementById("successmessage");
const allSelects = Array.from(document.getElementsByTagName("select"));
const allTextAres = Array.from(document.getElementsByTagName("textarea"));
// const allRadios = Array.from(document.getElementsByTagName("radio"));
const allFormFields = [allinputs, allSelects, allTextAres];
let errors = [];

if (allinputs) {
  submitButton.addEventListener("click", (e) => {
    e.preventDefault();
    errors = [];
    getSuccessId.textContent = "";
    //Make the error class empty
    getErrorTag.forEach((error) => {
      error.textContent = "";
    });
    //add error message to each error class
    allFormFields.forEach((field) => {
      field.forEach((el) => {
        if (el.value == "") {
          el.nextElementSibling.textContent = "Fill the field";
          errors.push("error");
        }
        if (el.type == "tel") {
          if (isNaN(el.value)) {
            errors.push("error");
            el.nextElementSibling.textContent = "Enter only numbers";
          }
        }
      });
    });
    //show success if error variable is empty
    if (errors.length == 0) {
      console.log(errors);
      console.log(errors.length);
      getSuccessId.textContent = "Success. All Fields Validated";
    }
  });
}