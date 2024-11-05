// import { Controller, Get, Param, Res } from '@nestjs/common';
// import { InvoicesService } from '../service/invoices.service';
// import { Response } from 'express';

// @Controller('invoices')
// export class InvoicesController {
//   constructor(private readonly invoicesService: InvoicesService) {}

//   @Get(':orderId')
//   async getInvoice(@Param('orderId') orderId: number, @Res() res: Response) {
//     const invoicePath = await this.invoicesService.generateInvoice(orderId);
//     res.sendFile(invoicePath, { root: '.' });
//   }
// }