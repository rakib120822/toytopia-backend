import axios from "axios";
import config from "../../config";
const initializedPayment = async (order: any) => {
  const transId = `TRNX_ID_${Date.now()}`;
  const data = {
    store_id: config.ssl_commerz_store_id,
    store_passwd: config.ssl_commerz_store_pass,
    total_amount: 100,
    currency: "BDT",
    tran_id: transId, // use unique tran_id for each api call
    success_url: `${config.app_url}/${transId}/`,
    fail_url: "http://localhost:3030/fail",
    cancel_url: "http://localhost:3030/cancel",
    ipn_url: "http://localhost:3030/ipn",
    cus_name: "Customer Name",
    cus_email: "customer@example.com",
    cus_add1: "N/A",
    cus_add2: "N/A",
    cus_city: "N/A",
    cus_state: "N/A",
    cus_postcode: "1000",
    cus_country: "Bangladesh",
    cus_phone: "01711111111",
    cus_fax: "01711111111",
  };
  const response = await axios.post(
    "https://sandbox.sslcommerz.com/gwprocess/v4/api.php",
    data,
    {
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    },
  );

  console.log(response);
};

export default initializedPayment;
