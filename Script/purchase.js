/*
* Current-Order
* */
//purchase fields
const itemTypeSection = document.getElementById('item-type-section');
const itemTypeSelector = document.getElementById('item-type-selection');

const extraTypeSection = document.getElementById('extra-type-section');
const extraTypeSelector = document.getElementById('extra-type-selection');

const passSection = document.getElementById('pass-section');
const tokenSection = document.getElementById('token-section');
const durationSection = document.getElementById('duration-section');

const currentOrderPass = document.getElementById('current-order-pass');
const currentOrderExtra = document.getElementById('current-order-extra');

//DOM-components
const itemTypeDropdown = document.getElementById('item-type-selection');
const extraTypeDropdown = document.getElementById('extra-type-selection');
const numberOfChildrenField = document.getElementById('children-num');
const numberOfAdultsField = document.getElementById('adult-num');
const quantityField = document.getElementById('token-quantity');
const durationDropdown = document.getElementById('duration-selection');

const orderType = document.getElementById('order-type');
const childrenCount = document.getElementById('children-count');
const adultCount = document.getElementById('adult-count');
const extraTypeField = document.getElementById('extra-type');
const quantityCount = document.getElementById('quantity-count');
const durationField = document.getElementById('duration-field');
const currentOrderTotal = document.getElementById('current-order-total');

const loadFavOrderButton = document.getElementById('fav-load-order-button');
const saveFavOrderButton = document.getElementById('fav-save-order-button');

let totalOrderQuantity = 0;

//stores all the relevant values and names of the order types
// const orderTypes = {
//     'e':{'name':'-',}
//     ,'day':{'name':'Day Pass','adult':1000,'child':500}
//     ,'student':{'name':'Student Pass','adult':500,'child':250}
//     ,'foreigner':{'name':'Foreigner Pass','adult':5000,'child':2500}
//     ,'extra':{'name':'Extra'}
// };
// const durationTypes = {
//     'e':{'name':'-','value':0},
//     '3h':{'name':'3 hours','value':0},
//     '.5d':{'name': 'Half Day','value':250},
//     '1d':{'name': 'Full Day','value':500},
//     '2d':{'name': '2 days','value':1000}
// };
// const extraTypes = {
//     'e':{'name':'-','price':0},
//     'annual':{'name':'Annual Pass','price':5000},
//     'food-token':{'name':'Food Token','price':500}
// };
const pleaseSelect = ['-',0,0]
const dayPass = ['Day Pass',1000,500];
const studentPass = ['Student Pass',500,250];
const foreignerPass = ['Foreigner Pass',5000,2500];
const orderTypes = [pleaseSelect,dayPass,studentPass,foreignerPass,['Extra']];

const extraAnnualPass = ['Annual Pass',5000];
const extraFoodToken = ['Food Token',500];
const extraTypes = [pleaseSelect,extraAnnualPass,extraFoodToken];

const threeHours = ['Three Hours',0];
const halfDay = ['Half Day',250];
const oneDay = ['One Day',500];
const twoDays = ['Two Days',1000];
const durationTypes = [threeHours,halfDay,oneDay,twoDays];


itemTypeSection.addEventListener('click', function (){
    if(itemTypeSelector.value === '4'){
        extraTypeSection.classList.remove('display-none');
        tokenSection.classList.remove('display-none');
        currentOrderExtra.classList.remove('display-none');
        passSection.classList.add('display-none');
        durationSection.classList.add('display-none');
        currentOrderPass.classList.add('display-none');
    }else{
        if(!extraTypeSection.classList.contains('display-none')) {
            extraTypeSection.classList.add('display-none');
            tokenSection.classList.add('display-none');
            currentOrderExtra.classList.add('display-none');
        }
        if(passSection.classList.contains('display-none')){
            passSection.classList.remove('display-none');
            durationSection.classList.remove('display-none');
            currentOrderPass.classList.remove('display-none');
        }
    }
});

itemTypeDropdown.addEventListener('change',performPurchaseCalculation);
extraTypeDropdown.addEventListener('change',performPurchaseCalculation);
numberOfChildrenField.addEventListener('change',performPurchaseCalculation);
numberOfAdultsField.addEventListener('change',performPurchaseCalculation);
quantityField.addEventListener('change',performPurchaseCalculation);
durationDropdown.addEventListener('change',performPurchaseCalculation);


function performPurchaseCalculation(){
    setValues();
    if(itemTypeDropdown.value === '4'){
        currentOrderTotal.innerHTML = 'LKR' + (extraCalc(extraTypes[extraTypeDropdown.value][1]) || '0');
    }else{
        currentOrderTotal.innerHTML = 'LKR' + (passCalc(orderTypes[itemTypeDropdown.value],durationTypes[durationDropdown.value][1]) || '0');
    }
    enableAddToOrderButton();
}

function setValues(){

    orderType.innerHTML = orderTypes[itemTypeDropdown.value][0];
    childrenCount.innerHTML = numberOfChildrenField.value === ''? 0:numberOfChildrenField.value;
    adultCount.innerHTML = numberOfAdultsField.value === ''? 0:numberOfAdultsField.value;
    extraTypeField.innerHTML = extraTypes[extraTypeDropdown.value][0];
    quantityCount.innerHTML = quantityField.value;
    durationField.innerHTML = durationTypes[durationDropdown.value][0];
}

function passCalc(calcInput,duration) {
    return (calcInput[1] * (parseInt(numberOfAdultsField.value) || 0)) + (calcInput[2] * (parseInt(numberOfChildrenField.value) || 0)) + duration;
}

function extraCalc(calcInput){
    return (calcInput * (parseInt(quantityField.value) || 0));
}

function enableAddToOrderButton(){
    if(currentOrderTotal.innerHTML === 'LKR0') {
        addToOrderButton.disabled = true;
        saveFavOrderButton.disabled = true;
    }
    else {
        addToOrderButton.disabled = false;
        saveFavOrderButton.disabled = false;
    }

}

function resetValuesCurrentOrder(){
    orderType.innerHTML = '-';
    childrenCount.innerHTML = '0';
    adultCount.innerHTML = '0';
    extraTypeField.innerHTML = '-';
    quantityCount.innerHTML = '0';
    durationField.innerHTML = 'Three Hours';
    currentOrderTotal.innerHTML = 'LKR0';
    itemTypeDropdown.selectedIndex = 0;
    numberOfAdultsField.value = '';
    numberOfChildrenField.value = '';
    durationDropdown.selectedIndex = 0;
    extraTypeDropdown.selectedIndex = 0;
    quantityField.value = '';
}
/*
* ---------------------------------------------------------------------------------
* */

/*
* Overall Order
* */
const overallOrderTable = document.getElementById('overall-order-table');
let orders = [];
const placedOrderTotals = [];
const addToOrderButton = document.getElementById('add-to-order-button');
const overallOrderTotal = document.getElementById('overall-order-total');
const placeOrderButton = document.getElementById('place-order-button')
addToOrderButton.addEventListener('click',addToOverallOrder);
placeOrderButton.addEventListener('click',placeOrder);

function createOrderArray(){
    const isExtra = orderTypes[itemTypeDropdown.value][0] === 'Extra';
    const itemType = orderTypes[itemTypeDropdown.value][0];
    const numberOfAdults = parseInt(numberOfAdultsField.value) || 0;
    const numberOfChildren = parseInt(numberOfChildrenField.value) || 0;
    const extraType = isExtra ? extraTypes[extraTypeDropdown.value][0] : null;
    const extraQuantity = isExtra ? parseInt(quantityField.value) : null;
    const currentOrderTotalNum = parseInt(currentOrderTotal.innerHTML.substr(3));
    const duration = durationTypes[durationDropdown.value][0];

    return [isExtra,itemType,numberOfAdults,numberOfChildren,extraType,extraQuantity,currentOrderTotalNum,duration];
}

function addToOverallOrder(){
    setTotalOrderQuantity();
    const orderBeingAdded = createOrderArray();
    orders.push(orderBeingAdded);
    displayOnTable(orderBeingAdded);
    setOverallOrderTotal(); //sets the overall order total

    enablePlaceOrderButton()
    resetValuesCurrentOrder()
}

function displayOnTable(data = []){
    const newTableRow = document.createElement('TR');
    const orderTypeCol = document.createElement('TD');
    const quantityCol = document.createElement('TD');
    const priceCol = document.createElement('TD');

    if(!data[0]){
        orderTypeCol.append(document.createTextNode(`${data[1]},${data[7]}`)); //setting item type for passes

        const list = document.createElement('UL');
        const listItem = document.createElement('LI');
        const listItem2 = document.createElement('LI');

        listItem.appendChild(document.createTextNode(`Adults: x${data[2]}`));
        listItem2.appendChild(document.createTextNode(`Children: x${data[3]}`));
        list.append(listItem,listItem2);
        quantityCol.appendChild(list); //quantity for passes

        const list1 = document.createElement('UL');
        const listItem3 = document.createElement('LI');
        const listItem4 = document.createElement('LI');

        listItem3.appendChild(document.createTextNode(`${orderTypes[itemTypeDropdown.value][1] * data[2]}`));
        listItem4.appendChild(document.createTextNode(`${orderTypes[itemTypeDropdown.value][2] * data[3]}`));

        list1.append(listItem3,listItem4);
        priceCol.appendChild(list1); //prices for passes
    }else{
        orderTypeCol.appendChild(document.createTextNode(data[4]));//order type for extras
        quantityCol.appendChild(document.createTextNode(`x${data[5]}`));//quantity for extras
        priceCol.appendChild(document.createTextNode(`${extraTypes[extraTypeDropdown.value][1] * data[5]}`));//price for extras
    }

    newTableRow.append(orderTypeCol,quantityCol,priceCol);
    overallOrderTable.appendChild(newTableRow);
    placedOrderTotals.push(data[6]);
    console.log(data[6]);
}

function setOverallOrderTotal(){
    let total = 0;
    placedOrderTotals.forEach((e) => {
        total += e;
    });
    overallOrderTotal.innerHTML = total > 0? `LKR${total}`:'LKR0';
    return total;
}

function enablePlaceOrderButton(){
    if(overallOrderTotal.innerHTML === 'LKR0') {
        console.log('true triggered');
        placeOrderButton.disabled = true;
    }
    else {
        console.log('false triggered');
        placeOrderButton.disabled = false;
    }
}

function placeOrder(){
    resetOverallOrder();
    resetValuesCurrentOrder();
    console.log(totalOrderQuantity);
    if(totalOrderQuantity > 3){
        let loyaltyPoints = parseInt(localStorage.getItem('loyalty-points'));
        console.log(loyaltyPoints + ' ' + totalOrderQuantity);
        if(isNaN(loyaltyPoints)) loyaltyPoints = 0;
        loyaltyPoints += totalOrderQuantity * 20
        localStorage.setItem('loyalty-points',`${loyaltyPoints}`);
    }
    window.alert('Thank you for your custom reservation!');
    totalOrderQuantity = 0;
}

function resetOverallOrder(){
    overallOrderTable.innerHTML = '<tr><th>Item Type</th><th>Quantity</th><th>Price(LKR)</th></tr>';
    overallOrderTotal.innerHTML = 'LKR0'
    orders = [];
    return 1;
}


function enableLoadFavOrderButton(){
    console.log(localStorage.getItem("fav-order"));
    if(localStorage.getItem("fav-order"))
        loadFavOrderButton.disabled = false;
    else loadFavOrderButton.disabled = true;

}
enableLoadFavOrderButton();

function saveFavOrder(){
    console.log('save Fav Order triggered!')
    console.log(JSON.stringify(getFieldValues()));
    localStorage.setItem('fav-order',JSON.stringify(getFieldValues()));
    enableLoadFavOrderButton();

}

function getFieldValues(){
    const isExtra = orderTypes[itemTypeDropdown.value][0] === 'Extra';
    const itemType = itemTypeDropdown.value;
    const numberOfAdults = numberOfAdultsField.value;
    const numberOfChildren = numberOfChildrenField.value;
    const extraType = extraTypeDropdown.value;
    const extraQuantity = quantityField.value;
    const duration = durationDropdown.value;
    const currentOrderTotalNum = currentOrderTotal.innerHTML;
    const retVal = [isExtra];
    if(isExtra){
        retVal.push(itemType,extraType,extraQuantity);
    }else{
        retVal.push(itemType,numberOfAdults,numberOfChildren,duration);
    }
    retVal.push(currentOrderTotalNum);
    console.log(retVal);
    return retVal;
}

function loadFavOrder(){
    const orderData = JSON.parse(localStorage.getItem('fav-order'));
    setInputFieldData(orderData);
}

function setInputFieldData(data = []){
    if(data[0]){
        itemTypeDropdown.selectedIndex = data[1];
        extraTypeDropdown.selectedIndex = data[2];
        quantityField.value = data[3];
    }else{
        itemTypeDropdown.selectedIndex = data[1];
        numberOfAdultsField.value = data[2];
        numberOfChildrenField.value = data[3];
        durationDropdown.selectedIndex = data[4];

        performPurchaseCalculation()
    }
}
saveFavOrderButton.addEventListener('click',saveFavOrder);
loadFavOrderButton.addEventListener('click',loadFavOrder);

function setTotalOrderQuantity(){
    if(orderTypes[itemTypeDropdown.value][0] === 'Extra'){
        totalOrderQuantity += isNaN(parseInt(quantityField.value))? 0:parseInt(quantityField.value);
    }else{
        const childrenNum = isNaN(parseInt(numberOfChildrenField.value)) ? 0:parseInt(numberOfChildrenField.value);
        const adultNum = isNaN(parseInt(numberOfAdultsField.value)) ? 0:parseInt(numberOfAdultsField.value);
        totalOrderQuantity += childrenNum + adultNum;
    }
    console.log(totalOrderQuantity);
}

const loyaltyPointsCheckButton = document.getElementById('loyalty-score-check');
loyaltyPointsCheckButton.addEventListener('click',checkLoyaltyPoints);
function checkLoyaltyPoints (){
    const loyaltyPoints = parseInt(localStorage.getItem('loyalty-points')) || 0;
    loyaltyPointsCheckButton.innerHTML = `Your Loyalty Score: ${loyaltyPoints}`;
    loyaltyPointsCheckButton.removeEventListener('click',checkLoyaltyPoints);
    setTimeout(() => {
        loyaltyPointsCheckButton.innerHTML = 'Check Loyalty Score';
        loyaltyPointsCheckButton.addEventListener('click',checkLoyaltyPoints);
    },5000)
}