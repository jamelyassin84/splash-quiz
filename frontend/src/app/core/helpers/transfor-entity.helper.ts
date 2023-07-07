import {EntityState} from '@reduxjs/toolkit'

export class TransformEntity<T> {
    constructor(_entity: EntityState<T>) {
        this.entity = _entity
    }

    private entity?: EntityState<T>

    toObject(): T | null {
        if (!this.entity || this.entity.ids.length === 0) {
            return null
        }

        return this.entity.entities[this.entity.ids[0]] as T
    }

    toArray(): T[] {
        if (!this.entity) {
            return []
        }

        return Object.values(this.entity.entities ?? {}) as T[]
    }
}

export function toArrayEntity<State>(data: EntityState<State>): State[] {
    return new TransformEntity(data).toArray()
}

export function toObjectEntity<State>(data: EntityState<State>): State {
    return new TransformEntity(data).toObject() as State
}
