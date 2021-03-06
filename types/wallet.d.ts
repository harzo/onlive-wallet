declare module 'wallet' {
  import { BigNumber } from 'bignumber.js';
  import {
    AnyContract,
    Contract,
    ContractBase,
    TransactionOptions,
    TransactionResult,
    TruffleArtifacts
  } from 'truffle';
  import { AnyNumber } from 'web3';

  namespace wallet {
    interface Migrations extends ContractBase {
      setCompleted(
        completed: number,
        options?: TransactionOptions
      ): Promise<TransactionResult>;

      upgrade(
        address: Address,
        options?: TransactionOptions
      ): Promise<TransactionResult>;
    }

    interface MultiSigWallet extends ContractBase {
      owners(num: AnyNumber): Promise<Address[]>;
      required(): Promise<BigNumber>;

      addOwner(
        owner: Address,
        options?: TransactionOptions
      ): Promise<TransactionResult>;

      removeOwner(
        owner: Address,
        options?: TransactionOptions
      ): Promise<TransactionResult>;

      replaceOwner(
        owner: Address,
        newOwner: Address,
        options?: TransactionOptions
      ): Promise<TransactionResult>;

      changeRequirement(
        required: AnyNumber,
        options?: TransactionOptions
      ): Promise<TransactionResult>;

      submitTransaction(
        destination: Address,
        value: AnyNumber,
        data: string,
        options?: TransactionOptions
      ): Promise<TransactionResult>;

      confirmTransaction(
        transactionId: AnyNumber,
        options?: TransactionOptions
      ): Promise<TransactionResult>;

      revokeConfirmation(
        transactionId: AnyNumber,
        options?: TransactionOptions
      ): Promise<TransactionResult>;

      executeTransaction(
        transactionId: AnyNumber,
        options?: TransactionOptions
      ): Promise<TransactionResult>;

      getConfirmationCount(transactionId: AnyNumber): Promise<BigNumber>;

      getTransactionCount(
        pending: boolean,
        executed: boolean
      ): Promise<BigNumber>;

      getOwners(): Promise<Address[]>;

      getConfirmations(transactionId: AnyNumber): Promise<Address[]>;

      getTransactionIds(
        from: AnyNumber,
        to: AnyNumber,
        pending: boolean,
        executed: boolean
      ): Promise<AnyNumber[]>;
    }

    interface ConfirmationEvent {
      sender: Address;
      transactionId: BigNumber;
    }
    interface RevocationEvent {
      sender: Address;
      transactionId: BigNumber;
    }

    interface ExecutionEvent {
      transactionId: BigNumber;
    }

    interface ExecutionFailureEvent {
      transactionId: BigNumber;
    }

    interface SubmissionEvent {
      transactionId: BigNumber;
    }

    interface OwnerAdditionEvent {
      owner: Address;
    }

    interface OwnerRemovalEvent {
      owner: Address;
    }

    interface RequirementChangeEvent {
      required: BigNumber;
    }

    interface MigrationsContract extends Contract<Migrations> {
      'new'(options?: TransactionOptions): Promise<Migrations>;
    }

    interface MultiSigWalletContract extends Contract<MultiSigWallet> {
      'new'(
        owners: Address[],
        required: AnyNumber,
        options?: TransactionOptions
      ): Promise<MultiSigWallet>;
    }

    interface WalletArtifacts extends TruffleArtifacts {
      require(name: string): AnyContract;
      require(name: './Migrations.sol'): MigrationsContract;
      require(name: './MultiSigWallet.sol'): MultiSigWalletContract;
    }
  }

  export = wallet;
}
