import axios from "axios";


export async function addCourseToUser(customer: string) {
  const response = axios.post("http://91.197.98.253:8086/buy_course", {
    customer,
  });
  return response;
}

export default {};
