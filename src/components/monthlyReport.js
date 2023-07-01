import React from 'react';

const MonthlyReport = (props) => {
  const { data } = props;

  const lottoCommissionAmount = (data.lottoSale * data.lottoCommissionPercentage) / 100;
  const groceryProfitAmount = (data.grocerySale * data.groceryProfitPercentage) / 100;
  const lottoCashoutProfit = (data.lottoCashout * data.cashoutCommissionPercentage) /100;
  const totalProfit = lottoCommissionAmount + groceryProfitAmount + lottoCashoutProfit;

  return (
    <div className="container shadow py-2 pt-4 my-5 rounded g-4">
      <div className="row mb-2">
        <div className="col-12">
          <div className="page-title-box">
            <h4 className="text-center fw-bold text-info">Monthly Report</h4>
          </div>
        </div>
      </div>

      <div className="row  mb-2">
        <div className="col-xl-6 col-lg-6  mb-2">
          <div className="card widget-flat">
            <div className="card-body">
              <div className="float-end">
                <i className="mdi mdi-currency-usd widget-icon"></i>
              </div>
              <h5 className="text-muted fw-normal mt-0" title="Monthly Gross Sale">Monthly Gross Sale</h5>
              <h3 className="mt-3 mb-3">${data.monthlyGrossSale}</h3>
            </div>
          </div>
        </div>
        <div className="col-xl-6 col-lg-6">
          <div className="card widget-flat">
            <div className="card-body">
              <div className="float-end">
                <i className="mdi mdi-cart-plus widget-icon"></i>
              </div>
              <h5 className="text-muted fw-normal mt-0" title="Lotto Sale">Lotto Sale</h5>
              <h3 className="mt-3 mb-3">${data.lottoSale}</h3>
            </div>
          </div>
        </div>
      </div>

      <div className="row  mb-2">
	  <div className="col-xl-6 col-lg-6 mb-2">
          <div className="card widget-flat">
            <div className="card-body">
              <div className="float-end">
                <i className="mdi mdi-cart-plus widget-icon"></i>
              </div>
              <h5 className="text-muted fw-normal mt-0" title="Lotto Sale">Grocery Sale</h5>
              <h3 className="mt-3 mb-3">${data.grocerySale}</h3>
            </div>
          </div>
        </div>
	  <div className="col-xl-6 col-lg-6 mb-2">
          <div className="card widget-flat">
            <div className="card-body">
              <div className="float-end">
                <i className="mdi mdi-cart-plus widget-icon"></i>
              </div>
              <h5 className="text-muted fw-normal mt-0" title="Lotto Sale">Cashout Amount</h5>
              <h3 className="mt-3 mb-3">${data.lottoCashout}</h3>
            </div>
          </div>
        </div>
        <div className="col-xl-6 col-lg-6  mb-2">
          <div className="card widget-flat">
            <div className="card-body">
              <div className="float-end">
                <i className="mdi mdi-arrow-up-bold widget-icon"></i>
              </div>
              <h5 className="text-muted fw-normal mt-0" title="Lotto Commission Percentage">Lotto Commission Percentage</h5>
              <h3 className="mt-3 mb-3">{data.lottoCommissionPercentage}%</h3>
            </div>
          </div>
        </div>
        <div className="col-xl-6 col-lg-6">
          <div className="card widget-flat">
            <div className="card-body">
              <div className="float-end">
                <i className="mdi mdi-arrow-down-bold widget-icon"></i>
              </div>
              <h5 className="text-muted fw-normal mt-0" title="Grocery Profit Percentage">Grocery Profit Percentage</h5>
              <h3 className="mt-3 mb-3">{data.groceryProfitPercentage}%</h3>
            </div>
          </div>
        </div>
      </div>

      <div className="row  mb-2">
        <div className="col-xl-6 col-lg-6  mb-2">
          <div className="card widget-flat">
            <div className="card-body">
              <div className="float-end">
                <i className="mdi mdi-arrow-up-bold widget-icon"></i>
              </div>
              <h5 className="text-muted fw-normal mt-0" title="Lotto Commission Amount">Lotto Commission Amount</h5>
              <h3 className="mt-3 mb-3">${lottoCommissionAmount.toFixed(2)}</h3>
            </div>
          </div>
        </div>
        <div className="col-xl-6 col-lg-6 ">
          <div className="card widget-flat">
            <div className="card-body">
              <div className="float-end">
                <i className="mdi mdi-arrow-down-bold widget-icon"></i>
              </div>
              <h5 className="text-muted fw-normal mt-0" title="Grocery Profit Amount">Grocery Profit Amount</h5>
              <h3 className="mt-3 mb-3">${groceryProfitAmount.toFixed(2)}</h3>
            </div>
          </div>
        </div>
      </div>

      <div className="row  mb-2">
	  <div className="col-xl-6 col-lg-6  mb-2">
          <div className="card widget-flat">
            <div className="card-body">
              <div className="float-end">
                <i className="mdi mdi-arrow-down-bold widget-icon"></i>
              </div>
              <h5 className="text-muted fw-normal mt-0" title="Grocery Profit Amount">Cashout Profit Amount</h5>
              <h3 className="mt-3 mb-3">${lottoCashoutProfit.toFixed(2)}</h3>
            </div>
          </div>
        </div>
        <div className="col-xl-6 col-lg-6">
          <div className="card widget-flat">
            <div className="card-body">
              <div className="float-end">
                <i className="mdi mdi-currency-usd widget-icon"></i>
              </div>
              <h5 className="text-muted fw-normal mt-0" title="Total Profit">Total Profit</h5>
              <h3 className="mt-3 mb-3">${totalProfit.toFixed(2)}</h3>
            </div>
          </div>
        </div>
      </div>
	 
    </div>
  );
};

export default MonthlyReport;
