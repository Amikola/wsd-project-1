import { renderFile } from "../deps.js";
import * as listService from "../services/listServices.js";


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

const addList = async (request) => {
  const formData = await request.formData();


  const name = formData.get("name");

  await listService.createList(name);

  return redirectTo("/lists");
};


const viewLists  = async () => {
    
    const  data =   {
      list: await listService.getAllList(),
    }
    return new Response(await renderFile("lists.eta",data), responseDetails);
  };
  



const deactivateList = async (request) => {
  const url = new URL(request.url);
  const id = url.pathname.split("/");
  await listService.changeList(id[2])
  return redirectTo("/lists");
};



export { viewLists, addList, deactivateList};