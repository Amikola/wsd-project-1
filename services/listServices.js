import { sql } from "../database/database.js";


const createList = async (name) => {
    return await sql`INSERT INTO shopping_lists (name,active) VALUES (${ name }, true)`;
  };

const getAllList = async () => {
    return await sql`SELECT * FROM shopping_lists WHERE active = true`;
  };

const changeList = async (id) => {
  return await sql`UPDATE shopping_lists SET active = false WHERE id = ${id}`;
};

const getByID = async (id) => {
  return await sql`SELECT * FROM shopping_lists WHERE id = ${id}`;
};

const count =  async () => {
  const rows = await sql`SELECT COUNT(*) FROM shopping_lists `;
  return rows[0].count;
  };


//for testing purposes
const clear = async () => {
  return await sql`Delete FROM shopping_lists `;
}

export {createList, getAllList,changeList,getByID,count,clear};