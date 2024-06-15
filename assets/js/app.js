const cl =console.log;

const stdform =document.getElementById('stdform');
const fnameControl =document.getElementById('fname');
const lnameControl =document.getElementById('lname');
const emailControl =document.getElementById('email');
const contactControl =document.getElementById('contact');
const stdContainer = document.getElementById('stdContainer');
const stdTable = document.getElementById('stdTable');
const noStd= document.getElementById('noStd');
const submitBtn= document.getElementById('submitBtn');
const updateBtn= document.getElementById('updateBtn');

generateUuid = () => {
    return (
        String('xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx')
    ).replace(/[xy]/g, (character) => {
        const random = (Math.random() * 16) | 0;
        const value = character === "x" ? random : (random & 0x3) | 0x8;

        return value.toString(16);
    });
};


const stdTemplating =(arr)=>{

    let result='';

    arr.forEach((std,i)=>{
        result +=
        `
        <tr id="${std.stdId}">
            <td>${i + 1}</td>
            <td>${std.fname}</td>
            <td>${std.lname}</td>
            <td>${std.email}</td>
            <td>${std.contact}</td>
           <td> <button class="btn btn-sm btn-primary text-white" onclick="onEdit(this)">Edit</button></td>
            <td> <button class="btn btn-sm btn-danger text-white" onclick="onRemove(this)">Remove</button></td>
                     </tr> 
        `
       
    })
    stdContainer.innerHTML =result;
}



let stdArr =JSON.parse(localStorage.getItem('stdArr'))||[]

if (stdArr.length>0){
    stdTemplating(stdArr)
}else{
    stdTable.classList.add('d-none');
    noStd.classList.remove('d-none');
}

const onEdit =(ele)=>{
   let editId =ele.closest('tr').id;
   localStorage.setItem("editId",editId);
   let getObj=stdArr.find(std=> std.stdId ===editId)
   cl(getObj);
   fnameControl.value =getObj.fname;
   lnameControl.value =getObj.lname;
   emailControl.value =getObj.email;
   contactControl.value =getObj.contact;

   submitBtn.classList.add('d-none');
   updateBtn.classList.remove('d-none');
}

const onRemove =(ele)=>{
    let getConfirmation = confirm(`Are you sure, you want to remove this Student? `)
    cl(getConfirmation)
    if(getConfirmation){
        let removeId =ele.closest('tr').id;
        let getIndex = stdArr.findIndex(std => std.stdId ===removeId);
        stdArr.splice(getIndex,1);
        localStorage.setItem('stdArr',JSON.stringify(stdArr));
        ele.closest('tr').remove()
        Swal.fire({
            title:`Student with id ${removeId} is removed successful`,
            timer:3000,
            icon:'success'
        })
    }

}

const onUpdateStd =(eve)=>{
    let updateId =localStorage.getItem('editId')
    cl( updateId);
    let updateObj ={
        fname:fnameControl.value,
        lname:lnameControl.value,
        email:emailControl.value,
        contact:contactControl.value,
        stdId :updateId
    }
    let getIndex =stdArr.findIndex(std =>{
        return std.stdId ===updateId
    })
    cl(getIndex);
    stdArr[getIndex] =updateObj;
    localStorage.setItem('stdArr',JSON.stringify(stdArr));
    let tr =[...document.getElementById(updateId).children];
  
    tr[1].innerHTML =updateObj.fname;
    tr[2].innerHTML =updateObj.lname;
    tr[3].innerHTML =updateObj.email;
    tr[4].innerHTML =updateObj.contact;
    stdform.reset();
    updateBtn.classList.add('d-none');
    submitBtn.classList.remove('d-none');
    Swal.fire({
        title:`Student ${updateObj.fname} ${updateObj.lname} info is updated successfully!!!`,
        timer:3000,
        icon:'success'
    })
}



const onStdAdd =(eve)=>{
    eve.preventDefault();
    let newStd ={
        fname:fnameControl.value,
        lname:lnameControl.value,
        email:emailControl.value,
        contact:contactControl.value,
        stdId:generateUuid()
    }
    stdArr.push(newStd);
    localStorage.setItem('stdArr',JSON.stringify(stdArr));
    stdTable.classList.remove('d-none');
    noStd.classList.add('d-none');
    // stdTemplating(stdArr);
    stdform.reset();
  
    let tr=document.createElement('tr')
    tr.id =newStd.stdId;
    tr.innerHTML =`
            <td>${stdArr.length}</td>
            <td>${newStd.fname}</td>
            <td>${newStd.lname}</td>
            <td>${newStd.email}</td>
            <td>${newStd.contact}</td>
            <td> <button class="btn btn-sm btn-primary text-white" onclick="onEdit(this)">Edit</button></td>
            <td> <button class="btn btn-sm btn-danger text-white" onclick="onRemove(this)">Remove</button></td>
    `
     stdContainer.append(tr);
    Swal.fire({
        title :`New Student ${newStd.fname} ${newStd.lname} is added Successfully !!!`,
        timer :3000,
        icon:'success',
    })
}
stdform.addEventListener('submit',onStdAdd);
updateBtn.addEventListener('click',onUpdateStd)