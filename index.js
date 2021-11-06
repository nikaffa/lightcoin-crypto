//Creates a new account for every app user
class Account {
  constructor() {
    this.transactions = [];
  }
  get balance() { // Calculate the balance using the transaction objects
    let balance = 0;
    for (let t of this.transactions) {
      balance += t.value;
    }
    return balance;
  }
  addTransaction(transaction) {
    this.transactions.push(transaction);
  }
}
class Transaction { //superclass for Withdrawal and Deposit classes
  constructor(amount, account) {
    this.amount  = amount;
    this.account = account;
  }
  //the transaction object adds itself to the account's transactions
  commit() {
    if (!this.isAllowed) {
      return false;
    }
    this.time = new Date(); // Keep track of the time of the transaction
    this.account.addTransaction(this); // Add the transaction to the account
    return true;
  }
}

class Withdrawal extends Transaction { //subclass
  isAllowed() {
    // has access to this.account because of parent
    return (this.account.balance - this.amount >= 0);
  }
  get value() { // Updates the balance in the account
    return -this.amount;
  }
}

class Deposit extends Transaction { //subclass
  isAllowed() {
    return true; // deposits always allowed
  }
  get value() { // Updates the balance in the account
    return this.amount;
  }
}

// DRIVER CODE BELOW
const myAccount = new Account();

console.log('Starting Account Balance: ', myAccount.balance);

console.log('Attempting to withdraw even $1 should fail...');
const t1 = new Withdrawal(1.00, myAccount);
console.log('Commit result:', t1.commit());
console.log('Account Balance: ', myAccount.balance);

console.log('Depositing should succeed...');
const t2 = new Deposit(9.99, myAccount);
console.log('Commit result:', t2.commit());
console.log('Account Balance: ', myAccount.balance);

console.log('Withdrawal for 9.99 should be allowed...');
const t3 = new Withdrawal(9.99, myAccount);
console.log('Commit result:', t3.commit());

console.log('Ending Account Balance: ', myAccount.balance);
console.log("Lookings like I'm broke again");

console.log('Account Transaction History: ', myAccount.transactions);
