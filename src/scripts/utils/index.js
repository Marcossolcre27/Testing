const tabla = document.querySelector('#resultados');
const nameUser = document.querySelector('.name');
export const form = document.getElementById('form');
export const API = 'http://localhost:3000/clientes/' ;


//console.log(Apisplit)

export async function getData(API){        
    
        
        if(API && API.indexOf('http://') == -1 && API.indexOf('https://') == -1){
            throw new Error('Is not valid'); 
        
        }
         const response = await fetch(API);
         const data = await response.json();
        
        data.forEach((cliente) => {

            renderClient(cliente);
        
        });
   
    
};
      


export function renderClient(cliente){
    const tr = document.createElement('tr');
    const tdActions = document.createElement('td');
    const tdId = document.createElement('td');
    const tdName = document.createElement('td');
    const deleteImg = document.createElement('img');
    deleteImg.setAttribute('class', 'tash');
    const editImg = document.createElement('img');
    editImg.setAttribute('class', 'edit');
   
    
    deleteImg.addEventListener('click', deleteImgs);
     async function deleteImgs(){

            const deleteOptions = {
                method: 'DELETE',
                headers: { 
                    'Authorization': 'Bearer my-token',
                    'My-Custom-Header': 'foobar'
                }
            };
           const response = await fetch(API + `${cliente.id}`, deleteOptions);
    
            clearTabla();
            getData();
           
        
    }
    editImg.addEventListener('click', editImgs );
     async function editImgs(){

        const userName = nameUser.value;

        const editClient = {
            name: userName
        };

        const putOptions = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(editClient)
        };
        const response = await fetch(API+ `${cliente.id}`, putOptions );

        clearTabla();
        getData();
    }
    //Load data
    tdId.innerText = cliente.id;
    tdName.innerText = cliente.name;
    

    //Apend
    tdActions.append(deleteImg,editImg);
    tr.append(tdId, tdName, tdActions);
    tabla.append(tr);
    
}


//agregar


export async function addClient(e){
    
    e.preventDefault();

    const userName = nameUser.value;

    const newClient = {
        name: userName
    };

    //Post to Json
        
    const myClient = { method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newClient)
    };

    const response = await fetch(API, myClient);
   

    clearTabla();
    getData();
    form.reset();
    
}

export function clearTabla(){
    tabla.innerHTML = '';
  
}
    


