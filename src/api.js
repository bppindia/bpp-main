export const domain = "https://api.bppindia.com";
// export const domain = "http://localhost:3001";


const endpoints = {
    createBppMember: "/user/createBppMember",
    requestOtp:"/user/requestOtp",
    
};


function getURLbyEndPointV1(endpoint) {
  return domain + "/api" + endpoints[endpoint];
}

export { endpoints, getURLbyEndPointV1 };
