// Budget Controller 
var budgetControler = (function(){

    var Expense = function(id, description, value){
        this.id = id;
        this.description = description;
        this.value = value
    }
    var Income = function(id, description, value){
        this.id = id;
        this.description = description;
        this.value = value
    }
    var data = {
        allItems  : {
            exp : [],
            inc : []
        },
        totals : {
            exp : 0,
            inc : 0 
        }
    }

    return {
        addItem : function (type, des, val){
            var newitem, ID;

            if (data.allItems[type].length>0){
                ID = data.allItems[type][data.allItems[type].length-1].id + 1;
            }else{
                ID = 0;
            }

            if (type === 'exp'){
                newitem = new Expense(ID, des, val);
            }else if(type === 'inc'){
                newitem = new Income(ID, des, val);
            }
            data.allItems[type].push(newitem);
            return newitem;
        },
        testing : function(){
            console.log(data);
        }
    }

})();


//UI Controller Code 
var UIController = (function(){

    // CLass names of the inputs
    var DOMStrings = {
        inputType  :'.add__type',
        inputDescription : '.add__description',
        inputValue : '.add__value',
        inputButton : '.add__btn'
    }

    return{
        getInput: function(){
            
            return{
                 type : document.querySelector(DOMStrings.inputType).value, //either inc or exp 
                 description : document.querySelector(DOMStrings.inputDescription).value, // description
                 value : document.querySelector(DOMStrings.inputValue).value // value 
            }

        },
        getDOMStrings : function(){
            return DOMStrings;
        },
        addListItem : function(obj,type){
            var html ;
            //Create HTML String with placeholder text
           if (type ==='inc'){
            html = '<div class="item clearfix" id="income-0"><div class="item__description">Salary</div><div class="right clearfix"><div class="item__value">+ 2,100.00</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>'            
            }else if(type === 'exp'){
                html = '<div class="item clearfix" id="expense-0"><div class="item__description">Apartment rent</div><div class="right clearfix"><div class="item__value">- 900.00</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>'
            } 
            //Replace placeholder with actual data 
            //Insert the HTML into the DOM


        }
    }


})();



//GLOBAL app Controller 
var appController = (function(budgetCtrl,UIctrl){

    var setupEventListners = function(){
        var DOM = UIController.getDOMStrings();
        document.querySelector(DOM.inputButton).addEventListener('click',ctrlAddItem);
        document.addEventListener('keypress',function(e){
            if (e.keyCode === 13){
                ctrlAddItem();
            }
        });
    };

    var ctrlAddItem = function(){

        var input, newItem;

        //1. get fields Data 
        input = UIController.getInput();
        console.log(input);

        //2. Add the items to budget controller 
        newItem = budgetControler.addItem(input.type, input.description, input.value); 
        //3. add the items to UI 
        //4. Calcuate the budget 
        //5. Display the bidget UI 
    };

    return{
        init: function(){
            console.log('application has started !')
            setupEventListners();
        }
    };

})(budgetControler,UIController);

appController.init();