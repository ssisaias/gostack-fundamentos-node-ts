import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface TransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const totalIncome: number = this.transactions.reduce((acc, curObj) => {
      if (curObj.type === 'income') {
        return acc + curObj.value;
      }
      return acc;
    }, 0);

    const totalOutcome: number = this.transactions.reduce((acc, curObj) => {
      if (curObj.type === 'outcome') {
        return acc + curObj.value;
      }
      return acc;
    }, 0);

    const total: number = totalIncome - totalOutcome;

    const balance: Balance = {
      income: totalIncome,
      outcome: totalOutcome,
      total,
    };

    return balance;
  }

  public create({ title, value, type }: TransactionDTO): Transaction {
    const transaction = new Transaction({ title, value, type });
    this.transactions.push(transaction);
    return transaction;
  }
}

export default TransactionsRepository;
