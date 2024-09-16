import { Component, Inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { modalInfoTable } from 'app/shared/interfaces/TableColumns';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-modal-information-in-table',
  templateUrl: './modal-information-in-table.component.html',
  styleUrl: './modal-information-in-table.component.scss'
})
export class ModalInformationInTableComponent implements OnInit, OnDestroy {
  private onDestroy = new Subject<void>();

  public dataSource = new MatTableDataSource<any>([]);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  public longitudPagina = 50;
  public total = 0;
  public indicePagina = 0;
  public campaignName = "";

  public displayedColumns: string[]

  private agentInfoColumns: string[] = [
    'agent',
    'rol',
    'voice_identifier',
  ]

  private companyInfoColumns: string[] = [
    'company',
    'contact',
    'quoteNumber',
    'companyPhase'
  ]

  public agentData: any[] = []

  constructor(
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: modalInfoTable,
    private dialogRef: MatDialogRef<any>,
  ) { }

  ngOnInit(): void {
    console.log('MODAL : ', this.data.info);
    this.campaignName = this.data.campaingName;

    if (this.data.type == 'agents') this.getAgents()
      else this.getCompanies()
  }


  getAgents() {
    this.displayedColumns = this.agentInfoColumns;
    let agentData :any
    if (this.data.info.main) {
      agentData = [this.data.info.main, ...this.data.info.alls.map(all => all.user)];
    } else {
      agentData = [...this.data.info.alls.map(all => all.user)];
    }

    agentData.forEach((data: any, index) => {
      console.log('data', data);

      if (this.data.info.main) {
        if (index == 0) data.main = true;
      }
      data.agent = { 
        img: data.profile_picture.includes('default')
          ? `../../../../../assets/images/user-default.png`
          : data.profile_picture,
        name: `${data.first_name && data.last_name ? data?.first_name.toUpperCase() + ' ' + data?.last_name.toUpperCase() : data?.username.toUpperCase()}`,
      };

      data.rol = { main: data.main, rol: data.rol_name }

    })

    console.log(agentData);
    

    this.dataSource.data = agentData;
  }

  getCompanies() {
    this.displayedColumns = this.companyInfoColumns
    
    let companyData = [...this.data.info];

    companyData.forEach((data: any) => {
      let quotes = "";

      data?.quotes.forEach((quote: any) => {
        quotes += "# " + quote.quote_number + " / "
      })

      data.companyMain = { img: data.company.logo.includes('default')
          ? `../../../assets/images${data.company.logo}`
          : data.company.logo,
        name: `${data.company.company_name}`,
      };
      data.companyPhase = data?.company?.company_phase?.phase_name;
      data.quoteNumber  = quotes;
      data.contact = {
        name  : data?.company?.company_contacts[0]?.full_name,
        email : data?.company?.company_contacts[0]?.email,
        phone : data?.company?.company_contacts[0]?.local_phone,
        movil : data?.company?.company_contacts[0]?.movil_phone
      }
    })

    this.dataSource.data = companyData;
  }

  seeData(id: string) {
    //this.router.navigateByUrl(`/home/empresas/detalles-empresa/${id}`);
    const url = `home/empresas/detalles-empresa/${id}`;
    window.open(url, '_blank');
    this.closeModal()
  }

  closeModal() {
    this.dialogRef.close({ close: true })
  }

  ngOnDestroy(): void {
    this.onDestroy.next();
    this.onDestroy.unsubscribe();
  }
}
