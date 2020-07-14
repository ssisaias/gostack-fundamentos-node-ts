import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface TransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ title, value, type }: TransactionDTO): Transaction {
    const transaction = this.transactionsRepository.create({
      title,
      value,
      type,
    });
    // validate current balance before operation

    const curBalance = this.transactionsRepository.getBalance();
    if (
      transaction.type === 'outcome' &&
      transaction.value > curBalance.total
    ) {
      throw Error('Insuficient balance!');
    }

    return transaction;
  }
}

export default CreateTransactionService;
