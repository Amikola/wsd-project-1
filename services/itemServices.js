import { sql } from "../database/database.js";

const getAll = async (id) => {
     return await sql`SELECT * FROM shopping_list_items 
     WHERE shopping_list_id = ${id} 
     ORDER by collected, name`;
  };

const addItem = async (name, id) => {
  return await sql`INSERT INTO shopping_list_items (shopping_list_id, name, collected) VALUES (${ id },${ name }, false)`;;
};

const collect = async (id) => {
  return await sql`UPDATE shopping_list_items SET collected = true WHERE id = ${id}`;
};

const count =  async () => {
const rows = await sql`SELECT COUNT(*) FROM shopping_list_items`
return rows[0].count;
};

// For testing purposes
const clear = async () => {
  return await sql`Delete FROM shopping_list_items `;
}

export{getAll,addItem,collect,count,clear};