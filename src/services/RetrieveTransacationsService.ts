import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface TransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class RetrieveTransactionsService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute(): any {
    const transactions = this.transactionsRepository.all();
    const balance = this.transactionsRepository.getBalance();
    const returnObj = { transactions, balance };
    return returnObj;
  }
}

export default RetrieveTransactionsService;
