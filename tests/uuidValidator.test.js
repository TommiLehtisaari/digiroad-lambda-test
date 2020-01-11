import uuidValidator from '../libs/uuidValidator-lib';

test('Single uuid', () => {
  const isUUID = uuidValidator('db758d4b-8721-4866-b07c-06faece1991c');
  expect(isUUID).toEqual(true);
});
