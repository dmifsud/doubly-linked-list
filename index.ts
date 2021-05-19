export type Nullable<T> = T | null;

export abstract class LinkedListNode<T, N extends LinkedListNode<T, N>> {
  private index: number = -1;
  public prev: Nullable<N> = null;
  public next: Nullable<N> = null;
  constructor(public value: T) {}

  setIndex(num: number) {
    this.index = num;
  }

  getIndex() {
    return this.index;
  }

  makeImmutableCopy() {
    return <N>(<unknown>{ ...this });
  }
}

export class DoublyLinkedList<
  T,
  N extends LinkedListNode<T, N>,
  L extends DoublyLinkedList<T, N, L>
> {
  public head: Nullable<N> = null;
  public tail: Nullable<N> = null;
  public length: number = 0;
  constructor(private ListNode: { new (value: T): N }) {}

  push(val: T | N) {
    let newNode;
    if (typeof (val as N).next !== "undefined") {
      newNode = val as N;
    } else {
      newNode = new this.ListNode(val as T);
    }

    newNode.setIndex(this.length);

    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      if (this.tail) {
        this.tail.next = newNode;
      }
      newNode.prev = this.tail;
      this.tail = newNode;
    }
    this.length++;
    return this;
  }

  getNodeAtIndex(index: number) {
    if (index >= this.length || index < 0 || !this.head) {
      return null;
    }
    let currentIndex = 0;
    let currentNode = this.head;
    while (currentIndex !== index && currentNode.next) {
      currentNode = currentNode.next;
      currentIndex++;
    }
    return currentNode;
  }

  map(callbackfn: (node: N, index: number) => N): L {
    let iterator = 0;
    let currentNode: Nullable<N> = this.head?.makeImmutableCopy() || null; // TODO: to be tested for immutability
    while (!!currentNode) {
      const next = currentNode.next;
      currentNode = callbackfn(currentNode, iterator);
      currentNode = next;
      iterator++;
    }
    return <L>(<unknown>this);
  }

  mapValues(callbackfn: (value: T, index: number) => T): L {
    let iterator = 0;
    let currentNode: Nullable<LinkedListNode<T, N>> =
      this.head?.makeImmutableCopy() || null;
    while (!!currentNode) {
      currentNode.value = callbackfn(currentNode.value, iterator);
      currentNode = currentNode.next;
      iterator++;
    }
    return <L>(<unknown>this);
  }

  mapToList(): T[] {
    if (!this.head) {
      return [];
    }
    let list: T[] = [];
    let currentNode: Nullable<LinkedListNode<T, N>> = this.head;
    while (!!currentNode) {
      list.push(currentNode.value);
      currentNode = currentNode.next;
    }
    return list;
  }

  makeImmutableCopy() {
    return <L>(<unknown>{ ...this });
  }
}
