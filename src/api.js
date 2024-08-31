export const domain = "https://bppindia.com";
// export const domain = "http://localhost:3001";


const endpoints = {
    createBppMember: "/user/createBppMember",
};


function getURLbyEndPointV1(endpoint) {
  return domain + "/api" + endpoints[endpoint];
}

export { endpoints, getURLbyEndPointV1 };
