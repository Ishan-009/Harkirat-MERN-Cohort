import axios from "axios";
import { useEffect, useState } from "react";

const fetchData = async () => {
  const response = await axios.get(
    "https://week-13-offline.kirattechnologies.workers.dev/api/v1/user/details"
  );

  console.log(`response is ${response.data}`);

  return response.data;
};

// Asynchronous Component
export default async function User() {
  const data = await fetchData();

  return (
    <div>
      <div>{data.name}</div>
      <div>{data.email}</div>
    </div>
  );
}

// export default function User() {
//   const [data, setData] = useState({ email: "", name: "" });
//   const [loading, setLoading] = useState(true);
//   useEffect(() => {
//     const fetchData = async () => {
//       const response = await axios.get(
//         "https://week-13-offline.kirattechnologies.workers.dev/api/v1/user/details"
//       );
//       setData(response.data);
//       setLoading(false);
//     };
//     fetchData();
//   }, []);

//   return (
//     <div>
//       {loading ? (
//         <div>Loading.....</div>
//       ) : (
//         <div>
//           <div>{data.name}</div>
//           <div>{data.email}</div>
//         </div>
//       )}
//     </div>
//   );
// }
