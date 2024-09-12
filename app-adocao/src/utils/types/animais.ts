import { EspecieI } from "./especies"

export interface AnimalI {
id: number
nome: string
idade: number
destaque: boolean
foto: string     
descricao: string
createdAt: Date
updatedAt: Date
porte: String
especie: EspecieI
especieId: Number
      
}