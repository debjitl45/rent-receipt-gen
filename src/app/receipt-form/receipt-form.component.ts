import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-receipt-form',
  templateUrl: './receipt-form.component.html',
  styleUrls: ['./receipt-form.component.css']
})
export class ReceiptFormComponent {
  receiptForm: FormGroup;
  isDisabled: boolean=true;

  constructor(private fb:FormBuilder){
    this.receiptForm = this.fb.group({
      tenantName: ['', Validators.required],
      landlordName: ['', Validators.required],
      amount: [0, Validators.required],
      address: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      landlordPan: ['', Validators.required]
    });
  }

  generatePDF(){
    const pdf=new jsPDF();
    const tenantName = this.receiptForm.value?.tenantName;
    const landlordName = this.receiptForm.value?.landlordName;
    const landlordPan = this.receiptForm.value?.landlordPan;
    const address = this.receiptForm.value?.address;
    const startDate = this.receiptForm.value?.startDate;
    const endDate = this.receiptForm.value?.endDate;
    const amount = this.receiptForm.value?.amount;

    pdf.setFont('times');
    pdf.setFontSize(18);
    pdf.text('Rent Receipt' , 90, 10);

    // Set font style for the content
    pdf.setFont('bold');
    pdf.setFontSize(14);

    // Draw the content of the invoice
       
  
    pdf.text(`Received sum of INR ${amount} from ${tenantName} towards the rent of property located at `, 20, 20);
    pdf.text(`${address} for the period ${startDate} to ${endDate}`, 10, 25);
    pdf.text(`Signature`, 10, 40);
    pdf.text(`${landlordName}`, 10, 45);
    pdf.text(`${landlordPan}`, 10, 50);

      // Draw a line under the header and content
    pdf.setLineWidth(0.25);
    pdf.line(8, 15, 200, 15);
    pdf.line(8, 15, 8, 60);
    pdf.line(8, 60, 200, 60);
    pdf.line(200, 15, 200, 60);
      
    // Save PDF
    pdf.save('rent_receipt.pdf');
  }
}
