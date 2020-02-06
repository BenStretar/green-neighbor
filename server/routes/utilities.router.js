const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');

/* 
  Gets just then name of a utility company and its ID.
  Used on the details page once a program is selected
*/
router.get('/getName/:zip/:eia_state', async (req, res) => {
    try{
        const query = `
            SELECT "id", "utility_name"
            FROM "zips"
            WHERE "zip"=$1 AND "eia_state"=$2`
        const {rows} = await pool.query(query, [req.params.zip, req.params.eia_state]);
        res.send(rows[0]);
    } catch (error) {
        res.send(500);
        console.log('Error getting utility company name:',error);
    }
});

/* 
  Posts a new utility company to the zips table.
*/
router.post('/', async(req,res)=>{
  const {zip, eiaid, utility_name, state, eia_state, bundled_avg_comm_rate, bundled_avg_ind_rate, bundled_avg_res_rate, delivery_avg_comm_rate, delivery_avg_ind_rate, delivery_avg_res_rate} = req.body;
  const queryData = [zip, eiaid, utility_name, state, eia_state, bundled_avg_comm_rate, bundled_avg_ind_rate, bundled_avg_res_rate, delivery_avg_comm_rate, delivery_avg_ind_rate, delivery_avg_res_rate];
  try {
    const query = `
      INSERT INTO zips (zip, eiaid, utility_name, state, eia_state, bundled_avg_comm_rate, bundled_avg_ind_rate, bundled_avg_res_rate, delivery_avg_comm_rate, delivery_avg_ind_rate, delivery_avg_res_rate)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11);
    `;
    await pool.query(query, queryData);
    res.sendStatus(201);
  } catch(error) {
    res.send(500);
    console.log('Error posting new utility company:',error);
  }
});

/* 
  Deletes a utility company from the zips table.
  Requires a user to be authenticated to permit deletion.
*/
router.delete('/:id', rejectUnauthenticated, async(req,res)=>{
  try {
    const query = `
      DELETE FROM zips WHERE id=$1;
    `;
    await pool.query(query, [req.params.id]);
    res.sendStatus(200);
  } catch(error) {
    res.send(500);
    console.log('Error deleting utility company:',error);    
  }
});

/* 
  Updates a utility company on the zips table.
  Requires a user to be authenticated to permit modification.
*/
router.put('/:id', rejectUnauthenticated, async(req,res)=>{
  const {zip, eiaid, utility_name, state, eia_state, bundled_avg_comm_rate, bundled_avg_ind_rate, bundled_avg_res_rate, delivery_avg_comm_rate, delivery_avg_ind_rate, delivery_avg_res_rate} = req.body;
  const queryData = [req.params.id, zip, eiaid, utility_name, state, eia_state, bundled_avg_comm_rate, bundled_avg_ind_rate, bundled_avg_res_rate, delivery_avg_comm_rate, delivery_avg_ind_rate, delivery_avg_res_rate];
  try {
    const query = `
      UPDATE zips 
      SET zip=$2, eiaid=$3, utility_name=$4, state=$5, eia_state=$6, bundled_avg_comm_rate=$7, bundled_avg_ind_rate=$8, bundled_avg_res_rate=$9, delivery_avg_comm_rate=$10, delivery_avg_ind_rate=$11, delivery_avg_res_rate=$12
      WHERE id=$1;
    `;
    await pool.query(query, queryData);
    res.sendStatus(200);
  } catch(error) {
    res.send(500);
    console.log('Error updating existing utility company:',error);
  }
});

module.exports = router;