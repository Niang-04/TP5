import { Component } from "@angular/core";
import { Especeoiseau, Statut  } from "../../../../common/tables/Especeoiseau";
import {UpdateKeyAndOtherFieldsRequest} from "../../../../common/tables/Keyobject";
import { CommunicationService } from "../communication.service";
import {UpdateKey} from "../../../../common/tables/UpdateKey";
import {UpdatePredator} from "../../../../common/tables/UpdatePredator";

@Component({
  selector: "app-especeoiseau",
  templateUrl: "./especeoiseau.component.html",
  styleUrls: ["./especeoiseau.component.css"],
})
export class EspeceOiseauComponent { 

  public listeNomsScientifiquesComsommer: string[] = [];
  public especesOiseaux: Especeoiseau[] = [];
  public duplicateError: boolean = false;
  public showAddFormFlag: boolean = false;
  public selectedNomComsommer: string = '';
  
  public listeStatuts: Statut[] = Object.values(Statut);
  public selectedStatut: Statut = Statut.Vulnerable;
  public selectedpredator: string = '';
  public nomScientifique: string = '';
  public nomCommun: string = '';
  public statut: Statut = Statut.Vulnerable; 
  public nomScientifiqueComsommer: string = '';
  public editable: boolean = false;
  public keymodified: boolean= false;
  public oldkey: string = '';
  public predatormodified: boolean = false;
  public oldpredator: string = '';



  public constructor(private communicationService: CommunicationService) {}

  public ngOnInit(): void {
    this.getEspecesOiseaux();
    this.getNomScientifiqueConsommer();
  }

  public getEspecesOiseaux(): void {
    this.communicationService.getEspecesOiseaux().subscribe((especesOiseaux: Especeoiseau[]) => {
      this.especesOiseaux = especesOiseaux.map((espece) => {
        return { ...espece, editable: false }; 
      });
    });
  }
  
  public getNomScientifiqueConsommer(): void {
    this.communicationService.getNomScientifiqueConsommer().subscribe((noms: string[]) => {
      this.listeNomsScientifiquesComsommer = noms;
    });
  }
  

  showAddForm(): void {
    this.showAddFormFlag = true;
  }

  closeAddForm(): void {
    this.showAddFormFlag = false;
  }
  
  toggleEdit(index: number) {
    this.especesOiseaux.forEach((espece, i) => {
      espece.editable = i === index;
      this.editable = espece.editable;
    });
  }
  
  
  public insertEspeceOiseau(): void {
    this.closeAddForm();
    const especeOiseau: Especeoiseau = {
      nomscientifique: this.nomScientifique,
      nomcommun: this.nomCommun,
      statutspeces: this.statut,
      nomscientifiquecomsommer: this.nomScientifiqueComsommer, 
      editable: false,
    };
  
    this.communicationService.insertEspeceOiseau(especeOiseau).subscribe((res: number) => {
      if (res > 0) {
        //this.communicationService.filter("update");
        this.refresh(); 
      }
      this.duplicateError = res === -1;
    });
  }
  
  private refresh() {
    this.getEspecesOiseaux();
    this.getNomScientifiqueConsommer(); 
    this.nomScientifique = "";
    this.nomCommun = "";
    this.statut = Statut.Vulnerable;
    this.nomScientifiqueComsommer = "";
  }
  
  public deleteEspeceOiseau(nomScientifique: string) {
    this.communicationService.deleteEspeceOiseau(nomScientifique).subscribe((res: any) => {
      this.refresh();
    });
  }

  public changeNomCommun(event: any, i: number) {
    const editField = event.target.textContent;
    this.especesOiseaux[i].nomcommun = editField;
  }

  public changeStatut(event: any, i: number, selectedStatut: Statut) {
    this.especesOiseaux[i].statutspeces = selectedStatut;
}


  public changeNomScientifique(event: any, i: number) {
    this.keymodified = true;
    this.oldkey = this.especesOiseaux[i].nomscientifique ;
    const editField = event.target.textContent;
    this.especesOiseaux[i].nomscientifique = editField;
  }

  public changeNomScientifiqueComsommer(event: any, i: number, selectedpredator: string) {
    this.predatormodified = true;
    this.oldpredator = this.especesOiseaux[i].nomscientifiquecomsommer;
    this.especesOiseaux[i].nomscientifiquecomsommer = selectedpredator;
  }
  

  public updateEspeceOiseau(i: number) {
    //this.especesOiseaux[i].editable = false;
    if (this.keymodified && this.predatormodified) {
      this.updateKeyAndOtherFields(i);
      return;
    } 
    else if(this.keymodified){
      this.updateKey(i);
      return;
    }
    else if(this.predatormodified){
      this.updatePredator(i);
      return;
    }
    else {
      this.communicationService.updateEspeceOiseau(this.especesOiseaux[i]).subscribe((res: any) => {
        this.toggleEdit(i);
        this.refresh();
      });
    }
  }

  private updateKeyAndOtherFields(i: number) {
    const request : UpdateKeyAndOtherFieldsRequest = {
      oldKey: this.oldkey,
      newKey: this.especesOiseaux[i].nomscientifique,
      especeToUpdate: this.especesOiseaux[i],
      oldpredator: this.oldpredator,
      newpredator:this.especesOiseaux[i].nomscientifiquecomsommer,
    };

    this.communicationService.updateKeyAndOtherFields( request).subscribe((res: any) => {
      this.keymodified = false;
      this.oldkey = '';
      this.predatormodified = false;
      this.oldpredator = '';
  

      this.toggleEdit(i);
      this.refresh();
    });
  }

  private updateKey(i: number) {
    const request : UpdateKey = {
      oldKey: this.oldkey,
      newKey: this.especesOiseaux[i].nomscientifique,
      especeToUpdate: this.especesOiseaux[i],

    };

    this.communicationService.updateKey( request).subscribe((res: any) => {
      this.keymodified = false;
      this.oldkey = '';
    
      this.toggleEdit(i);
      this.refresh();
    });
  }

  private updatePredator(i: number) {
    const request : UpdatePredator = {
      oldpredator: this.oldpredator,
      newpredator:this.especesOiseaux[i].nomscientifiquecomsommer,
      especeToUpdate: this.especesOiseaux[i],
    };

    this.communicationService.updatePredator(request).subscribe((res: any) => {
      this.predatormodified = false;
      this.oldpredator = '';
    
      this.toggleEdit(i);
      this.refresh();
    });
  }

  
}
