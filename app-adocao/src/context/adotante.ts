import { create } from 'zustand';
import { AdotanteI } from '@/utils/types/adotantes';

type AdotanteStore = {
    adotante: AdotanteI;
    logaAdotante: (adotanteLogado: AdotanteI) => void;
    deslogaAdotante: () => void;
};

export const useAdotanteStore = create<AdotanteStore>((set) => {
    const storedAdotante = localStorage.getItem("adotante");
    const adotanteInicial = storedAdotante ? JSON.parse(storedAdotante) : {};

    return {
        adotante: adotanteInicial, // Inicializa com o adotante armazenado
        logaAdotante: (adotanteLogado) => {
            set({ adotante: adotanteLogado });
            localStorage.setItem("adotante", JSON.stringify(adotanteLogado)); // Armazena no local storage
        },
        deslogaAdotante: () => {
            set({ adotante: {} as AdotanteI });
            localStorage.removeItem("adotante"); // Remove do local storage ao deslogar
        },
    };
});

    
    
    
    
    // adotante: {
    //     id: "cocococo",
    //     nome: "Sra G",
    //     email: "glegrand@cocococ.com",

    // }


//   bears: 0,
//   increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
//   removeAllBears: () => set({ bears: 0 }),
//   updateBears: (newBears) => set({ bears: newBears }),
