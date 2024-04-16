<template>
  <div class='invoice-page'>
   <div class='nav-bar'>
     <div class='nav-bar-item' @click='showTableComponent()'>
       Invoices
     </div>
   </div>
    <div class='main-comp' v-if='isShowTableComponent'>
      <div class="button" @click="addInvoice()">Add Invoice</div>
      <table>
        <thead >
        <th v-for="(headerName,index) in tableHeaders" :key="index">{{headerName}}</th>
        </thead>
        <tbody>
        <tr v-for="(invoice,index) in invoices" :key="index">
          <td v-for="(key,keyIndex) in tableKeys" :key="keyIndex">
            {{invoice[key]}}
          </td>
          <td>
            <div class="button" @click="updateInvoice(invoice.Id)">Edit</div>
          </td>
        </tr>
        </tbody>
      </table>
      <pagination v-model="page" :records="500" :per-page="25" @paginate="fetchPaginationData()"/>
    </div>
  </div>
</template>

<script>
import Pagination from 'v-pagination-3'
export default {
  data () {
    return {
      page: 1,
      isShowTableComponent: false,
      tableHeaders: ['Invoice No', 'Date', 'Name', 'Billing Address', 'Shipping Address', 'GSTIN', 'Items', 'BillSundrys', 'Total', 'Action'],
      tableKeys: ['InvoiceNumber', 'Date', 'CustomerName', 'BillingAddress', 'ShippingAddress', 'GSTIN', 'Items', 'BillSundrys', 'TotalAmount'],
      invoices: [],
      invoicesPage1: [{
        Id: '1',
        Date: '16-04-2024',
        InvoiceNumber: 123,
        CustomerName: 'sruthi',
        BillingAddress: 'nheights',
        ShippingAddress: 'madhapur',
        GSTIN: '123',
        Items: [{
          Id: '123456',
          itemName: 'bag',
          quantity: 1,
          price: 995,
          amount: 995

        },
        {
          Id: '123458',
          itemName: 'pen',
          quantity: 1,
          price: 1,
          amount: 1

        }],
        BillSundrys: [{
          Id: '12345672',
          billSundryName: 'SGST',
          amount: 2
        },
        {
          Id: '12345676',
          billSundryName: 'CGST',
          amount: 2
        }],
        TotalAmount: 1000
      },
      {
        Id: '2',
        Date: '16-04-2024',
        InvoiceNumber: 124,
        CustomerName: 'sruthi',
        BillingAddress: 'nheights',
        ShippingAddress: 'madhapur',
        GSTIN: '123',
        Items: [{
          Id: '123452',
          itemName: 'pencil',
          quantity: 1,
          price: 995,
          amount: 995

        },
        {
          Id: '123454',
          itemName: 'eraser',
          quantity: 1,
          price: 1,
          amount: 1

        }],
        BillSundrys: [{
          Id: '12345671',
          billSundryName: 'SGST',
          amount: 2
        },
        {
          Id: '12345674',
          billSundryName: 'CGST',
          amount: 2
        }],
        TotalAmount: 1000
      }],
      invoicesPage2: [{
        Id: '3',
        Date: '17-04-2024',
        InvoiceNumber: 123,
        CustomerName: 'Altius',
        BillingAddress: 'gachibowli',
        ShippingAddress: 'hitech',
        GSTIN: '123',
        Items: [{
          Id: '123456',
          itemName: 'phone',
          quantity: 1,
          price: 995,
          amount: 995

        },
        {
          Id: '123458',
          itemName: 'stylus',
          quantity: 1,
          price: 1,
          amount: 1

        }],
        BillSundrys: [{
          Id: '12345672',
          billSundryName: 'SGST',
          amount: 2
        },
        {
          Id: '12345676',
          billSundryName: 'CGST',
          amount: 2
        }],
        TotalAmount: 2000
      }]
    }
  },
  components: {
    Pagination
  },
  created () {
    this.invoices = JSON.parse(JSON.stringify(this.invoicesPage1))
  },
  methods: {
    showTableComponent () {
      this.isShowTableComponent = true
    },
    fetchPaginationData () {
      console.log('current page', this.page)
      if (this.page === 2) {
        this.invoices = JSON.parse(JSON.stringify(this.invoicesPage2))
      } else {
        this.invoices = JSON.parse(JSON.stringify(this.invoicesPage1))
      }
    },
    addInvoice () {
      this.$router.push({ name: 'invoice-detail', params: { id: 0 } })
    },
    updateInvoice (invoiceId) {
      this.$router.push({ name: 'invoice-detail', params: { id: invoiceId } })
    }
  }
}
</script>

<style lang="scss">
.pagination {
  display: flex;
  list-style-type: none;
  float: right
}
</style>
<style lang='scss' scoped>
.button {
    border-radius: 6px;
    padding: 5px 10px;
    border: 1px solid black;
    margin-bottom: 20px;
    float: right;
    background-color: teal;
    color: white;
    border-color: teal;
  cursor: pointer;
}
.invoice-page {
  display: flex;
}
  .nav-bar {
    flex-basis: 25%;
    border-right: 1px solid black;
    height: 1000px;
    background: teal;
    &-item {
      background-color: white;
      color: black;
      margin-top: 10px;
      padding: 10px;
      font-family: poppins sans-serif;
      font-size: 18px;
      cursor: pointer;
    }
  }
  .main-comp {
    flex-basis: 75%;
    margin-left: 20px;
  }
</style>
