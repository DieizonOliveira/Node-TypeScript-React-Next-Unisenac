import { create } from 'zustand'
import { AdotanteI } from '@/utils/types/adotantes'

type AdotanteStore = {
    adotante: AdotanteI
    logaAdotante: (adotanteLogado: AdotanteI) => void
    deslogaAdotante: () => void
}

export const useAdotanteStore = create<AdotanteStore>((set) => ({
    adotante: {} as AdotanteI,
    logaAdotante: (adotanteLogado) => set({ adotante: adotanteLogado }),
    deslogaAdotante: () => set({ adotante: {} as AdotanteI }),
    
    
    
    
    
    
    
    // adotante: {
    //     id: "cocococo",
    //     nome: "Sra G",
    //     email: "glegrand@cocococ.com",

    // }


//   bears: 0,
//   increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
//   removeAllBears: () => set({ bears: 0 }),
//   updateBears: (newBears) => set({ bears: newBears }),
}))