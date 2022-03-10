import { IOptional } from '../option'

export interface IIterator<T> {
  // Return the current element.
  current(): Promise<IOptional<T>>

  // Return the current element and move forward to next element.
  next(): Promise<IOptional<T>>

  // Return the key of the current element.
  key(): number

  // Rewind the Iterator to the first element.
  // rewind(): void;
}
