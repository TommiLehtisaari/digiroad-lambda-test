import { Client } from 'pg';
import matching_script from './matching_script';

export async function uploadGeoJSON(geojson) {
  const client = new Client();
  client.connect();

  const result = await client.query(
    `
    INSERT INTO datasets (json_data, upload_executed)
    VALUES ($1, CURRENT_TIMESTAMP) RETURNING dataset_id`,
    [geojson]
  );

  client.end();
  return result.rows[0].dataset_id;
}

export async function getDatasetById(id, fetchGeoJSON = false) {
  const client = new Client();
  client.connect();

  const data_columns = `
    dataset_id, 
    matched_roadlinks, 
    matching_rate, 
    upload_executed, 
    update_finished, 
    status_log
  `;

  const attributes = fetchGeoJSON ? data_columns + ', json_data' : data_columns;

  const result = await client.query(
    `
    SELECT ${attributes} 
    FROM datasets
    WHERE dataset_id = $1`,
    [id]
  );

  client.end();
  return result.rows[0];
}

export async function executeMatchingScript(id) {
  const client = new Client();
  client.connect();
  await client.query(matching_script, [id]);
  client.end();
}
