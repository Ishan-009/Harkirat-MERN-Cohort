import { useEffect, useState, useMemo } from "react";

function MemoComponent() {
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

  const cryptoReturns = useMemo(() => {
    console.log("hi memo");
    return exchange1Data.returns + exchange2Data.returns;
  }, [exchange1Data, exchange2Data]);
  const incomeTax = (parseInt(cryptoReturns) + parseInt(bankData.income)) * 0.3;

  return (
    <>
      <div>
        <h2>Income Tax :- </h2>
        <p>The Income tax of the user is {incomeTax} </p>
      </div>
    </>
  );
}

export default MemoComponent;
