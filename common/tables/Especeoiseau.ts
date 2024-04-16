export enum Statut {
    Vulnerable = 'Vulnérable',
    Préoccupation_mineure = 'Préoccupation mineure',
    Non_menacee = 'Non menacée'
}


export interface Especeoiseau {
    nomscientifique: string;
    nomcommun: string;
    statutspeces: Statut;
    nomscientifiquecomsommer: string;
    editable: boolean;
}