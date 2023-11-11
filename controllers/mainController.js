import { renderFile } from "../deps.js";
import * as listService from "../services/listServices.js";
import * as itemServices from "../services/itemServices.js";

const responseDetails = {
    headers: { "Content-Type": "text/html;charset=UTF-8" },
  };
  
const viewMain = async () => {
  
  // Uncomment these to clear database. Remember to comment them back after clearing
  //itemServices.clear();
  //listService.clear();

  
  const data = {
      list: await listService.count(), 
      items: await itemServices.count(),
    }
  
    return new Response(await renderFile("mainPage.eta",data), responseDetails);
  };

export{viewMain}