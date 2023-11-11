import { renderFile } from "../deps.js";
import * as itemServices from "../services/itemServices.js";
import * as listServices from "../services/listServices.js"; 


const responseDetails = {
  headers: { "Content-Type": "text/html;charset=UTF-8" },
};

const redirectTo = (path) => {
  return new Response(`Redirecting to ${path}.`, {
    status: 303,
    headers: {
      "Location": path,
    },
  });
};


const viewItems  = async (request) => {
    const url = new URL(request.url);
    const urlParts = url.pathname.split("/");

    const data =  {
        list: await listServices.getByID(urlParts[2]),
        items: await itemServices.getAll(urlParts[2]),
        id: urlParts[2],
    };
    
    return new Response(await renderFile("item.eta",data), responseDetails);
  };

  const addItem  = async (request) => {
    
    const formData = await request.formData();
    const name = formData.get("item");
    
    const url = new URL(request.url);
    const urlParts = url.pathname.split("/");
    const id = urlParts[2];

    await itemServices.addItem(name,id);

    return redirectTo(`/lists/${id}`);

  };

  const collectItem = async (request) => {
    const url = new URL(request.url);
    const id = url.pathname.split("/");
    await itemServices.collect(id[4])
    return redirectTo(`/lists/${id[2]}`);
  };

  

export{viewItems,addItem,collectItem};