import React, { useCallback, useState, memo, useMemo, useEffect } from "react";

function MemoAndUseCallbackComponent() {
  const [exchange1Data, setExchange1Data] = useState({});
  const [exchange2Data, setExchange2Data] = useState({});
  const [bankData, setBankData] = useState({});

  useEffect(() => {
    setExchange1Data({ returns: 100 });
  }, []);

  useEffect(() => {
    setExchange2Data({ returns: 100 });
  }, []);

  useEffect(() => {
    setInterval(() => {
      setBankData({ income: 100 });
    }, 3000);
  }, []);

  // without usememo
  // const cryptoReturns = exchange1Data.returns + exchange2Data.returns;
  // console.log("after");
  // const incomeTax = (parseInt(cryptoReturns) + parseInt(bankData.income)) * 0.3;

  // =========== using use memo (memoization)

  const cryptoReturns = useCallback(() => {
    return exchange1Data.returns + exchange2Data.returns;
  }, [exchange1Data, exchange2Data]);

  return (
    <div>
      <CryptoReturnCaculator
        cryptoFunction={cryptoReturns}
      ></CryptoReturnCaculator>
    </div>
  );
}

const CryptoReturnCaculator = memo(function ({ cryptoFunction }) {
  console.log(cryptoFunction);
  return <div>The crypto returns is {cryptoFunction()}</div>;
});

export default MemoAndUseCallbackComponent;
