import { ApolloLink, Operation, FetchResult, Observable } from '@apollo/client'
 
import { SubscriptionClient } from 'subscriptions-transport-ws'
 
/**
  * only subscription request will go ws
  */
export class HyperLink extends ApolloLink {
  constructor(private client: SubscriptionClient, private next: ApolloLink) {
    super()
  }
 
  private hasSubscription(operation: Operation): boolean {
    for (const definition of operation.query.definitions) {
      if (definition.kind === 'OperationDefinition') {
        const op = definition.operation
        if (op === 'subscription') {
          return true
        }
      }
    }
    return false
  }
 
  public request(operation: Operation): Observable<FetchResult> | null {
    if (this.hasSubscription(operation) || operation.getContext().forceWs) {
      return this.client.request(operation) as Observable<FetchResult>
    } else {
      return this.next.request(operation)
    }
  }
}