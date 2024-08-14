import React, { useState } from "react";

const ElectricityBill = () => {
  const [units, setUnits] = useState(0);
  const [loads, setLoads] = useState(1);

  const [meterRent, setMeterRent] = useState(40);
  const [demandCharge, setDemandCharge] = useState(42);
  const [vatPercent, setVatPercent] = useState(5);

  const [billInfo, setBillInfo] = useState({
    unitPrice: 0,
    meterRent: 40.0,
    demandCharge: demandCharge * loads,
    totalCost: 0,
    vat: 0,
    totalPayCost: 0,
  });

  const [tariffInfo, setTariffInfo] = useState(null);

  const calculateBill = () => {
    let unitPrice = 0.0;
    const unitsConsumed = parseInt(units, 10);

    const _tariffInfo = [];

    if (unitsConsumed <= 50) {
      unitPrice = unitsConsumed * 4.63;

      _tariffInfo.push(
        "Tariff(0-50): (" + unitsConsumed + " * 4.63) = " + unitsConsumed * 4.63
      );
    } else if (unitsConsumed <= 75) {
      unitPrice = 50 * 4.63 + (unitsConsumed - 50) * 5.26;

      _tariffInfo.push("Tariff(0-50): (50 * 4.63) = " + 50 * 4.63);
      _tariffInfo.push(
        "Tariff(51-75): (" +
          (unitsConsumed - 50) +
          " * 5.26) = " +
          (unitsConsumed - 50) * 5.26
      );
    } else {
      unitPrice = 50 * 4.63 + 25 * 5.26 + (unitsConsumed - 75) * 7.2;

      _tariffInfo.push("Tariff(0-50): (50 * 4.63) = " + 50 * 4.63);
      _tariffInfo.push("Tariff(0-75): (25 * 5.26) = " + 25 * 5.26);
      _tariffInfo.push(
        "Tariff(76-200): (" +
          (unitsConsumed - 75) +
          " * 4.63) = " +
          (unitsConsumed - 75) * 7.2
      );
    }

    setTariffInfo(_tariffInfo);

    const _demandCharge = demandCharge * loads;
    const totalCost = unitPrice + meterRent + _demandCharge;
    const vat = totalCost * (vatPercent / 100);
    const totalPayCost = totalCost + vat;

    const resultInfo = {
      unitPrice: unitPrice,
      meterRent: meterRent,
      demandCharge: _demandCharge,
      totalCost: totalCost,
      vat: vat,
      totalPayCost: totalPayCost,
    };

    setBillInfo(resultInfo);
  };

  return (
    <section className="min-h-screen py-10 bg-slate-100 flex items-center">
      <div className="container">
        <div className="w-full max-w-[550px] mx-auto bg-slate-300 rounded-md">
          <div className="p-5 text-center border-b-[1px] border-white">
            <h2 className="text-2xl font-medium text-black">
              Electricity Bill Calculator
            </h2>
          </div>

          <div className="p-5">
            <div className="mb-5">
              <label
                htmlFor="units"
                className="mb-4 block text-center text-lg font-medium text-black"
              >
                Enter the number of units consumed
              </label>

              <div className="flex items-end gap-5">
                <div className="">
                  <label className="mb-1 block text-base font-medium text-black">
                    Units(KWH)
                  </label>
                  <input
                    className="w-full rounded-md px-4 py-2 text-lg font-medium text-black transition focus:outline-none"
                    type="number"
                    id="units"
                    value={units}
                    onChange={(e) => setUnits(e.target.value)}
                  />
                </div>

                <div className="">
                  <label className="mb-1 block text-base font-medium text-black">
                    Load(KW)
                  </label>
                  <input
                    className="w-full rounded-md px-4 py-2 text-lg font-medium text-black transition focus:outline-none"
                    type="number"
                    id="units"
                    value={loads}
                    onChange={(e) => setLoads(e.target.value)}
                  />
                </div>

                <button
                  className="bg-green-600 px-5 py-3 rounded-md text-base font-medium text-white uppercase transition hover:bg-green-700"
                  onClick={calculateBill}
                >
                  Calculate
                </button>
              </div>
            </div>

            <ul className="p-4 rounded-md bg-white text-lg font-normal text-black">
              <li className="mb-2 p-2 bg-gray-200 rounded-md flex items-center gap-4 justify-between flex-wrap font-medium">
                <p>Charge</p>
                <p>Amount(BDT)</p>
              </li>
              <li className="px-2 py-1 flex items-center gap-4 justify-between flex-wrap ">
                <p>Unit Price</p>
                <p>{billInfo.unitPrice} BDT</p>
              </li>
              <li className="px-2 py-1 flex items-center gap-4 justify-between flex-wrap ">
                <p>Meter Rent</p>
                <p>{billInfo.meterRent} BDT</p>
              </li>
              <li className="px-2 py-1 flex items-center gap-4 justify-between flex-wrap ">
                <p>Demand Charge</p>
                <p>{billInfo.demandCharge} BDT</p>
              </li>
              <li className="px-2 py-1 flex items-center gap-4 justify-between flex-wrap ">
                <p>Total Charge</p>
                <p>{billInfo.totalCost} BDT</p>
              </li>
              <li className="px-2 py-1 flex items-center gap-4 justify-between flex-wrap ">
                <p>VAT (5%)</p>
                <p>{billInfo.vat} BDT</p>
              </li>
            </ul>

            <div className="mt-2 p-4 rounded-md bg-white">
              <p className="flex items-center gap-4 justify-between flex-wrap text-xl font-medium text-black">
                Total Amount
                <span className="bg-green-500 px-2 py-1 rounded text-white">
                  {billInfo.totalPayCost} BDT
                </span>
              </p>
              {tariffInfo && (
                <div className="mt-3">
                  <div className="pb-1 border-b-[1px] border-gray-100">
                    <h4 className="text-base font-medium ">Tariffs info</h4>
                  </div>

                  <ul className="mt-2">
                    {tariffInfo?.map((item, i) => (
                      <li key={i}>{item.toString()}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ElectricityBill;
