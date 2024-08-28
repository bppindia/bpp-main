export const domain = "https://api.bppindia.com";
// export const domain = "http://localhost:3001";


const endpoints = {
    createBppMember: "/user/createBppMember",
};


function getURLbyEndPointV2(endpoint) {
  return domain + "/api" + endpoints[endpoint];
}

export { endpoints, getURLbyEndPointV2 };
