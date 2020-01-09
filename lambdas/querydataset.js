import { success } from '../libs/response-lib';

export async function main(event) {
  const ids = event.multiValueQueryStringParameters.id;
  return success({ ids });
}
