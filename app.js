let budget = document.getElementById("budget");
let productDes = document.getElementById("productDes");
let price = document.getElementById("price");
let quantity = document.getElementById("quantity");
let btn = document.getElementById("btn");

let budgetAmt = document.getElementById("budgetAmt");
let totalExp = document.getElementById("totalExp");
let totalBal = document.getElementById("totalBal");
let list = document.querySelector(".list");

let Db = [];



btn.addEventListener("click", (e)=>{
    e.preventDefault()

    let budgetAmount = budget.value;

    budgetAmt.innerText = budgetAmount;

    if((productDes.value.length && price.value.length) > 0){
        Db.push({
                id: Db.length + 1,
                desc: productDes.value,
                
                amount: parseInt(price.value) * parseInt(quantity.value)
        });

        

        productDes.value = '';
        price.value = '';
        quantity.value = '';
        // budget.value = '';

        console.log(Db);
        displayFunction(Db);

        
        let totalExpenses = Db.reduce((currentTotal,item)=>{
           return (item.amount + currentTotal);
            
        }, 0);

        totalExp.innerText = totalExpenses;

        let AvailableBal = budgetAmount - totalExpenses;

        totalBal.innerText = AvailableBal;


    }
});

const displayFunction = (item)=>{
    let Html = ``;

    for(let i = 0; i < item.length; i++){

        Html += 
        
        ` <tr>
                
                <td> ${item[i].desc}</td>
                <td> ${item[i].amount} </td>
                <td id="action"><span class="action ac1"><i class="fa-solid fa-pen-to-square" onClick="editExpense(${i})"></i></span> <span class="action ac2"><i class="fa-solid fa-trash" onClick="deleteExpense(${i})"></i></span> </td>
          </li>
        `
    }
 
    list.innerHTML = Html;
}


const editExpense = ((id)=>{
    if((productDes.value.length && price.value.length) > 0){
        Db.splice(id,1,{desc:productDes.value,amount:parseInt(price.value) * parseInt(quantity.value),id:id + 1});
        
        
        let budgetAmount = budget.value;

        productDes.value= "";
        price.value="";
        quantity.value="";

        let totalExpenses = Db.reduce((currentTotal,item)=>{
            return (item.amount + currentTotal);
             
         }, 0);
 
         totalExp.innerText = totalExpenses;
 
         let AvailableBal = budgetAmount - totalExpenses;
 
         totalBal.innerText = AvailableBal;

         displayFunction(Db);
        console.log(Db);
    };

});

const deleteExpense = ((id)=>{
    Db.splice(id,1);
    

    let budgetAmount = budget.value;

    let totalExpenses = Db.reduce((currentTotal,item)=>{
        return (item.amount + currentTotal);
         
     }, 0);

     totalExp.innerText = totalExpenses;

     let AvailableBal = budgetAmount - totalExpenses;

     totalBal.innerText = AvailableBal;

     displayFunction(Db);
    console.log(Db);
})



