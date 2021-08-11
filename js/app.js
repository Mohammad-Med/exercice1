let users = [
    {
      id: "123456789",
      createdDate: "2021-01-06T00:00:00.000Z",
      status: "En validation",
      firstName: "Mohamed",
      lastName: "Taha",
      userName: "mtaha",
      registrationNumber: "2584",
    },
     {
      id: "987654321",
      createdDate: "2021-07-25T00:00:00.000Z",
      status: "Validé",
      firstName: "Hamid",
      lastName: "Orrich",
      userName: "horrich",
      registrationNumber: "1594",
    },
       {
      id: "852963741",
      createdDate: "2021-09-15T00:00:00.000Z",
      status: "Rejeté",
      firstName: "Rachid",
      lastName: "Mahidi",
      userName: "rmahidi",
      registrationNumber: "3576",
    }
  ]

//fonction qui rotourner la couleur de l'etat 
function  getStatusColor(status){
  switch (status){
  case 'Validé':
    return '#5BE881'
    break
  case 'Rejeté':
    return '#FF0000'
    break
  case 'En validation':
    return '#FDB64D'
    break
  default:
   return '#eeeeee'
}
}

// fonction pour génerer les id 

function generateId(){
  return ""+Math.floor(Math.random()*1000000000);
}

//la fonction qui remplit le tableau des utilisateur avec les données du tableau json

function fillTab(){
let content="";
 users.forEach(user=>{
 content+= "<tr><td>"+user.id+"</td> <td>"+(new Date(user.createdDate)).toLocaleDateString()
 +"</td> <td><div id='status' style='background-color:"+getStatusColor(user.status)+"'>"+user.status
 +"</div></td> <td>"+user.firstName+"</td><td>"+user.lastName+"</td> <td>"+user.userName
 +"</td> <td>"+user.registrationNumber+
 "</td> <td></td><td style=' text-align: center;'><a class='del' href='#' id='"+
 user.id+"'> <i style='color:black'class=\"fa fa-trash\"></i></a></td></tr>"

  })
  document.querySelector("#tab").innerHTML=content
}
fillTab();


  //sauvragder l'utilisateur dans le tableau
  document.querySelector("#myform").addEventListener('submit',(e)=>{

    e.preventDefault();

    const data = new FormData(e.target);
  
  const values = Object.fromEntries(data.entries());
  //construire le id 
   let myid=generateId();console.log(myid)
  for (let index = 0; index < users.length; index++) {
    
    while (users[index].id===myid) {
      myid=generateId();
      console.log(myid)
    }
    
  }

  // add id and makes filds in order
  const row={ id:myid , createdDate:values.createdDate , status:values.status , firstName: values.firstName ,
  lastName:values.lastName , userName: values.userName , registrationNumber:values.registrationNumber
  }

  users.push(row)
  fillTab()
  addlistners()
  $('#add').modal('hide')
  document.querySelector('#myform').reset()
  })

  //show modal
  document.querySelector('#btnModal').addEventListener("click",(e)=>{
    $('#add').modal('show')
  })

   function addlistners(){
  let list=document.querySelectorAll("a.del")
  list.forEach(el=>{
   el.addEventListener('click',function(){
     for (let i = 0; i < users.length; i++) {
       if(users[i].id===this.id){
         users.splice(i,1)
         
       fillTab();
       addlistners()
       }
       
     }
     
   })
  })
}

addlistners()
  
  