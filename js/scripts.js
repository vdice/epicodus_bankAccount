function Customer(name) {
  this.name = name;
}

function Account(balance, customer) {
  this.balance = balance;
  this.customer = customer;
}

Account.prototype.withdraw = function(amount) {
  this.balance -= amount;
}

Account.prototype.deposit = function(amount) {
  this.balance += amount;
}

var newCustomer = new Customer('')
var newAccount = new Account(0, newCustomer);

$(document).ready(function() {
  $("#account-header").text('New Account');

  $("form#new-account").submit(function(event) {
    newCustomer.name = $("input#customer-name").val();
    newAccount.customer = newCustomer;
    $(".customer").text(newCustomer.name);
    updateAccount();

    $("#hideafterenter").hide();
    $("#transactions").show();
    $("#edit-account-button").show();
    $("#account-header").text('Transactions');
  });

  $("form#deposit").submit(function(event) {
    updateAccount('deposit');
  });

  $("form#withdraw").submit(function(event) {
    updateAccount('withdraw');
  });

  $("#edit-account-button").click(function() {
    $("#account-header").text('Edit Account');
    $("#transactions").hide();
    $("#settings").show();
  });

  $("form#updated-account").submit(function(event) {
    newCustomer.name = $("input#updated-customer-name").val();
    newAccount.customer = newCustomer;
    $(".customer").text(newCustomer.name);
    $("#account-header").text('Transactions');
    $("#transactions").show();
    $("#settings").hide();
  });

});

function updateAccount(action) {
  var selector = "input#";
  var methodToInvoke = action;
  if (!action) {
    selector += "initial-deposit";
    methodToInvoke = "deposit";
  } else {
    selector += action;
  }

  event.preventDefault();
  var value = parseFloat($(selector).val());

  if (action === 'withdraw' && newAccount.balance - value < 0) {
    $("#requested-withdrawal").text(value);
    $("#max-withdrawal").text(newAccount.balance);
    $("#insufficient-funds-modal").modal({'show' : true})
  } else {
    newAccount[methodToInvoke](value);
    $("#balance").text(newAccount.balance);
  }

  if (newAccount.balance >= 5000) {
    $("#portfolioModal1").modal({'show' : true});
  }

  $(".result").show();
  $(selector).val("");
}
