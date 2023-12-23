import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-receipt-form',
  templateUrl: './receipt-form.component.html',
  styleUrls: ['./receipt-form.component.css']
})
export class ReceiptFormComponent {
  receiptForm: FormGroup;

  constructor(private fb:FormBuilder){
    this.receiptForm = this.fb.group({
      tenantName: '',
      landlordName: '',
      amount: 0,
      address: '',
      date: ''
    });
  }

  generatePDF(){
    const pdf=new jsPDF();
    const tenantName = this.receiptForm.value?.tenantName;
    const landlordName = this.receiptForm.value?.landlordName;
    const address = this.receiptForm.value?.address;
    const date = this.receiptForm.value?.date;
    const amount = this.receiptForm.value?.amount;

    pdf.text(`Tenant Name: ${tenantName}`,10,10);
    pdf.text(`Landlord Name: ${landlordName}`,10,20);
    pdf.text(`Address: ${address}`,10,30);
    pdf.text(`Amount: ${amount}`,10,40);
    pdf.text(`Date: ${date}`,10,50);
    pdf.save('rent_receipt.pdf');
  }

}
