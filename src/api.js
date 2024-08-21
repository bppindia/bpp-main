// export const domain = "https://e-platapi.aecci.org.in";
export const domain = "http://localhost:3001";


const endpoints = {
    createBppMember: "/user/createBppMember",
};


function getURLbyEndPointV2(endpoint) {
  return domain + "/api/v2" + endpoints[endpoint];
}

export { endpoints, getURLbyEndPointV2 };
