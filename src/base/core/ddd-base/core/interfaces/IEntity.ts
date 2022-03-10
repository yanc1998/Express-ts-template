import { IIdentifier } from '../../domain/Identifier'

export type BaseProps = {
  [index: string]: unknown
}

export interface IEntity {
  readonly _id: IIdentifier

  equals(entity: IEntity): boolean
}
